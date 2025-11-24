import Link from "next/link";

export default function Home() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold" style={{ color: "#F16522" }}>
        Dada Devs Certificate System
      </h2>

      <p className="mt-2 text-gray-600">
        Issue and verify tamper-proof certificates.
      </p>

      <div className="mt-6 space-x-3 flex">
        <Link href="/issue" className="px-4 py-2 bg-dada text-white rounded">
          Issue
        </Link>

        <Link href="/verify" className="px-4 py-2 border rounded">
          Verify
        </Link>

        <Link href="/admin" className="px-4 py-2 border rounded">
          Admin
        </Link>
      </div>
    </div>
  );
}
