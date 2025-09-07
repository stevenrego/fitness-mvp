'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const r = useRouter();
  const [error, setError] = useState('');
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const form = new FormData(e.currentTarget);
    const res = await fetch('/api/register', { method: 'POST', body: form });
    if (res.ok) r.push('/login'); else setError((await res.json()).error ?? 'Failed');
  }
  return (
    <div className='max-w-md mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Create account</h1>
      {error && <p className='text-red-600 mb-2'>{error}</p>}
      <form onSubmit={onSubmit} className='space-y-3'>
        <input className='w-full border p-2 rounded' name='name' placeholder='Name' />
        <input className='w-full border p-2 rounded' name='email' type='email' placeholder='Email' />
        <input className='w-full border p-2 rounded' name='password' type='password' placeholder='Password (min 6)' />
        <button className='w-full bg-black text-white p-2 rounded'>Register</button>
      </form>
    </div>
  );
}
