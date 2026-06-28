"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlameKindling, Briefcase, MapPinOff, VolumeOff, X, Compass, Info, Heart } from "lucide-react";
import caturBrataData, { BrataItem } from "../data/caturBrata";

const iconMap: Record<string, React.ComponentType<any>> = {
  FlameOff: FlameKindling,
  BriefcaseX: Briefcase,
  MapPinOff: MapPinOff,
  SmileOff: VolumeOff,
};

export default function CaturBrata() {
  const [selectedBrata, setSelectedBrata] = useState<BrataItem | null>(null);

  return (
    <section
      id="catur-brata-section"
      className="bg-[#F8F6F3] py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Decorative background vectors */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C67C4E]/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 text-center flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#C67C4E] font-semibold tracking-wider text-xs uppercase mb-3 block"
          >
            PANTANGAN SUCI PENYEPIAN
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif font-bold text-[#2B2B2B]"
          >
            Catur Brata Penyepian
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-stone-500 text-sm md:text-base leading-relaxed"
          >
            Empat pengendalian diri sakral yang wajib dilaksanakan umat Hindu di Bali selama 24 jam penuh 
            untuk kembali ke kesadaran spiritual murni.
          </motion.p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {caturBrataData.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || FlameKindling;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedBrata(item)}
                className="group flex flex-col justify-between bg-white border border-stone-200/60 p-8 rounded-3xl cursor-pointer shadow-soft hover:shadow-medium hover:border-[#C67C4E]/25 transition-all duration-300 relative overflow-hidden"
              >
                {/* Visual subtle card pattern top-right */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#C67C4E]/5 rounded-full group-hover:scale-150 transition-all duration-500" />
                
                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-[#C67C4E]/10 flex items-center justify-center text-[#C67C4E] mb-6 group-hover:bg-[#C67C4E] group-hover:text-white transition duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  
                  {/* Title & Translation */}
                  <h3 className="text-xl font-serif font-bold text-[#2B2B2B] mb-2 group-hover:text-[#C67C4E] transition duration-200">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#D4AF37] font-semibold tracking-wide uppercase mb-4">
                    {item.translation}
                  </p>

                  {/* Short Description */}
                  <p className="text-stone-500 text-sm leading-relaxed">
                    {item.shortDesc}
                  </p>
                </div>

                {/* Footer Button Hint */}
                <span className="mt-8 text-xs font-semibold text-[#C67C4E] flex items-center gap-1 group-hover:gap-2 transition-all">
                  <span>Pelajari Selengkapnya</span>
                  <span>→</span>
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Modal Overlay using AnimatePresence */}
        <AnimatePresence>
          {selectedBrata && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
              
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedBrata(null)}
                className="absolute inset-0 bg-black cursor-pointer"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="bg-white max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl relative border border-stone-100 z-10 flex flex-col"
              >
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedBrata(null)}
                  className="absolute top-4 right-4 p-2 bg-stone-100 hover:bg-stone-200 rounded-full text-stone-500 hover:text-[#2B2B2B] transition duration-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Modal Header */}
                <div className="p-8 pb-4 border-b border-stone-100 flex items-start gap-4">
                  <div className="p-3.5 bg-[#C67C4E]/10 rounded-2xl text-[#C67C4E] shrink-0">
                    {(() => {
                      const ActiveIcon = iconMap[selectedBrata.icon] || FlameKindling;
                      return <ActiveIcon className="w-6 h-6" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-[#2B2B2B]">
                      {selectedBrata.title}
                    </h3>
                    <p className="text-sm text-[#D4AF37] font-semibold uppercase tracking-wider mt-1">
                      {selectedBrata.translation}
                    </p>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-8 space-y-6 overflow-y-auto max-h-[60vh] scrollbar-hide text-stone-600 text-sm md:text-base leading-relaxed">
                  
                  {/* Detailed Description */}
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#2B2B2B] font-bold mb-2 flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-[#C67C4E]" /> Penjelasan Ritual
                    </h4>
                    <p className="bg-stone-50 p-4 rounded-xl text-stone-600 border border-stone-100">
                      {selectedBrata.longDesc}
                    </p>
                  </div>

                  {/* Spiritual Philosophy */}
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#2B2B2B] font-bold mb-2 flex items-center gap-1.5">
                      <Heart className="w-4 h-4 text-[#D4AF37]" /> Filosofi Spiritual
                    </h4>
                    <p className="text-stone-500 italic">
                      "{selectedBrata.philosophy}"
                    </p>
                  </div>

                </div>

                {/* Modal Footer */}
                <div className="p-6 bg-stone-50 border-t border-stone-100 flex justify-end">
                  <button
                    onClick={() => setSelectedBrata(null)}
                    className="bg-[#2B2B2B] hover:bg-[#1a1a1a] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition cursor-pointer"
                  >
                    Tutup Detail
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
