"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useExplorer } from "../../hooks/useExplorer";
import GoddessViewer from "./GoddessViewer";
import SymbolMenu from "./SymbolMenu";
import SymbolCard from "./SymbolCard";
import SymbolInformation from "./SymbolInformation";
import ProgressExplorer from "./ProgressExplorer";
import { symbolsData } from "../../data/symbols";
import { Compass, LayoutGrid } from "lucide-react";

/** Overview panel shown when no symbol is selected */
function OverviewPanel() {
  return (
    <motion.div
      key="overview"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-6 h-full"
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-amber-50 border border-blue-100/50 rounded-2xl flex items-center justify-center text-3xl select-none shrink-0">
          🪷
        </div>
        <div>
          <h3 className="font-serif text-2xl font-extrabold text-slate-800">
            Dewi Saraswati
          </h3>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 mt-0.5 block">
            Manifestasi Ilmu Pengetahuan
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
        Dewi Saraswati adalah manifestasi Tuhan Yang Maha Esa sebagai sumber segala
        ilmu pengetahuan, seni, dan kebijaksanaan. Setiap atribut yang dibawanya
        menyimpan makna filosofis yang mendalam.
      </p>

      {/* Hint chips */}
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Pilih simbol untuk mempelajari maknanya:
        </p>
        <div className="flex flex-wrap gap-2">
          {symbolsData.map((s) => (
            <span
              key={s.id}
              className="px-3 py-1.5 bg-slate-50 border border-slate-100 text-slate-500 text-xs font-bold rounded-full"
            >
              {s.emoji} {s.name}
            </span>
          ))}
        </div>
      </div>

      {/* Decorative bottom accent */}
      <div className="bg-gradient-to-r from-blue-50 via-amber-50 to-blue-50 rounded-2xl p-4 flex items-center gap-3">
        <span className="text-2xl select-none">✨</span>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">
          Model dapat diputar dan di-zoom secara bebas. Klik simbol di sebelah
          kiri untuk mengarahkan kamera ke posisinya.
        </p>
      </div>
    </motion.div>
  );
}

export default function GoddessExplorer() {
  const {
    activeSymbolId,
    activeSymbol,
    cameraTarget,
    cameraPosition,
    exploredSymbols,
    exploredCount,
    totalSymbols,
    isCompleted,
    selectSymbol,
    showOverview,
  } = useExplorer();

  return (
    <section
      id="explorer-section"
      className="py-24 bg-white relative overflow-hidden px-6 lg:px-8 border-t border-slate-100 scroll-mt-12"
    >
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-blue-600 text-xs md:text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-1.5">
            <Compass className="w-4 h-4" />
            Museum Digital Interaktif
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 leading-tight">
            Explore Dewi Saraswati
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
            Pilih simbol untuk memahami makna mendalam yang dibawa oleh setiap atribut
            Dewi Saraswati. Jelajahi semua simbol untuk menyelesaikan perjalanan museummu.
          </p>
        </div>

        {/* ============================================================
            MAIN MUSEUM LAYOUT
            Desktop  : [Symbol Menu 3col] | [3D Viewer 5col] | [Info 4col]
            Mobile   : 3D Viewer → Symbol Card Grid → Info Panel → Progress
        ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── LEFT: Symbol Menu (desktop) ── */}
          <div className="hidden lg:block lg:col-span-3 sticky top-24 space-y-3">
            {/* Lihat Semua button */}
            <button
              onClick={showOverview}
              className={`w-full text-left px-4 py-3.5 rounded-2xl flex items-center gap-3 text-sm font-bold border-2 transition-all cursor-pointer mb-1 ${
                activeSymbolId === null
                  ? "bg-slate-800 border-slate-800 text-white shadow-md"
                  : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
              }`}
            >
              <LayoutGrid className="w-4 h-4 shrink-0" />
              Lihat Semua
            </button>

            <SymbolMenu
              activeSymbolId={activeSymbolId}
              exploredSymbols={exploredSymbols}
              onSelect={selectSymbol}
            />
          </div>

          {/* ── CENTER: 3D Viewer + mobile grid ── */}
          <div className="lg:col-span-5 space-y-6">
            {/* Main 3D Canvas */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <GoddessViewer
                cameraTarget={cameraTarget}
                cameraPosition={cameraPosition}
              />
            </motion.div>

            {/* Mobile: "Lihat Semua" button */}
            <button
              onClick={showOverview}
              className={`w-full lg:hidden flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 text-sm font-bold transition-all cursor-pointer ${
                activeSymbolId === null
                  ? "bg-slate-800 border-slate-800 text-white"
                  : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Lihat Semua (Overview)
            </button>

            {/* Mobile/Tablet Symbol Card Grid */}
            <div className="grid grid-cols-3 gap-3 lg:hidden">
              {symbolsData.map((symbol) => (
                <SymbolCard
                  key={symbol.id}
                  symbol={symbol}
                  isActive={activeSymbolId === symbol.id}
                  isExplored={exploredSymbols.includes(symbol.id)}
                  onClick={() => selectSymbol(symbol.id)}
                />
              ))}
            </div>

            {/* Progress tracker (desktop, below viewer) */}
            <div className="hidden lg:block">
              <ProgressExplorer
                exploredSymbols={exploredSymbols}
                totalSymbols={totalSymbols}
                isCompleted={isCompleted}
              />
            </div>
          </div>

          {/* ── RIGHT: Info Panel ── */}
          <div className="lg:col-span-4 space-y-6">
            <AnimatePresence mode="wait">
              {activeSymbol ? (
                <SymbolInformation key={activeSymbol.id} symbol={activeSymbol} />
              ) : (
                <OverviewPanel key="overview" />
              )}
            </AnimatePresence>

            {/* Progress (mobile) */}
            <div className="lg:hidden">
              <ProgressExplorer
                exploredSymbols={exploredSymbols}
                totalSymbols={totalSymbols}
                isCompleted={isCompleted}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
