"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, ArrowUpRight } from "lucide-react";
import timelineData from "../data/timeline";

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll inside the timeline container to animate the central path line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Grow path line from 0% height to 100% height as we scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const handleSmoothScroll = (targetId: string) => {
    document.getElementById(targetId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="timeline-section"
      className="bg-white py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#C67C4E]/5 rounded-full blur-3xl -ml-40" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-40" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-20 text-center flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-full bg-[#C67C4E]/10 border border-[#C67C4E]/20 px-5 py-2 text-xs font-semibold text-[#C67C4E] tracking-wider uppercase"
          >
            RANGKAIAN HARI RAYA
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-3xl md:text-5xl font-serif font-bold text-[#2B2B2B]"
          >
            Tahapan Penting Rangkaian Nyepi
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-stone-500 text-sm md:text-base leading-relaxed"
          >
            Perayaan sakral Saka ini diawali dengan dinamika pembersihan alam semesta, 
            memasuki keheningan meditasi mutlak, dan diakhiri dengan perayaan harmoni baru.
          </motion.p>
        </div>

        {/* Timeline Path Container */}
        <div ref={containerRef} className="relative mt-16 lg:mt-24">
          
          {/* Central Line - Desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 bg-stone-100 hidden lg:block">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-[#C67C4E] to-[#D4AF37] origin-top rounded-full shadow-sm"
            />
          </div>

          {/* Side Line - Mobile */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-stone-100 lg:hidden">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-[#C67C4E] to-[#D4AF37] origin-top rounded-full"
            />
          </div>

          {/* Timeline Cards */}
          <div className="space-y-16 lg:space-y-28">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col lg:flex-row items-stretch ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  
                  {/* Timeline Central Dot / Number */}
                  {/* Desktop Center Indicator */}
                  <div className="absolute left-1/2 top-10 -translate-x-1/2 z-10 hidden lg:flex items-center justify-center">
                    <motion.div
                      whileInView={{ scale: [0.8, 1.1, 1], opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="w-12 h-12 rounded-full bg-white border-4 border-[#C67C4E] flex items-center justify-center font-serif font-bold text-[#C67C4E] shadow-md"
                    >
                      {item.id}
                    </motion.div>
                  </div>

                  {/* Mobile Left Indicator */}
                  <div className="absolute left-4 top-6 -translate-x-1/2 z-10 flex lg:hidden items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white border-4 border-[#C67C4E] flex items-center justify-center text-xs font-serif font-bold text-[#C67C4E] shadow-sm">
                      {item.id}
                    </div>
                  </div>

                  {/* Card Section */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full lg:w-1/2 pl-10 lg:pl-0 lg:px-12"
                  >
                    <div className="group overflow-hidden rounded-3xl bg-[#F8F6F3]/50 border border-stone-200/50 shadow-soft hover:shadow-medium hover:border-[#C67C4E]/20 transition-all duration-500 flex flex-col h-full bg-white">
                      
                      {/* Image Layout */}
                      <div className="relative h-60 md:h-72 w-full overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                        
                        {/* Day Badge */}
                        <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-medium text-white border border-white/20">
                          <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{item.day}</span>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-6 md:p-8 flex flex-col flex-1">
                        <span className="text-4xl md:text-5xl font-serif font-bold text-stone-200/60 leading-none mb-2">
                          0{item.id}
                        </span>
                        
                        <h3 className="text-xl md:text-2xl font-serif font-bold text-[#2B2B2B] mb-3">
                          {item.title}
                        </h3>
                        
                        <p className="text-stone-500 text-sm md:text-base leading-relaxed flex-1">
                          {item.description}
                        </p>

                        <button
                          onClick={() => handleSmoothScroll(item.target)}
                          className="mt-6 self-start group/btn flex items-center gap-1.5 text-xs md:text-sm font-semibold text-[#C67C4E] hover:text-[#b0663a] transition cursor-pointer"
                        >
                          <span>{item.button}</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </button>
                      </div>

                    </div>
                  </motion.div>

                  {/* Empty Spacer Column for Desktop alignment */}
                  <div className="w-full lg:w-1/2 hidden lg:block" />

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}