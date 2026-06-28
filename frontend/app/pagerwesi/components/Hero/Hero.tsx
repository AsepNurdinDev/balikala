"use client";

import { motion } from "framer-motion";
import HeroIllustration from "./HeroIllustration";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const handleScrollToNext = () => {
    const nextSection = document.getElementById("about-pagerwesi");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden px-6 lg:px-8">
      {/* Background visual styling */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-gradient-to-bl from-secondary/10 to-transparent rounded-bl-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-gradient-to-tr from-primary/5 to-transparent rounded-tr-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column: Typography & Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col text-center lg:text-left items-center lg:items-start"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs md:text-sm font-semibold tracking-wider uppercase mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            Hari Raya Hindu Bali
          </div>

          {/* Heading */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary leading-tight tracking-tight mb-4">
            PAGERWESI
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl md:text-2xl text-stone-600 font-medium leading-relaxed max-w-xl mb-8 italic">
            "Memperkuat Benteng Diri dengan Ilmu dan Dharma"
          </h2>

          {/* Intro description (concise) */}
          <p className="text-stone-500 text-sm md:text-base max-w-md leading-relaxed mb-10">
            Sebuah perjalanan spiritual memuja Sang Hyang Pramesti Guru untuk memagari jiwa dan raga menggunakan pelita ilmu pengetahuan sejati.
          </p>

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(139, 94, 60, 0.15)" }}
            whileTap={{ scale: 0.98 }}
            onClick={handleScrollToNext}
            className="group flex items-center gap-3 bg-primary hover:bg-primary/95 text-white px-8 py-4 rounded-2xl font-bold tracking-wide transition shadow-lg shadow-primary/20 border border-primary/10 cursor-pointer"
          >
            Mulai Perjalanan
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ArrowDown className="w-5 h-5 text-secondary group-hover:text-white transition" />
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Right Column: Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center items-center"
        >
          <HeroIllustration />
        </motion.div>
      </div>
    </section>
  );
}
