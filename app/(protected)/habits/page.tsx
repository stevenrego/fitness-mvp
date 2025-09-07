'use client';
import { useEffect, useState } from 'react';
export default function HabitsPage() {
  const [habits, setHabits] = useState<any[]>([]);
  const [name, setName] = useState('');
  useEffect(() => { refresh(); }, []);
  function refresh() { fetch('/api/habits').then(r => r.json()).then(setHabits); }
  async function addHabit() {
    await fetch('/api/habits', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name }) });
    setName(''); refresh();
  }
  async function toggle(habitId: string) {
    await fetch('/api/habits', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ habitId, done: true }) });
    refresh();
  }
  return (
    <div className='max-w-lg'>
      <h1 className='text-2xl font-bold mb-3'>Habits</h1>
      <div className='flex gap-2 mb-4'>
        <input className='flex-1 border p-2 rounded' placeholder='Add a habit (e.g., 10k steps)' value={name} onChange={e => setName(e.target.value)} />
        <button className='px-3 py-2 rounded bg-black text-white' onClick={addHabit}>Add</button>
      </div>
      <ul className='space-y-2'>
        {habits.map(h => (
          <li key={h.id} className='flex items-center gap-3 border rounded p-2'>
            <input type='checkbox' onChange={() => toggle(h.id)} checked={h.logs?.[0]?.done ?? false} />
            <div className='font-medium'>{h.name}</div>
            <div className='text-xs text-neutral-500 ml-auto'>{h.frequency}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
