"use client";

import { motion } from "framer-motion";
import { PhilosophyValue } from "../../type";
import { ArrowRight } from "lucide-react";

interface ValueCardProps {
  value: PhilosophyValue;
  index: number;
}

export default function ValueCard({ value, index }: ValueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="bg-white border border-slate-100 rounded-3xl p-7 shadow-xs hover:shadow-md transition-all flex flex-col gap-5"
    >
      {/* Top: Concept tag */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-500 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-full">
          {value.concept}
        </span>
        <span className="text-slate-200 font-serif text-2xl font-extrabold">
          0{index + 1}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-serif font-extrabold text-slate-800 text-xl md:text-2xl leading-tight">
        {value.title}
      </h3>

      {/* Description */}
      <p className="text-slate-500 text-sm leading-relaxed flex-1">
        {value.description}
      </p>

      {/* Divider */}
      <div className="border-t border-slate-50" />

      {/* Example — concise arrow flow */}
      <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
        <ArrowRight className="w-4 h-4 text-blue-500 shrink-0" />
        <span className="leading-snug">{value.example}</span>
      </div>
    </motion.div>
  );
}
