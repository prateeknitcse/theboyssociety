"use client";

import { useEffect, useState } from "react";

export default function CertificatesPage() {
  const [certs, setCerts] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/certificate/my", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setCerts);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl mb-6">My Certificates</h1>

      {certs.map((c, i) => (
        <div
          key={i}
          className="glass p-4 mb-4 flex justify-between"
        >
          <div>
            <p>{c.purpose}</p>
            <p className="text-sm text-gray-400">
              ₹{c.amount} ·{" "}
              {new Date(c.createdAt).toDateString()}
            </p>
          </div>

          <button className="text-blue-400 underline">
            Download
          </button>
        </div>
      ))}
    </div>
  );
}
