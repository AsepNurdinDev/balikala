"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenTool, Heart, Sparkles, RotateCcw } from "lucide-react";

export default function Reflection() {
  const [inputText, setInputText] = useState("");
  const [savedReflection, setSavedReflection] = useState("");

  // Retrieve saved reflection from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("pagerwesi_reflection");
    if (saved) {
      setSavedReflection(saved);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    localStorage.setItem("pagerwesi_reflection", inputText);
    setSavedReflection(inputText);
  };

  const handleReset = () => {
    localStorage.removeItem("pagerwesi_reflection");
    setSavedReflection("");
    setInputText("");
  };

  return (
    <section
      id="reflection-section"
      className="py-24 bg-white relative overflow-hidden px-6 lg:px-8 border-y border-stone-200/40 scroll-mt-12"
    >
      {/* Visual background details */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-4">
          <span className="text-secondary text-xs md:text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-1.5">
            <Heart className="w-4 h-4 text-accent fill-accent/20" />
            Refleksi Diri
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-primary">
            Cermin Jiwa
          </h2>
          <p className="text-stone-500 text-sm md:text-base leading-relaxed">
            Ilmu tanpa komitmen diri adalah pelita yang tak dinyalakan. Renungkan nilai spiritual yang telah Anda pelajari hari ini.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!savedReflection ? (
            <motion.form
              key="input-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              onSubmit={handleSave}
              className="space-y-6"
            >
              <div className="bg-stone-50 border border-stone-200/50 rounded-3xl p-6 md:p-8 shadow-soft">
                <label
                  htmlFor="reflection-input"
                  className="block font-serif text-lg md:text-xl font-bold text-stone-800 mb-4 text-center md:text-left"
                >
                  "Nilai apa yang paling ingin Anda jadikan benteng utama dalam kehidupan Anda?"
                </label>
                <textarea
                  id="reflection-input"
                  rows={4}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Tuliskan komitmen diri Anda di sini... (Misal: Kesabaran menghadapi ujian, kejujuran dalam bekerja, atau disiplin waktu)"
                  className="w-full bg-white border border-stone-200 focus:border-secondary rounded-2xl p-4 text-stone-700 text-sm md:text-base focus:outline-none focus:ring-4 focus:ring-secondary/15 transition resize-none placeholder-stone-400"
                />
              </div>

              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={!inputText.trim()}
                  className="flex items-center gap-2.5 bg-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/95 text-white px-8 py-3.5 rounded-2xl font-bold tracking-wide transition shadow-md shadow-primary/10 cursor-pointer text-sm"
                >
                  <PenTool className="w-4 h-4 text-secondary" />
                  Simpan Refleksi
                </motion.button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="output-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gradient-to-br from-[#FAF8F5] to-white border-2 border-secondary/30 rounded-3xl p-8 md:p-12 shadow-medium relative overflow-hidden text-center space-y-6 border-dashed"
            >
              {/* Balinese Mandala SVG ornament indicator inside card */}
              <div className="absolute right-4 top-4 text-secondary/10 w-24 h-24 pointer-events-none" />

              <div className="mx-auto w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 mb-4">
                <Sparkles className="w-5 h-5" />
              </div>

              <div className="space-y-4">
                <span className="text-secondary font-serif text-sm font-semibold tracking-wider block">
                  ~ Prasasti Komitmen Diri ~
                </span>
                
                <p className="font-serif text-xl md:text-2xl text-primary font-bold italic max-w-xl mx-auto leading-relaxed">
                  "{savedReflection}"
                </p>

                <p className="text-stone-500 text-xs md:text-sm max-w-md mx-auto leading-relaxed pt-4 border-t border-stone-200/50">
                  Komitmen ini kini terpatri di dalam jiwa Anda. Peliharalah ia dengan kebijaksanaan dan dharma sebagai pager besi kehidupan Anda.
                </p>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-400 hover:text-primary transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Ubah Refleksi
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
