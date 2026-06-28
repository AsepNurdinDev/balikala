"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../beranda/components/Navbar/Navbar";
import Footer from "../beranda/components/Footer/Footer";
import { getAllPosts, getImageUrl, Post } from "../services/api";
import { Search, Calendar, ArrowRight, BookOpen, Clock, FileText } from "lucide-react";

function BlogListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState(searchQuery);

  // Sync search input state with URL query param changes
  useEffect(() => {
    setSearchInput(searchQuery);
    fetchBlogPosts(searchQuery);
  }, [searchQuery]);

  const fetchBlogPosts = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllPosts(query);
      setPosts(data);
    } catch (err: any) {
      setError(err.message || "Gagal memuat artikel.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchInput.trim())}`);
    } else {
      router.push("/blog");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] flex flex-col pt-24 font-sans">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-stone-100 to-[#F8F5F0] py-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <span className="text-secondary text-xs md:text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            Jendela Budaya
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
            Blog & Artikel BaliKala
          </h1>
          <p className="text-stone-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-medium">
            Temukan ulasan mendalam mengenai filosofi, prosesi, dan nilai luhur hari raya suci serta adat budaya Hindu di Bali.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-lg mx-auto relative flex items-center mt-8">
            <input
              type="text"
              placeholder="Cari artikel budaya..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-12 pr-28 py-3.5 border border-stone-200 rounded-2xl bg-white text-slate-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-semibold transition-all shadow-sm"
            />
            <Search className="w-5 h-5 text-stone-400 absolute left-4" />
            <button
              type="submit"
              className="absolute right-2 px-5 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-[#7c5333] transition-colors cursor-pointer"
            >
              Cari
            </button>
          </form>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
        {error && (
          <div className="mb-8 max-w-2xl mx-auto bg-red-50 border-l-4 border-red-500 p-4 rounded-xl text-sm text-red-700 font-semibold">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-3xl overflow-hidden border border-stone-200/40 shadow-soft h-[420px] animate-pulse flex flex-col">
                <div className="bg-stone-200 h-48 w-full" />
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="bg-stone-200 h-4 w-24 rounded" />
                    <div className="bg-stone-200 h-6 w-full rounded" />
                    <div className="bg-stone-200 h-4 w-5/6 rounded" />
                  </div>
                  <div className="bg-stone-200 h-4 w-1/3 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white border border-stone-200/40 rounded-3xl p-16 text-center max-w-xl mx-auto shadow-soft">
            <FileText className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h3 className="text-xl font-serif font-bold text-slate-700 mb-1">
              Artikel Tidak Ditemukan
            </h3>
            <p className="text-stone-400 text-sm mb-6">
              {searchQuery ? `Tidak ada hasil untuk pencarian "${searchQuery}". Silakan coba kata kunci lain.` : "Belum ada artikel yang dipublikasikan saat ini."}
            </p>
            {searchQuery && (
              <button
                onClick={() => router.push("/blog")}
                className="text-sm font-bold text-primary hover:underline cursor-pointer"
              >
                Tampilkan Semua Artikel
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-3xl overflow-hidden border border-stone-200/40 shadow-soft hover:shadow-medium hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
              >
                {/* Image Wrap */}
                <div className="h-52 w-full bg-stone-100 overflow-hidden relative border-b border-stone-100">
                  {post.image ? (
                    <img
                      src={getImageUrl(post.image)}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-stone-50 text-stone-300">
                      <BookOpen className="w-10 h-10" />
                    </div>
                  )}
                </div>

                {/* Content Wrap */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-stone-400 font-semibold">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.created_at).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        3 mnt baca
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-slate-800 text-lg md:text-xl line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-stone-500 text-xs md:text-sm line-clamp-3 leading-relaxed font-medium">
                      {post.content}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-stone-100">
                    <Link
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary transition-colors"
                    >
                      Baca Selengkapnya
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default function BlogListPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div className="min-h-screen bg-[#F8F5F0] flex flex-col justify-center items-center pt-24">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <BlogListContent />
      </Suspense>
      <Footer />
    </>
  );
}
