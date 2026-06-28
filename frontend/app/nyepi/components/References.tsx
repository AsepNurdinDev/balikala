"use client";

import { motion } from "framer-motion";
import { BookOpen, ExternalLink, GraduationCap } from "lucide-react";
import referencesData from "../data/references";

export default function References() {
  return (
    <section
      id="references-section"
      className="bg-[#F8F6F3] py-16 lg:py-24 border-t border-stone-200/50"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-5 h-5 text-[#C67C4E]" />
              <span className="text-[#C67C4E] font-semibold tracking-wider text-xs uppercase">
                REFERENSI & SUMBER PUSTAKA
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2B2B2B]">
              Rujukan Kebudayaan Terpercaya
            </h2>
          </div>
          <p className="max-w-md text-stone-500 text-xs md:text-sm leading-relaxed">
            Seluruh materi kebudayaan dan sejarah mengenai Hari Raya Nyepi di BaliKala disadur 
            dari sumber pustaka adat suci dan kajian akademis terverifikasi.
          </p>
        </div>

        {/* References Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {referencesData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-stone-200/40 p-6 rounded-2xl shadow-soft hover:shadow-medium hover:border-[#C67C4E]/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Icon & Source Type */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-stone-50 rounded-xl text-stone-400">
                    <BookOpen className="w-4 h-4 text-[#C67C4E]" />
                  </div>
                  <span className="text-[10px] text-stone-400 bg-stone-100 px-2.5 py-1 rounded-full font-medium tracking-wide">
                    {item.source}
                  </span>
                </div>

                {/* Title & Author */}
                <h3 className="text-base font-serif font-bold text-[#2B2B2B] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-400 mb-3">
                  Karya: <span className="font-semibold text-stone-600">{item.author}</span>
                </p>

                {/* Description */}
                <p className="text-stone-500 text-xs md:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* External Link if exists */}
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 self-start inline-flex items-center gap-1.5 text-xs font-semibold text-[#C67C4E] hover:text-[#b0663a] transition cursor-pointer"
                >
                  <span>Kunjungi Sumber</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
