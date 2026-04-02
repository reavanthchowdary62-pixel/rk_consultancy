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
  { name: "United States",  flag: "🇺🇸", count: 48, color: "from-blue-900/80",   image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=600&q=80" },
  { name: "United Kingdom", flag: "🇬🇧", count: 32, color: "from-red-900/80",    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80" },
  { name: "Canada",         flag: "🇨🇦", count: 24, color: "from-red-800/80",    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=600&q=80" },
  { name: "Australia",      flag: "🇦🇺", count: 20, color: "from-yellow-900/80", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80" },
  { name: "Germany",        flag: "🇩🇪", count: 18, color: "from-slate-900/80",  image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=600&q=80" },
  { name: "Singapore",      flag: "🇸🇬", count: 8,  color: "from-red-950/80",   image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80" },
];

const testimonials = [
  { name: "Priya Sharma",     from: "Delhi", uni: "University of Toronto", course: "MSc Data Science",   rating: 5, quote: "RK Consultancy made my Canadian university dream a reality. Their counselors knew exactly which programs fit my profile. Got a 70% scholarship!" },
  { name: "Arjun Mehta",      from: "Pune",  uni: "TU Munich",             course: "MSc Computer Science", rating: 5, quote: "The visa guide section alone saved me weeks of research. My application was 100% correct on the first try. Couldn't have done it without RK." },
  { name: "Sneha Reddy",      from: "Hyd",   uni: "University of Oxford",  course: "MBA",                rating: 5, quote: "Booked my counselor session on a Saturday evening and had a personalized shortlist by Monday morning. Absolutely world-class service." },
];

const steps = [
  { step: "01", icon: Search,       title: "Search & Compare",    desc: "Browse 200+ QS 2026 ranked universities by course, budget, and country. Get instant ROI data." },
  { step: "02", icon: MessageCircle, title: "Book a Counselor",   desc: "Schedule a 1:1 video session with a verified, region-specific counselor within 24 hours." },
  { step: "03", icon: Plane,         title: "Apply & Get Accepted",desc: "We guide your SOP, documents, and visa — from offer letter to landing in your dream country." },
];

export function HomeClient({ isAuthenticated }: { isAuthenticated: boolean }) {
  const router = useRouter();
  const [course, setCourse] = useState("Any");
  const [budget, setBudget] = useState("Any");
  const [location, setLocation] = useState("Anywhere");
  const [selectedTopic, setSelectedTopic] = useState<{name: string, desc: string} | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/compare?course=${encodeURIComponent(course)}&budget=${encodeURIComponent(budget)}&loc=${encodeURIComponent(location)}`);
  };

  const suggestions = ["Data Science", "MBA", "Computer Science", "AI", "Finance"];

  return (
    <div className="flex flex-col w-full">

      {/* ── Topic Modal ─────────────────────────────────────────────────── */}
      {selectedTopic && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-8 shadow-2xl relative animate-scale-in border border-slate-100 dark:border-slate-800">
            <button onClick={() => setSelectedTopic(null)} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all">
              <X size={15} />
            </button>
            <div className="w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center mb-4 shadow-glow">
              <GraduationCap size={22} className="text-white" />
            </div>
            <h3 className="text-2xl font-display font-extrabold gradient-brand-text mb-3">{selectedTopic.name}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">{selectedTopic.desc}</p>
            <button onClick={() => { setSelectedTopic(null); router.push(`/compare?course=${encodeURIComponent(selectedTopic.name)}&budget=Any&loc=Anywhere`); }}
              className="btn-shine w-full gradient-brand text-white font-bold py-3.5 rounded-2xl text-sm hover:shadow-glow transition-all">
              Explore {selectedTopic.name} Universities →
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/*  HERO — Full-bleed dark split layout                               */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="w-full relative overflow-hidden bg-slate-950 min-h-[92vh] flex items-center">
        {/* Animated grid pattern background */}
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "linear-gradient(#3b82f6 1px,transparent 1px),linear-gradient(90deg,#3b82f6 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: headline + CTAs */}
          <div className="text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full mb-8 border border-white/20 animate-fade-in-up">
              <Trophy size={13} className="text-amber-400" />
              Trusted by 10,000+ Indian Students
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span className="text-accent-400">QS 2026 Verified</span>
            </div>

            <h1 className="font-display font-extrabold text-white leading-[1.08] mb-6 text-5xl md:text-6xl lg:text-7xl animate-fade-in-up delay-100">
              {isAuthenticated ? "Your Path to" : "Your Global"}
              <br />
              <span className="gradient-brand-text">
                {isAuthenticated ? "Global Success" : "University"}
              </span>
              <br />
              <span className="text-white/90">
                {isAuthenticated ? "" : "Starts Here."}
              </span>
            </h1>

            <p className="text-white/60 text-lg max-w-xl mb-10 leading-relaxed animate-fade-in-up delay-200">
              {isAuthenticated
                ? "Compare QS 2026 ranked universities, calculate ROI in seconds, and book verified expert counseling sessions."
                : "Research 200+ top-tier universities, find funded scholarships, apply with confidence — completely free."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-in-up delay-300">
              <Link href={isAuthenticated ? "/booking" : "/login"}
                className="btn-shine gradient-brand text-white font-bold py-4 px-8 rounded-2xl shadow-elevated hover:shadow-glow transition-all hover:scale-105 text-base flex items-center justify-center gap-2">
                <Sparkles size={18} />
                {isAuthenticated ? "Book a Counselor" : "Get Started — Free"}
              </Link>
              <Link href="/compare"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-white/20 text-white font-bold text-base hover:bg-white/10 transition-all group backdrop-blur-sm">
                Compare Universities <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 animate-fade-in-up delay-400">
              {["No credit card", "Free forever", "200+ Universities"].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-sm text-white/50 font-medium">
                  <CheckCircle size={14} className="text-accent-400" /> {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Live Stats Preview Card */}
          <div className="hidden lg:flex flex-col gap-4 animate-fade-in-up delay-200">
            {/* Floating preview card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/15 p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <p className="text-white font-display font-bold text-sm">Top Universities — QS 2026</p>
                <span className="flex items-center gap-1.5 text-xs text-accent-400 font-bold"><span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />Live</span>
              </div>
              <div className="space-y-3">
                {[{name:"MIT", rank:1, country:"🇺🇸 USA", score:"100.0"},{name:"Oxford",rank:3,country:"🇬🇧 UK",score:"99.1"},{name:"Stanford",rank:4,country:"🇺🇸 USA",score:"98.7"},{name:"NUS",rank:8,country:"🇸🇬 SG",score:"97.2"},{name:"IISc",rank:211,country:"🇮🇳 IN",score:"78.4"}].map((u) => (
                  <div key={u.rank} className="flex items-center gap-3 py-2 border-b border-white/10 last:border-0">
                    <span className="w-7 h-7 rounded-lg bg-primary-700/50 text-white text-xs font-bold flex items-center justify-center">#{u.rank}</span>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm">{u.name}</p>
                      <p className="text-white/40 text-xs">{u.country}</p>
                    </div>
                    <span className="text-accent-400 font-bold text-sm">{u.score}</span>
                  </div>
                ))}
              </div>
              <Link href="/compare" className="mt-4 flex items-center justify-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors font-semibold">
                View all 200+ universities <ArrowRight size={12} />
              </Link>
            </div>

            {/* Mini stat pills */}
            <div className="grid grid-cols-2 gap-3">
              {[{val:"10,000+",label:"Students Placed",icon:Users},{val:"95%",label:"Success Rate",icon:BadgeCheck},{val:"25+",label:"Countries",icon:Globe},{val:"4.9★",label:"Student Rating",icon:Star}].map(({val,label,icon:Icon})=> (
                <div key={label} className="bg-white/8 backdrop-blur-sm rounded-2xl border border-white/10 p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary-700/40 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-primary-300" />
                  </div>
                  <div>
                    <p className="text-white font-display font-bold text-base leading-none">{val}</p>
                    <p className="text-white/40 text-xs mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search bar — pinned at bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/95 to-transparent pt-20">
          <div className="max-w-5xl mx-auto px-4 pb-8">
            <form onSubmit={handleSearch} className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-2 flex flex-col sm:flex-row gap-2 border border-slate-200 dark:border-slate-700">
              <div className="flex-1 flex items-center gap-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl px-4 py-3">
                <GraduationCap className="text-primary shrink-0" size={17} />
                <select className="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200 font-semibold cursor-pointer text-sm" value={course} onChange={(e) => setCourse(e.target.value)}>
                  <option value="Any">Any Discipline</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Data Science">Data Science</option>
                  <option value="MBA">MBA & Business</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
              <div className="w-full sm:w-40 flex items-center gap-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl px-4 py-3">
                <DollarSign className="text-primary shrink-0" size={17} />
                <select className="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200 font-semibold cursor-pointer text-sm" value={budget} onChange={(e) => setBudget(e.target.value)}>
                  <option value="Any">Any Budget</option>
                  <option value="10L">&lt; 10 Lakhs</option>
                  <option value="30L">&lt; 30 Lakhs</option>
                  <option value="50L">&lt; 50 Lakhs</option>
                  <option value="75L">&lt; 75 Lakhs</option>
                </select>
              </div>
              <div className="w-full sm:w-36 flex items-center gap-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl px-4 py-3">
                <MapPin className="text-primary shrink-0" size={17} />
                <select className="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200 font-semibold cursor-pointer text-sm" value={location} onChange={(e) => setLocation(e.target.value)}>
                  <option value="Anywhere">Global</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                </select>
              </div>
              <button type="submit" className="btn-shine gradient-brand text-white font-bold py-3 px-6 rounded-xl text-sm flex items-center justify-center gap-2 whitespace-nowrap">
                <Search size={15} /> Search
              </button>
            </form>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
              <span className="text-xs font-bold text-white/30 uppercase tracking-wider">Trending:</span>
              {suggestions.map((s) => (
                <button key={s} onClick={() => setSelectedTopic({name: s, desc: "Explore global opportunities, salaries, and placements for this major."})}
                  className="text-xs font-semibold text-white/50 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-full transition-all hover:bg-white/10">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/*  STATS BAR                                                         */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="w-full gradient-brand py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { val: 200,   suffix: "+",  label: "Universities",    icon: Building },
            { val: 10000, suffix: "+",  label: "Students Placed", icon: Users },
            { val: 25,    suffix: "+",  label: "Countries",       icon: Globe },
            { val: 95,    suffix: "%",  label: "Success Rate",    icon: TrendingUp },
          ].map(({ val, suffix, label, icon: Icon }, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <Icon size={20} className="text-white/60 mb-1" />
              <p className="text-3xl md:text-4xl font-display font-extrabold"><AnimatedCounter target={val} suffix={suffix} /></p>
              <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/*  HOW IT WORKS — 3-step timeline                                    */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="w-full bg-white dark:bg-slate-950 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge badge-accent mb-4">Simple Process</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white mb-3">
              Study Abroad in <span className="gradient-brand-text">3 Simple Steps</span>
            </h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">From your first search to your acceptance letter — we are with you every step of the way.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line — desktop only */}
            <div className="hidden md:block absolute top-12 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-0.5 bg-gradient-to-r from-primary-200 via-accent-300 to-primary-200 dark:from-primary-800 dark:via-accent-700 dark:to-primary-800" />

            {steps.map(({ step, icon: Icon, title, desc }, i) => (
              <div key={i} className="flex flex-col items-center text-center relative">
                <div className="w-24 h-24 rounded-3xl gradient-brand flex flex-col items-center justify-center shadow-elevated mb-6 z-10">
                  <span className="text-white/50 text-xs font-bold">{step}</span>
                  <Icon size={28} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-3">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/*  BENTO GRID FEATURES                                               */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="w-full bg-slate-50 dark:bg-slate-900 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="badge badge-primary mb-4">Platform Features</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white mb-3">
              Everything in <span className="gradient-brand-text">One Platform</span>
            </h2>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Large tile: QS Rankings */}
            <div className="md:col-span-2 card-hover bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-card relative overflow-hidden group">
              <div className="absolute top-4 right-4"><span className="badge badge-primary text-[10px]">Live Data</span></div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-900 flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform">
                <BookMarked size={26} className="text-white" />
              </div>
              <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-2">QS 2026 Rankings</h3>
              <p className="text-slate-500 text-sm mb-6 max-w-sm">Real-time data from the latest QS rankings — 200+ institutions across 25+ countries. Filter by course, ROI, and budget.</p>
              <Link href="/compare" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all group/link">
                Explore Rankings <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Medium: AI Chat */}
            <div className="card-hover bg-gradient-to-br from-accent-600 to-accent-800 rounded-3xl p-8 shadow-card relative overflow-hidden group">
              <div className="absolute top-4 right-4"><span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">AI Powered</span></div>
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Zap size={26} className="text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-2">AI Counselor</h3>
              <p className="text-white/70 text-sm leading-relaxed">GPT-4o powered chatbot answers any study-abroad question instantly. Available 24/7.</p>
            </div>

            {/* Medium: Scholarships */}
            <div className="card-hover bg-gradient-to-br from-secondary-600 to-secondary-800 rounded-3xl p-8 shadow-card relative overflow-hidden group">
              <div className="absolute top-4 right-4"><span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">₹ Funded</span></div>
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Award size={26} className="text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-2">Scholarships</h3>
              <p className="text-white/70 text-sm leading-relaxed">Find funded opportunities including Chevening, DAAD, and Commonwealth. Filtered for Indian students.</p>
            </div>

            {/* Large tile: Counselors */}
            <div className="md:col-span-2 card-hover bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-card relative overflow-hidden group">
              <div className="absolute top-4 right-4"><span className="badge badge-accent text-[10px]">Expert Verified</span></div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform">
                <Shield size={26} className="text-white" />
              </div>
              <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-2">Verified Counselors</h3>
              <p className="text-slate-500 text-sm mb-6 max-w-sm">Book 1:1 video sessions with certified, region-specific counselors. Priority document processing included.</p>
              <Link href="/booking" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:gap-3 transition-all group/link">
                Book a Session <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Small: Visa */}
            <div className="card-hover bg-slate-900 dark:bg-slate-800 rounded-3xl p-8 shadow-card relative overflow-hidden group">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Globe size={26} className="text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-2">Visa Guide</h3>
              <p className="text-white/50 text-sm leading-relaxed">Step-by-step visa guides for USA, UK, Canada, Australia, and Germany.</p>
            </div>

            {/* Small: Tools */}
            <div className="card-hover bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-card relative overflow-hidden group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Clock size={26} className="text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-2">Smart Tools</h3>
              <p className="text-slate-500 text-sm leading-relaxed">ROI Calculator, GPA converter, IELTS prep tracker, and more.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/*  DESTINATION COUNTRIES — horizontal scroll                         */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="w-full bg-white dark:bg-slate-950 py-24">
        <div className="max-w-6xl mx-auto px-4 mb-10">
          <div className="flex items-end justify-between">
            <div>
              <span className="badge badge-primary mb-3">25+ Countries</span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white">
                Study Anywhere <span className="gradient-brand-text">in the World</span>
              </h2>
            </div>
            <Link href="/compare" className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-2.5 transition-all group">
              View All <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Horizontal scroll row */}
        <div className="flex gap-4 overflow-x-auto pb-4 px-4 snap-x snap-mandatory hide-scrollbar"
          style={{WebkitOverflowScrolling: "touch", paddingLeft: "max(1rem, calc((100vw - 72rem) / 2))"}}>
          {destinations.map((dest) => (
            <Link href={`/compare?loc=${encodeURIComponent(dest.name)}`} key={dest.name}
              className="shrink-0 snap-start w-56 h-72 rounded-3xl overflow-hidden relative group cursor-pointer block">
              <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className={`absolute inset-0 bg-gradient-to-t ${dest.color} via-transparent`} />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-2xl mb-1">{dest.flag}</p>
                <h3 className="text-white font-display font-bold text-base leading-tight">{dest.name}</h3>
                <p className="text-white/60 text-xs mt-1">{dest.count} Universities</p>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                <ArrowRight size={14} className="text-white" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/*  TESTIMONIALS                                                       */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="w-full bg-slate-50 dark:bg-slate-900 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="badge badge-amber mb-4">Student Stories</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white mb-3">
              10,000+ Students, <span className="gradient-brand-text">One Mission</span>
            </h2>
            <p className="text-slate-500 text-sm">Real stories from Indian students who made their global university dream a reality.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="card-hover bg-white dark:bg-slate-800 rounded-3xl p-7 border border-slate-100 dark:border-slate-700 shadow-card">
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({length: t.rating}).map((_, j) => <Star key={j} size={14} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 italic">
                  &quot;{t.quote}&quot;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <div className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-display font-bold text-slate-900 dark:text-white text-sm">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.course} · {t.uni}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/success-stories" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all group">
              Read All Success Stories <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/*  FINAL CTA BANNER                                                  */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="w-full bg-white dark:bg-slate-950 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative gradient-brand rounded-4xl p-12 md:p-16 overflow-hidden shadow-elevated">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3 blur-2xl" />
            <div className="relative z-10">
              <Trophy size={40} className="text-amber-300 mx-auto mb-5" />
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">
                {isAuthenticated ? "Book Your Counseling Session Today" : "Start Your Global Journey Today"}
              </h2>
              <p className="text-white/70 text-base mb-8 max-w-xl mx-auto">
                {isAuthenticated
                  ? "Talk to a verified expert who knows your target country inside out."
                  : "Join 10,000+ Indian students who already have their acceptance letters. It starts with one free account."}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href={isAuthenticated ? "/booking" : "/login"}
                  className="btn-shine bg-white text-primary-900 font-extrabold py-4 px-10 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-base">
                  {isAuthenticated ? "Book a Session →" : "Create Free Account →"}
                </Link>
                <Link href="/compare" className="text-white/70 hover:text-white font-semibold text-sm transition-colors underline underline-offset-4">
                  or just explore universities
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
