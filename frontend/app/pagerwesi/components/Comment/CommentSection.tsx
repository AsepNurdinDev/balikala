"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CommentData } from "../../types";
import { initialComments } from "../../data";
import { MessageSquare, Send, User } from "lucide-react";

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

  // Helper to get initials for avatar
  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(" ");
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
          <span className="text-secondary text-xs md:text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-1.5">
            <MessageSquare className="w-4 h-4" />
            Ruang Diskusi
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-primary">
            Tanggapan & Komentar
          </h2>
          <p className="text-stone-500 text-sm md:text-base leading-relaxed">
            Bagikan pemikiran, perenungan, atau pertanyaan Anda tentang filosofi Pagerwesi bersama pembelajar lainnya.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Comment Form */}
          <div className="lg:col-span-5 bg-stone-50 border border-stone-200/50 rounded-3xl p-6 shadow-soft">
            <h3 className="font-serif text-lg font-bold text-stone-800 mb-6 flex items-center gap-2">
              Tulis Komentar
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-1.5">
                <label htmlFor="name-input" className="block text-xs font-bold uppercase tracking-wider text-stone-500">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    id="name-input"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama Anda..."
                    className="w-full bg-white border border-stone-200 focus:border-secondary rounded-xl pl-11 pr-4 py-3 text-stone-700 text-sm focus:outline-none focus:ring-4 focus:ring-secondary/15 transition placeholder-stone-400"
                  />
                </div>
              </div>

              {/* Comment Field */}
              <div className="space-y-1.5">
                <label htmlFor="comment-input" className="block text-xs font-bold uppercase tracking-wider text-stone-500">
                  Komentar Anda
                </label>
                <textarea
                  id="comment-input"
                  required
                  rows={4}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Ketik komentar Anda disini..."
                  className="w-full bg-white border border-stone-200 focus:border-secondary rounded-xl p-4 text-stone-700 text-sm focus:outline-none focus:ring-4 focus:ring-secondary/15 transition resize-none placeholder-stone-400"
                />
              </div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={!name.trim() || !commentText.trim()}
                className="w-full flex items-center justify-center gap-2 bg-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/95 text-white py-3.5 rounded-xl font-bold tracking-wide transition shadow-md shadow-primary/10 cursor-pointer text-xs uppercase"
              >
                <Send className="w-4 h-4 text-secondary" />
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
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary border border-secondary/20 flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                      {getInitials(comment.name)}
                    </div>

                    {/* Comment content */}
                    <div className="space-y-1.5 flex-1">
                      <div className="flex justify-between items-center gap-2 flex-wrap">
                        <span className="font-bold text-stone-800 text-sm">{comment.name}</span>
                        <span className="text-stone-400 text-[10px] md:text-xs font-semibold">{comment.date}</span>
                      </div>
                      <p className="text-stone-600 text-xs md:text-sm leading-relaxed whitespace-pre-line font-sans font-medium">
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
