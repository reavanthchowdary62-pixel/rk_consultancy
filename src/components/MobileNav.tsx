"use client";

import { useState } from "react";
import { Menu, X, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "/",               label: "Home",            emoji: "🏠" },
  { href: "/compare",        label: "Compare",         emoji: "📊" },
  { href: "/scholarships",   label: "Scholarships",    emoji: "🎓" },
  { href: "/visa",           label: "Visa Guide",      emoji: "🗺️" },
  { href: "/booking",        label: "Bookings",        emoji: "📅" },
  { href: "/tools",          label: "Tools",           emoji: "🛠️" },
  { href: "/blog",           label: "Blog",            emoji: "📝" },
  { href: "/success-stories",label: "Stories",         emoji: "⭐" },
  { href: "/scholars",       label: "Scholars",        emoji: "🔬" },
  { href: "/dashboard",      label: "Dashboard",       emoji: "📈" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Toggle menu"
      >
        {open
          ? <X size={22} className="text-slate-700 dark:text-slate-200" />
          : <Menu size={22} className="text-slate-700 dark:text-slate-200" />
        }
      </button>

      {/* ── Full-screen overlay — SOLID background, no transparency ── */}
      {open && (
        <>
          {/* Backdrop dimmer */}
          <div
            className="fixed inset-0 z-[998] bg-black/40"
            onClick={() => setOpen(false)}
          />

          {/* Drawer panel — solid, not transparent */}
          <div className="fixed top-0 right-0 bottom-0 z-[999] w-80 bg-white dark:bg-slate-900 shadow-2xl flex flex-col overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
                  <GraduationCap size={16} className="text-white" />
                </div>
                <span className="font-display font-bold text-slate-900 dark:text-white text-base">RK Consultancy</span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 p-4 space-y-1">
              {navLinks.map(({ href, label, emoji }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-200 font-semibold hover:bg-primary-50 dark:hover:bg-primary-950/50 hover:text-primary dark:hover:text-primary-300 transition-all group"
                >
                  <span className="text-lg">{emoji}</span>
                  <span className="flex-1 text-sm">{label}</span>
                  <ArrowRight size={14} className="text-slate-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </Link>
              ))}
            </nav>

            {/* Bottom CTA */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="btn-shine w-full gradient-brand text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm"
              >
                Get Started Free →
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
