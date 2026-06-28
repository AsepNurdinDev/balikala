"use client";

import { motion } from "framer-motion";
import { CeremonyStep } from "../../type";
import { CheckCircle } from "lucide-react";

interface CeremonyDetailProps {
  step: CeremonyStep;
}

export default function CeremonyDetail({ step }: CeremonyDetailProps) {
  return (
    <motion.div
      key={step.id}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white border border-slate-100 rounded-3xl p-7 md:p-8 shadow-xs h-full flex flex-col gap-6"
    >
      {/* Step Badge + Title */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-extrabold text-2xl shadow-md shadow-blue-500/20 shrink-0 font-serif">
          {step.stepNumber}
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-0.5">
            Langkah {step.stepNumber} dari 5
          </span>
          <h3 className="font-serif font-extrabold text-slate-800 text-xl md:text-2xl leading-tight">
            {step.name}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
        {step.description}
      </p>

      {/* Details list */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Rincian Prosesi</h4>
        <ul className="space-y-2.5">
          {step.details.map((detail, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
              <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
