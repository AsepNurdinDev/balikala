"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SymbolData } from "../../type";

interface SymbolCardProps {
  symbol: SymbolData;
  isActive: boolean;
  isExplored: boolean;
  onClick: () => void;
}

export default function SymbolCard({ symbol, isActive, isExplored, onClick }: SymbolCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.96 }}
      className={`relative w-full flex flex-col items-center justify-center gap-2 p-5 rounded-3xl border text-center cursor-pointer transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-500 shadow-lg shadow-blue-500/20"
          : "bg-white text-slate-700 border-slate-100 hover:border-blue-100 hover:shadow-sm"
      }`}
    >
      {/* Explored checkmark badge */}
      {isExplored && (
        <div className={`absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center ${
          isActive ? "bg-white/20 text-white" : "bg-blue-50 border border-blue-200 text-blue-600"
        }`}>
          <Check className="w-3 h-3 stroke-[3px]" />
        </div>
      )}

      <span className="text-3xl select-none">{symbol.emoji}</span>
      <span className={`text-xs font-bold leading-tight ${isActive ? "text-white" : "text-slate-700"}`}>
        {symbol.name}
      </span>
    </motion.button>
  );
}
