"use client";

import { philosophyValues } from "../../data/philosophy";
import ValueCard from "./ValueCard";
import { Gem } from "lucide-react";

export default function Philosophy() {
  return (
    <section
      id="philosophy-section"
      className="py-24 bg-white relative overflow-hidden px-6 lg:px-8 border-t border-slate-100 scroll-mt-12"
    >
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-blue-600 text-xs md:text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-1.5">
            <Gem className="w-4 h-4" />
            Makna Mendalam
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 leading-tight">
            Nilai-Nilai Hari Raya Saraswati
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
            Setiap aspek Saraswati membawa pelajaran yang relevan untuk kehidupan modern yang bermakna.
          </p>
        </div>

        {/* Value Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {philosophyValues.map((value, idx) => (
            <ValueCard key={value.id} value={value} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
