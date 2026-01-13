"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchTodayBirthday } from "@/lib/api";

type Contribution = {
  user: string;
  status: "paid" | "pending";
  paidAt?: string | null;
};

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const result = await fetchTodayBirthday();
        setData(result);
      } catch (err) {
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  /* ⏳ Loading state */
  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center text-gray-400">
        Loading dashboard...
      </div>
    );
  }

  /* ❌ Error state */
  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  /* 🎈 No birthday OR birthday boy */
  if (!data?.hasBirthday) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400 text-lg">
          {data?.message || "No birthday today 🎈"}
        </p>
      </div>
    );
  }

  /* 🎂 Birthday exists */
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-10"
        >
          🎉 {data.birthday.name}’s Birthday
        </motion.h1>

        {/* Birthday Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-6 mb-8"
        >
          <p className="text-gray-300 mb-4">
            Contribution Amount: ₹{data.birthday.amount}
          </p>

          <p className="text-sm">
            Your Status:{" "}
            <span
              className={
                data.myStatus === "paid"
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              {data.myStatus === "paid" ? "✔ Paid" : "✖ Not Paid"}
            </span>
          </p>
        </motion.div>

        {/* Contributions List */}
        <div className="glass p-6">
          <h2 className="text-xl font-semibold mb-4">
            Contributions
          </h2>

          <ul className="space-y-3">
            {data.contributions.map(
              (c: Contribution, index: number) => (
                <li
                  key={index}
                  className="flex justify-between border-b border-gray-700 pb-2"
                >
                  <span>{c.user}</span>
                  <span
                    className={
                      c.status === "paid"
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {c.status === "paid"
                      ? "✔ Paid"
                      : "✖ Not Paid"}
                  </span>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
