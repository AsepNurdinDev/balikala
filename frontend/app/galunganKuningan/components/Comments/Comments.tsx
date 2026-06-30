"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Send, User, MessageSquare, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getFestivalPostId,
  getCommentsByPost,
  createComment,
  Comment,
} from "../../../services/api";

function getAvatarBg(nameStr: string): string {
  const code = nameStr.charCodeAt(0) + (nameStr.charCodeAt(1) || 0);
  const colors = [
    "bg-orange-100 text-orange-700 border-orange-200",
    "bg-amber-100 text-amber-700 border-amber-200",
    "bg-yellow-100 text-yellow-700 border-yellow-200",
    "bg-emerald-100 text-emerald-700 border-emerald-200",
    "bg-stone-100 text-stone-700 border-stone-200",
  ];
  return colors[code % colors.length];
}

export default function Comments() {
  const [postId, setPostId] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const loadComments = useCallback(async (pid: number) => {
    setLoadingComments(true);
    setError(null);
    try {
      const data = await getCommentsByPost(pid);
      setComments(data.reverse());
    } catch (err: any) {
      setError(err.message || "Gagal memuat komentar.");
    } finally {
      setLoadingComments(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const pid = await getFestivalPostId("galungan-kuningan");
        setPostId(pid);
        await loadComments(pid);
      } catch {
        setError("Komentar tidak dapat dimuat saat ini.");
        setLoadingComments(false);
      }
    })();
  }, [loadComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim() || postId === null) return;

    setSubmitting(true);
    setError(null);
    try {
      const newComment = await createComment(postId, {
        name: name.trim(),
        body: content.trim(),
      });
      setComments((prev) => [newComment, ...prev]);
      setName("");
      setContent("");
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Gagal mengirim komentar. Coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="comment-section" className="py-20 bg-[#FFFFFF]">
      <div className="max-w-4xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="w-12 h-12 rounded-2xl bg-[#8B5E3C]/10 flex items-center justify-center text-[#8B5E3C] mx-auto">
            <MessageSquare size={20} />
          </div>
          <h2 className="mt-4 text-3xl font-serif font-extrabold text-[#2D2D2D] tracking-tight">
            Ruang Diskusi &amp; Catatan Perjalanan
          </h2>
          <p className="mt-3 text-stone-500 text-sm max-w-md mx-auto leading-relaxed">
            Bagikan kesan perjalanan budaya Anda atau tanyakan hal-hal menarik mengenai tradisi Galungan &amp; Kuningan.
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm font-medium flex-1">{error}</p>
            {postId && (
              <button
                onClick={() => loadComments(postId)}
                className="text-red-600 hover:text-red-800 transition cursor-pointer"
                title="Coba lagi"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">

          {/* Left: Input Form */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-5 bg-[#F8F5F0]/60 border border-stone-200/50 rounded-2xl p-6 space-y-4 shadow-soft"
          >
            <h3 className="text-sm font-bold text-stone-800 tracking-tight flex items-center gap-1.5 border-b border-stone-200/50 pb-2">
              Tulis Komentar
            </h3>

            {/* Success toast */}
            <AnimatePresence>
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3 rounded-lg bg-green-50 text-green-700 text-xs font-semibold border border-green-200"
                >
                  ✓ Komentar berhasil dikirim!
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1">
              <label htmlFor="galungan-name-input" className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                Nama Lengkap
              </label>
              <div className="relative">
                <input
                  id="galungan-name-input"
                  type="text"
                  placeholder="Contoh: I Putu Eka"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-stone-250/60 rounded-xl text-xs md:text-sm text-stone-700 focus:outline-none focus:border-[#8B5E3C] focus:ring-1 focus:ring-[#8B5E3C]"
                />
                <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="galungan-comment-input" className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                Isi Komentar
              </label>
              <textarea
                id="galungan-comment-input"
                rows={4}
                placeholder="Tulis tanggapan atau pertanyaan Anda mengenai tradisi..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-white border border-stone-250/60 rounded-xl text-xs md:text-sm text-stone-700 focus:outline-none focus:border-[#8B5E3C] focus:ring-1 focus:ring-[#8B5E3C] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={!name.trim() || !content.trim() || submitting || postId === null}
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#8B5E3C] hover:bg-[#724D31] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl shadow-soft hover:shadow-medium transition duration-200 cursor-pointer"
            >
              {submitting ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <Send size={12} />
              )}
              {submitting ? "Mengirim..." : "Kirim Komentar"}
            </button>
          </form>

          {/* Right: Comments List */}
          <div className="md:col-span-7 space-y-4 max-h-[460px] overflow-y-auto pr-2">
            {loadingComments ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3 text-stone-400">
                <Loader2 className="w-7 h-7 animate-spin" />
                <p className="text-sm font-medium">Memuat komentar...</p>
              </div>
            ) : (
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
                              {new Date(comment.created_at).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <p className="text-xs md:text-sm text-stone-600 leading-relaxed word-break">
                            {comment.body}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
