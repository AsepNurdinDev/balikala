"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { symbolsData } from "../../data/symbols";

interface SymbolMenuProps {
  activeSymbolId: string | null;
  exploredSymbols: string[];
  onSelect: (id: string) => void;
}

export default function SymbolMenu({ activeSymbolId, exploredSymbols, onSelect }: SymbolMenuProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 px-2">
        Kenali Simbol
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2.5">
        {symbolsData.map((symbol) => {
          const isActive = activeSymbolId === symbol.id;
          const isExplored = exploredSymbols.includes(symbol.id);

          return (
            <motion.button
              key={symbol.id}
              onClick={() => onSelect(symbol.id)}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full text-left px-4 py-3.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/10 font-bold"
                  : "bg-white border border-slate-100 text-slate-650 hover:bg-slate-50 font-semibold"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg leading-none select-none">{symbol.emoji}</span>
                <span className="text-sm truncate">{symbol.name}</span>
              </div>
              
              {/* Explorer Check Circle */}
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center border transition shrink-0 ${
                  isActive
                    ? "border-white/50 bg-white/20 text-white"
                    : isExplored
                    ? "border-blue-200 bg-blue-50 text-blue-600"
                    : "border-slate-200 bg-slate-50 text-transparent"
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3px]" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
