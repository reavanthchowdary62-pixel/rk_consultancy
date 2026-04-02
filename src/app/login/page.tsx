"use client";

import { useState } from "react";
import { GraduationCap, Lock, Mail, ArrowRight, AlertCircle, CheckCircle, Eye, EyeOff, Star, Globe, Users, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, action: isLogin ? "login" : "signup" }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(isLogin ? "Login successful! Redirecting..." : "Account created! Redirecting...");
        setTimeout(() => { window.location.href = "/"; }, 800);
      } else {
        setError(data.error || "Authentication failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen -mt-16 -mx-4 sm:-mx-6 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] flex overflow-hidden">

      {/* ── LEFT PANEL: Brand / Illustration ──────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 gradient-brand relative overflow-hidden flex-col justify-between p-14">
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3 blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-600/10 rounded-full blur-3xl" />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 mb-14">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
              <GraduationCap size={22} className="text-white" />
            </div>
            <span className="text-2xl font-display font-bold text-white">RK Consultancy</span>
          </Link>

          <h2 className="text-4xl font-display font-extrabold text-white leading-tight mb-5">
            Your Global<br />Education Starts<br />
            <span className="text-amber-300">Right Here.</span>
          </h2>
          <p className="text-white/70 text-base leading-relaxed max-w-sm">
            Access live QS 2026 rankings, AI-powered counseling, scholarship tools, and verified expert sessions — all in one premium platform.
          </p>
        </div>

        {/* Stats cards */}
        <div className="relative z-10 grid grid-cols-2 gap-4">
          {[
            { icon: Users,  val: "10,000+", label: "Students Placed" },
            { icon: Globe,  val: "25+",     label: "Countries Covered" },
            { icon: Trophy, val: "95%",     label: "Admission Success" },
            { icon: Star,   val: "4.9/5",   label: "Student Rating" },
          ].map(({ icon: Icon, val, label }) => (
            <div key={label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/15">
              <Icon size={18} className="text-white/60 mb-2" />
              <p className="text-xl font-display font-extrabold text-white">{val}</p>
              <p className="text-white/60 text-xs font-semibold">{label}</p>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="relative z-10 text-white/40 text-xs mt-6 flex items-center gap-1.5">
          <Lock size={11} />
          256-bit SSL encrypted. Your data is safe.
        </p>
      </div>

      {/* ── RIGHT PANEL: Form ─────────────────────────────────────────── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white dark:bg-slate-950 relative overflow-hidden">
        {/* Subtle bg orbs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary-50 dark:bg-primary-900/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-50 dark:bg-accent-900/10 rounded-full translate-y-1/3 -translate-x-1/4 blur-2xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center justify-center gap-2.5 mb-10">
            <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shadow-md">
              <GraduationCap size={20} className="text-white" />
            </div>
            <span className="text-xl font-display font-bold text-slate-900 dark:text-white">RK <span className="gradient-brand-text">Consultancy</span></span>
          </div>

          {/* Toggle tabs */}
          <div className="flex rounded-2xl bg-slate-100 dark:bg-slate-800/50 p-1 mb-8">
            <button
              onClick={() => { setIsLogin(false); setError(""); setSuccess(""); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${!isLogin ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400"}`}
            >
              Create Account
            </button>
            <button
              onClick={() => { setIsLogin(true); setError(""); setSuccess(""); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${isLogin ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400"}`}
            >
              Sign In
            </button>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-display font-extrabold text-slate-900 dark:text-white mb-2">
              {isLogin ? "Welcome back 👋" : "Join 10,000+ students"}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {isLogin
                ? "Enter your credentials to access your personalized dashboard."
                : "Create your free account to unlock university tools and counseling."}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl flex items-start gap-3 animate-fade-in-scale">
              <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
              <p className="text-red-700 dark:text-red-300 font-semibold text-sm">{error}</p>
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl flex items-start gap-3 animate-fade-in-scale">
              <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
              <p className="text-green-700 dark:text-green-300 font-semibold text-sm">{success}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">Full Name</label>
                <input
                  type="text" required value={name}
                  onChange={(e) => { setName(e.target.value); setError(""); }}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary-500 dark:focus:border-primary-400 rounded-2xl px-4 py-3.5 text-slate-900 dark:text-white font-medium outline-none transition-all text-sm placeholder:text-slate-400"
                  placeholder="e.g. Rahul Sharma"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 text-slate-400 pointer-events-none" size={17} />
                <input
                  type="email" required value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  className={`w-full bg-slate-50 dark:bg-slate-800 border-2 ${error ? "border-red-300 dark:border-red-700" : "border-transparent"} focus:border-primary-500 dark:focus:border-primary-400 rounded-2xl pl-11 pr-4 py-3.5 text-slate-900 dark:text-white font-medium outline-none transition-all text-sm placeholder:text-slate-400`}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">Password</label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 text-slate-400 pointer-events-none" size={17} />
                <input
                  type={showPass ? "text" : "password"} required value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  className={`w-full bg-slate-50 dark:bg-slate-800 border-2 ${error ? "border-red-300 dark:border-red-700" : "border-transparent"} focus:border-primary-500 dark:focus:border-primary-400 rounded-2xl pl-11 pr-12 py-3.5 text-slate-900 dark:text-white font-medium outline-none transition-all text-sm placeholder:text-slate-400`}
                  placeholder="••••••••"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  minLength={6}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                  {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {!isLogin && <p className="text-xs text-slate-400 mt-1.5 ml-1">Minimum 6 characters</p>}
            </div>

            <button
              type="submit" disabled={loading}
              className="btn-shine w-full gradient-brand text-white font-bold py-4 rounded-2xl shadow-elevated hover:shadow-glow transition-all hover:scale-[1.02] flex items-center justify-center gap-2 mt-6 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {isLogin ? "Signing in..." : "Creating account..."}
                </>
              ) : (
                <>{isLogin ? "Sign In Securely" : "Create Free Account"} <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          {/* Footer switch */}
          <p className="text-center text-slate-500 dark:text-slate-400 text-sm mt-6">
            {isLogin ? "No account yet?" : "Already have an account?"}
            <button
              type="button"
              onClick={() => { setIsLogin(!isLogin); setError(""); setSuccess(""); }}
              className="ml-1.5 text-primary font-bold hover:text-primary-700 transition-colors"
            >
              {isLogin ? "Sign Up Free →" : "Sign In →"}
            </button>
          </p>

          <p className="text-center text-slate-400 dark:text-slate-500 text-xs mt-6">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-primary transition-colors">Terms</Link>
            {" "}and{" "}
            <Link href="/privacy" className="underline hover:text-primary transition-colors">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
