"use client";
import dynamic from 'next/dynamic';
const Dashboard = dynamic(() => import('../../components/Dashboard'), { ssr: false });
export default function AdminPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold" style={{color:'#F16522'}}>Admin Dashboard</h2>
      <p className="text-gray-600 mt-1">List and revoke certificates</p>
      <div className="mt-6"><Dashboard /></div>
    </div>
  );
}
