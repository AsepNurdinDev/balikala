"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quizQuestions } from "../../data";
import { Check, X, ArrowRight, HelpCircle, Trophy, RotateCcw } from "lucide-react";

export default function Quiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [answersLog, setAnswersLog] = useState<boolean[]>([]); // logs correct/incorrect for each question

  const currentQuestion = quizQuestions[currentIdx];
  const totalQuestions = quizQuestions.length;

  const handleOptionClick = (optionIdx: number) => {
    if (selectedAns !== null) return; // Prevent double clicking / changing answer

    setSelectedAns(optionIdx);
    const isCorrect = optionIdx === currentQuestion.answerIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setAnswersLog((prev) => [...prev, isCorrect]);
  };

  const handleNext = () => {
    setSelectedAns(null);
    if (currentIdx + 1 < totalQuestions) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAns(null);
    setScore(0);
    setIsFinished(false);
    setAnswersLog([]);
  };

  // Get score message
  const getScoreMessage = () => {
    const pct = (score / totalQuestions) * 100;
    if (pct === 100) {
      return {
        title: "Sempurna! Sang Hyang Jnana Menerangi Anda",
        desc: "Luar biasa! Anda telah memahami hakikat filosofis Hari Raya Pagerwesi secara mendalam. Ilmu pengetahuan suci ini kini siap menjadi benteng kokoh dalam kehidupan Anda.",
        color: "text-secondary"
      };
    } else if (pct >= 60) {
      return {
        title: "Bagus Sekali! Pemahaman Anda Cukup Kuat",
        desc: "Kerja bagus! Anda sudah memahami dasar-dasar penting Pagerwesi, simbol, dan tujuannya. Terus asah kebijaksanaan dan dharma dalam keseharian.",
        color: "text-primary"
      };
    } else {
      return {
        title: "Ayo Coba Lagi! Perdalam Benteng Diri Anda",
        desc: "Jangan berkecil hati. Bacalah kembali pilar Benteng Diri dan rangkuman makna simbol di atas, lalu uji kembali pemahaman Anda di sini.",
        color: "text-stone-500"
      };
    }
  };

  const message = getScoreMessage();

  return (
    <section
      id="quiz-section"
      className="py-24 bg-[#F8F5F0] relative overflow-hidden px-6 lg:px-8 scroll-mt-12"
    >
      {/* Background visual shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section Header */}
        {!isFinished && (
          <div className="text-center max-w-xl mx-auto mb-12 space-y-4">
            <span className="text-secondary text-xs md:text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-1.5">
              <HelpCircle className="w-4 h-4" />
              Evaluasi Pemahaman
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-primary">
              Kuis Interaktif Pagerwesi
            </h2>
            <p className="text-stone-500 text-sm md:text-base leading-relaxed">
              Uji sejauh mana Anda telah menyerap esensi spiritual dan praktis dari Hari Raya Pagerwesi.
            </p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key="quiz-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border border-stone-200/40 rounded-3xl p-6 md:p-8 shadow-medium space-y-6"
            >
              {/* Question Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs md:text-sm text-stone-500 font-bold tracking-wide">
                  <span>SOAL {currentIdx + 1} DARI {totalQuestions}</span>
                  <span className="text-primary font-bold">{Math.round(((currentIdx + 1) / totalQuestions) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary transition-all duration-300"
                    style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Title */}
              <h3 className="font-serif text-lg md:text-xl font-extrabold text-stone-800 leading-relaxed">
                {currentQuestion.question}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedAns === idx;
                  const isCorrect = idx === currentQuestion.answerIndex;
                  const showFeedback = selectedAns !== null;

                  let btnStyle = "border-stone-200 text-stone-700 bg-white hover:border-primary/50";
                  if (showFeedback) {
                    if (isCorrect) {
                      btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold shadow-[0_0_10px_rgba(16,185,129,0.15)]";
                    } else if (isSelected) {
                      btnStyle = "border-red-500 bg-red-50 text-red-800 font-semibold";
                    } else {
                      btnStyle = "border-stone-100 bg-stone-50/50 text-stone-400 opacity-60";
                    }
                  } else {
                    if (isSelected) btnStyle = "border-secondary bg-secondary/5 text-primary font-bold";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(idx)}
                      disabled={showFeedback}
                      className={`w-full flex justify-between items-start text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer text-sm md:text-base leading-relaxed ${btnStyle}`}
                    >
                      <span>{option}</span>
                      
                      {/* Correct/Incorrect Icons */}
                      {showFeedback && isCorrect && (
                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 ml-3 shadow-sm">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                      {showFeedback && isSelected && !isCorrect && (
                        <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0 ml-3 shadow-sm">
                          <X className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Correctness feedback & Explanation */}
              {selectedAns !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-stone-50 border border-stone-200/50 rounded-2xl p-4 space-y-2 mt-4"
                >
                  <div className="flex items-center gap-2 font-bold text-xs md:text-sm">
                    {selectedAns === currentQuestion.answerIndex ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <Check className="w-4 h-4 stroke-[3]" /> Jawaban Benar!
                      </span>
                    ) : (
                      <span className="text-red-600 flex items-center gap-1">
                        <X className="w-4 h-4 stroke-[3]" /> Jawaban Kurang Tepat
                      </span>
                    )}
                  </div>
                  <p className="text-stone-500 text-xs md:text-sm leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </motion.div>
              )}

              {/* Next Button */}
              {selectedAns !== null && (
                <div className="flex justify-end pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    className="flex items-center gap-2 bg-primary hover:bg-primary/95 text-white px-6 py-3 rounded-xl font-bold tracking-wide transition shadow-md shadow-primary/10 cursor-pointer text-xs md:text-sm"
                  >
                    {currentIdx + 1 === totalQuestions ? "Selesai" : "Selanjutnya"}
                    <ArrowRight className="w-4 h-4 text-secondary" />
                  </motion.button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="finished-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-stone-200/40 rounded-3xl p-8 md:p-12 shadow-medium text-center space-y-6 md:space-y-8"
            >
              {/* Finished Icon */}
              <div className="mx-auto w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 shadow-sm">
                <Trophy className="w-8 h-8" />
              </div>

              {/* Score Display */}
              <div className="space-y-2">
                <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-primary">
                  Hasil Evaluasi
                </h3>
                <div className="inline-block py-2 px-6 rounded-full bg-stone-50 border border-stone-200/50 text-xl md:text-2xl font-black text-stone-800">
                  Skor: <span className="text-secondary font-black">{score}</span> / {totalQuestions}
                </div>
              </div>

              {/* Feedback text */}
              <div className="max-w-lg mx-auto space-y-3">
                <h4 className={`text-lg md:text-xl font-bold font-serif ${message.color}`}>
                  {message.title}
                </h4>
                <p className="text-stone-500 text-sm md:text-base leading-relaxed">
                  {message.desc}
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-center pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleRestart}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/95 text-white px-8 py-3.5 rounded-2xl font-bold tracking-wide transition shadow-lg shadow-primary/10 cursor-pointer text-sm"
                >
                  <RotateCcw className="w-4 h-4 text-secondary" />
                  Ulangi Kuis
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
