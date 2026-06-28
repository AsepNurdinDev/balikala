"use client";

import { motion } from "framer-motion";
import { BookOpen, ShieldAlert } from "lucide-react";

export default function AboutSection() {
  return (
    <section
      id="about-pagerwesi"
      className="py-24 bg-white relative overflow-hidden px-6 lg:px-8 border-y border-stone-200/40"
    >
      {/* Decorative details */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-96 bg-primary/5 rounded-r-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-12 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
          {/* Left Column: Visual Accents */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 border border-primary/20">
              <BookOpen className="w-6 h-6" />
            </div>
            
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4 leading-tight">
              Pelindung Jiwa dari Kegelapan
            </h2>
            <div className="h-1 w-16 bg-secondary rounded-full mb-6" />
            
            <p className="text-stone-400 text-xs tracking-wider uppercase font-semibold">
              Rabu Kliwon Wuku Sinta
            </p>
          </motion.div>

          {/* Right Column: Educational Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-7 space-y-6 text-stone-600 leading-relaxed text-base md:text-lg"
          >
            <p className="font-medium text-stone-800">
              Pagerwesi diperingati setiap 210 hari sekali. Merupakan momen sakral bagi umat Hindu di Bali untuk memuja <span className="text-primary font-semibold">Sang Hyang Pramesti Guru</span> — perwujudan Tuhan sebagai Guru Sejati alam semesta.
            </p>
            
            <p>
              Nama <strong>Pagerwesi</strong> berasal dari gabungan kata <em>Pager</em> yang berarti pagar atau benteng, dan <em>Wesi</em> yang berarti besi. Filosofi ini melambangkan benteng pertahanan diri yang kuat seperti besi demi melindungi jiwa dari kehancuran spiritual.
            </p>

            <blockquote className="border-l-4 border-secondary pl-4 italic text-stone-500 bg-stone-50 py-3 pr-2 rounded-r-xl text-sm md:text-base">
              "Ilmu pengetahuan sejati (Jnana) dan ketaatan pada kebenaran (Dharma) adalah bahan dasar utama pembentuk benteng perlindungan tersebut."
            </blockquote>

            <div className="flex gap-4 pt-4 text-xs md:text-sm text-stone-500">
              <div className="flex items-center gap-2 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200/50">
                <ShieldAlert className="w-4 h-4 text-primary" />
                <span>Pagar Spiritual</span>
              </div>
              <div className="flex items-center gap-2 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200/50">
                <BookOpen className="w-4 h-4 text-secondary" />
                <span>Pelita Pengetahuan</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
