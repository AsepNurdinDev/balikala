"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, Compass } from "lucide-react";
import heroData from "../data/hero";

export default function Hero() {
  const handleScrollToAbout = () => {
    document.getElementById("about-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroData.image}
          alt="Suasana Senja Bali Menjelang Nyepi"
          fill
          priority
          quality={100}
          className="object-cover object-center scale-105"
        />
        {/* Deep, premium dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B2B] via-black/50 to-black/70 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center text-white mt-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
              },
            },
          }}
          className="flex flex-col items-center"
        >
          {/* Subtitle / Kicker */}
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="text-sm md:text-base font-semibold tracking-[0.25em] text-[#D4AF37] uppercase mb-4"
          >
            TAHUN BARU SAKA 1946
          </motion.span>

          {/* Main Title */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: { 
                opacity: 1, 
                y: 0, 
                transition: { 
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1] 
                } 
              },
            }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-white mb-6"
          >
            {heroData.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 0.9, y: 0, transition: { duration: 0.8 } },
            }}
            className="max-w-2xl text-base md:text-xl text-stone-200 leading-relaxed font-light mb-10"
          >
            {heroData.subtitle}
          </motion.p>

          {/* CTA Button */}
          <motion.button
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
            }}
            onClick={handleScrollToAbout}
            whileHover={{ scale: 1.05, backgroundColor: "#b0663a" }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-2 bg-[#C67C4E] hover:bg-[#b0663a] text-white px-8 py-4 rounded-full font-medium shadow-lg shadow-[#C67C4E]/25 transition duration-300 cursor-pointer"
          >
            <Compass className="w-5 h-5 transition-transform duration-500 group-hover:rotate-45" />
            <span>{heroData.button}</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.5,
          duration: 0.8,
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer"
        onClick={handleScrollToAbout}
      >
        <span className="text-xs tracking-widest text-stone-400 uppercase mb-2 hover:text-white transition">
          Gulir ke Bawah
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="w-6 h-6 text-[#D4AF37]" />
        </motion.div>
      </motion.div>
    </section>
  );
}