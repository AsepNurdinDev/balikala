"use client";

import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-white">
      {/* Light blue glowing orb */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[-10%] w-[80vw] md:w-[50vw] h-[80vw] md:h-[50vw] rounded-full bg-blue-100/40 blur-[80px] md:blur-[120px]"
      />

      {/* Warm gold glowing orb */}
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[90vw] md:w-[60vw] h-[90vw] md:h-[60vw] rounded-full bg-amber-100/30 blur-[100px] md:blur-[150px]"
      />

      {/* Subtle center blue accent */}
      <div className="absolute top-[20%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-blue-50/20 blur-[80px]" />
    </div>
  );
}
