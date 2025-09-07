import '@/app/globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='min-h-screen bg-neutral-50 text-neutral-900'>
        <nav className='border-b bg-white'>
          <div className='mx-auto max-w-6xl px-4 py-3 flex gap-6 items-center'>
            <Link href='/' className='font-bold'>Fitness MVP</Link>
            <div className='ml-auto space-x-4'>
              <Link href='/dashboard'>Dashboard</Link>
              <Link href='/programs'>Programs</Link>
              <Link href='/workouts/log'>Log Workout</Link>
              <Link href='/habits'>Habits</Link>
              <Link href='/nutrition'>Nutrition</Link>
              <Link href='/community'>Community</Link>
              <Link href='/messages'>Messages</Link>
              <Link href='/challenges'>Challenges</Link>
              <Link href='/rewards'>Rewards</Link>
              <Link href='/shop'>Shop</Link>
            </div>
          </div>
        </nav>
        <main className='mx-auto max-w-6xl p-4'>{children}</main>
      </body>
    </html>
  );
}
