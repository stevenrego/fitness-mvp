'use client';
import { useEffect, useState } from 'react';
type Exercise = { id: string; name: string };
export default function LogWorkoutPage() {
  const [exList, setExList] = useState<Exercise[]>([]);
  const [sets, setSets] = useState<{ exerciseId: string; setNumber: number; reps: number; weight?: number }[]>([]);
  useEffect(() => {
    fetch('/api/workouts').then(r => r.json()).then((tpls) => {
      const unique: Record<string, Exercise> = {};
      for (const t of tpls) for (const it of t.items) unique[it.exercise.id] = { id: it.exercise.id, name: it.exercise.name };
      const arr = Object.values(unique);
      setExList(arr.length ? arr : [{ id: 'pushup', name: 'Push Up' },{ id: 'squat', name: 'Bodyweight Squat' },{ id: 'plank', name: 'Plank' }]);
    });
  }, []);
  function addSet() { setSets(s => [...s, { exerciseId: exList[0]?.id ?? 'pushup', setNumber: s.length + 1, reps: 10 }]); }
  async function save() {
    const res = await fetch('/api/workout-sessions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sets }) });
    if (res.ok) { alert('Saved!'); setSets([]); } else alert('Failed');
  }
  return (
    <div className='max-w-xl'>
      <h1 className='text-2xl font-bold mb-3'>Log a workout</h1>
      <button className='mb-3 px-3 py-2 rounded bg-black text-white' onClick={addSet}>Add Set</button>
      <div className='space-y-2'>
        {sets.map((s, i) => (
          <div key={i} className='grid grid-cols-12 gap-2 items-center'>
            <select className='col-span-5 border p-2 rounded' value={s.exerciseId} onChange={e => setSets(arr => arr.map((x, idx) => idx === i ? { ...x, exerciseId: e.target.value } : x))}>
              {exList.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
            </select>
            <input className='col-span-2 border p-2 rounded' type='number' value={s.setNumber} onChange={e => setSets(arr => arr.map((x, idx) => idx === i ? { ...x, setNumber: Number(e.target.value) } : x))} />
            <input className='col-span-2 border p-2 rounded' type='number' placeholder='Reps' value={s.reps} onChange={e => setSets(arr => arr.map((x, idx) => idx === i ? { ...x, reps: Number(e.target.value) } : x))} />
            <input className='col-span-2 border p-2 rounded' type='number' placeholder='Weight' value={s.weight ?? 0} onChange={e => setSets(arr => arr.map((x, idx) => idx === i ? { ...x, weight: Number(e.target.value) } : x))} />
            <button className='col-span-1 text-sm text-red-600' onClick={() => setSets(arr => arr.filter((_, idx) => idx !== i))}>X</button>
          </div>
        ))}
      </div>
      <button className='mt-4 px-3 py-2 rounded bg-black text-white' onClick={save}>Save Session</button>
    </div>
  );
}
