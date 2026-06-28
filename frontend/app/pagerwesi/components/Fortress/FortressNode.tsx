"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";

interface FortressNodeProps {
  id: string;
  name: string;
  position: "top" | "bottom" | "left" | "right";
  isActive: boolean;
  isClicked: boolean;
  onClick: () => void;
}

export default function FortressNode({
  name,
  position,
  isActive,
  isClicked,
  onClick,
}: FortressNodeProps) {
  // Define absolute positioning classes based on layout positions around center shield
  const positionClasses = {
    top: "top-2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    bottom: "bottom-2 left-1/2 -translate-x-1/2 translate-y-1/2",
    left: "left-2 top-1/2 -translate-x-1/2 -translate-y-1/2",
    right: "right-2 top-1/2 translate-x-1/2 -translate-y-1/2",
  };

  return (
    <div className={`absolute ${positionClasses[position]} z-20`}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`relative flex flex-col items-center justify-center p-3 md:p-4 rounded-2xl border transition-all duration-500 cursor-pointer w-28 md:w-36 shadow-md ${
          isActive
            ? "bg-secondary text-white border-secondary shadow-[0_0_15px_rgba(200,155,60,0.5)]"
            : isClicked
            ? "bg-white text-secondary border-secondary/50 shadow-soft"
            : "bg-white text-stone-600 border-stone-200 hover:border-primary/50 shadow-soft"
        }`}
      >
        {/* Pulsing indicator for unvisited node */}
        {!isClicked && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary/80 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
          </span>
        )}

        <Shield
          className={`w-5 h-5 mb-1.5 ${
            isActive ? "text-white" : isClicked ? "text-secondary" : "text-stone-400"
          }`}
        />
        <span className="text-xs md:text-sm font-bold tracking-wide text-center leading-tight">
          {name}
        </span>
      </motion.button>
    </div>
  );
}
