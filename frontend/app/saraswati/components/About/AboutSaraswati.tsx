"use client";

import { motion } from "framer-motion";
import FestivalInfo from "./FestivalInfo";

export default function AboutSaraswati() {
  return (
    <section
      id="about-section"
      className="py-24 bg-[#F8FAFC] relative overflow-hidden px-6 lg:px-8 border-t border-slate-100 scroll-mt-12"
    >
      <div className="max-w-5xl mx-auto relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-blue-600 text-xs md:text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-1.5">
            📚 Pengenalan Filosofi
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 leading-tight">
            Cahaya Pengetahuan di Tengah Kehidupan
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
            Hari Raya Saraswati merupakan tonggak kesadaran bagi masyarakat Hindu Bali untuk memuliakan ilmu pengetahuan sebagai penuntun spiritual dan moral.
          </p>
        </div>

        {/* Content Cards */}
        <FestivalInfo />
      </div>
    </section>
  );
}
