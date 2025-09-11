import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const s = await auth();
  if (!s?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const habits = await prisma.habit.findMany({
    where: { userId: s.user.id },
    include: {
      logs: true, // ✅ Assuming you've now added logs: HabitLog[] on Habit model
    },
  });

  return NextResponse.json(habits);
}

export async function POST(req: Request) {
  const s = await auth();
  if (!s?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const h = await prisma.habit.create({
    data: {
      userId: s.user.id,
      title: body.name, // ✅ 'title' is the field in the Prisma model
      frequency: body.frequency ?? "daily", // ✅ only valid if added to schema
    },
  });

  return NextResponse.json(h);
}

export async function PATCH(req: Request) {
  const s = await auth();
  if (!s?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const updated = await prisma.habit.update({
    where: {
      id: body.id,
      userId: s.user.id,
    },
    data: {
      title: body.name,
      completed: body.completed,
    },
  });

  return NextResponse.json(updated);
}

