import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [list, setList] = useState([]);
  useEffect(()=>{ fetch('/api/list').then(r=>r.json()).then(setList); }, []);
  async function revoke(id) {
    const apiKey = prompt('Enter admin API key:');
    if (!apiKey) return;
    await fetch(`/api/revoke/${id}`, { method: 'POST', headers: { 'x-api-key': apiKey } });
    setList(list.map(i => i.id===id ? {...i, revoked:true} : i));
  }
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Issued Certificates</h3>
      <table className="w-full text-left">
        <thead className="text-xs text-gray-500"><tr><th>ID</th><th>Name</th><th>Cohort</th><th>Revoked</th><th></th></tr></thead>
        <tbody>
          {list.map(row => (
            <tr key={row.id} className="border-t">
              <td className="py-2 text-xs font-mono">{row.id}</td>
              <td>{row.name}</td>
              <td>{row.cohort}</td>
              <td>{row.revoked ? 'Yes' : 'No'}</td>
              <td>
                {!row.revoked && <button onClick={()=>revoke(row.id)} className="text-sm text-red-600">Revoke</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
