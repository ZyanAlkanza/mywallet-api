import { prisma } from '@/lib/db';
import { userSchema } from '@/lib/validation';
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await prisma.users.findMany();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = userSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const user = await prisma.users.create({
    data: parsed.data,
  });

  return NextResponse.json(user, { status: 201 });
}
