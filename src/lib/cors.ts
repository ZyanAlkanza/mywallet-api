// src/lib/cors.ts
import { NextRequest, NextResponse } from 'next/server'

const allowedOrigins = ['http://localhost:9000', 'https://mywallet-pink.vercel.app']

export function handleCors(req: NextRequest) {
  const origin = req.headers.get('origin') || ''
  const isAllowed = allowedOrigins.includes(origin)

  const headers = new Headers()

  if (isAllowed) {
    headers.set('Access-Control-Allow-Origin', origin)
  }

  headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  headers.set('Access-Control-Allow-Credentials', 'true')

  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers,
    })
  }

  return headers
}
