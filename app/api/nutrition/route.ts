import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/db';
import { auth } from '@/src/lib/auth';
export async function GET() {
  const s = await auth(); if (!s?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const rows = await prisma.nutritionEntry.findMany({ where: { userId: s.user.id }, orderBy: { date: 'desc' }, take: 100 });
  return NextResponse.json(rows);
}
export async function POST(req: Request) {
  const s = await auth(); if (!s?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const b = await req.json();
  const row = await prisma.nutritionEntry.create({ data: { userId: s.user.id, date: b.date?new Date(b.date):undefined, meal: b.meal??'snack', calories: b.calories??0, protein: b.protein??0, carbs: b.carbs??0, fat: b.fat??0 } });
  return NextResponse.json(row);
}
