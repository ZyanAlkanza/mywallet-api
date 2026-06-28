import { NextRequest, NextResponse } from 'next/server'

export function handleCors(req: NextRequest) {
  const origin = req.headers.get('origin') || ''

  const headers = new Headers()

  headers.set('Access-Control-Allow-Origin', origin)
  headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  headers.set('Access-Control-Allow-Headers', 'Content-Type')
  headers.set('Vary', 'Origin')

  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers,
    })
  }

  return headers
}