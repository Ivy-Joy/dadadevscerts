"use client";
import { useState } from 'react';

export default function IssueForm() {
  const [name,setName] = useState('');
  const [cohort,setCohort] = useState('');
  const [email,setEmail] = useState('');
  const [res, setRes] = useState(null);
  const [loading,setLoading] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_ADMIN_API_KEY;
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setRes(null);
    try {
      const resp = await fetch('/api/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 
        'x-api-key': apiKey 
      },
        body: JSON.stringify({ name, cohort, email })
      });
      const data = await resp.json();
      setRes(data);
    } catch (err) { setRes({ error: 'Network error', err }); }
    setLoading(false);
  }

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow">
      <div className="grid grid-cols-1 gap-4">
        <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="p-3 border rounded"/>
        <input required value={cohort} onChange={e=>setCohort(e.target.value)} placeholder="Cohort" className="p-3 border rounded"/>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Recipient email (optional)" className="p-3 border rounded"/>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-dada text-white rounded" disabled={loading}>{loading?'Issuing...':'Issue'}</button>
        </div>
      </div>

      {res && <div className="mt-4 p-3 bg-gray-50 rounded"><pre>{JSON.stringify(res,null,2)}</pre>{res.pdfUrl && <a href={res.pdfUrl} className="text-dada underline">Open PDF</a>}</div>}
    </form>
  );
}
