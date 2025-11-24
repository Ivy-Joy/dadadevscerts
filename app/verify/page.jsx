"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VerifyLanding() {
  const [id, setId] = useState('');
  const router = useRouter();
  return (
    <div>
      <h2 className="text-2xl font-bold">Verify Certificate</h2>
      <div className="mt-4">
        <input value={id} onChange={e=>setId(e.target.value)} placeholder="Paste certificate id" className="p-3 border rounded w-full"/>
        <button onClick={()=>router.push(`/verify/${id}`)} className="mt-3 px-4 py-2 bg-dada text-white rounded">Verify</button>
      </div>
    </div>
  );
}
