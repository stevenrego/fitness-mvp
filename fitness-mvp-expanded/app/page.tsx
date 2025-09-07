import Link from 'next/link';
export default function HomePage() {
  return (
    <div className='grid place-items-center py-24 text-center'>
      <div>
        <h1 className='text-3xl font-bold mb-2'>Your fitness, simplified</h1>
        <p className='text-neutral-600 mb-6'>Track workouts, build habits, and see progress.</p>
        <div className='space-x-3'>
          <Link href='/register' className='px-4 py-2 rounded bg-black text-white'>Get Started</Link>
          <Link href='/login' className='px-4 py-2 rounded border'>Sign In</Link>
        </div>
      </div>
    </div>
  );
}
