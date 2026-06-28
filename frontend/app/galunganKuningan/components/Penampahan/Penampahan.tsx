"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PREPARATION_DATA, PreparationItem } from "../../data/penampahan";
import { CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";

export default function Penampahan() {
  const [activeTab, setActiveTab] = useState<string>("persiapan");

  const activeItem = PREPARATION_DATA.find((item) => item.id === activeTab) || PREPARATION_DATA[0];

  return (
    <section
      id="penampahan-section"
      className="py-20 bg-white border-b border-stone-200/50"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center lg:text-left max-w-2xl mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#8B5E3C] bg-[#8B5E3C]/10">
            Fase Rangkaian 1
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-serif font-extrabold text-[#2D2D2D] tracking-tight">
            Penampahan Galungan
          </h2>
          <p className="mt-3 text-stone-500 text-sm md:text-base leading-relaxed">
            Sehari sebelum Galungan merupakan momen penuh kesibukan gotong-royong. 
            Jelajahi menu persiapan di bawah untuk memahami aktivitas utama dalam menyambut hari kemenangan.
          </p>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Menu Cards */}
          <div className="lg:col-span-5 space-y-4">
            {PREPARATION_DATA.map((item, index) => {
              const isActive = item.id === activeTab;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer focus:outline-none ${
                    isActive
                      ? "border-[#8B5E3C] bg-[#8B5E3C]/[0.02] shadow-medium ring-2 ring-[#8B5E3C]/10"
                      : "border-stone-150 bg-white hover:border-stone-300 hover:bg-stone-50/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Number Indicator */}
                    <div
                      className={`w-10 h-10 rounded-xl font-bold font-serif text-sm flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-[#8B5E3C] text-white"
                          : "bg-stone-100 text-stone-500 group-hover:bg-stone-200"
                      }`}
                    >
                      0{index + 1}
                    </div>
                    <div>
                      <h3
                        className={`text-sm font-bold tracking-tight transition-colors ${
                          isActive ? "text-[#8B5E3C]" : "text-stone-800"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p className="text-xs text-stone-400 font-medium mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    size={16}
                    className={`transition-transform duration-300 ${
                      isActive
                        ? "text-[#8B5E3C] translate-x-1"
                        : "text-stone-300 group-hover:text-stone-500 group-hover:translate-x-0.5"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Detail Panel */}
          <div className="lg:col-span-7 bg-[#F8F5F0]/60 border border-stone-200/50 rounded-3xl p-6 md:p-8 min-h-[460px] relative overflow-hidden shadow-soft flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 flex-grow flex flex-col justify-between"
              >
                <div>
                  {/* Badge */}
                  <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-[#C89B3C] bg-white border border-stone-200 px-3 py-1 rounded-full">
                    {activeItem.subtitle}
                  </span>

                  {/* Main Title */}
                  <h3 className="mt-4 text-2xl md:text-3xl font-serif font-black text-[#2D2D2D]">
                    {activeItem.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-stone-600 text-sm md:text-base leading-relaxed">
                    {activeItem.description}
                  </p>

                  {/* Bullet activities list */}
                  <div className="mt-6 space-y-2.5">
                    {activeItem.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 text-xs md:text-sm text-stone-600 font-medium leading-relaxed"
                      >
                        <CheckCircle2 size={16} className="text-[#8B5E3C] shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Philosophical Callout Block (Notion style) */}
                <div className="mt-8 p-5 bg-white border-l-4 border-[#C89B3C] rounded-r-2xl shadow-sm flex items-start gap-3">
                  <HelpCircle size={18} className="text-[#C89B3C] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Makna Filosofis
                    </h4>
                    <p className="mt-1 text-stone-600 text-xs md:text-sm leading-relaxed italic">
                      {activeItem.philosophicalMeaning}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
