"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginAdmin, getToken } from "../../services/api";
import { Lock, Mail, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (getToken()) {
      router.push("/admin/posts");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Email dan password wajib diisi");
      setLoading(false);
      return;
    }

    try {
      await loginAdmin(email, password);
      router.push("/admin/posts");
    } catch (err: any) {
      setError(err.message || "Email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F5F0] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />

      <div className="max-w-md w-full space-y-8 glass-panel p-8 md:p-10 rounded-3xl shadow-medium relative z-10 border border-white/60">
        <div className="text-center">
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-wide text-primary inline-flex items-center gap-2 mb-4"
          >
            <span className="bg-primary text-white w-9 h-9 rounded-xl flex items-center justify-center font-serif text-lg">B</span>
            <span className="font-sans font-extrabold text-primary">Bali<span className="text-secondary">Kala</span></span>
          </Link>
          <h2 className="text-3xl font-serif font-bold text-slate-800 tracking-tight">
            Login Admin
          </h2>
          <p className="mt-2 text-sm text-stone-500 font-medium">
            Kelola artikel dan diskusi komunitas BaliKala
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-start gap-3 animate-pulse">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="text-xs md:text-sm text-red-700 font-semibold">{error}</div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
                Alamat Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-stone-200 rounded-2xl bg-white/70 text-slate-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
                Kata Sandi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-stone-200 rounded-2xl bg-white/70 text-slate-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-primary hover:bg-[#7c5333] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-75 transition-all duration-300 shadow-md cursor-pointer hover:shadow-lg"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Masuk ke Dashboard"
              )}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <Link
            href="/"
            className="text-xs font-semibold text-primary hover:text-secondary transition-colors"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
