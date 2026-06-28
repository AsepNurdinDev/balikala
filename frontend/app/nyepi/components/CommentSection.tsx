"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, User } from "lucide-react";

interface CommentData {
  id: string;
  name: string;
  comment: string;
  date: string;
}

const initialComments: CommentData[] = [
  {
    id: "1",
    name: "I Wayan Sudarma",
    comment: "Melaksanakan Catur Brata Penyepian selalu memberikan ketenangan batin yang luar biasa setiap tahunnya. Halaman ini berhasil menggambarkan esensi Nyepi dengan sangat indah dan interaktif.",
    date: "19 Maret 2026",
  },
  {
    id: "2",
    name: "Made Hendra Wijaya",
    comment: "Penjelasan mengenai prosesi Melasti dan Tawur Agung Kesanga sangat detail dan mudah dipahami. Sangat berguna bagi generasi muda dan wisatawan yang ingin mendalami budaya Bali.",
    date: "18 Maret 2026",
  },
  {
    id: "3",
    name: "Ketut Sri Wahyuni",
    comment: "Suka sekali dengan visualisasi model 3D Ogoh-Ogohnya! Sangat inovatif sebagai media pembelajaran budaya berbasis web modern.",
    date: "17 Maret 2026",
  },
];

export default function CommentSection() {
  const [comments, setComments] = useState<CommentData[]>(initialComments);
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !commentText.trim()) return;

    const newComment: CommentData = {
      id: Date.now().toString(),
      name: name.trim(),
      comment: commentText.trim(),
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };

    setComments((prev) => [newComment, ...prev]);
    setName("");
    setCommentText("");
  };

  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return fullName.slice(0, 2).toUpperCase();
  };

  return (
    <section
      id="comments-section"
      className="py-24 bg-white relative overflow-hidden px-6 lg:px-8 border-t border-stone-200/40 scroll-mt-12"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <span className="text-[#8B5E3C] text-xs md:text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-1.5">
            <MessageSquare className="w-4 h-4" />
            Ruang Diskusi
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#8B5E3C]">
            Tanggapan & Komentar
          </h2>
          <p className="text-stone-500 text-sm md:text-base leading-relaxed">
            Bagikan pemikiran, perenungan, atau pertanyaan Anda tentang filosofi Hari Suci Nyepi bersama pembelajar lainnya.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Comment Form */}
          <div className="lg:col-span-5 bg-stone-50 border border-stone-200/50 rounded-3xl p-6 shadow-soft">
            <h3 className="font-serif text-lg font-bold text-stone-850 mb-6 flex items-center gap-2">
              Tulis Komentar
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-1.5">
                <label htmlFor="nyepi-name-input" className="block text-xs font-bold uppercase tracking-wider text-stone-550">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    id="nyepi-name-input"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama Anda..."
                    className="w-full bg-white border border-stone-200 focus:border-[#8B5E3C] rounded-xl pl-11 pr-4 py-3 text-stone-700 text-sm focus:outline-none focus:ring-4 focus:ring-[#8B5E3C]/10 transition placeholder-stone-400 font-medium"
                  />
                </div>
              </div>

              {/* Comment Field */}
              <div className="space-y-1.5">
                <label htmlFor="nyepi-comment-input" className="block text-xs font-bold uppercase tracking-wider text-stone-550">
                  Komentar Anda
                </label>
                <textarea
                  id="nyepi-comment-input"
                  required
                  rows={4}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Ketik komentar Anda disini..."
                  className="w-full bg-white border border-stone-200 focus:border-[#8B5E3C] rounded-xl p-4 text-stone-700 text-sm focus:outline-none focus:ring-4 focus:ring-[#8B5E3C]/10 transition resize-none placeholder-stone-400 font-medium"
                />
              </div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={!name.trim() || !commentText.trim()}
                className="w-full flex items-center justify-center gap-2 bg-[#8B5E3C] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#724D31] text-white py-3.5 rounded-xl font-bold tracking-wide transition shadow-md shadow-[#8B5E3C]/10 cursor-pointer text-xs uppercase"
              >
                <Send className="w-4 h-4 text-[#C89B3C]" />
                Kirim Tanggapan
              </motion.button>
            </form>
          </div>

          {/* Right Column: Comments List */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-serif text-lg font-bold text-stone-850 flex items-center gap-2">
              Daftar Komentar ({comments.length})
            </h3>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-hide">
              <AnimatePresence initial={false}>
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white border border-stone-150 rounded-2xl p-5 flex gap-4 items-start shadow-soft hover:shadow-medium transition"
                  >
                    {/* Avatar Circle */}
                    <div className="w-10 h-10 rounded-full bg-[#8B5E3C]/10 text-[#8B5E3C] border border-[#C89B3C]/20 flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                      {getInitials(comment.name)}
                    </div>

                    {/* Comment content */}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-2 flex-wrap">
                        <span className="font-bold text-stone-800 text-sm">{comment.name}</span>
                        <span className="text-stone-400 text-[10px] md:text-xs font-semibold">{comment.date}</span>
                      </div>
                      <p className="text-stone-600 text-xs md:text-sm leading-relaxed whitespace-pre-line font-medium">
                        {comment.comment}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
