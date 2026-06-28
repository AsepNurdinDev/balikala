"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CeremonyContent from "./CeremonyContent";
import { ceremonyStages } from "../../data";

export default function CeremonyTimeline() {
  const [activeStageId, setActiveStageId] = useState<string>("persiapan");

  const activeStage = ceremonyStages.find((stage) => stage.id === activeStageId) || ceremonyStages[0];

  return (
    <section
      id="ceremony-section"
      className="py-24 bg-[#F8F5F0] relative overflow-hidden px-6 lg:px-8 scroll-mt-12"
    >
      {/* Decorative details */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-secondary text-xs md:text-sm font-bold tracking-widest uppercase"
          >
            Alur Ritual
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary"
          >
            Rangkaian Hari Raya
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-stone-500 text-sm md:text-base leading-relaxed"
          >
            Hari Raya Pagerwesi berjalan melalui serangkaian tahapan sakral yang sistematis. Klik setiap tahapan untuk mengeksplorasi rangkaian upacara dan persiapannya.
          </motion.p>
        </div>

        {/* Timeline Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Timeline Steps */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative pl-8 md:pl-10 space-y-8 py-2">
              {/* Vertical connecting line */}
              <div className="absolute left-[15px] md:left-[19px] top-4 bottom-4 w-1 bg-stone-200 rounded-full z-0" />

              {/* Progress-colored tracking line */}
              {/* Calculate position height based on selection */}
              {/* 0 = 0%, 1 = 33%, 2 = 66%, 3 = 100% */}
              <div
                className="absolute left-[15px] md:left-[19px] top-4 w-1 bg-secondary rounded-full z-0 transition-all duration-500"
                style={{
                  height:
                    activeStageId === "persiapan"
                      ? "10%"
                      : activeStageId === "persembahyangan"
                      ? "40%"
                      : activeStageId === "persembahan"
                      ? "70%"
                      : "90%",
                }}
              />

              {ceremonyStages.map((stage) => {
                const isActive = activeStageId === stage.id;
                return (
                  <div
                    key={stage.id}
                    onClick={() => setActiveStageId(stage.id)}
                    className="relative group cursor-pointer"
                  >
                    {/* Node Dot */}
                    <div className="absolute -left-[30px] md:-left-[32px] top-1.5 z-10 flex items-center justify-center">
                      <div
                        className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                          isActive
                            ? "bg-secondary border-secondary scale-110 shadow-[0_0_8px_#C89B3C]"
                            : "bg-white border-stone-300 group-hover:border-primary"
                        }`}
                      >
                        {isActive && (
                          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        )}
                      </div>
                    </div>

                    {/* Step Title & Subtitle */}
                    <div
                      className={`p-4 md:p-5 rounded-2xl border transition-all duration-300 select-none ${
                        isActive
                          ? "bg-white border-stone-200 text-stone-800 shadow-md translate-x-2"
                          : "bg-transparent border-transparent text-stone-500 hover:text-stone-700 hover:translate-x-1"
                      }`}
                    >
                      <h4
                        className={`font-serif text-lg md:text-xl font-bold transition ${
                          isActive ? "text-primary" : ""
                        }`}
                      >
                        {stage.name}
                      </h4>
                      <p className="text-xs md:text-sm font-semibold tracking-wide text-stone-400 mt-0.5">
                        {stage.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Display Stage Details */}
          <div className="lg:col-span-7">
            <CeremonyContent stage={activeStage} />
          </div>
        </div>
      </div>
    </section>
  );
}
