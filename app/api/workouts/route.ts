import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
export async function GET() {
  const s = await auth(); if (!s?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await prisma.workoutTemplate.findMany({ where: { userId: s.user.id }, include: { items: { include: { exercise: true } } } });
  return NextResponse.json(data);
}
export async function POST(req: Request) {
  const s = await auth(); if (!s?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { name, notes, items } = await req.json();
  const tpl = await prisma.workoutTemplate.create({
    data: { userId: s.user.id, name, notes,
      items: { create: (items||[]).map((it:any, idx:number)=>({ exerciseId: it.exerciseId, targetSets: it.targetSets??3, targetReps: it.targetReps??10, targetWeight: it.targetWeight as any, order: it.order ?? idx })) } },
    include: { items: true },
  });
  return NextResponse.json(tpl);
}

