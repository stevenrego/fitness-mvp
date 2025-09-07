'use client';
import { useEffect, useState } from 'react';
export default function NutritionPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [entry, setEntry] = useState({ meal: 'breakfast', calories: 0, protein: 0, carbs: 0, fat: 0 });
  useEffect(() => { fetch('/api/nutrition').then(r => r.json()).then(setRows); }, []);
  async function add() {
    await fetch('/api/nutrition', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(entry) });
    setEntry({ meal: 'breakfast', calories: 0, protein: 0, carbs: 0, fat: 0 });
    const updated = await fetch('/api/nutrition').then(r => r.json());
    setRows(updated);
  }
  return (
    <div className='max-w-2xl'>
      <h1 className='text-2xl font-bold mb-3'>Nutrition</h1>
      <div className='grid grid-cols-6 gap-2 mb-3'>
        <select className='border p-2 rounded' value={entry.meal} onChange={e => setEntry({ ...entry, meal: e.target.value })}>
          <option>breakfast</option><option>lunch</option><option>dinner</option><option>snack</option>
        </select>
        <input className='border p-2 rounded' type='number' placeholder='Calories' value={entry.calories} onChange={e => setEntry({ ...entry, calories: Number(e.target.value) })} />
        <input className='border p-2 rounded' type='number' placeholder='Protein' value={entry.protein} onChange={e => setEntry({ ...entry, protein: Number(e.target.value) })} />
        <input className='border p-2 rounded' type='number' placeholder='Carbs' value={entry.carbs} onChange={e => setEntry({ ...entry, carbs: Number(e.target.value) })} />
        <input className='border p-2 rounded' type='number' placeholder='Fat' value={entry.fat} onChange={e => setEntry({ ...entry, fat: Number(e.target.value) })} />
        <button className='px-3 py-2 rounded bg-black text-white' onClick={add}>Add</button>
      </div>
      <table className='w-full border'>
        <thead className='bg-neutral-100'><tr><th className='p-2 text-left'>Date</th><th>Meal</th><th>Calories</th><th>P</th><th>C</th><th>F</th></tr></thead>
        <tbody>
          {rows.map((r: any) => (
            <tr key={r.id} className='border-t'><td className='p-2'>{new Date(r.date).toLocaleString()}</td><td className='text-center'>{r.meal}</td><td className='text-center'>{r.calories}</td><td className='text-center'>{r.protein}</td><td className='text-center'>{r.carbs}</td><td className='text-center'>{r.fat}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
