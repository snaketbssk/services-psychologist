// pages/api/consultation.ts
// Proxies POST /api/consultation to the C# backend — no CORS issues

import https from 'https'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = JSON.stringify(req.body)

  return new Promise<void>(resolve => {
    const options = {
      hostname: 'localhost',
      port: 7271,
      path: '/api/consultation',
      method: 'POST',
      rejectUnauthorized: false, // self-signed cert on localhost
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    }

    const proxyReq = https.request(options, proxyRes => {
      let raw = ''
      proxyRes.on('data', (chunk: string) => {
        raw += chunk
      })
      proxyRes.on('end', () => {
        res.status(proxyRes.statusCode ?? 200)
        try {
          res.json(JSON.parse(raw))
        } catch {
          res.end(raw)
        }
        resolve()
      })
    })

    proxyReq.on('error', err => {
      console.error('[/api/consultation proxy]', err)
      res.status(500).json({ error: 'Failed to reach backend' })
      resolve()
    })

    proxyReq.write(body)
    proxyReq.end()
  })
}
