import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/db';
import bcrypt from 'bcryptjs';
export async function POST(req: Request) {
  const form = await req.formData();
  const email = String(form.get('email'));
  const password = String(form.get('password'));
  const name = String(form.get('name') ?? '');
  if (!email || password.length < 6) return NextResponse.json({ error: 'Invalid' }, { status: 400 });
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
  const hash = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { email, password: hash, name } });
  return NextResponse.json({ ok: true });
}
