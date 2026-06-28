"use client";

import { motion } from "framer-motion";
import { CeremonyStep } from "../../type";

interface CeremonyCardProps {
  step: CeremonyStep;
  isActive: boolean;
  isLast: boolean;
  onClick: () => void;
}

export default function CeremonyCard({ step, isActive, isLast, onClick }: CeremonyCardProps) {
  return (
    <div className="flex gap-5">
      {/* Left: Step node + connector line */}
      <div className="flex flex-col items-center">
        <motion.button
          onClick={onClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold text-sm font-serif border-2 cursor-pointer transition-all duration-300 shrink-0 ${
            isActive
              ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/25"
              : "bg-white border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-500"
          }`}
        >
          {step.stepNumber}
        </motion.button>
        {!isLast && (
          <div className={`w-0.5 mt-1 flex-1 min-h-[2.5rem] rounded-full transition-colors duration-500 ${isActive ? "bg-blue-200" : "bg-slate-100"}`} />
        )}
      </div>

      {/* Right: Step label */}
      <button
        onClick={onClick}
        className={`pb-8 text-left flex-1 cursor-pointer group outline-none`}
      >
        <span className={`block text-xs font-bold uppercase tracking-widest mb-1 transition-colors ${isActive ? "text-blue-500" : "text-slate-400 group-hover:text-slate-600"}`}>
          Langkah {step.stepNumber}
        </span>
        <span className={`font-serif font-extrabold text-base md:text-lg transition-colors ${isActive ? "text-slate-800" : "text-slate-500 group-hover:text-slate-700"}`}>
          {step.name}
        </span>
        <p className={`text-sm mt-1 leading-relaxed transition-colors ${isActive ? "text-slate-500" : "text-slate-400"}`}>
          {step.description.split(".")[0]}.
        </p>
      </button>
    </div>
  );
}
