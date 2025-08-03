import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const user = await prisma.users.findUnique({ where: { id: parseInt(params.id) } });
  return user
    ? NextResponse.json(user)
    : NextResponse.json({ error: 'User not found' }, { status: 404 });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const user = await prisma.users.update({
    where: { id: parseInt(params.id) },
    data,
  });
  return NextResponse.json(user);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.users.delete({ where: { id: parseInt(params.id) } });
  return NextResponse.json({ message: 'Deleted' });
}
