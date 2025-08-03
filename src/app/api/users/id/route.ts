import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { id: number } }) {
  const user = await prisma.users.findUnique({ where: { id: params.id } });
  return user
    ? NextResponse.json(user)
    : NextResponse.json({ error: 'User not found' }, { status: 404 });
}

export async function PUT(req: Request, { params }: { params: { id: number } }) {
  const data = await req.json();
  const user = await prisma.users.update({
    where: { id: params.id },
    data,
  });
  return NextResponse.json(user);
}

export async function DELETE(_: Request, { params }: { params: { id: number } }) {
  await prisma.users.delete({ where: { id: params.id } });
  return NextResponse.json({ message: 'Deleted' });
}
