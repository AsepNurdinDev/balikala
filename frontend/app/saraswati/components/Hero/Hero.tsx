"use client";

import { motion } from "framer-motion";
import HeroBackground from "./HeroBackground";
import HeroIllustration from "./HeroIllustration";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const handleScrollToStart = () => {
    const nextSection = document.getElementById("about-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="hero-section" className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
      <HeroBackground />
      
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Column: Title, Subtitle, CTA */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-xs uppercase tracking-wider">
            <span>✨</span> Media Edukasi BaliKala
          </div>
          
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-800 tracking-tight leading-tight">
            Hari Raya <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">Saraswati</span>
          </h1>
          
          <p className="text-slate-600 text-base md:text-lg font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Menandai turunnya ilmu pengetahuan suci kepada umat manusia demi kebahagiaan, kemakmuran, dan keharmonisan semesta.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              onClick={handleScrollToStart}
              className="px-8 py-4 bg-blue-650 hover:bg-blue-700 text-white rounded-2xl font-bold tracking-wide transition shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 flex items-center gap-2 group cursor-pointer text-sm"
            >
              Mulai Belajar
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            </button>
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-widest border-l border-slate-200 pl-4 hidden sm:inline">
              Hari turunnya ilmu pengetahuan.
            </span>
          </div>
        </motion.div>

        {/* Right Column: Premium Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full flex justify-center"
        >
          <HeroIllustration />
        </motion.div>
      </div>
    </section>
  );
}
