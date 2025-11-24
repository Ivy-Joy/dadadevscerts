import './globals.css';
import Image from 'next/image';
import Link from "next/link";
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = { 
  title: 'Dada Devs Certificates' 
};

export default function RootLayout({ 
  children,
}: { 
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image 
                src="/certs/DadaDevsLogo.png" 
                alt="Dada Devs Logo" 
                width={40} 
                height={40}
                priority 
              />
              <h1 className="font-bold text-xl" style={{ color: '#F16522' }}>
                Dada Devs
              </h1>
            </div>

            <div className="flex gap-4">
              <Link className="text-sm" href="/admin">Admin</Link>
              <Link className="text-sm" href="/issue">Issue</Link>
              <Link className="text-sm" href="/verify">Verify</Link>
            </div>
            
          </div>
        </header>

        <main className="max-w-5xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
