"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Target, Flame, Award } from "lucide-react";
import aboutData from "../data/about";

const iconMap: Record<string, React.ComponentType<any>> = {
  BookOpen: BookOpen,
  Target: Target,
  Flame: Flame,
};

export default function About() {
  const [activeCardId, setActiveCardId] = useState<string>("makna");

  const activeCard = aboutData.cards.find((c) => c.id === activeCardId) || aboutData.cards[0];
  const ActiveIcon = iconMap[activeCard.icon] || Award;

  return (
    <section
      id="about-section"
      className="bg-[#F8F6F3] py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C67C4E]/5 rounded-full blur-3xl -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Information */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-[#C67C4E] font-semibold tracking-wider text-sm uppercase mb-3"
            >
              NILAI LUHUR & BUDAYA
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl font-serif font-bold text-[#2B2B2B] mb-8"
            >
              {aboutData.title}
            </motion.h2>

            <div className="space-y-6 text-stone-600 leading-relaxed text-base md:text-lg">
              {aboutData.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className={i === 0 ? "first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#C67C4E] first-letter:float-left first-letter:mr-3 first-letter:mt-1" : ""}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Active Card Detail Display (Framer Motion) */}
            <div className="mt-10 p-6 rounded-2xl bg-white border border-[#C67C4E]/10 shadow-soft min-h-[160px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCardId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-4 items-start"
                >
                  <div className="p-3 bg-[#C67C4E]/10 rounded-xl text-[#C67C4E]">
                    <ActiveIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-serif font-bold text-[#2B2B2B] mb-2">
                      {activeCard.title}
                    </h4>
                    <p className="text-stone-600 leading-relaxed text-sm md:text-base">
                      {activeCard.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Visual and Stacked Interactive Cards */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            {/* Main Picture Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-[380px] md:h-[450px] rounded-3xl overflow-hidden shadow-medium border border-white/50"
            >
              <Image
                src={aboutData.image}
                alt="Tentang Hari Raya Nyepi"
                fill
                className="object-cover"
              />
              {/* Subtle visual vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </motion.div>

            {/* Stacked Interactive Cards */}
            <div className="absolute -bottom-8 md:-bottom-12 left-4 right-4 flex flex-col gap-3 z-20">
              {aboutData.cards.map((card, idx) => {
                const CardIcon = iconMap[card.icon] || Award;
                const isActive = activeCardId === card.id;

                return (
                  <motion.button
                    key={card.id}
                    onClick={() => setActiveCardId(card.id)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-4 px-6 py-4 rounded-xl border transition-all duration-300 shadow-soft cursor-pointer text-left ${
                      isActive
                        ? "bg-white border-[#C67C4E] shadow-[#C67C4E]/5"
                        : "bg-white/90 backdrop-blur-md border-white/60 hover:bg-white"
                    }`}
                  >
                    <div
                      className={`p-2.5 rounded-lg transition ${
                        isActive
                          ? "bg-[#C67C4E] text-white"
                          : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      <CardIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-serif font-bold text-sm text-[#2B2B2B]">
                          {card.title}
                        </span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C67C4E]" />
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}