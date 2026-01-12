"use client";

import { motion } from "framer-motion";
import { useState } from "react";

/* 🔐 Logged-in user (mock) */
const currentUser = {
  id: "u2",
  name: "Amit",
};

/* 🎂 Birthday person */
const birthdayPerson = {
  id: "u1",
  name: "Rahul",
};

/* 👥 Group members & payment status */
const members = [
  { id: "u1", name: "Rahul", paid: false },
  { id: "u2", name: "Amit", paid: true },
  { id: "u3", name: "Rohit", paid: false },
  { id: "u4", name: "Suresh", paid: true },
];

export default function DashboardPage() {
  const [payments, setPayments] = useState(members);

  const handlePay = () => {
    setPayments((prev) =>
      prev.map((m) =>
        m.id === currentUser.id ? { ...m, paid: true } : m
      )
    );
  };

  const isBirthdayBoy = currentUser.id === birthdayPerson.id;
  const hasPaid = payments.find(
    (m) => m.id === currentUser.id
  )?.paid;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-10"
        >
          Welcome, {currentUser.name} 👋
        </motion.h1>

        {/* 🎂 Birthday Card (Hidden for Birthday Boy) */}
        {!isBirthdayBoy && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-6 mb-10"
          >
            <h2 className="text-2xl font-semibold mb-2">
              🎉 {birthdayPerson.name}’s Birthday
            </h2>
            <p className="text-gray-300 mb-4">
              Contribution Amount: ₹100
            </p>

            {/* Pay Button or Paid Tick */}
            {!hasPaid ? (
              <button
                onClick={handlePay}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 font-semibold"
              >
                Pay ₹100
              </button>
            ) : (
              <span className="text-green-400 font-semibold">
                ✔ You have paid
              </span>
            )}
          </motion.div>
        )}

        {/* 👥 Payment Status List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass p-6"
        >
          <h3 className="text-xl font-semibold mb-4">
            Birthday Contributions
          </h3>

          <ul className="space-y-3">
            {payments.map((member) => (
              <li
                key={member.id}
                className="flex justify-between items-center border-b border-gray-700 pb-2"
              >
                <span>{member.name}</span>

                {member.paid ? (
                  <span className="text-green-400">✔ Paid</span>
                ) : member.id === birthdayPerson.id ? (
                  <span className="text-gray-500">
                    Birthday Boy 🎂
                  </span>
                ) : (
                  <span className="text-red-400">✖ Not Paid</span>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
