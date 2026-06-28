"use client";

import { motion } from "framer-motion";
import { CeremonyStageData } from "../../types";
import { Check, Heart, Sparkles } from "lucide-react";

interface CeremonyContentProps {
  stage: CeremonyStageData;
}

export default function CeremonyContent({ stage }: CeremonyContentProps) {
  return (
    <motion.div
      key={stage.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-stone-200/40 rounded-3xl p-6 md:p-8 shadow-medium flex flex-col justify-between h-full min-h-[420px]"
    >
      <div className="space-y-6">
        {/* Stage Header */}
        <div>
          <span className="text-secondary text-xs font-bold tracking-widest uppercase mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Tahapan Ritual
          </span>
          <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-primary">
            {stage.subtitle}
          </h3>
          <p className="text-stone-500 text-sm md:text-base leading-relaxed mt-2">
            {stage.description}
          </p>
        </div>

        {/* Steps List */}
        <div className="space-y-3">
          <h4 className="text-stone-800 font-bold text-sm md:text-base">Aktivitas Utama:</h4>
          <ul className="space-y-3 pl-1">
            {stage.details.map((detail, index) => (
              <li key={index} className="flex gap-3 items-start text-stone-600 text-sm md:text-base">
                <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="leading-relaxed">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Grid footer for Banten and Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-stone-100 mt-8">
        {/* Offerings */}
        <div className="space-y-2">
          <h5 className="text-stone-800 font-bold text-xs md:text-sm uppercase tracking-wider">
            Banten / Sarana
          </h5>
          <div className="flex flex-wrap gap-2">
            {stage.offerings.map((item, idx) => (
              <span
                key={idx}
                className="bg-stone-50 text-stone-600 text-xs font-medium px-3 py-1.5 rounded-lg border border-stone-200/50"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="space-y-2">
          <h5 className="text-stone-800 font-bold text-xs md:text-sm uppercase tracking-wider flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-accent fill-accent/10" />
            Nilai Spiritual
          </h5>
          <div className="flex flex-wrap gap-2">
            {stage.values.map((val, idx) => (
              <span
                key={idx}
                className="bg-secondary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-lg border border-secondary/20"
              >
                {val}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
