"use client";
import { motion } from "framer-motion";

export default function AnimatedButton({ text, onClick }: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-lg font-bold shadow-xl"
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
}
