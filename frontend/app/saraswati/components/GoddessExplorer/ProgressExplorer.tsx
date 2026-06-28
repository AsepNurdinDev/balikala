"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";
import { symbolsData } from "../../data/symbols";

interface ProgressExplorerProps {
  exploredSymbols: string[];
  totalSymbols: number;
  isCompleted: boolean;
}

export default function ProgressExplorer({
  exploredSymbols,
  totalSymbols,
  isCompleted,
}: ProgressExplorerProps) {
  const percentage = Math.min(100, Math.max(0, (exploredSymbols.length / totalSymbols) * 100));

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs md:text-sm font-bold">
          <span className="text-slate-500 uppercase tracking-widest">Progress Eksplorasi</span>
          <span className="text-blue-650 font-extrabold">{exploredSymbols.length} / {totalSymbols} Simbol</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-blue-650 to-amber-400 rounded-full"
          />
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-2 gap-3">
        {symbolsData.map((symbol) => {
          const isChecked = exploredSymbols.includes(symbol.id);
          return (
            <div
              key={symbol.id}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-2xl border text-xs font-bold transition-all duration-300 ${
                isChecked
                  ? "bg-blue-50/40 border-blue-100/70 text-blue-750"
                  : "bg-slate-50/50 border-slate-100 text-slate-400"
              }`}
            >
              {isChecked ? (
                <CheckCircle2 className="w-4 h-4 text-blue-650 shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-slate-300 shrink-0" />
              )}
              <span className="truncate">{symbol.emoji} {symbol.name}</span>
            </div>
          );
        })}
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-4 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold text-center uppercase tracking-wider"
        >
          <span>🎉</span> Semua simbol telah dipelajari!
        </motion.div>
      )}
    </div>
  );
}
