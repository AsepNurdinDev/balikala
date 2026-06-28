"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../../beranda/components/Navbar/Navbar";
import Footer from "../../beranda/components/Footer/Footer";
import { getPostById, getCommentsByPost, createComment, getImageUrl, Post, Comment } from "../../services/api";
import { Calendar, User, MessageSquare, ArrowLeft, Send, AlertCircle, Clock, BookOpen } from "lucide-react";

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  const postId = typeof params.id === "string" ? parseInt(params.id, 10) : null;

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [commentSaving, setCommentSaving] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [commentSuccess, setCommentSuccess] = useState(false);

  useEffect(() => {
    if (postId === null || isNaN(postId)) {
      setError("ID Post tidak valid");
      setLoading(false);
      return;
    }

    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch article details and comments in parallel as per API contract & guidelines
        const [postData, commentsData] = await Promise.all([
          getPostById(postId),
          getCommentsByPost(postId),
        ]);

        setPost(postData);
        
        // Sort comments by created_at ascending (oldest first)
        const sortedComments = [...commentsData].sort((a, b) => {
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        });
        setComments(sortedComments);
      } catch (err: any) {
        setError(err.message || "Gagal memuat data artikel.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [postId]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (postId === null || isNaN(postId)) return;

    setCommentSaving(true);
    setCommentError(null);
    setCommentSuccess(false);

    if (!name.trim() || !body.trim()) {
      setCommentError("Nama dan isi komentar wajib diisi.");
      setCommentSaving(false);
      return;
    }

    try {
      const payload: { name: string; email?: string; body: string } = {
        name: name.trim(),
        body: body.trim(),
      };

      if (email.trim()) {
        payload.email = email.trim();
      }

      const newComment = await createComment(postId, payload);
      
      // Update local comments state without reload as per requirements
      setComments((prev) => [...prev, newComment]);
      
      // Clear form
      setName("");
      setEmail("");
      setBody("");
      setCommentSuccess(true);
      
      // Fade out success message after 3 seconds
      setTimeout(() => setCommentSuccess(false), 3000);
    } catch (err: any) {
      setCommentError(err.message || "Gagal mengirimkan komentar.");
    } finally {
      setCommentSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F5F0] flex flex-col justify-center items-center">
        <Navbar />
        <div className="flex flex-col items-center gap-3 py-24">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-stone-500 text-sm font-semibold">Memuat isi artikel...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#F8F5F0] flex flex-col justify-between">
        <Navbar />
        <main className="max-w-2xl mx-auto px-6 py-24 text-center space-y-6">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-2xl font-serif font-bold text-slate-800">Gagal Membuka Artikel</h2>
          <p className="text-stone-500 text-sm">{error || "Artikel tidak ditemukan atau telah dihapus."}</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Daftar Blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5F0] flex flex-col pt-24 font-sans">
      <Navbar />

      {/* Article Content */}
      <main className="flex-grow max-w-4xl mx-auto px-6 py-8 w-full space-y-10">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Blog
          </Link>
        </div>

        {/* Article Meta Headers */}
        <div className="space-y-4">
          <span className="text-secondary text-xs font-bold tracking-widest uppercase flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            Artikel Budaya
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-slate-800 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-stone-400 font-semibold pt-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              {new Date(post.created_at).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              3 menit membaca
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-primary">
              <MessageSquare className="w-3.5 h-3.5" />
              {comments.length} Komentar
            </span>
          </div>
        </div>

        {/* Feature Image Banner */}
        {post.image && (
          <div className="w-full h-80 md:h-[450px] rounded-3xl overflow-hidden shadow-soft border border-stone-200/30">
            <img
              src={getImageUrl(post.image)}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>
        )}

        {/* Text Content */}
        <article className="prose prose-stone max-w-none text-slate-700 leading-relaxed font-medium text-sm md:text-base space-y-6 pt-4">
          {post.content.split("\n").map((paragraph, index) => {
            if (!paragraph.trim()) return null;
            return <p key={index}>{paragraph}</p>;
          })}
        </article>

        {/* Comments Section */}
        <section className="border-t border-stone-200/50 pt-12 space-y-10">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-serif font-bold text-slate-800">
              Komentar & Diskusi ({comments.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Comment Form */}
            <div className="lg:col-span-5 bg-white border border-stone-200/40 rounded-3xl p-6 shadow-soft space-y-4">
              <h3 className="text-sm font-bold text-slate-800 tracking-wide uppercase">Kirim Tanggapan</h3>
              
              {commentError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-xl flex items-start gap-2.5 text-xs text-red-700 font-semibold">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{commentError}</span>
                </div>
              )}

              {commentSuccess && (
                <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-xl text-xs text-green-700 font-semibold">
                  Komentar berhasil dikirimkan! Terima kasih.
                </div>
              )}

              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                    Nama Anda <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: I Wayan..."
                    className="block w-full px-3.5 py-2.5 border border-stone-200 rounded-xl bg-white text-slate-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-xs font-semibold"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                    Email (Opsional)
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Contoh: wayan@email.com"
                    className="block w-full px-3.5 py-2.5 border border-stone-200 rounded-xl bg-white text-slate-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-xs font-semibold"
                  />
                </div>

                <div>
                  <label htmlFor="comment_body" className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                    Komentar <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="comment_body"
                    rows={4}
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Bagikan pemikiran atau tanggapan Anda..."
                    className="block w-full px-3.5 py-2.5 border border-stone-200 rounded-xl bg-white text-slate-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-xs font-medium leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={commentSaving}
                  className="w-full flex items-center justify-center gap-1.5 bg-primary text-white py-2.5 rounded-xl hover:bg-[#7c5333] transition-all text-xs font-bold shadow-sm hover:shadow cursor-pointer disabled:opacity-75"
                >
                  <Send className="w-3.5 h-3.5" />
                  Kirim Komentar
                </button>
              </form>
            </div>

            {/* Right: Comments List */}
            <div className="lg:col-span-7 space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {comments.length === 0 ? (
                <div className="bg-white/40 border border-dashed border-stone-200 rounded-3xl p-8 text-center text-stone-400 text-xs font-semibold">
                  Belum ada komentar untuk artikel ini. Jadilah yang pertama memberikan tanggapan!
                </div>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-white border border-stone-150 rounded-2xl p-4 md:p-5 shadow-soft space-y-2.5 hover:border-stone-200 transition-colors"
                    >
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-stone-400 font-semibold">
                        <span className="font-bold text-slate-700 flex items-center gap-1">
                          <User className="w-3 h-3 text-primary" />
                          {comment.name}
                        </span>
                        <span>•</span>
                        <span>
                          {new Date(comment.created_at).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
                        {comment.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
