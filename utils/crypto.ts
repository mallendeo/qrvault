// https://gist.github.com/chrisveness/770ee96945ec12ac84f134bf538d89fb

export const utf8ToUint8Array = (input: string) => new TextEncoder().encode(input)

export function arrayBufferToUtf8(input: ArrayBufferLike) {
  return new TextDecoder().decode(new Uint8Array(input))
}

export function randomFloat() {
  const int = crypto.getRandomValues(new Uint32Array(1))[0]
  return int / 2 ** 32
}

export function randomInt(min: number, max: number) {
  const range = max - min
  return Math.floor(randomFloat() * range + min)
}

export async function sha256(str: string) {
  return crypto.subtle.digest('SHA-256', new TextEncoder().encode(str))
}

function toBase64(arrayBuffer: ArrayBufferLike) {
  return btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
}

async function deriveKeyAndIv(password: string,
  salt: Uint8Array,
  {
    iter = 1e6,
    randomIter = true,
  } = {}) {
  const passwordKey = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  )

  const keyLength = 32
  const ivLength = 16
  const numBits = (keyLength + ivLength) * 8

  const exp = Math.floor(Math.log10(iter))
  if (exp < 4)
    throw new Error('iter must greater than 10000')
  const iterations = randomIter ? iter + randomInt(10 ** (exp - 2), 10 ** (exp - 1)) : iter

  const derivedBits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-512', salt, iterations },
    passwordKey,
    numBits,
  )

  const key = await crypto.subtle.importKey(
    'raw',
    derivedBits.slice(0, keyLength),
    'AES-GCM',
    false,
    ['encrypt', 'decrypt'],
  )

  const iv = derivedBits.slice(keyLength, keyLength + ivLength)
  return { key, iv, iterations }
}

export async function encrypt(plainText: string, password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const { key, iv, iterations } = await deriveKeyAndIv(password, salt)
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    utf8ToUint8Array(plainText),
  )

  return {
    content: toBase64(encrypted),
    meta: {
      salt: toBase64(salt),
      iv: toBase64(iv),
      iterations,
    },
  }
}

export async function decrypt(cipher: ArrayBufferLike, password: string, salt: string) {
  const { key, iv } = await deriveKeyAndIv(password, utf8ToUint8Array(salt))
  const decrypted = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    key,
    cipher,
  )

  return {
    plainText: arrayBufferToUtf8(decrypted),
    decrypted,
  }
}
