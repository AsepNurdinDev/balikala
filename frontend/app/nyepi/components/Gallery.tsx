"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import galleryData, { GalleryItem } from "../data/gallery";

export default function Gallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    if (activeIdx === null) return;
    setActiveIdx((prev) => (prev !== null && prev < galleryData.length - 1 ? prev + 1 : 0));
  }, [activeIdx]);

  const handlePrev = useCallback(() => {
    if (activeIdx === null) return;
    setActiveIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryData.length - 1));
  }, [activeIdx]);

  const handleClose = useCallback(() => {
    setActiveIdx(null);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIdx === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIdx, handleNext, handlePrev, handleClose]);

  const activeImage = activeIdx !== null ? galleryData[activeIdx] : null;

  return (
    <section
      id="gallery-section"
      className="bg-white py-20 lg:py-32 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-20 text-center flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#C67C4E] font-semibold tracking-wider text-xs uppercase mb-3 block"
          >
            GALERI DOKUMENTASI
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif font-bold text-[#2B2B2B]"
          >
            Galeri Seni & Keheningan Nyepi
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-stone-500 text-sm md:text-base leading-relaxed"
          >
            Potret visual transisi atmosfer tradisi Hindu Bali—dari gempita kreasi Ogoh-Ogoh 
            hingga khidmatnya keheningan semesta.
          </motion.p>
        </div>

        {/* Masonry CSS Columns Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              onClick={() => setActiveIdx(idx)}
              className="break-inside-avoid relative overflow-hidden rounded-3xl group cursor-pointer shadow-soft border border-stone-100 hover:shadow-medium hover:border-[#C67C4E]/20 transition-all duration-300 bg-stone-50"
            >
              <div className="relative w-full h-auto overflow-hidden">
                {/* Image element with variable aspect ratio based on item index */}
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-auto object-cover transition-transform duration-750 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                <span className="text-[#D4AF37] font-semibold text-[10px] tracking-widest uppercase mb-1.5">
                  {item.category}
                </span>
                <h4 className="text-white font-serif font-bold text-lg mb-1 flex items-center justify-between">
                  <span>{item.title}</span>
                  <Expand className="w-4 h-4 text-stone-400" />
                </h4>
                <p className="text-stone-300 text-xs line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeImage && (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4">
              
              {/* Dark Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.95 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
                className="absolute inset-0 bg-[#161616] cursor-pointer"
              />

              {/* Top Controls Info bar */}
              <div className="absolute top-4 left-6 right-6 z-10 flex justify-between items-center text-white">
                <div className="flex items-center gap-2.5">
                  <span className="text-[#D4AF37] text-xs font-semibold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
                    {activeImage.category}
                  </span>
                  <span className="text-stone-500 text-xs">
                    {activeIdx! + 1} / {galleryData.length}
                  </span>
                </div>
                
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-white/10 rounded-full text-stone-400 hover:text-white transition duration-200 cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Central Image and Chevrons */}
              <div className="relative max-w-5xl w-full h-[65vh] md:h-[75vh] flex items-center justify-center z-10">
                {/* Left Arrow */}
                <button
                  onClick={handlePrev}
                  className="absolute left-0 md:-left-16 p-2 bg-[#1F1F1F]/40 border border-white/5 hover:bg-white/10 hover:text-[#D4AF37] text-white rounded-full transition cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Main Lightbox Image */}
                <div className="relative w-full h-full max-h-full flex items-center justify-center">
                  <motion.img
                    key={activeImage.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    src={activeImage.src}
                    alt={activeImage.alt}
                    className="max-w-full max-h-full object-contain rounded-2xl border border-white/5 shadow-2xl"
                  />
                </div>

                {/* Right Arrow */}
                <button
                  onClick={handleNext}
                  className="absolute right-0 md:-right-16 p-2 bg-[#1F1F1F]/40 border border-white/5 hover:bg-white/10 hover:text-[#D4AF37] text-white rounded-full transition cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Bottom Image Details Card */}
              <motion.div
                key={`caption-${activeImage.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                className="max-w-xl text-center text-white mt-6 z-10 px-4"
              >
                <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-2">
                  {activeImage.title}
                </h3>
                <p className="text-stone-400 text-xs md:text-sm leading-relaxed">
                  {activeImage.description}
                </p>
              </motion.div>

            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
