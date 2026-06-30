"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  getAllPosts,
  getCommentsByPost,
  deleteComment,
  getToken,
  logout,
  Comment,
  getAllFestivalComments,
  CommentWithFestivalLabel,
  FESTIVAL_SLUGS,
} from "../../services/api";
import {
  ArrowLeft,
  Trash2,
  LogOut,
  MessageSquare,
  AlertCircle,
  Calendar,
  Mail,
  User,
  Loader2,
  RefreshCw,
  Landmark,
  BookOpen,
  Tag,
} from "lucide-react";

interface CommentWithPostTitle extends Comment {
  post_title: string;
}

type ActiveTab = "blog" | "festival";

export default function AdminCommentsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ActiveTab>("blog");

  // Blog comments state
  const [blogComments, setBlogComments] = useState<CommentWithPostTitle[]>([]);
  const [loadingBlog, setLoadingBlog] = useState(true);
  const [errorBlog, setErrorBlog] = useState<string | null>(null);

  // Festival comments state
  const [festivalComments, setFestivalComments] = useState<CommentWithFestivalLabel[]>([]);
  const [loadingFestival, setLoadingFestival] = useState(true);
  const [errorFestival, setErrorFestival] = useState<string | null>(null);

  // Filter state for festival tab
  const [festivalFilter, setFestivalFilter] = useState<string>("all");

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }
    loadBlogComments();
    loadFestivalComments();
  }, [router]);

  // --- Load Blog Comments ---
  const loadBlogComments = async () => {
    setLoadingBlog(true);
    setErrorBlog(null);
    try {
      const posts = await getAllPosts();
      const commentsPromises = posts.map(async (post) => {
        try {
          const postComments = await getCommentsByPost(post.id);
          return postComments.map((c) => ({
            ...c,
            post_title: post.title,
          }));
        } catch {
          return [];
        }
      });
      const results = await Promise.all(commentsPromises);
      const allComments = results
        .flat()
        // Exclude festival anchor posts from the blog tab
        .filter((c) => !c.post_title.startsWith("[FESTIVAL:"))
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setBlogComments(allComments);
    } catch (err: any) {
      setErrorBlog(err.message || "Gagal memuat data komentar blog.");
    } finally {
      setLoadingBlog(false);
    }
  };

  // --- Load Festival Comments ---
  const loadFestivalComments = async () => {
    setLoadingFestival(true);
    setErrorFestival(null);
    try {
      const data = await getAllFestivalComments();
      setFestivalComments(data);
    } catch (err: any) {
      setErrorFestival(err.message || "Gagal memuat komentar hari raya.");
    } finally {
      setLoadingFestival(false);
    }
  };

  // --- Delete Handler (shared) ---
  const handleDeleteComment = async (id: number, source: "blog" | "festival") => {
    if (confirm("Apakah Anda yakin ingin menghapus komentar ini?")) {
      try {
        await deleteComment(id);
        if (source === "blog") {
          setBlogComments((prev) => prev.filter((c) => c.id !== id));
        } else {
          setFestivalComments((prev) => prev.filter((c) => c.id !== id));
        }
      } catch (err: any) {
        alert(err.message || "Gagal menghapus komentar.");
      }
    }
  };

  const filteredFestivalComments =
    festivalFilter === "all"
      ? festivalComments
      : festivalComments.filter((c) => c.festival_slug === festivalFilter);

  const festivalCountBySlug = FESTIVAL_SLUGS.reduce((acc, { slug }) => {
    acc[slug] = festivalComments.filter((c) => c.festival_slug === slug).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-[#F8F5F0] flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-stone-200/60 sticky top-0 z-40 shadow-soft">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xl font-extrabold tracking-wide text-primary flex items-center gap-2">
              <span className="bg-primary text-white w-8 h-8 rounded-lg flex items-center justify-center font-serif text-base">B</span>
              <span className="font-sans font-extrabold text-primary">Bali<span className="text-secondary">Kala</span></span>
            </Link>
            <span className="text-stone-300">|</span>
            <h1 className="text-sm font-bold text-stone-600 uppercase tracking-widest flex items-center gap-1">
              Dashboard Admin
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admin/posts"
              className="text-stone-600 hover:text-primary transition font-semibold text-sm flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-stone-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Artikel
            </Link>
            <button
              onClick={() => logout()}
              className="text-red-600 hover:text-red-700 transition font-semibold text-sm flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-red-50 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Keluar
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-10 w-full">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-2xl font-serif font-bold text-slate-800">Manajemen Komentar</h2>
          <p className="text-stone-500 text-sm mt-1">Kelola seluruh komentar dari pengunjung BaliKala</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-white border border-stone-200/60 rounded-2xl p-1.5 w-fit mb-8 shadow-soft">
          <button
            id="tab-blog"
            onClick={() => setActiveTab("blog")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === "blog"
                ? "bg-primary text-white shadow-md"
                : "text-stone-500 hover:text-primary hover:bg-stone-50"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Komentar Blog
            <span className={`text-xs font-extrabold rounded-full px-2 py-0.5 ${activeTab === "blog" ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"}`}>
              {blogComments.length}
            </span>
          </button>
          <button
            id="tab-festival"
            onClick={() => setActiveTab("festival")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === "festival"
                ? "bg-secondary text-white shadow-md"
                : "text-stone-500 hover:text-secondary hover:bg-stone-50"
            }`}
          >
            <Landmark className="w-4 h-4" />
            Komentar Hari Raya
            <span className={`text-xs font-extrabold rounded-full px-2 py-0.5 ${activeTab === "festival" ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"}`}>
              {festivalComments.length}
            </span>
          </button>
        </div>

        {/* ===== TAB: BLOG COMMENTS ===== */}
        {activeTab === "blog" && (
          <div>
            {errorBlog && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span className="text-sm text-red-700 font-semibold flex-1">{errorBlog}</span>
                <button onClick={loadBlogComments} className="text-red-500 hover:text-red-700 cursor-pointer">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            )}

            {loadingBlog ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-stone-500 text-sm font-semibold">Memuat komentar blog...</p>
              </div>
            ) : blogComments.length === 0 ? (
              <div className="bg-white border border-stone-200/50 rounded-3xl p-12 text-center shadow-soft">
                <MessageSquare className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                <h3 className="text-lg font-serif font-bold text-slate-700 mb-1">Tidak Ada Komentar Blog</h3>
                <p className="text-stone-400 text-sm max-w-sm mx-auto">
                  Belum ada komentar dari pengguna pada artikel blog mana pun.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {blogComments.map((comment) => (
                  <CommentCard
                    key={comment.id}
                    comment={comment}
                    badge={comment.post_title}
                    badgeIcon={<BookOpen className="w-3 h-3" />}
                    badgeColor="text-primary"
                    onDelete={() => handleDeleteComment(comment.id, "blog")}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== TAB: FESTIVAL COMMENTS ===== */}
        {activeTab === "festival" && (
          <div>
            {/* Festival Filter */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                Filter:
              </span>
              <button
                onClick={() => setFestivalFilter("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                  festivalFilter === "all"
                    ? "bg-stone-800 text-white border-stone-800"
                    : "bg-white text-stone-500 border-stone-200 hover:border-stone-400"
                }`}
              >
                Semua ({festivalComments.length})
              </button>
              {FESTIVAL_SLUGS.map(({ slug, label }) => (
                <button
                  key={slug}
                  onClick={() => setFestivalFilter(slug)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                    festivalFilter === slug
                      ? "bg-secondary text-white border-secondary"
                      : "bg-white text-stone-500 border-stone-200 hover:border-secondary"
                  }`}
                >
                  {label} ({festivalCountBySlug[slug] ?? 0})
                </button>
              ))}
            </div>

            {errorFestival && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span className="text-sm text-red-700 font-semibold flex-1">{errorFestival}</span>
                <button onClick={loadFestivalComments} className="text-red-500 hover:text-red-700 cursor-pointer">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            )}

            {loadingFestival ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 className="w-10 h-10 text-secondary animate-spin" />
                <p className="text-stone-500 text-sm font-semibold">Memuat komentar hari raya...</p>
              </div>
            ) : filteredFestivalComments.length === 0 ? (
              <div className="bg-white border border-stone-200/50 rounded-3xl p-12 text-center shadow-soft">
                <Landmark className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                <h3 className="text-lg font-serif font-bold text-slate-700 mb-1">Tidak Ada Komentar</h3>
                <p className="text-stone-400 text-sm max-w-sm mx-auto">
                  {festivalFilter === "all"
                    ? "Belum ada komentar dari halaman hari raya mana pun."
                    : `Belum ada komentar pada halaman hari raya ${FESTIVAL_SLUGS.find(f => f.slug === festivalFilter)?.label}.`}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {filteredFestivalComments.map((comment) => (
                  <CommentCard
                    key={comment.id}
                    comment={comment}
                    badge={comment.festival_label}
                    badgeIcon={<Landmark className="w-3 h-3" />}
                    badgeColor="text-secondary"
                    onDelete={() => handleDeleteComment(comment.id, "festival")}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// ===== Reusable Comment Card Component =====
interface CommentCardProps {
  comment: Comment;
  badge: string;
  badgeIcon: React.ReactNode;
  badgeColor: string;
  onDelete: () => void;
}

function CommentCard({ comment, badge, badgeIcon, badgeColor, onDelete }: CommentCardProps) {
  return (
    <div className="bg-white border border-stone-200/40 rounded-3xl p-6 shadow-soft hover:shadow-medium transition-all flex flex-col md:flex-row md:items-start justify-between gap-6">
      <div className="space-y-3 flex-1">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-stone-500">
          <span className="font-bold text-slate-800 flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-primary" />
            {comment.name}
          </span>
          {comment.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              {comment.email}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(comment.created_at).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <p className="text-slate-700 text-sm leading-relaxed font-medium bg-stone-50/50 p-3.5 rounded-2xl border border-stone-100">
          {comment.body}
        </p>

        <div className={`text-xs ${badgeColor} flex items-center gap-1.5 font-semibold`}>
          {badgeIcon}
          <span className="text-stone-400">Sumber:</span>
          <span className="font-bold italic">{badge}</span>
        </div>
      </div>

      <div className="shrink-0 flex justify-end">
        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-700 transition p-3 rounded-2xl hover:bg-red-50 cursor-pointer flex items-center gap-1 text-xs font-bold border border-red-100"
          title="Hapus Komentar"
        >
          <Trash2 className="w-4 h-4" />
          Hapus
        </button>
      </div>
    </div>
  );
}
