import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/db';
import { auth } from '@/src/lib/auth';
export async function GET() {
  const s = await auth(); if (!s?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const habits = await prisma.habit.findMany({ where: { userId: s.user.id }, include: { logs: true } });
  return NextResponse.json(habits);
}
export async function POST(req: Request) {
  const s = await auth(); if (!s?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const h = await prisma.habit.create({ data: { userId: s.user.id, name: body.name, frequency: body.frequency ?? 'daily' } });
  return NextResponse.json(h);
}
export async function PATCH(req: Request) {
  const s = await auth(); if (!s?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { habitId, date, done } = await req.json();
  let log = await prisma.habitLog.findFirst({ where: { habitId, date: { gte: new Date(new Date().toDateString()) } } });
  if (!log) log = await prisma.habitLog.create({ data: { habitId, date: date?new Date(date):undefined, done } });
  else log = await prisma.habitLog.update({ where: { id: log.id }, data: { done } });
  return NextResponse.json(log);
}
