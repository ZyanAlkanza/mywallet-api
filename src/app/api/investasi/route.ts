import { prisma } from '@/lib/db'
import { investasiSchema } from '@/lib/validation'
import { NextRequest, NextResponse } from 'next/server'
import { handleCors } from '@/lib/cors'

export async function GET(req: NextRequest) {
  const headers = handleCors(req)
  if (headers instanceof NextResponse) return headers

  const emas = await prisma.emas.findMany({
    orderBy: {
      tgl_transaksi: 'asc'
    }
  })
  return new NextResponse(JSON.stringify(emas), {
    status: 200,
    headers,
  })
}

export async function POST(req: NextRequest) {
  const headers = handleCors(req)
  if (headers instanceof NextResponse) return headers

  const body = await req.json()

  if (body.tanggal) {
    const [day, month, year] = body.tanggal.split("/")
    body.tanggal = new Date(`${year}-${month}-${day}`)
  }

  const parsed = investasiSchema.safeParse(body)
  
  if (!parsed.success) {
    return new NextResponse(
      JSON.stringify({ error: parsed.error }),
      { status: 400, headers }
    )
  }

  const user = await prisma.emas.create({ data: parsed.data })

  return new NextResponse(JSON.stringify(user), {
    status: 201,
    headers,
  })
}

export async function OPTIONS(req: Request) {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": req.headers.get("origin") || "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
