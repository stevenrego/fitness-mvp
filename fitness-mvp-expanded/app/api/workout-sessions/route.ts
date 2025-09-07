import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/db';
import { auth } from '@/src/lib/auth';
export async function GET() {
  const s = await auth(); if (!s?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const sessions = await prisma.workoutSession.findMany({ where: { userId: s.user.id }, include: { sets: true }, orderBy: { startedAt: 'desc' }, take: 50 });
  return NextResponse.json(sessions);
}
export async function POST(req: Request) {
  const s = await auth(); if (!s?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { startedAt, endedAt, notes, sets } = await req.json();
  const created = await prisma.workoutSession.create({
    data: { userId: s.user.id, startedAt: startedAt?new Date(startedAt):undefined, endedAt: endedAt?new Date(endedAt):undefined, notes,
      sets: { createMany: { data: (sets||[]).map((x:any)=>({ ...x, weight: (x.weight as any) ?? null })) } } },
    include: { sets: true },
  });
  return NextResponse.json(created);
}
