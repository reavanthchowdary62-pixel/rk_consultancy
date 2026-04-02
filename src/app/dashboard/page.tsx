"use client";

import { GraduationCap, BookOpen, Heart, TrendingUp, Calendar, MapPin, Award, LogOut, LayoutDashboard, Search, Users, FileText, ArrowRight, BadgeCheck, Sparkles, ChevronRight } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import seedData from "@/data/seed.json";
import Link from "next/link";

const applicationSteps = [
  { label: "Profile Created",           done: true,  date: "Jan 12" },
  { label: "Universities Shortlisted",  done: true,  date: "Jan 18" },
  { label: "Documents Submitted",       done: true,  date: "Feb 3"  },
  { label: "Application Under Review",  done: false, date: "Feb 20" },
  { label: "Interview Scheduled",       done: false, date: "Mar 10" },
  { label: "Offer Received",            done: false, date: "Apr 1"  },
  { label: "Visa Applied",              done: false, date: "Apr 15" },
  { label: "Enrolled! 🎓",              done: false, date: "Sep 1"  },
];

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",      href: "/dashboard" },
  { icon: Search,          label: "Compare Uni",    href: "/compare"   },
  { icon: Heart,           label: "My Wishlist",    href: "/dashboard#wishlist" },
  { icon: Award,           label: "Scholarships",   href: "/scholarships" },
  { icon: MapPin,          label: "Visa Guide",     href: "/visa"      },
  { icon: Calendar,        label: "Bookings",       href: "/booking"   },
  { icon: TrendingUp,      label: "Smart Tools",    href: "/tools"     },
  { icon: FileText,        label: "Blog",           href: "/blog"      },
  { icon: Users,           label: "Success Stories",href: "/success-stories" },
  { icon: BookOpen,        label: "Scholars",       href: "/scholars"  },
];

const completedSteps = applicationSteps.filter(s => s.done).length;
const progressPct = Math.round((completedSteps / applicationSteps.length) * 100);

