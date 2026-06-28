"use client";

import React, { useState, useEffect } from "react";
import { Send, User, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Comment {
  id: string;
  name: string;
  content: string;
  date: string;
}

const INITIAL_COMMENTS: Comment[] = [
  {
    id: "1",
    name: "Ketut Artawan",
    content: "Penjelasan bagian penjornya sangat detail! Sangat membantu anak muda Bali yang ingin mendalami makna filosofis dibalik ornamen penjor.",
    date: "28 Juni 2026 08:30 WITA"
  },
  {
    id: "2",
    name: "Ni Luh Gede Indah",
    content: "Saya baru tahu kalau persembahyangan Kuningan harus diselesaikan sebelum tengah hari (jam 12) karena leluhur kembali ke swargaloka. Penjelasannya mendidik sekali.",
    date: "28 Juni 2026 10:15 WITA"
  },
  {
    id: "3",
    name: "Wayan Sudarsa",
    content: "Model 3D Penjornya interaktif dan sangat halus diputar di HP. Memudahkan pembelajaran budaya secara modern. Ditunggu kelanjutan halaman hari raya lainnya!",
    date: "27 Juni 2026 18:45 WITA"
  }
];

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  // Load comments from localStorage or fallback to initial comments
  useEffect(() => {
    const saved = localStorage.getItem("balikala_comments_galungan");
    if (saved) {
      try {
        setComments(JSON.parse(saved));
      } catch (e) {
        setComments(INITIAL_COMMENTS);
      }
    } else {
      setComments(INITIAL_COMMENTS);
    }
  }, []);

  const saveComments = (newComments: Comment[]) => {
    setComments(newComments);
    localStorage.setItem("balikala_comments_galungan", JSON.stringify(newComments));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      setError("Nama dan komentar harus diisi.");
      return;
    }

    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleString("id-ID", {
      month: "long"
    })} ${now.getFullYear()} ${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")} WITA`;

    const newComment: Comment = {
      id: Date.now().toString(),
      name: name.trim(),
      content: content.trim(),
      date: formattedDate
    };

    const updatedComments = [newComment, ...comments];
    saveComments(updatedComments);

    // Reset Form
    setName("");
    setContent("");
    setError("");
  };

  // Helper to generate a random background pastel color for avatar
  const getAvatarBg = (nameStr: string) => {
    const code = nameStr.charCodeAt(0) + (nameStr.charCodeAt(1) || 0);
    const colors = [
      "bg-orange-100 text-orange-700 border-orange-200",
      "bg-amber-100 text-amber-700 border-amber-200",
      "bg-yellow-100 text-yellow-700 border-yellow-200",
      "bg-emerald-100 text-emerald-700 border-emerald-200",
      "bg-stone-100 text-stone-700 border-stone-200"
    ];
    return colors[code % colors.length];
  };

  return (
    <section
      id="comment-section"
      className="py-20 bg-[#FFFFFF]"
    >
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="w-12 h-12 rounded-2xl bg-[#8B5E3C]/10 flex items-center justify-center text-[#8B5E3C] mx-auto">
            <MessageSquare size={20} />
          </div>
          <h2 className="mt-4 text-3xl font-serif font-extrabold text-[#2D2D2D] tracking-tight">
            Ruang Diskusi & Catatan Perjalanan
          </h2>
          <p className="mt-3 text-stone-500 text-sm max-w-md mx-auto leading-relaxed">
            Bagikan kesan perjalanan budaya Anda atau tanyakan hal-hal menarik mengenai tradisi Galungan & Kuningan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Left: Input Form */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-5 bg-[#F8F5F0]/60 border border-stone-200/50 rounded-2xl p-6 space-y-4 shadow-soft"
          >
            <h3 className="text-sm font-bold text-stone-800 tracking-tight flex items-center gap-1.5 border-b border-stone-200/50 pb-2">
              Tulis Komentar
            </h3>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 text-red-600 text-xs font-semibold">
                ⚠️ {error}
              </div>
            )}

            <div className="space-y-1">
              <label htmlFor="name-input" className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                Nama Lengkap
              </label>
              <div className="relative">
                <input
                  id="name-input"
                  type="text"
                  placeholder="Contoh: I Putu Eka"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-stone-250/60 rounded-xl text-xs md:text-sm text-stone-700 focus:outline-none focus:border-[#8B5E3C] focus:ring-1 focus:ring-[#8B5E3C]"
                />
                <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="comment-input" className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                Isi Komentar
              </label>
              <textarea
                id="comment-input"
                rows={4}
                placeholder="Tulis tanggapan atau pertanyaan Anda mengenai tradisi..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-stone-250/60 rounded-xl text-xs md:text-sm text-stone-700 focus:outline-none focus:border-[#8B5E3C] focus:ring-1 focus:ring-[#8B5E3C] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#8B5E3C] hover:bg-[#724D31] text-white text-xs font-bold rounded-xl shadow-soft hover:shadow-medium transition duration-200 cursor-pointer"
            >
              Kirim Komentar
              <Send size={12} />
            </button>
          </form>

          {/* Right: Comments List */}
          <div className="md:col-span-7 space-y-4 max-h-[460px] overflow-y-auto pr-2">
            <AnimatePresence initial={false}>
              {comments.length === 0 ? (
                <div className="text-center py-10 text-stone-400 text-xs">
                  Belum ada komentar. Jadilah yang pertama berkomentar!
                </div>
              ) : (
                comments.map((comment) => {
                  const avatarColorClass = getAvatarBg(comment.name);
                  const initials = comment.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase();

                  return (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="p-5 border border-stone-100 rounded-xl bg-white flex gap-4 shadow-soft items-start"
                    >
                      {/* Avatar */}
                      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold text-xs shrink-0 select-none ${avatarColorClass}`}>
                        {initials}
                      </div>

                      {/* Comment Body */}
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex justify-between items-center gap-2">
                          <h4 className="text-xs font-bold text-stone-850 truncate">
                            {comment.name}
                          </h4>
                          <span className="text-[9px] text-stone-400 font-semibold shrink-0">
                            {comment.date}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-stone-600 leading-relaxed word-break">
                          {comment.content}
                        </p>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
