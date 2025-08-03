import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request, context: { params: { id: string } }) {
  const id = parseInt(context.params.id);

  const user = await prisma.users.findUnique({
    where: { id },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(req: Request, context: { params: { id: string } }) {
  const id = parseInt(context.params.id);
  const data = await req.json();

  const user = await prisma.users.update({
    where: { id },
    data,
  });

  return NextResponse.json(user);
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  const id = parseInt(context.params.id);

  await prisma.users.delete({
    where: { id },
  });

  return NextResponse.json({ message: 'Deleted' });
}

