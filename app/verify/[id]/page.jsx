"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function VerifyPage() {
  const params = useParams(); // from next/navigation
  const id = params.id;
  const [res, setRes] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/verify/${id}`)
      .then(r => r.json())
      .then(setRes)
      .catch(() => setRes({ valid: false, reason: "network" }));
  }, [id]);

  if (!res) return <div>Checking...</div>;

  return (
    <div>
      {res.valid ? (
        <div className="p-4 bg-green-50 rounded">
          <h3 className="text-xl text-green-700">VALID</h3>
          <p>{res.cert.name} - {res.cert.cohort}</p>
          <a className="text-dada underline" href={res.pdfUrl}>Open PDF</a>
        </div>
      ) : (
        <div className="p-4 bg-red-50 rounded">
          <h3 className="text-xl text-red-700">NOT VALID</h3>
          <p>Reason: {res.reason}</p>
        </div>
      )}
      <pre className="mt-4 bg-gray-50 p-3 rounded">{JSON.stringify(res,null,2)}</pre>
    </div>
  );
}
