"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="h-full w-full bg-black flex items-center justify-center">
     <div className="h-full w-full bg-black flex items-center justify-center px-4">
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="glass p-8"
  >

          <h2 className="text-3xl font-bold text-center mb-8">
            Member Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Email / ID
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email or ID"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 font-semibold"
            >
              Login
            </motion.button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-8">
            Private society · Authorized members only
          </p>
        </motion.div>
      </div>
    </div>
  );
}
