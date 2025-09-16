// src/app/api/habits/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const habits = await prisma.habit.findMany({
    where: { userId: session.user.id },
    include: { logs: true },
  });

  return NextResponse.json(habits);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const habit = await prisma.habit.create({
    data: {
      userId: session.user.id,
      title: body.title,
      completed: false,
    },
  });

  return NextResponse.json(habit);
}
