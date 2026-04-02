"use client";

import { Search, MapPin, DollarSign, GraduationCap, X, ArrowRight, Star, Users, BookOpen, Globe, ChevronRight, Award, TrendingUp, Shield, Building, CheckCircle, Zap, Trophy, Sparkles } from "lucide-react";
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

  const handleSuggestionClick = (suggestion: string) => {
    let desc = "Explore career opportunities, average salaries, and global placements for this major.";
    if (suggestion === "Data Science") desc = "Data Science offers extremely high ROI globally, particularly in the USA and UK, with massive demand across tech ecosystems. Average starting salaries exceed $100,000.";
    if (suggestion === "MBA") desc = "A Master of Business Administration offers premium leadership pathways. Focus on IIMs in India or Ivy League for maximum global networking.";
    if (suggestion === "Artificial Intelligence") desc = "AI and Machine Learning are the fastest-growing fields of 2026. Top universities offer dedicated research grants and immediate placements.";
    if (suggestion === "Computer Science") desc = "Computer Science drives the digital economy. Expect robust placement networks in Silicon Valley, London, and Bangalore.";
    setSelectedTopic({ name: suggestion, desc });
  };

  const suggestions = ["Data Science", "MBA", "Computer Science", "Artificial Intelligence", "Finance"];

  const topUniversities = [
    { name: "MIT", country: "USA", rank: 1, image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=400&h=250&q=80", fee: "45L" },
    { name: "University of Oxford", country: "UK", rank: 3, image: "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?auto=format&fit=crop&w=400&h=250&q=80", fee: "38L" },
    { name: "Stanford University", country: "USA", rank: 4, image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&h=250&q=80", fee: "48L" },
    { name: "IIT Bombay", country: "India", rank: 118, image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&h=250&q=80", fee: "2.5L" },
  ];

  const features = [
    { icon: BookOpen,  title: "QS 2026 Rankings",         desc: "Real-time data from the latest QS rankings — 200+ institutions across 25+ countries.",       color: "from-primary-600 to-primary-800",  badge: "Live Data" },
    { icon: Zap,       title: "AI Smart Counselor",        desc: "GPT-4o powered chatbot that answers your study-abroad questions instantly, 24/7.",              color: "from-accent-600 to-accent-800",    badge: "AI Powered" },
    { icon: Shield,    title: "Verified Counselors",        desc: "Book 1:1 sessions with certified, region-specific counselors. Priority processing guaranteed.", color: "from-secondary-600 to-secondary-700", badge: "Expert Verified" },
  ];

  return (
    <div className="flex flex-col items-center -mx-4 sm:-mx-6 -mt-4">

      {/* ── Topic Modal ────────────────────────────────────────────────── */}
      {selectedTopic && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass-card dark:bg-slate-900/95 rounded-3xl max-w-md w-full p-8 shadow-2xl relative text-left animate-scale-in">
            <button onClick={() => setSelectedTopic(null)} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
              <X size={16} />
            </button>
            <div className="w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center mb-4">
              <GraduationCap size={22} className="text-white" />
            </div>
            <h3 className="text-2xl font-display font-bold gradient-brand-text mb-3">{selectedTopic.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-8">{selectedTopic.desc}</p>
            <button
              onClick={() => { setCourse(selectedTopic.name); setSelectedTopic(null); router.push(`/compare?course=${encodeURIComponent(selectedTopic.name)}&budget=Any&loc=Anywhere`); }}
              className="btn-shine w-full gradient-brand text-white font-bold py-3.5 rounded-2xl transition-all hover:shadow-glow hover:scale-[1.02] text-sm"
            >
              Explore {selectedTopic.name} Universities →
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* HERO SECTION                                                   */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="w-full relative overflow-hidden gradient-mesh dark:bg-slate-950 py-20 px-4 text-center">
        {/* Background orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200/40 dark:bg-primary-900/20 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-200/30 dark:bg-accent-900/15 rounded-full blur-3xl pointer-events-none animate-float" style={{animationDelay: "1s"}} />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-primary-700 dark:text-primary-300 text-xs font-bold px-5 py-2.5 rounded-full mb-8 border border-primary-100 dark:border-primary-900 shadow-card animate-fade-in-up">
            <Trophy size={13} className="text-secondary" />
            <span>Trusted by 10,000+ Students Across India</span>
            <span className="w-1 h-1 rounded-full bg-current opacity-40" />
            <span className="text-accent-600 dark:text-accent-400">QS 2026 Verified</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-extrabold text-slate-900 dark:text-white leading-[1.1] mb-6 text-5xl md:text-7xl animate-fade-in-up delay-100">
            {isAuthenticated ? "Your Path to" : "Launch Your"}
            <br />
            <span className="gradient-brand-text">
              {isAuthenticated ? "Global Success" : "Global Journey"}
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed animate-fade-in-up delay-200">
            {isAuthenticated
              ? "Compare QS 2026 ranked universities, calculate ROI in seconds, and book verified expert counseling sessions — all in one premium platform."
              : "Research 200+ top-tier universities, find funded scholarships, navigate visa processes, and secure your global future — completely free."}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up delay-300">
            {isAuthenticated ? (
              <>
                <Link href="/booking" className="btn-shine gradient-brand text-white font-bold py-4 px-8 rounded-2xl shadow-elevated hover:shadow-glow transition-all hover:scale-105 text-base flex items-center gap-2">
                  📅 Book a Counseling Session
                </Link>
                <Link href="/compare" className="flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-primary-200 dark:border-primary-800 text-primary font-bold text-base hover:bg-primary-50 dark:hover:bg-primary-950 transition-all group">
                  Compare Universities <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-shine gradient-brand text-white font-bold py-4 px-8 rounded-2xl shadow-elevated hover:shadow-glow transition-all hover:scale-105 text-base flex items-center gap-2">
                  <Sparkles size={18} />
                  Start for Free — No Credit Card
                </Link>
                <Link href="/compare" className="flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-base hover:border-primary-300 hover:text-primary transition-all group">
                  Explore Universities <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </>
            )}
          </div>

          {/* Trust Signals */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400 animate-fade-in-up delay-400">
            {["No credit card required", "Free forever plan", "QS 2026 data included"].map((item) => (
              <span key={item} className="flex items-center gap-1.5 font-medium">
                <CheckCircle size={14} className="text-accent-500" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ─── SEARCH BAR ────────────────────────────────────────────── */}
        <form onSubmit={handleSearch}
          className="relative z-10 w-full max-w-4xl mx-auto mt-12 glass-card dark:bg-slate-900/90 rounded-3xl shadow-elevated p-2 flex flex-col md:flex-row gap-2 animate-fade-in-up delay-500">
          <div className="flex-1 flex items-center gap-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl px-4 py-3.5">
            <GraduationCap className="text-primary shrink-0" size={18} />
            <select className="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200 font-semibold cursor-pointer text-sm" value={course} onChange={(e) => setCourse(e.target.value)}>
              <option value="Any">Any Discipline</option>
              <option value="Computer Science">Computer Science & IT</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Data Science">Data Science</option>
              <option value="MBA">MBA & Business</option>
              <option value="Medicine">Medicine & Healthcare</option>
              <option value="Engineering">Core Engineering</option>
              <option value="Finance">Finance & Economics</option>
            </select>
          </div>
          <div className="w-full md:w-44 flex items-center gap-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl px-4 py-3.5">
            <DollarSign className="text-primary shrink-0" size={18} />
            <select className="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200 font-semibold cursor-pointer text-sm" value={budget} onChange={(e) => setBudget(e.target.value)}>
              <option value="Any">Any Budget</option>
              <option value="10L">&lt; 10 Lakhs</option>
              <option value="20L">&lt; 20 Lakhs</option>
              <option value="30L">&lt; 30 Lakhs</option>
              <option value="50L">&lt; 50 Lakhs</option>
              <option value="75L">&lt; 75 Lakhs</option>
            </select>
          </div>
          <div className="w-full md:w-40 flex items-center gap-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl px-4 py-3.5">
            <MapPin className="text-primary shrink-0" size={18} />
            <select className="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200 font-semibold cursor-pointer text-sm" value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="Anywhere">Global</option>
              <option value="India">India</option>
              <option value="USA">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
            </select>
          </div>
          <button type="submit" className="btn-shine gradient-brand text-white font-bold py-3.5 px-7 rounded-2xl transition-all hover:shadow-glow hover:scale-[1.02] flex items-center justify-center gap-2 text-sm whitespace-nowrap">
            <Search size={16} />
            Compare Now
          </button>
        </form>

        {/* Trending pills */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 mt-5 animate-fade-in-up delay-600">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Trending:</span>
          {suggestions.map((sug) => (
            <button key={sug} onClick={() => handleSuggestionClick(sug)}
              className="text-xs font-bold bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-primary hover:text-white border border-slate-200 dark:border-slate-700 px-4 py-1.5 rounded-full transition-all duration-200 hover:border-primary hover:shadow-md">
              {sug}
            </button>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* STATS BAR                                                      */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="w-full gradient-brand py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { val: 200,   suffix: "+",  label: "Universities",    icon: Building },
            { val: 10000, suffix: "+",  label: "Students Placed", icon: Users },
            { val: 25,    suffix: "+",  label: "Countries",       icon: Globe },
            { val: 95,    suffix: "%",  label: "Success Rate",    icon: TrendingUp },
          ].map(({ val, suffix, label, icon: Icon }, i) => (
            <div key={i} className="flex flex-col items-center gap-1 animate-fade-in-up" style={{animationDelay: `${i * 0.1}s`}}>
              <Icon size={22} className="text-white/70 mb-1" />
              <p className="text-3xl md:text-4xl font-display font-extrabold"><AnimatedCounter target={val} suffix={suffix} /></p>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* FEATURES                                                       */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="w-full max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <span className="badge badge-accent mb-4">Why RK Consultancy</span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white mb-3">
            Everything You Need to <span className="gradient-brand-text">Study Abroad</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm">
            We combine data-driven insights with expert counseling to guarantee your study-abroad success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc, color, badge }, i) => (
            <div key={i} className="card-hover glass-card dark:bg-slate-800/60 rounded-3xl p-8 border border-white/80 dark:border-slate-700/50 relative overflow-hidden group">
              <div className="absolute top-4 right-4">
                <span className="badge badge-primary text-[10px]">{badge}</span>
              </div>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={24} />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-3 group-hover:gradient-brand-text transition-all">{title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* FEATURED UNIVERSITIES                                          */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="w-full max-w-6xl mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="badge badge-primary mb-2">QS 2026 Verified</span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white">
              Featured <span className="gradient-brand-text">Universities</span>
            </h2>
          </div>
          <Link href="/compare" className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all group">
            View All <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {topUniversities.map((uni, i) => (
            <div key={i} className="card-hover glass-card dark:bg-slate-800/60 rounded-3xl border border-white/80 dark:border-slate-700/50 overflow-hidden group">
              <div className="h-40 overflow-hidden relative">
                <img src={uni.image} alt={uni.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">QS #{uni.rank}</div>
              </div>
              <div className="p-4">
                <h3 className="font-display font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors text-sm leading-tight mb-1">{uni.name}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1"><MapPin size={11} /> {uni.country}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">₹{uni.fee}/yr</span>
                  <Link href="/compare" className="text-xs text-primary font-bold flex items-center gap-0.5 hover:gap-1.5 transition-all">Details <ArrowRight size={11} /></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* CTA BANNER                                                     */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="w-full max-w-6xl mx-auto px-4 pb-20">
        <div className="relative gradient-brand rounded-4xl p-10 md:p-14 overflow-hidden shadow-elevated">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="inline-flex items-center gap-1.5 text-amber-300 text-xs font-extrabold tracking-widest uppercase mb-3">
                <Trophy size={12} className="fill-amber-300" /> RK Consultancy Exclusive
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white leading-tight mb-3">
                Student Exchange Program
              </h2>
              <p className="text-white/75 text-sm max-w-md leading-relaxed">
                Transfer your Indian university credits to top-tier foreign universities. Graduate abroad with a global degree at a fraction of the cost!
              </p>
            </div>
            <Link href="/blog/student-exchange-guide"
              className="btn-shine shrink-0 bg-white text-primary-900 font-extrabold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm">
              Learn More →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* QUICK LINKS                                                    */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="w-full max-w-6xl mx-auto px-4 pb-20">
        <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-6 text-center">
          Quick <span className="gradient-brand-text">Access</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Scholarship Finder", href: "/scholarships", emoji: "🎓", desc: "Find funded opportunities" },
            { label: "Visa Guide",          href: "/visa",         emoji: "🗺️", desc: "Country-specific advice" },
            { label: "Smart Tools",         href: "/tools",        emoji: "🛠️", desc: "ROI & GPA calculators" },
            { label: "Book a Session",      href: "/booking",      emoji: "📅", desc: "Talk to an expert" },
          ].map(({ label, href, emoji, desc }) => (
            <Link key={href} href={href}
              className="card-hover glass-card dark:bg-slate-800/60 rounded-3xl p-6 border border-white/80 dark:border-slate-700/50 group text-center">
              <span className="text-3xl block mb-3">{emoji}</span>
              <p className="text-sm font-display font-bold text-slate-800 dark:text-gray-200 group-hover:text-primary transition-colors mb-1">{label}</p>
              <p className="text-xs text-slate-400">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
