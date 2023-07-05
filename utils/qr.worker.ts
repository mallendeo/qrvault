import { expose } from 'comlink'
import QrCodeLib from 'qrcode'

async function createQr(content: string, options = {}): Promise<string> {
  if (!content)
    throw new Error('content is missing')
  const svg = await QrCodeLib.toString(content, {
    type: 'svg',
    errorCorrectionLevel: 'Q',
    margin: 0,
    ...options,
  })

  return svg
}

const exports = {
  createQr,
}

export type QrWorker = typeof exports

expose(exports)
