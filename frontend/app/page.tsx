"use client";
import { motion } from "framer-motion";
import AnimatedButton from "@/components/AnimatedButton";
import ParticlesBg from "@/components/ParticlesBg";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <ParticlesBg />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 text-center glass p-10 max-w-xl"
      >
        <h1 className="text-5xl font-extrabold mb-4">
          THE BOYS SOCIETY
        </h1>

        <p className="text-gray-300 mb-8">
          A private brotherhood. Trips. Birthdays. Memories.
        </p>

        <div className="flex gap-6 justify-center">
          <AnimatedButton
            text="Login"
            onClick={() => router.push("/login")}
          />
          <AnimatedButton
            text="Join Society"
            onClick={() => alert("❌ No positions available")}
          />
        </div>
      </motion.div>
    </div>
  );
}
