"use client";

import { GraduationCap, BookOpen, Heart, TrendingUp, Calendar, MapPin, Award, Bell, LogOut, LayoutDashboard, Search, Users, FileText } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import seedData from "@/data/seed.json";
import Link from "next/link";

const applicationSteps = [
  { label: "Profile Created", done: true, date: "Jan 12" },
  { label: "Universities Shortlisted", done: true, date: "Jan 18" },
  { label: "Documents Submitted", done: true, date: "Feb 3" },
  { label: "Application Under Review", done: false, date: "Feb 20" },
  { label: "Interview Scheduled", done: false, date: "Mar 10" },
  { label: "Offer Received", done: false, date: "Apr 1" },
  { label: "Visa Applied", done: false, date: "Apr 15" },
  { label: "Enrolled! 🎓", done: false, date: "Sep 1" },
];

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Search, label: "Compare Uni", href: "/compare" },
  { icon: Heart, label: "My Wishlist", href: "/dashboard#wishlist" },
  { icon: Award, label: "Scholarships", href: "/scholarships" },
  { icon: MapPin, label: "Visa Guide", href: "/visa" },
  { icon: Calendar, label: "Book Counselor", href: "/booking" },
  { icon: TrendingUp, label: "Smart Tools", href: "/tools" },
  { icon: FileText, label: "Blog", href: "/blog" },
  { icon: Users, label: "Success Stories", href: "/success-stories" },
  { icon: BookOpen, label: "Scholars", href: "/scholars" },
];

export default function DashboardPage() {
  const { wishlist } = useWishlist();
  const savedUniversities = seedData.filter(u => wishlist.includes(u.id)).slice(0, 6);
  const topUnis = seedData.slice(0, 4);

  return (
    <div className="flex -mx-6 -mt-6 min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-slate-900 text-white border-r border-slate-800 min-h-full px-4 py-8">
        <div className="flex items-center gap-2 mb-10 px-2">
          <GraduationCap size={28} className="text-secondary shrink-0" />
          <span className="font-extrabold text-lg tracking-tight">RK Consultancy</span>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map(({ icon: Icon, label, href }) => (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-slate-300 hover:text-white text-sm font-medium group">
              <Icon size={18} className="group-hover:text-secondary transition-colors" />
              {label}
            </Link>
          ))}
        </nav>
        <button
          onClick={async () => { await fetch("/api/auth/logout", { method: "POST" }); window.location.href = "/login"; }}
          className="flex items-center gap-2 px-3 py-2.5 text-red-400 hover:text-red-300 text-sm font-medium"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-slate-950 p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">My Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Welcome back! Here's your application overview.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-primary/10 text-primary dark:text-blue-300 text-xs font-bold px-3 py-1.5 rounded-full">STUDENT</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Saved Universities", value: wishlist.length || 0, icon: Heart, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20" },
            { label: "Applications Sent", value: 3, icon: FileText, color: "text-primary", bg: "bg-blue-50 dark:bg-blue-900/20" },
            { label: "Offers Received", value: 1, icon: Award, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20" },
            { label: "Scholarships Found", value: 7, icon: TrendingUp, color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 flex items-center gap-4">
              <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
                <Icon size={22} className={color} />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Application Tracker */}
        <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-primary" /> Application Progress Tracker
          </h2>
          <div className="relative">
            <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
            <div className="space-y-4">
              {applicationSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-4 relative">
                  <div className={`w-6 h-6 rounded-full border-2 z-10 flex items-center justify-center shrink-0 ${step.done ? "bg-primary border-primary" : "bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600"}`}>
                    {step.done && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className={`text-sm font-medium ${step.done ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}`}>{step.label}</span>
                    <span className="text-xs text-gray-400">{step.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-6 bg-primary/5 px-3 py-2 rounded-lg">Step 3 of 8 complete • <span className="text-primary font-semibold">Next: Interview Scheduled on Mar 10</span></p>
        </div>

        {/* Wishlist */}
        <div id="wishlist" className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Heart size={20} className="text-red-500" /> My University Wishlist
            {savedUniversities.length === 0 && <span className="ml-2 text-xs text-gray-400 font-normal">(Heart universities in the Compare page to save them here)</span>}
          </h2>
          {savedUniversities.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <Heart size={40} className="mx-auto mb-3 opacity-20" />
              <p>No universities saved yet. Browse universities and tap ❤️ to shortlist them!</p>
              <Link href="/compare" className="mt-4 inline-block bg-primary text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-blue-800 transition-colors">Browse Universities</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {savedUniversities.map(u => (
                <Link key={u.id} href={`/university/${u.id}`} className="block group">
                  <div className="rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all">
                    <img src={(u as any).imageUrl || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&h=200"} alt={u.name} className="w-full h-28 object-cover group-hover:brightness-110 transition-all" />
                    <div className="p-3">
                      <p className="font-bold text-sm text-gray-900 dark:text-white truncate">{u.name}</p>
                      <p className="text-xs text-gray-500">{u.country} • #{u.qsRank2026}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Find Scholarships", href: "/scholarships", icon: Award, color: "bg-amber-500" },
            { label: "Check Visa Guide", href: "/visa", icon: MapPin, color: "bg-green-600" },
            { label: "Book Counselor", href: "/booking", icon: Calendar, color: "bg-primary" },
            { label: "ROI Calculator", href: "/tools", icon: TrendingUp, color: "bg-purple-600" },
          ].map(({ label, href, icon: Icon, color }) => (
            <Link key={href} href={href}
              className={`${color} text-white rounded-xl p-4 flex flex-col items-start gap-2 hover:opacity-90 transition-opacity shadow-md`}>
              <Icon size={22} />
              <span className="text-sm font-bold leading-tight">{label}</span>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
