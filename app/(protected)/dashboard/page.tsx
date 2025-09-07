import { auth } from '@/src/lib/auth';
import { prisma } from '@/src/lib/db';

export default async function Dashboard() {
  const s = await auth();
  const uid = s?.user?.id as string;
  const [sessions, calories, habits] = await Promise.all([
    prisma.workoutSession.count({ where: { userId: uid } }),
    prisma.nutritionEntry.aggregate({ _sum: { calories: true }, where: { userId: uid } }),
    prisma.habit.count({ where: { userId: uid } }),
  ]);
  return (
    <div className='grid md:grid-cols-3 gap-4'>
      <Kpi title='Workouts logged' value={String(sessions)} />
      <Kpi title='Calories (last 100 entries)' value={String(calories._sum.calories ?? 0)} />
      <Kpi title='Active habits' value={habits.toString()} />
    </div>
  );
}
function Kpi({ title, value }: { title: string; value: string }) {
  return (
    <div className='rounded-xl border bg-white p-4'>
      <div className='text-sm text-neutral-500'>{title}</div>
      <div className='text-3xl font-bold mt-1'>{value}</div>
    </div>
  );
}
