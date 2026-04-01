"use client";

import { useState } from "react";
import { GraduationCap, Lock, Mail, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
        setTimeout(() => {
          window.location.href = "/";
        }, 800);
      } else {
        setError(data.error || "Authentication failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen -mt-16 w-full flex items-center justify-center bg-gray-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Decorative premium background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary opacity-[0.03] dark:opacity-[0.05] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary opacity-[0.03] dark:opacity-[0.05] rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row z-10 border border-gray-100 dark:border-gray-800 m-4">
        
        {/* Left Side Branding */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-primary to-blue-900 p-12 text-white flex flex-col justify-between relative overflow-hidden hidden md:flex">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/3 blur-xl"></div>
          
          <div>
            <h1 className="text-3xl font-extrabold flex items-center tracking-tight mb-6">
              <GraduationCap className="mr-3" size={36} /> RK Consultancy
            </h1>
            <p className="text-blue-100 text-lg font-medium leading-relaxed">
              You are entering an exclusive portal. Access global QS 2026 analytical data, Student Exchange program tools, and AI-driven counseling.
            </p>
          </div>

          <div className="space-y-4">
             <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
               <p className="text-sm font-bold tracking-wider uppercase text-amber-300 mb-1">Elite Network</p>
               <p className="text-blue-50 text-sm">Join over 10,000+ Indian students successfully placed in top global universities.</p>
             </div>
             <p className="text-xs text-blue-200 opacity-60">Secure SSL Encrypted Environment</p>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center bg-white dark:bg-slate-900 relative">
          
          <div className="md:hidden flex items-center justify-center mb-8">
            <GraduationCap className="text-primary mr-2" size={32} />
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">RK Consultancy</h1>
          </div>

          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">
            {isLogin ? "Enter your academic credentials to securely access your portal." : "Register below to unlock VIP counseling tools and university comparisons."}
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3 animate-fade-in-up">
              <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-700 dark:text-red-300 font-semibold text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-start gap-3 animate-fade-in-up">
              <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-700 dark:text-green-300 font-semibold text-sm">{success}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">Full Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => { setName(e.target.value); setError(""); }}
                    className="w-full bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary dark:focus:border-primary rounded-xl px-4 py-3 text-gray-900 dark:text-white font-medium outline-none transition-colors"
                    placeholder="E.g. Rahul Sharma"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 text-gray-400" size={18} />
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  className={`w-full bg-gray-50 dark:bg-slate-800 border-2 ${error ? "border-red-300 dark:border-red-700" : "border-transparent"} focus:border-primary dark:focus:border-primary rounded-xl pl-11 pr-4 py-3 text-gray-900 dark:text-white font-medium outline-none transition-colors`}
                  placeholder="student@university.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">Password / Security Key</label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 text-gray-400" size={18} />
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  className={`w-full bg-gray-50 dark:bg-slate-800 border-2 ${error ? "border-red-300 dark:border-red-700" : "border-transparent"} focus:border-primary dark:focus:border-primary rounded-xl pl-11 pr-4 py-3 text-gray-900 dark:text-white font-medium outline-none transition-colors`}
                  placeholder="••••••••••••"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  minLength={6}
                />
              </div>
              {!isLogin && <p className="text-xs text-gray-400 mt-1.5">Minimum 6 characters</p>}
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary hover:bg-blue-800 text-white font-bold py-4 rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] transition-all flex items-center justify-center mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </span>
              ) : (
                <>{isLogin ? "Secure Login" : "Initialize Account"} <ArrowRight className="ml-2" size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 font-medium text-sm">
              {isLogin ? "Don't have an enrollment?" : "Already requested access?"}
              <button 
                type="button" 
                onClick={() => { setIsLogin(!isLogin); setError(""); setSuccess(""); }}
                className="ml-2 text-primary hover:text-blue-700 font-bold transition-colors"
              >
                {isLogin ? "Sign Up Now" : "Login Instead"}
              </button>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
