'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const r = useRouter();
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email'));
    const password = String(form.get('password'));

    // ✅ run signIn in client-only context
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) r.push('/dashboard');
    else setError(res?.error ?? 'Failed');
  }

  return (
    <div className='max-w-md mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Welcome back</h1>
      {error && <p className='text-red-600 mb-2'>{error}</p>}
      <form onSubmit={onSubmit} className='space-y-3'>
        <input className='w-full border p-2 rounded' name='email' type='email' placeholder='Email' />
        <input className='w-full border p-2 rounded' name='password' type='password' placeholder='Password' />
        <button className='w-full bg-black text-white p-2 rounded'>Sign In</button>
      </form>
    </div>
  );
}
