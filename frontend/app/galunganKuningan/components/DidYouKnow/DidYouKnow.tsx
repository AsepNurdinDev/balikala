"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CULTURAL_FACTS } from "../../data/facts";
import { HelpCircle, ChevronRight, BookOpen, Quote } from "lucide-react";

export default function DidYouKnow() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const activeFact = CULTURAL_FACTS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CULTURAL_FACTS.length);
  };

  return (
    <section
      id="did-you-know-section"
      className="py-20 bg-[#F8F5F0] border-b border-stone-200/50 relative overflow-hidden"
    >
      {/* Decorative SVG Circles */}
      <div className="absolute top-0 right-0 w-80 h-80 opacity-[0.03] translate-x-20 -translate-y-20 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" stroke="#8B5E3C" strokeWidth="1">
          <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="35" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-80 h-80 opacity-[0.03] -translate-x-20 translate-y-20 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" stroke="#8B5E3C" strokeWidth="1">
          <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="35" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#8B5E3C] bg-[#8B5E3C]/10">
            Did You Know?
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-serif font-extrabold text-[#2D2D2D] tracking-tight">
            Tahukah Anda? Fakta Budaya
          </h2>
          <p className="mt-3 text-stone-500 text-sm max-w-xl mx-auto leading-relaxed">
            Perluas wawasan Anda mengenai makna tersembunyi di balik ritual Galungan & Kuningan dengan membaca fakta-fakta budaya terverifikasi berikut.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="bg-white border border-stone-200/60 rounded-[2.5rem] p-6 md:p-10 shadow-medium relative overflow-hidden flex flex-col justify-between min-h-[380px]"
            >
              {/* Background watermark quote */}
              <div className="absolute right-6 top-6 text-stone-100 pointer-events-none">
                <Quote size={120} className="opacity-40" />
              </div>

              <div className="space-y-6 relative z-10">
                {/* Fact Index Tracker */}
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#8B5E3C] bg-[#8B5E3C]/5 border border-stone-200 px-3 py-1 rounded-full">
                    Fakta {currentIndex + 1} dari {CULTURAL_FACTS.length}
                  </span>
                  <HelpCircle className="w-5 h-5 text-[#C89B3C]" />
                </div>

                {/* Question */}
                <h3 className="text-xl md:text-2xl font-serif font-black text-stone-850 leading-tight">
                  {activeFact.question}
                </h3>

                {/* Answer Summary Card */}
                <div className="bg-[#F8F5F0] p-4 rounded-xl border border-stone-250/20">
                  <p className="text-xs md:text-sm font-bold text-[#8B5E3C] leading-relaxed">
                    👉 {activeFact.answer}
                  </p>
                </div>

                {/* Detailed Explanation */}
                <div className="space-y-2">
                  <h4 className="text-[10px] uppercase font-bold text-stone-400 tracking-wider flex items-center gap-1.5">
                    <BookOpen size={12} className="text-[#8B5E3C]" /> Penjelasan Mendalam
                  </h4>
                  <p className="text-xs md:text-sm text-stone-600 leading-relaxed text-justify">
                    {activeFact.explanation}
                  </p>
                </div>
              </div>

              {/* Card Footer: Source & Button */}
              <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
                <span className="text-[10px] font-bold text-stone-400 tracking-wide">
                  Sumber Kajian: {activeFact.source}
                </span>

                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 bg-[#8B5E3C] hover:bg-[#724D31] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-soft hover:shadow transition duration-200 active:scale-95 cursor-pointer group"
                >
                  Fakta Berikutnya
                  <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </button>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
