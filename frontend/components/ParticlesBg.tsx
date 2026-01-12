"use client";

import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
import { useEffect, useState } from "react";

export default function ParticlesBg() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    loadSlim().then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      options={{
        fullScreen: { enable: true },
        particles: {
          number: { value: 60 },
          color: { value: "#ffffff" },
          opacity: { value: 0.15 },
          size: { value: 2 },
          move: { enable: true, speed: 0.6 },
        },
      }}
    />
  );
}