export default function DashboardPage() {
  const { wishlist } = useWishlist();
  const savedUniversities = seedData.filter(u => wishlist.includes(u.id)).slice(0, 6);
  const topUnis = seedData.slice(0, 4);

  return (
    <div className="flex -mx-0 -mt-0 h-[calc(100vh-4rem)] overflow-hidden bg-slate-50 dark:bg-slate-950">

      {/* ── Premium Sidebar ────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 h-full overflow-y-auto">
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-slate-100 dark:border-slate-800">
          <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-md">
            <GraduationCap size={18} className="text-white" />
          </div>
          <div>
            <p className="font-display font-bold text-slate-900 dark:text-white text-sm leading-none">RK Consultancy</p>
            <p className="text-xs text-slate-400 mt-0.5">Student Portal</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5 flex-1 px-3 py-4">
          {navItems.map(({ icon: Icon, label, href }) => (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-950/50 transition-all text-sm font-semibold group">
              <Icon size={17} className="shrink-0 group-hover:text-primary dark:group-hover:text-primary-300 transition-colors" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Progress snippet */}
        <div className="px-4 pb-4">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Application Progress</p>
              <span className="text-xs font-extrabold text-primary">{progressPct}%</span>
            </div>
            <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full gradient-brand rounded-full transition-all duration-700" style={{width: `${progressPct}%`}} />
            </div>
            <p className="text-xs text-slate-400 mt-2">{completedSteps} of {applicationSteps.length} steps done</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={async () => { await fetch("/api/auth/logout", { method: "POST" }); window.location.href = "/login"; }}
          className="flex items-center gap-2 mx-4 mb-4 px-3 py-2.5 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-semibold rounded-xl transition-all"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </aside>

      {/* ── Main Content ───────────────────────────────────────────── */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-6 md:p-8 space-y-6">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="badge badge-primary text-[10px]">STUDENT</span>
                <BadgeCheck size={14} className="text-accent-500" />
              </div>
              <h1 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white">My Dashboard</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Welcome back! Here&apos;s your application overview.</p>
            </div>
            <Link href="/booking" className="btn-shine hidden sm:flex items-center gap-2 gradient-brand text-white font-bold px-5 py-2.5 rounded-2xl text-sm shadow-card hover:shadow-glow transition-all">
              <Calendar size={15} /> Book Session
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Saved Universities", value: wishlist.length || 0, icon: Heart,      gradient: "from-red-500 to-rose-600" },
              { label: "Applications Sent",  value: 3,                    icon: FileText,   gradient: "from-primary-600 to-primary-800" },
              { label: "Offers Received",    value: 1,                    icon: Award,      gradient: "from-secondary-500 to-secondary-700" },
              { label: "Scholarships Found", value: 7,                    icon: TrendingUp, gradient: "from-accent-500 to-accent-700" },
            ].map(({ label, value, icon: Icon, gradient }) => (
              <div key={label} className="card-hover bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 flex items-center gap-4 shadow-card">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 shadow-md`}>
                  <Icon size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-2xl font-display font-extrabold text-slate-900 dark:text-white">{value}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Application Tracker */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp size={18} className="text-primary" /> Application Tracker
              </h2>
              <span className="badge badge-primary">{progressPct}% Done</span>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-6">
              <div className="h-full gradient-brand rounded-full transition-all duration-1000" style={{width: `${progressPct}%`}} />
            </div>

            <div className="relative">
              <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-slate-100 dark:bg-slate-800" />
              <div className="space-y-3">
                {applicationSteps.map((step, i) => (
                  <div key={i} className={`flex items-center gap-4 relative py-1 ${!step.done ? "opacity-50" : ""}`}>
                    <div className={`w-6 h-6 rounded-full z-10 flex items-center justify-center shrink-0 transition-all ${step.done ? "gradient-brand shadow-sm" : "bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700"}`}>
                      {step.done && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <span className={`text-sm font-semibold ${step.done ? "text-slate-900 dark:text-white" : "text-slate-500"}`}>{step.label}</span>
                      <span className="text-xs text-slate-400 font-medium">{step.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 p-3 bg-primary-50 dark:bg-primary-950/50 rounded-2xl border border-primary-100 dark:border-primary-900 flex items-center gap-2">
              <Sparkles size={14} className="text-primary shrink-0" />
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Next step: <span className="text-primary font-bold">Interview Scheduled — Mar 10</span>
              </p>
            </div>
          </div>

          {/* Wishlist */}
          <div id="wishlist" className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Heart size={18} className="text-red-500" /> My Wishlist
              </h2>
              <Link href="/compare" className="text-xs font-bold text-primary flex items-center gap-0.5 hover:gap-1.5 transition-all">
                Add more <ChevronRight size={12} />
              </Link>
            </div>
            {savedUniversities.length === 0 ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-3xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                  <Heart size={28} className="text-slate-300 dark:text-slate-600" />
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">No universities saved yet. Browse and tap ❤️ to shortlist them!</p>
                <Link href="/compare" className="btn-shine inline-flex items-center gap-2 gradient-brand text-white px-6 py-2.5 rounded-2xl text-sm font-bold">
                  Browse Universities →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {savedUniversities.map(u => (
                  <Link key={u.id} href={`/university/${u.id}`} className="card-hover block group rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-card">
                    <img src={(u as any).imageUrl || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&h=200"} alt={u.name} className="w-full h-28 object-cover group-hover:brightness-110 transition-all" />
                    <div className="p-3 bg-white dark:bg-slate-800">
                      <p className="font-display font-bold text-sm text-slate-900 dark:text-white truncate group-hover:text-primary transition-colors">{u.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{u.country} · #{u.qsRank2026}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8">
            {[
              { label: "Scholarships",    href: "/scholarships", icon: Award,      gradient: "from-secondary-500 to-secondary-700" },
              { label: "Visa Guide",      href: "/visa",         icon: MapPin,     gradient: "from-accent-500 to-accent-700" },
              { label: "Book Session",    href: "/booking",      icon: Calendar,   gradient: "from-primary-600 to-primary-800" },
              { label: "ROI Calculator",  href: "/tools",        icon: TrendingUp, gradient: "from-purple-600 to-purple-800" },
            ].map(({ label, href, icon: Icon, gradient }) => (
              <Link key={href} href={href}
                className={`card-hover bg-gradient-to-br ${gradient} text-white rounded-3xl p-5 flex flex-col gap-3 shadow-card`}>
                <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <div>
                  <span className="font-display font-bold text-sm block">{label}</span>
                  <ArrowRight size={14} className="mt-1 opacity-60" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
