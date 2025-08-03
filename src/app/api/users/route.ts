import { prisma } from '@/lib/db'
import { userSchema } from '@/lib/validation'
import { NextRequest, NextResponse } from 'next/server'
import { handleCors } from '@/lib/cors'

export async function GET(req: NextRequest) {
  const headers = handleCors(req)
  if (headers instanceof NextResponse) return headers

  const users = await prisma.users.findMany()
  return new NextResponse(JSON.stringify(users), {
    status: 200,
    headers,
  })
}

export async function POST(req: NextRequest) {
  const headers = handleCors(req)
  if (headers instanceof NextResponse) return headers

  const body = await req.json()
  const parsed = userSchema.safeParse(body)

  if (!parsed.success) {
    return new NextResponse(
      JSON.stringify({ error: parsed.error }),
      { status: 400, headers }
    )
  }

  const user = await prisma.users.create({ data: parsed.data })

  return new NextResponse(JSON.stringify(user), {
    status: 201,
    headers,
  })
}
