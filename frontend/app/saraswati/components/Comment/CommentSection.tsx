"use client";

import { useState, useEffect, useCallback } from "react";
import { formatIndonesianDate } from "../../utils";
import { MessageSquare, Send, User, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getFestivalPostId,
  getCommentsByPost,
  createComment,
  Comment,
} from "../../../services/api";
import { getInitials } from "../../utils";

export default function CommentSection() {
  const [postId, setPostId] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");

  // Ambil post_id festival Saraswati, lalu muat komentar
  const loadComments = useCallback(async (pid: number) => {
    setLoadingComments(true);
    setError(null);
    try {
      const data = await getCommentsByPost(pid);
      setComments(data.reverse()); // terbaru di atas
    } catch (err: any) {
      setError(err.message || "Gagal memuat komentar.");
    } finally {
      setLoadingComments(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const pid = await getFestivalPostId("saraswati");
        setPostId(pid);
        await loadComments(pid);
      } catch (err: any) {
        setError("Komentar tidak dapat dimuat saat ini.");
        setLoadingComments(false);
      }
    })();
  }, [loadComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !commentText.trim() || postId === null) return;

    setSubmitting(true);
    setError(null);
    try {
      const newComment = await createComment(postId, {
        name: name.trim(),
        body: commentText.trim(),
      });
      setComments((prev) => [newComment, ...prev]);
      setName("");
      setCommentText("");
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Gagal mengirim komentar. Coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="comments-section"
      className="py-24 bg-white relative overflow-hidden px-6 lg:px-8 border-t border-slate-200/40 scroll-mt-12"
    >
      <div className="max-w-4xl mx-auto relative z-10 space-y-14">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-4">
          <span className="text-blue-600 text-xs md:text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-1.5">
            <MessageSquare className="w-4 h-4" />
            Ruang Diskusi
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-800">
            Tanggapan &amp; Komentar
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Bagikan pemikiran, perenungan, atau pertanyaan Anda tentang Hari Raya Saraswati bersama para pelajar lainnya.
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
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

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left — Form */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 shadow-xs">
              <h3 className="font-serif font-bold text-slate-800 text-lg mb-5">Tulis Komentar</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="sara-name-input" className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="sara-name-input"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Masukkan nama Anda..."
                      className="w-full bg-white border border-slate-200 focus:border-blue-300 rounded-xl pl-11 pr-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-4 focus:ring-blue-100 transition placeholder-slate-400"
                    />
                  </div>
                </div>

                {/* Comment */}
                <div className="space-y-1.5">
                  <label htmlFor="sara-comment-input" className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Komentar Anda
                  </label>
                  <textarea
                    id="sara-comment-input"
                    required
                    rows={4}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Bagikan pemikiran Anda tentang Hari Raya Saraswati..."
                    className="w-full bg-white border border-slate-200 focus:border-blue-300 rounded-xl p-4 text-slate-700 text-sm focus:outline-none focus:ring-4 focus:ring-blue-100 transition resize-none placeholder-slate-400"
                  />
                </div>

                {/* Success toast */}
                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 text-xs font-semibold"
                    >
                      ✓ Komentar berhasil dikirim!
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={!name.trim() || !commentText.trim() || submitting || postId === null}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold tracking-wide transition shadow-md shadow-blue-500/10 cursor-pointer text-xs uppercase"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {submitting ? "Mengirim..." : "Kirim Tanggapan"}
                </motion.button>
              </form>
            </div>
          </div>

          {/* Right — List */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-serif font-bold text-slate-800 text-lg flex items-center gap-2">
              Daftar Komentar
              <span className="text-sm font-extrabold text-blue-500 bg-blue-50 border border-blue-100 rounded-full px-2.5 py-0.5">
                {comments.length}
              </span>
            </h3>

            {loadingComments ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3 text-slate-400">
                <Loader2 className="w-7 h-7 animate-spin" />
                <p className="text-sm font-medium">Memuat komentar...</p>
              </div>
            ) : comments.length === 0 ? (
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-10 text-center">
                <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-400 text-sm font-medium">Belum ada komentar. Jadilah yang pertama!</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1 scrollbar-hide">
                <AnimatePresence initial={false}>
                  {comments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35 }}
                      className="bg-white border border-slate-100 rounded-2xl p-5 flex gap-4 items-start shadow-xs hover:shadow-sm transition"
                    >
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center text-xs font-bold shrink-0">
                        {getInitials(comment.name)}
                      </div>
                      {/* Content */}
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex justify-between items-center gap-2 flex-wrap">
                          <span className="font-bold text-slate-800 text-sm">{comment.name}</span>
                          <span className="text-slate-400 text-[10px] md:text-xs font-semibold">
                            {new Date(comment.created_at).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <p className="text-slate-600 text-xs md:text-sm leading-relaxed whitespace-pre-line font-medium">
                          {comment.body}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
