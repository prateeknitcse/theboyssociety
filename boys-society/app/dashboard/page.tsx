"use client";

import { motion } from "framer-motion";

const announcements = [
  {
    title: "🎉 Birthday Today",
    description: "Rahul’s birthday today. Contribution: ₹100",
    type: "birthday",
  },
  {
    title: "🧳 Upcoming Trip",
    description: "Manali Trip – Contribute ₹2000",
    type: "trip",
  },
  {
    title: "📢 Notice",
    description: "Meeting tonight at 9 PM",
    type: "notice",
  },
];

const typeStyles: any = {
  birthday: "from-pink-500 to-red-500",
  trip: "from-blue-500 to-cyan-500",
  notice: "from-gray-500 to-gray-700",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Container */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-12"
        >
          Welcome, Brother 👋
        </motion.h1>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {announcements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  {item.title}
                </h2>
                <p className="text-gray-300 text-sm">
                  {item.description}
                </p>
              </div>

              {item.type !== "notice" && (
                <button
                  className={`
                    mt-6 py-2 rounded-lg text-sm font-semibold
                    bg-gradient-to-r ${typeStyles[item.type]}
                    hover:scale-105 transition
                  `}
                >
                  Contribute
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
