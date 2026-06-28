"use client";

import { motion } from "framer-motion";
import SymbolCard from "./SymbolCard";
import { symbolsData } from "../../data";

export default function SymbolGrid() {
  return (
    <section
      id="symbols-section"
      className="py-24 bg-white relative overflow-hidden px-6 lg:px-8 border-b border-stone-200/40"
    >
      {/* Decorative details */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-secondary text-xs md:text-sm font-bold tracking-widest uppercase"
          >
            Sarana Upacara
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary"
          >
            Makna Simbol Ritual
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-stone-500 text-sm md:text-base leading-relaxed"
          >
            Dalam perayaan Pagerwesi, benda-benda fisik ini bukan sekadar pelengkap ritual. Mereka adalah lambang semesta dan tekad jiwa. Klik masing-masing kartu untuk melihat makna spiritualnya.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-center">
          {symbolsData.map((symbol, index) => (
            <motion.div
              key={symbol.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SymbolCard symbol={symbol} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
