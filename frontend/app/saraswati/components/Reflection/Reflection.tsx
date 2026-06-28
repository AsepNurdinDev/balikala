"use client";

import ReflectionQuestion from "./ReflectionQuestion";
import { PenLine } from "lucide-react";

const reflectionPrompts = [
  {
    question: "Mengapa ilmu pengetahuan harus digunakan dengan penuh kebijaksanaan?",
    placeholder: "Tuliskan pemikiran Anda tentang pentingnya menggunakan ilmu dengan bijak..."
  },
  {
    question: "Apa satu ilmu atau keahlian yang ingin Anda dalami lebih lanjut, dan bagaimana manfaatnya bagi orang lain?",
    placeholder: "Renungkan satu bidang ilmu yang bermakna bagi Anda dan dampaknya untuk sesama..."
  },
  {
    question: "Bagaimana Anda bisa menjaga keseimbangan antara belajar, berkarya, dan beribadah dalam kehidupan sehari-hari?",
    placeholder: "Bayangkan rutinitas ideal yang menyeimbangkan ilmu, seni, dan spiritualitas..."
  }
];

export default function Reflection() {
  return (
    <section
      id="reflection-section"
      className="py-24 bg-[#F8FAFC] relative overflow-hidden px-6 lg:px-8 border-t border-slate-100 scroll-mt-12"
    >
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <span className="text-blue-600 text-xs md:text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-1.5">
            <PenLine className="w-4 h-4" />
            Ruang Refleksi
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 leading-tight">
            Renungkan Dirimu
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
            Jawab setiap pertanyaan berikut secara jujur. Refleksi ini hanya untukmu — tidak tersimpan ke mana pun.
          </p>
        </div>

        {/* Reflection Cards */}
        <div className="space-y-6">
          {reflectionPrompts.map((prompt, idx) => (
            <ReflectionQuestion
              key={idx}
              index={idx}
              question={prompt.question}
              placeholder={prompt.placeholder}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
