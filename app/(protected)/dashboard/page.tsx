

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) return <div>Unauthorized</div>;

  const uid = session.user.id;
  const [workouts, nutrition, habits] = await Promise.all([
    prisma.workoutSession.count({ where: { userId: uid } }),
    prisma.nutritionEntry.aggregate({ _sum: { calories: true }, where: { userId: uid } }),
    prisma.habit.count({ where: { userId: uid } })
  ]);

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="border rounded-lg p-4">Workouts: {workouts}</div>
      <div className="border rounded-lg p-4">Total Calories: {nutrition._sum.calories || 0}</div>
      <div className="border rounded-lg p-4">Habits: {habits}</div>
    </div>
  );
}

