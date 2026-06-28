"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ceremonySteps } from "../../data/ceremony";
import CeremonyCard from "./CeremonyCard";
import CeremonyDetail from "./CeremonyDetail";
import { Scroll } from "lucide-react";

export default function CeremonyTimeline() {
  const [activeStepId, setActiveStepId] = useState<string>(ceremonySteps[0].id);
  const activeStep = ceremonySteps.find((s) => s.id === activeStepId)!;

  return (
    <section
      id="ceremony-section"
      className="py-24 bg-[#F8FAFC] relative overflow-hidden px-6 lg:px-8 border-t border-slate-100 scroll-mt-12"
    >
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-blue-600 text-xs md:text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-1.5">
            <Scroll className="w-4 h-4" />
            Rangkaian Upacara
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 leading-tight">
            Prosesi Hari Raya Saraswati
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
            Klik setiap langkah untuk memahami rangkaian ritual yang dilaksanakan selama Hari Raya Saraswati.
          </p>
        </div>

        {/* Two-column layout: timeline | detail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left: Clickable Timeline */}
          <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-7 shadow-xs">
            <h3 className="font-serif font-bold text-slate-700 text-base mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
              Pilih Tahapan Upacara
            </h3>
            <div className="space-y-0">
              {ceremonySteps.map((step, idx) => (
                <CeremonyCard
                  key={step.id}
                  step={step}
                  isActive={activeStepId === step.id}
                  isLast={idx === ceremonySteps.length - 1}
                  onClick={() => setActiveStepId(step.id)}
                />
              ))}
            </div>
          </div>

          {/* Right: Step Detail Panel */}
          <div className="lg:col-span-7">
            <CeremonyDetail step={activeStep} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
