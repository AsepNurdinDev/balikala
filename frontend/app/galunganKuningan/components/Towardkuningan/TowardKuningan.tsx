"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { JOURNEY_DATA, JourneyDay } from "../../data/journey";
import { CalendarDays, ChevronLeft, ChevronRight, BookOpen, MapPin } from "lucide-react";

export default function Towardkuningan() {
  const [activeDay, setActiveDay] = useState<number>(1);
  const stepperRef = useRef<HTMLDivElement>(null);

  const activeItem = JOURNEY_DATA.find((item) => item.dayNumber === activeDay) || JOURNEY_DATA[0];

  // Auto-scroll the active stepper node into view
  useEffect(() => {
    const activeNode = document.getElementById(`step-node-${activeDay}`);
    if (activeNode && stepperRef.current) {
      const container = stepperRef.current;
      const scrollLeft = activeNode.offsetLeft - container.offsetWidth / 2 + activeNode.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeDay]);

  const handleNext = () => {
    setActiveDay((prev) => Math.min(prev + 1, JOURNEY_DATA.length));
  };

  const handlePrev = () => {
    setActiveDay((prev) => Math.max(prev - 1, 1));
  };

  return (
    <section
      id="toward-kuningan-section"
      className="py-20 bg-white border-b border-stone-200/50"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center lg:text-left max-w-2xl mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#8B5E3C] bg-[#8B5E3C]/10">
            Fase Rangkaian 3
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-serif font-extrabold text-[#2D2D2D] tracking-tight">
            Menuju Kuningan: Perjalanan 10 Hari
          </h2>
          <p className="mt-3 text-stone-500 text-sm md:text-base leading-relaxed">
            Perjalanan spiritual tidak terputus setelah Galungan berakhir. Umat Hindu Bali melewati 10 hari transisi 
            untuk menyelaraskan diri kembali sebelum menyambut puncak perayaan Kuningan.
          </p>
        </div>

        {/* Journey Stepper Horizontal Track */}
        <div className="relative mb-10 group/stepper">
          
          {/* Stepper Navigation buttons */}
          <div className="flex justify-between items-center mb-4 md:absolute md:inset-y-0 md:-left-4 md:-right-4 md:mb-0 md:pointer-events-none z-20">
            <button
              onClick={handlePrev}
              disabled={activeDay === 1}
              className={`p-2.5 rounded-full border bg-white shadow-soft text-stone-600 hover:text-[#8B5E3C] hover:scale-105 active:scale-95 transition md:pointer-events-auto cursor-pointer disabled:opacity-30 disabled:pointer-events-none`}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              disabled={activeDay === JOURNEY_DATA.length}
              className={`p-2.5 rounded-full border bg-white shadow-soft text-stone-600 hover:text-[#8B5E3C] hover:scale-105 active:scale-95 transition md:pointer-events-auto cursor-pointer disabled:opacity-30 disabled:pointer-events-none`}
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Scrolling Node Container */}
          <div
            ref={stepperRef}
            className="flex items-center gap-4 overflow-x-auto scrollbar-hide py-4 px-8 snap-x relative z-10"
          >
            {/* Background Connective Line */}
            <div className="absolute top-[38px] left-[5%] right-[5%] h-0.5 bg-stone-100 z-0 pointer-events-none" />

            {JOURNEY_DATA.map((item) => {
              const isActive = item.dayNumber === activeDay;
              const isPassed = item.dayNumber < activeDay;

              return (
                <div
                  key={item.dayNumber}
                  id={`step-node-${item.dayNumber}`}
                  className="snap-center shrink-0 flex flex-col items-center"
                >
                  <button
                    onClick={() => setActiveDay(item.dayNumber)}
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all duration-300 relative z-10 cursor-pointer focus:outline-none ${
                      isActive
                        ? "bg-[#8B5E3C] border-[#8B5E3C] text-white ring-4 ring-[#8B5E3C]/10 scale-110 shadow-medium"
                        : isPassed
                        ? "bg-white border-[#8B5E3C] text-[#8B5E3C] hover:bg-stone-50"
                        : "bg-white border-stone-250 text-stone-400 hover:border-stone-300"
                    }`}
                  >
                    H{item.dayNumber}
                  </button>
                  <span
                    className={`text-[9px] uppercase tracking-wider font-extrabold mt-2 transition-colors ${
                      isActive ? "text-[#8B5E3C]" : "text-stone-400"
                    }`}
                  >
                    Hari {item.dayNumber}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

        {/* Stepper Details Panel */}
        <div className="bg-[#F8F5F0]/60 border border-stone-200/50 rounded-3xl p-6 md:p-8 min-h-[380px] shadow-soft flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch h-full"
            >
              
              {/* Stepper Panel Left: Information & Activities */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-[#8B5E3C] bg-white border border-stone-200 px-3 py-1 rounded-full">
                      Hari ke-{activeItem.dayNumber}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-stone-500 font-bold">
                      <CalendarDays size={13} className="text-[#C89B3C]" />
                      <span>{activeItem.balineseDay}</span>
                    </div>
                  </div>

                  <h3 className="mt-4 text-2xl md:text-3xl font-serif font-black text-[#2D2D2D]">
                    {activeItem.name}
                  </h3>

                  <p className="mt-4 text-stone-600 text-xs md:text-sm font-medium leading-relaxed">
                    {activeItem.activity}
                  </p>
                </div>

                <div className="p-4 bg-white border border-stone-200/40 rounded-xl shadow-xs">
                  <h4 className="text-[10px] uppercase font-bold text-stone-400 tracking-wider flex items-center gap-1.5">
                    <BookOpen size={12} className="text-[#8B5E3C]" /> Nilai Refleksi
                  </h4>
                  <p className="mt-1 text-stone-600 text-xs leading-relaxed italic">
                    {activeItem.philosophy}
                  </p>
                </div>
              </div>

              {/* Stepper Panel Right: Regional Adat Variations (Desa Kala Patra) */}
              <div className="md:col-span-5 flex flex-col justify-center bg-white/70 border border-stone-250/20 p-6 rounded-2xl">
                <div className="flex items-start gap-2.5 text-stone-500 font-medium leading-relaxed">
                  <MapPin size={16} className="text-[#C89B3C] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[10px] uppercase font-extrabold text-stone-400 tracking-wider">
                      Tradisi Setempat (Desa Kala Patra)
                    </h4>
                    <p className="mt-2 text-stone-600 text-xs leading-relaxed">
                      {activeItem.culturalNote}
                    </p>
                    <p className="mt-2.5 text-stone-400 text-[10px] leading-relaxed">
                      *Tata upacara dan tradisi harian dapat mengalami sedikit penyesuaian bergantung pada aturan adat desa (awig-awig) masing-masing wilayah di Bali.
                    </p>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
