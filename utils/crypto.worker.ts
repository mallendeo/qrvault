import { expose } from 'comlink'
import * as crypto from '../utils/crypto'

async function encrypt(content: string, password: string): Promise<ReturnType<typeof crypto.encrypt>> {
  if (!content || !password)
    throw new Error('content or password are missing')

  const encrypted = await crypto.encrypt(content, password)
  return encrypted
}

async function decrypt(content: ArrayBufferLike, password: string, salt: string): Promise<ReturnType<typeof crypto.decrypt>> {
  if (!content || !password || !salt)
    throw new Error('content, password, or salt are missing')

  const decrypted = await crypto.decrypt(content, password, salt)
  return decrypted
}

const exports = {
  encrypt,
  decrypt,
}

export type CryptoWorker = typeof exports

expose(exports)
