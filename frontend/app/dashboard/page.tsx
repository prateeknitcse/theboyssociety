"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchTodayBirthday } from "@/lib/api";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const result = await fetchTodayBirthday();
      setData(result);
      setLoading(false);
    }
    load();
  }, []);

  const handlePayNow = async () => {
    await fetch("http://localhost:5000/api/contribution/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        birthdayId: data.birthdayId,
        amount: data.birthday.amount,
      }),
    });

    window.location.reload();
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  if (!data.hasBirthday) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        {data.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <motion.h1 className="text-4xl font-bold mb-6">
          🎉 {data.birthday.name}’s Birthday
        </motion.h1>

        <div className="glass p-6 mb-8">
          <p>Amount: ₹{data.birthday.amount}</p>
          <p className="mt-2">
            Status:{" "}
            <span
              className={
                data.myStatus === "paid"
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              {data.myStatus}
            </span>
          </p>

          <button
            disabled={data.myStatus === "paid"}
            onClick={handlePayNow}
            className="mt-4 px-6 py-2 bg-green-600 rounded disabled:opacity-50"
          >
            {data.myStatus === "paid" ? "Paid ✔" : "Pay Now"}
          </button>
        </div>

        <div className="glass p-6">
          <h2 className="text-xl mb-4">Contributions</h2>
          {data.contributions.map((c: any, i: number) => (
            <div
              key={i}
              className="flex justify-between border-b border-gray-700 py-2"
            >
              <span>{c.user}</span>
              <span
                className={
                  c.status === "paid"
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
