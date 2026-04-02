"use client";

import {
  Search, MapPin, DollarSign, GraduationCap, X, ArrowRight,
  Star, Users, BookOpen, Globe, ChevronRight, Award, TrendingUp,
  Shield, Building, CheckCircle, Zap, Trophy, Sparkles, MessageCircle,
  BookMarked, Plane, Clock, BadgeCheck
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);
  return <>{count.toLocaleString()}{suffix}</>;
}

const destinations = [
  { name: "United States", flag: "🇺🇸", count: 48, color: "from-blue-900/80",   image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=600&q=80&fit=crop" },
  { name: "United Kingdom",flag: "🇬🇧", count: 32, color: "from-red-900/80",    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80&fit=crop" },
  { name: "Canada",        flag: "🇨🇦", count: 24, color: "from-red-800/80",    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600&q=80&fit=crop" },
  { name: "Australia",     flag: "🇦🇺", count: 20, color: "from-yellow-900/80", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80&fit=crop" },
  { name: "Germany",       flag: "🇩🇪", count: 18, color: "from-slate-900/80",  image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80&fit=crop" },
  { name: "Singapore",     flag: "🇸🇬", count: 8,  color: "from-red-950/80",   image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80&fit=crop" },
];

const testimonials = [
  { name: "Priya Sharma", from: "Delhi",  uni: "University of Toronto", course: "MSc Data Science",    rating: 5, quote: "RK Consultancy made my Canadian university dream a reality. Got a 70% scholarship!" },
  { name: "Arjun Mehta",  from: "Pune",   uni: "TU Munich",             course: "MSc Computer Science",rating: 5, quote: "The visa guide section alone saved me weeks of research. My application was 100% correct on the first try." },
  { name: "Sneha Reddy",  from: "Hyd",    uni: "University of Oxford",  course: "MBA",                 rating: 5, quote: "Booked my counselor on Saturday, had a personalised shortlist by Monday morning. World-class service." },
];

const steps = [
  { step: "01", icon: Search,        title: "Search & Compare",    desc: "Browse 200+ QS 2026 ranked universities by course, budget, and country." },
  { step: "02", icon: MessageCircle, title: "Book a Counselor",    desc: "Schedule a 1:1 video session with a certified counselor within 24 hours." },
  { step: "03", icon: Plane,         title: "Apply & Get Accepted", desc: "We guide your SOP, documents, and visa — all the way to your dream country." },
];

export function HomeClient({ isAuthenticated }: { isAuthenticated: boolean }) {
  const router = useRouter();
  const [course, setCourse] = useState("Any");
  const [budget, setBudget] = useState("Any");
  const [location, setLocation] = useState("Anywhere");
  const [selectedTopic, setSelectedTopic] = useState<{name: string} | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/compare?course=${encodeURIComponent(course)}&budget=${encodeURIComponent(budget)}&loc=${encodeURIComponent(location)}`);
  };

  return (
    <div className="flex flex-col w-full">

      {/* ── TOPIC MODAL ─────────────────────────────────────────────── */}
      {selectedTopic && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-8 shadow-2xl relative">
            <button onClick={() => setSelectedTopic(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <X size={14} className="text-slate-500" />
            </button>
            <div className="w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center mb-4">
              <GraduationCap size={22} className="text-white" />
            </div>
            <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-2">{selectedTopic.name}</h3>
            <p className="text-slate-500 text-sm mb-6">Explore global universities, salary data, and scholarships for this discipline.</p>
            <button onClick={() => { setSelectedTopic(null); router.push(`/compare?course=${encodeURIComponent(selectedTopic.name)}`); }}
              className="btn-shine w-full gradient-brand text-white font-bold py-3 rounded-2xl text-sm">
              Explore {selectedTopic.name} →
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  HERO — Mobile-first, no absolute-positioned search bar        */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="w-full bg-slate-950 relative overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#3b82f6 1px,transparent 1px),linear-gradient(90deg,#3b82f6 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        {/* Orb */}
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Two-column desktop, single-column mobile ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 pt-12 lg:pt-20 pb-8 lg:pb-16 items-center">

            {/* LEFT: Headline + CTAs */}
            <div className="text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-6 border border-white/20">
                <Trophy size={12} className="text-amber-400" />
                Trusted by 10,000+ Students
                <span className="mx-1 text-white/20">|</span>
                <span className="text-accent-400">QS 2026 Verified</span>
              </div>

              {/* Headline */}
              <h1 className="font-display font-extrabold text-white leading-tight mb-4 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
                {isAuthenticated ? "Your Path to" : "Your Global"}
                <br />
                <span className="gradient-brand-text">
                  {isAuthenticated ? "Global Success" : "University"}
                </span>
                {!isAuthenticated && <><br /><span className="text-white/90">Starts Here.</span></>}
              </h1>

              <p className="text-white/60 text-base sm:text-lg max-w-lg mb-8 leading-relaxed">
                {isAuthenticated
                  ? "Compare QS 2026 ranked universities, calculate ROI, and book verified expert counseling."
                  : "Research 200+ top-tier universities, find funded scholarships — completely free."}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link href={isAuthenticated ? "/booking" : "/login"}
                  className="btn-shine gradient-brand text-white font-bold py-3.5 px-7 rounded-2xl shadow-elevated hover:shadow-glow transition-all hover:scale-105 text-sm flex items-center justify-center gap-2">
                  <Sparkles size={16} />
                  {isAuthenticated ? "Book a Counselor" : "Get Started — Free"}
                </Link>
                <Link href="/compare"
                  className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition-all backdrop-blur-sm group">
                  Compare Universities <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Trust micro-copy */}
              <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                {["No credit card", "Free forever", "200+ Universities"].map((item) => (
                  <span key={item} className="flex items-center gap-1.5 text-xs text-white/50 font-medium">
                    <CheckCircle size={13} className="text-accent-400" /> {item}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT: Preview card (desktop only) */}
            <div className="hidden lg:flex flex-col gap-4">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/15 p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-white font-display font-bold text-sm">Top Universities — QS 2026</p>
                  <span className="flex items-center gap-1.5 text-xs text-accent-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />Live
                  </span>
                </div>
                <div className="space-y-3">
                  {[{name:"MIT",rank:1,country:"🇺🇸 USA",score:"100.0"},{name:"Oxford",rank:3,country:"🇬🇧 UK",score:"99.1"},{name:"Stanford",rank:4,country:"🇺🇸 USA",score:"98.7"},{name:"NUS",rank:8,country:"🇸🇬 SG",score:"97.2"},{name:"IISc",rank:211,country:"🇮🇳 IN",score:"78.4"}].map((u) => (
                    <div key={u.rank} className="flex items-center gap-3 py-2 border-b border-white/10 last:border-0">
                      <span className="w-7 h-7 rounded-lg bg-primary-700/50 text-white text-xs font-bold flex items-center justify-center shrink-0">#{u.rank}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm">{u.name}</p>
                        <p className="text-white/40 text-xs">{u.country}</p>
                      </div>
                      <span className="text-accent-400 font-bold text-sm shrink-0">{u.score}</span>
                    </div>
                  ))}
                </div>
                <Link href="/compare" className="mt-4 flex items-center justify-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors font-semibold">
                  View all 200+ universities <ArrowRight size={12} />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[{val:"10,000+",label:"Students Placed",icon:Users},{val:"95%",label:"Success Rate",icon:BadgeCheck},{val:"25+",label:"Countries",icon:Globe},{val:"4.9★",label:"Student Rating",icon:Star}].map(({val,label,icon:Icon})=> (
                  <div key={label} className="bg-white/8 backdrop-blur-sm rounded-2xl border border-white/10 p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary-700/40 flex items-center justify-center shrink-0"><Icon size={16} className="text-primary-300" /></div>
                    <div className="min-w-0">
                      <p className="text-white font-display font-bold text-base leading-none">{val}</p>
                      <p className="text-white/40 text-xs mt-0.5 leading-tight">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── SEARCH BAR — inline, not absolute ── */}
          <div className="pb-10 lg:pb-14">
            <form onSubmit={handleSearch} className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-2 flex flex-col sm:flex-row gap-2 border border-slate-200 dark:border-slate-700 max-w-4xl mx-auto">
              <div className="flex-1 flex items-center gap-2 bg-slate-50 dark:bg-slate-700/50 rounded-xl px-3 py-3">
                <GraduationCap className="text-primary shrink-0" size={16} />
                <select className="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200 font-semibold cursor-pointer text-sm" value={course} onChange={(e) => setCourse(e.target.value)}>
                  <option value="Any">Any Discipline</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Artificial Intelligence">AI & Machine Learning</option>
                  <option value="Data Science">Data Science</option>
                  <option value="MBA">MBA & Business</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-700/50 rounded-xl px-3 py-3 min-w-[130px]">
                  <DollarSign className="text-primary shrink-0" size={16} />
                  <select className="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200 font-semibold cursor-pointer text-sm" value={budget} onChange={(e) => setBudget(e.target.value)}>
                    <option value="Any">Any Budget</option>
                    <option value="10L">&lt; 10L/yr</option>
                    <option value="30L">&lt; 30L/yr</option>
                    <option value="50L">&lt; 50L/yr</option>
                    <option value="75L">&lt; 75L/yr</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-700/50 rounded-xl px-3 py-3 min-w-[110px]">
                  <MapPin className="text-primary shrink-0" size={16} />
                  <select className="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200 font-semibold cursor-pointer text-sm" value={location} onChange={(e) => setLocation(e.target.value)}>
                    <option value="Anywhere">Global</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn-shine gradient-brand text-white font-bold py-3 px-5 rounded-xl text-sm flex items-center justify-center gap-2 whitespace-nowrap">
                <Search size={14} /> Search
              </button>
            </form>

            {/* Trending chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 max-w-4xl mx-auto">
              <span className="text-xs font-bold text-white/30 uppercase tracking-wider">Trending:</span>
              {["Data Science", "MBA", "Computer Science", "AI", "Finance"].map((s) => (
                <button key={s} onClick={() => setSelectedTopic({name: s})}
                  className="text-xs font-semibold text-white/50 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-full transition-all hover:bg-white/10">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  STATS BAR                                                     */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="w-full gradient-brand py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[
            { val: 200,   suffix: "+", label: "Universities",    icon: Building },
            { val: 10000, suffix: "+", label: "Students Placed", icon: Users },
            { val: 25,    suffix: "+", label: "Countries",       icon: Globe },
            { val: 95,    suffix: "%", label: "Success Rate",    icon: TrendingUp },
          ].map(({ val, suffix, label, icon: Icon }, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <Icon size={18} className="text-white/60 mb-1" />
              <p className="text-3xl md:text-4xl font-display font-extrabold"><AnimatedCounter target={val} suffix={suffix} /></p>
              <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  HOW IT WORKS                                                  */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="w-full bg-white dark:bg-slate-950 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="badge badge-accent mb-4">Simple Process</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white mb-3">
              Study Abroad in <span className="gradient-brand-text">3 Steps</span>
            </h2>
            <p className="text-slate-500 text-sm max-w-md mx-auto">From your first search to your acceptance letter — we are with you every step.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {/* Connecting line desktop */}
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5 bg-gradient-to-r from-primary-200 via-accent-300 to-primary-200 dark:from-primary-800 dark:via-accent-700 dark:to-primary-800" />
            {steps.map(({ step, icon: Icon, title, desc }, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-3xl gradient-brand flex flex-col items-center justify-center shadow-elevated mb-5 z-10 relative">
                  <span className="text-white/50 text-[10px] font-bold mb-0.5">{step}</span>
                  <Icon size={26} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-56">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  BENTO GRID FEATURES                                           */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="w-full bg-slate-50 dark:bg-slate-900 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge badge-primary mb-4">Platform</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white">
              Everything in <span className="gradient-brand-text">One Platform</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Large */}
            <div className="sm:col-span-2 card-hover bg-white dark:bg-slate-800 rounded-3xl p-7 border border-slate-100 dark:border-slate-700 shadow-card relative overflow-hidden group">
              <div className="absolute top-4 right-4"><span className="badge badge-primary text-[10px]">Live Data</span></div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-900 flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform">
                <BookMarked size={22} className="text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-2">QS 2026 Rankings</h3>
              <p className="text-slate-500 text-sm mb-5 max-w-md">Real-time data — 200+ institutions across 25+ countries. Filter by course, ROI, and budget.</p>
              <Link href="/compare" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all">Explore Rankings <ArrowRight size={14} /></Link>
            </div>
            {/* AI Chat */}
            <div className="card-hover bg-gradient-to-br from-accent-600 to-accent-800 rounded-3xl p-7 shadow-card group">
              <div className="absolute top-4 right-4 z-10"><span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">AI</span></div>
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform relative">
                <Zap size={22} className="text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-2">AI Counselor</h3>
              <p className="text-white/70 text-sm leading-relaxed">GPT-4o powered. Answers any study-abroad question 24/7.</p>
            </div>
            {/* Scholarships */}
            <div className="card-hover bg-gradient-to-br from-secondary-600 to-secondary-800 rounded-3xl p-7 shadow-card group relative">
              <div className="absolute top-4 right-4"><span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">₹ Funded</span></div>
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award size={22} className="text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-2">Scholarships</h3>
              <p className="text-white/70 text-sm leading-relaxed">Chevening, DAAD, Commonwealth — filtered for Indian students.</p>
            </div>
            {/* Counselors large */}
            <div className="sm:col-span-2 card-hover bg-white dark:bg-slate-800 rounded-3xl p-7 border border-slate-100 dark:border-slate-700 shadow-card relative overflow-hidden group">
              <div className="absolute top-4 right-4"><span className="badge badge-accent text-[10px]">Expert Verified</span></div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform">
                <Shield size={22} className="text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-2">Verified Counselors</h3>
              <p className="text-slate-500 text-sm mb-5 max-w-md">Book 1:1 video sessions with certified region-specific counselors.</p>
              <Link href="/booking" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:gap-3 transition-all">Book a Session <ArrowRight size={14} /></Link>
            </div>
            {/* Visa */}
            <div className="card-hover bg-slate-900 dark:bg-slate-700 rounded-3xl p-7 shadow-card group">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe size={22} className="text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-2">Visa Guide</h3>
              <p className="text-white/50 text-sm leading-relaxed">Step-by-step visa guides for USA, UK, Canada, Australia, and Germany.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  DESTINATION COUNTRIES                                         */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="w-full bg-white dark:bg-slate-950 py-20">
        <div className="max-w-5xl mx-auto px-4 mb-8">
          <div className="flex items-end justify-between">
            <div>
              <span className="badge badge-primary mb-3">25+ Countries</span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white">
                Study Anywhere <span className="gradient-brand-text">in the World</span>
              </h2>
            </div>
            <Link href="/compare" className="hidden sm:flex items-center gap-1 text-sm font-bold text-primary hover:gap-2 transition-all">View All <ChevronRight size={14} /></Link>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar"
          style={{ paddingLeft: "max(1rem, calc((100vw - 64rem) / 2))", paddingRight: "1rem" }}>
          {destinations.map((dest) => (
            <Link href={`/compare?loc=${encodeURIComponent(dest.name)}`} key={dest.name}
              className="shrink-0 snap-start w-48 h-64 sm:w-56 sm:h-72 rounded-3xl overflow-hidden relative group cursor-pointer block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                crossOrigin="anonymous"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${dest.color} via-transparent`} />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xl mb-0.5">{dest.flag}</p>
                <h3 className="text-white font-display font-bold text-sm leading-tight">{dest.name}</h3>
                <p className="text-white/60 text-xs mt-0.5">{dest.count} Universities</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  TESTIMONIALS                                                  */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="w-full bg-slate-50 dark:bg-slate-900 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge badge-amber mb-4">Student Stories</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white mb-2">
              10,000+ Students, <span className="gradient-brand-text">One Mission</span>
            </h2>
            <p className="text-slate-500 text-sm">Real stories from Indian students who made it happen.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="card-hover bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-card">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({length: t.rating}).map((_, j) => <Star key={j} size={13} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-5 italic">&quot;{t.quote}&quot;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <div className="w-9 h-9 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-sm shrink-0">{t.name.charAt(0)}</div>
                  <div className="min-w-0">
                    <p className="font-display font-bold text-slate-900 dark:text-white text-sm">{t.name}</p>
                    <p className="text-xs text-slate-400 truncate">{t.course} · {t.uni}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/success-stories" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all">
              Read All Success Stories <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  FINAL CTA                                                     */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="w-full bg-white dark:bg-slate-950 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="gradient-brand rounded-3xl p-10 md:p-14 overflow-hidden relative shadow-elevated text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3 blur-2xl" />
            <div className="relative z-10">
              <Trophy size={36} className="text-amber-300 mx-auto mb-4" />
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white mb-3">
                {isAuthenticated ? "Book Your Counseling Session" : "Start Your Global Journey Today"}
              </h2>
              <p className="text-white/70 text-sm mb-7 max-w-md mx-auto">
                {isAuthenticated
                  ? "Talk to a verified expert who knows your target country inside out."
                  : "Join 10,000+ Indian students who already have their acceptance letters."}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href={isAuthenticated ? "/booking" : "/login"}
                  className="btn-shine bg-white text-primary-900 font-extrabold py-3.5 px-8 rounded-2xl shadow-lg hover:scale-105 transition-all text-sm">
                  {isAuthenticated ? "Book a Session →" : "Create Free Account →"}
                </Link>
                <Link href="/compare" className="text-white/60 hover:text-white font-semibold text-sm transition-colors underline underline-offset-4">
                  or explore universities
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
