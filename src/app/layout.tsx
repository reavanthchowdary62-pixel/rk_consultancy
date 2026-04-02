import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ChatBox } from "@/components/ChatBox";
import { GraduationCap, BookOpen, Globe, Star, Users, Compass } from "lucide-react";
import { cookies } from "next/headers";
import { ContactForm } from "@/components/ContactForm";
import { LogoutButton } from "@/components/LogoutButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NotificationBell } from "@/components/NotificationBell";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { MobileNav } from "@/components/MobileNav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Link from "next/link";

export const viewport: Viewport = {
  themeColor: "#1e3a8a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "RK Consultancy | Premier Global Education Counselor",
  description: "Compare QS 2026 ranked universities, calculate ROI, find scholarships, and book expert counseling sessions. Trusted by 10,000+ Indian students.",
  keywords: "study abroad, university rankings, QS 2026, Indian students, MBA abroad, scholarships, visa guide",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "RK Consult" },
  applicationName: "RK Consultancy",
};

const navLinks = [
  { href: "/",              label: "Home" },
  { href: "/compare",       label: "Compare" },
  { href: "/scholarships",  label: "Scholarships" },
  { href: "/visa",          label: "Visa Guide" },
  { href: "/booking",       label: "Bookings" },
  { href: "/blog",          label: "Blog" },
  { href: "/success-stories", label: "Stories" },
];

const publicLinks = [
  { href: "/",               label: "Home" },
  { href: "/scholars",       label: "Scholars" },
  { href: "/success-stories",label: "Stories" },
  { href: "/blog",           label: "Blog" },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const isAuthenticated = cookies().has("rk-auth-session");

  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col pt-16">
        <WishlistProvider>

          {/* ── PREMIUM HEADER ────────────────────────────────────────── */}
          <header className="fixed top-0 left-0 w-full h-16 z-50 transition-all duration-300"
            style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid rgba(30,58,138,0.08)" }}>
            <div className="dark:hidden absolute inset-0 bg-white/80" style={{backdropFilter: "blur(20px)"}}></div>
            <div className="hidden dark:block absolute inset-0 bg-slate-900/85" style={{backdropFilter: "blur(20px)"}}></div>

            <div className="relative flex h-full items-center justify-between w-full max-w-7xl mx-auto px-4 sm:px-6">

              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-md group-hover:shadow-glow transition-all duration-300 group-hover:scale-105">
                  <GraduationCap size={20} className="text-white" />
                </div>
                <span className="text-lg font-display font-bold text-slate-900 dark:text-white">
                  RK <span className="gradient-brand-text">Consultancy</span>
                </span>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-1">
                {(isAuthenticated ? navLinks : publicLinks).map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="relative px-3 py-1.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary-300 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-950 transition-all duration-200 group"
                  >
                    {label}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-brand rounded-full group-hover:w-3/4 transition-all duration-300" />
                  </Link>
                ))}
              </nav>

              {/* Right Actions */}
              <div className="flex items-center gap-2">
                <ThemeToggle />
                {isAuthenticated ? (
                  <>
                    <NotificationBell />
                    <Link
                      href="/dashboard"
                      className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-950/50 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-all duration-200"
                    >
                      <Users size={15} />
                      Dashboard
                    </Link>
                    <LogoutButton />
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="btn-shine hidden sm:inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-bold text-white gradient-brand shadow-md hover:shadow-glow transition-all duration-300 hover:scale-105"
                  >
                    Get Started →
                  </Link>
                )}
                <MobileNav />
              </div>
            </div>
          </header>

          {/* ── MAIN CONTENT ─────────────────────────────────────────────- */}
          <main className="flex-grow flex flex-col relative w-full overflow-x-hidden">
            {children}
          </main>

          {/* ── PREMIUM FOOTER ───────────────────────────────────────────── */}
          <footer className="relative bg-slate-950 text-white mt-24 overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-700 to-transparent opacity-50" />
            <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full bg-primary-900/20 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-accent-900/10 blur-3xl pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-800">

                {/* Brand Column */}
                <div className="lg:col-span-4">
                  <Link href="/" className="flex items-center gap-2.5 mb-5 w-fit">
                    <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shadow-lg">
                      <GraduationCap size={22} className="text-white" />
                    </div>
                    <span className="text-xl font-display font-bold">RK Consultancy</span>
                  </Link>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
                    Trusted by 10,000+ Indian students. We provide expert counseling for top global universities — backed by the latest 2026 QS rankings.
                  </p>
                  <div className="flex items-center gap-1 mb-6">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                    <span className="text-sm text-slate-400 ml-2">4.9/5 from 2,400+ students</span>
                  </div>
                  <div className="space-y-2.5">
                    <p className="text-sm text-slate-400 flex items-center gap-2"><span className="text-primary-400">✉</span> contact@rkconsultancy.edu</p>
                    <p className="text-sm text-slate-400 flex items-center gap-2"><span className="text-primary-400">📞</span> +91 98765 43210</p>
                    <p className="text-sm text-slate-400 flex items-center gap-2"><span className="text-primary-400">📍</span> Ahmedabad, Gujarat, India</p>
                  </div>
                </div>

                {/* Links Grid */}
                <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Platform</h4>
                    <ul className="space-y-2.5">
                      {[["Compare", "/compare"], ["Scholarships", "/scholarships"], ["Visa Guide", "/visa"], ["Bookings", "/booking"], ["Tools", "/tools"]].map(([label, href]) => (
                        <li key={href}><Link href={href} className="text-sm text-slate-400 hover:text-white transition-colors">{label}</Link></li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Discover</h4>
                    <ul className="space-y-2.5">
                      {[["Blog", "/blog"], ["Scholars", "/scholars"], ["Success Stories", "/success-stories"], ["Dashboard", "/dashboard"]].map(([label, href]) => (
                        <li key={href}><Link href={href} className="text-sm text-slate-400 hover:text-white transition-colors">{label}</Link></li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Legal</h4>
                    <ul className="space-y-2.5">
                      {[["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"]].map(([label, href]) => (
                        <li key={href}><Link href={href} className="text-sm text-slate-400 hover:text-white transition-colors">{label}</Link></li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Contact column */}
                <div className="lg:col-span-3">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Request Callback</h4>
                  <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
                    <ContactForm />
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-slate-500">© 2026 RK Consultancy. All rights reserved.</p>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-xs font-medium text-accent-400"><Globe size={12} /> Serving students globally</span>
                  <span className="w-px h-4 bg-slate-700" />
                  <span className="flex items-center gap-1.5 text-xs font-medium text-amber-400"><Star size={12} className="fill-amber-400" /> QS 2026 verified</span>
                </div>
              </div>
            </div>
          </footer>

          {isAuthenticated && <ChatBox />}

        </WishlistProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
