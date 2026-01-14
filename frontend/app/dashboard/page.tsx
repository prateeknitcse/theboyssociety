"use client";

import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchTodayBirthday } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 🔐 ROUTE PROTECTION
  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    async function load() {
      const result = await fetchTodayBirthday();
      setData(result);
      setLoading(false);
    }
    load();
  }, []);

  const handlePayNow = async () => {
    const orderRes = await fetch(
      "http://localhost:5000/api/payment/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ amount: data.birthday.amount }),
      }
    );

    const order = await orderRes.json();

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: order.amount,
      currency: "INR",
      name: "Boys Society",
      order_id: order.id,
      handler: async () => {
        await fetch(
          "http://localhost:5000/api/contribution/pay",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              birthdayId: data.birthdayId,
              amount: data.birthday.amount,
            }),
          }
        );
        window.location.reload();
      },
    };

    // @ts-ignore
    new window.Razorpay(options).open();
  };

  // ✅ STEP 4.6 — CERTIFICATE DOWNLOAD HANDLER (NEW)
  const handleDownloadCertificate = async () => {
    const res = await fetch(
      "http://localhost:5000/api/certificate/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: "Member", // backend-safe placeholder
          amount: data.birthday.amount,
          purpose: `${data.birthday.name}'s Birthday`,
        }),
      }
    );

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "certificate.pdf";
    a.click();
    window.URL.revokeObjectURL(url);
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

          {/* ✅ STEP 4.6 — DOWNLOAD CERTIFICATE BUTTON (NEW) */}
          <button
            disabled={data.myStatus !== "paid"}
            onClick={handleDownloadCertificate}
            className="mt-4 ml-4 px-6 py-2 bg-blue-600 rounded disabled:opacity-50"
          >
            Download Certificate
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
