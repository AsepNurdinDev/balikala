"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface FortressProgressProps {
  clickedCount: number;
}

export default function FortressProgress({ clickedCount }: FortressProgressProps) {
  const percentage = clickedCount * 25; // 0, 25, 50, 75, 100
  const isComplete = clickedCount === 4;

  return (
    <div className="w-full space-y-4">
      {/* Label and Percentage */}
      <div className="flex justify-between items-center text-xs md:text-sm font-semibold tracking-wide">
        <span className="text-stone-500 uppercase">Progres Pemahaman</span>
        <span className="text-primary font-bold">{percentage}%</span>
      </div>

      {/* Progress Track */}
      <div className="relative w-full h-3 bg-stone-200/50 rounded-full overflow-hidden border border-stone-300/10 shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_10px_rgba(200,155,60,0.3)]"
        />
      </div>

      {/* Success Message Banner */}
      <div className="min-h-[50px] flex items-center justify-center">
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="flex items-center gap-3 bg-secondary/10 border border-secondary/20 text-primary py-2.5 px-6 rounded-2xl w-full justify-center shadow-sm"
          >
            <div className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center shadow-sm shrink-0">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <span className="font-bold text-xs md:text-sm tracking-wide">
              Selamat! Anda telah memahami seluruh pilar Benteng Diri.
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
