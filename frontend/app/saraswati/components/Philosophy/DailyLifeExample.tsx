"use client";

import { motion } from "framer-motion";
import { PhilosophyValue } from "../../type";
import { ArrowRight } from "lucide-react";

interface DailyLifeExampleProps {
  value: PhilosophyValue;
}

export default function DailyLifeExample({ value }: DailyLifeExampleProps) {
  return (
    <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 flex items-start gap-4">
      <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
        <ArrowRight className="w-4 h-4 text-white" />
      </div>
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
          Penerapan Sehari-hari
        </span>
        <p className="text-sm text-slate-700 font-semibold leading-relaxed">{value.example}</p>
      </div>
    </div>
  );
}
