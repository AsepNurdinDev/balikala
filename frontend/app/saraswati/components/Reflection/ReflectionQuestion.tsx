"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ReflectionQuestionProps {
  index: number;
  question: string;
  placeholder: string;
}

export default function ReflectionQuestion({ index, question, placeholder }: ReflectionQuestionProps) {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (answer.trim()) {
      setSubmitted(true);
    }
  };

  const handleEdit = () => {
    setSubmitted(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="bg-white border border-slate-100 rounded-3xl p-7 shadow-xs space-y-5"
    >
      {/* Question Number Badge */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-sm font-extrabold text-blue-600 font-serif shrink-0">
          {index + 1}
        </div>
        <h3 className="font-serif font-extrabold text-slate-800 text-base md:text-lg leading-snug">
          {question}
        </h3>
      </div>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-5">
            <p className="text-emerald-800 text-sm font-medium leading-relaxed whitespace-pre-wrap">{answer}</p>
          </div>
          <button
            onClick={handleEdit}
            className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-blue-500 transition cursor-pointer"
          >
            ✏️ Edit jawaban
          </button>
        </motion.div>
      ) : (
        <div className="space-y-3">
          <textarea
            rows={4}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={placeholder}
            id={`reflection-q${index + 1}`}
            className="w-full bg-slate-50 border border-slate-200 focus:border-blue-300 rounded-2xl p-4 text-slate-700 text-sm focus:outline-none focus:ring-4 focus:ring-blue-100 transition resize-none placeholder-slate-350 font-medium leading-relaxed"
          />
          <button
            onClick={handleSubmit}
            disabled={!answer.trim()}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-sm shadow-blue-200 cursor-pointer"
          >
            Simpan Refleksi ✓
          </button>
        </div>
      )}
    </motion.div>
  );
}
