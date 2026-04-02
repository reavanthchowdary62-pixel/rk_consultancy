"use client";

import { Search, MapPin, DollarSign, GraduationCap, X, ArrowRight, Star, Users, BookOpen, Globe, ChevronRight, Award, TrendingUp, Shield, Building } from "lucide-react";
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

  return (
    <div className="flex flex-col items-center space-y-0">
      {/* Topic Modal */}
      {selectedTopic && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-8 shadow-2xl relative text-left animate-fade-in-up">
            <button onClick={() => setSelectedTopic(null)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500"><X size={24} /></button>
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4">{selectedTopic.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-8">{selectedTopic.desc}</p>
            <button onClick={() => { setCourse(selectedTopic.name); setSelectedTopic(null); router.push(`/compare?course=${encodeURIComponent(selectedTopic.name)}&budget=Any&loc=Anywhere`); }}
              className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-transform hover:scale-105 shadow-lg">
              Search {selectedTopic.name} Universities
            </button>
          </div>
        </div>
      )}

      {/* ═══ HERO SECTION ═══ */}
      <section className="w-full max-w-7xl mx-auto px-4 pt-12 pb-16 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-xs font-bold px-4 py-2 rounded-full mb-6 border border-amber-200 dark:border-amber-800">
          <Award size={14} /> Trusted by 10,000+ Students Across India
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-[1.1] mb-6 animate-fade-in-up">
          {isAuthenticated ? "Your Path to a" : "Launch Your"} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-secondary">
            {isAuthenticated ? "Global Education" : "Global Journey"}
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 font-medium font-sans">
          {isAuthenticated 
            ? "Compare QS 2026 ranked universities worldwide, calculate ROI, and book verified counselor sessions."
            : "Trusted by 10,000+ Indian students. Research top-tier universities, find scholarships, and secure your future — all in one premium platform."}
        </p>

        <div className="flex items-center justify-center mb-10 relative z-10">
          {isAuthenticated ? (
            <Link href="/booking" className="bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white font-extrabold py-4 px-10 rounded-2xl shadow-[0_10px_30px_rgba(37,99,235,0.3)] transition-all hover:scale-105 hover:-translate-y-1 text-lg flex items-center gap-2 animate-bounce-slow">
              📅 Go to Bookings Section
            </Link>
          ) : (
            <Link href="/login" className="bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white font-extrabold py-4 px-10 rounded-2xl shadow-[0_10px_30px_rgba(37,99,235,0.3)] transition-all hover:scale-105 hover:-translate-y-1 text-lg flex items-center gap-2">
              🔥 Join 10,000+ Students — Sign Up Free
            </Link>
          )}
        </div>

        {/* ─── SEARCH BAR ─── */}
        <form onSubmit={handleSearch}
          className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-900 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-3 md:p-4 flex flex-col md:flex-row gap-3 relative z-10">
          <div className="flex-1 flex items-center bg-gray-50 dark:bg-slate-800 rounded-xl px-4 py-3">
            <GraduationCap className="text-primary mr-3" size={20} />
            <select className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-100 font-medium cursor-pointer text-sm" value={course} onChange={(e) => setCourse(e.target.value)}>
              <option value="Any">Any Discipline</option>
              <option value="Computer Science">Computer Science & IT</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Data Science">Data Science</option>
              <option value="MBA">MBA & Business</option>
              <option value="Medicine">Medicine & Healthcare</option>
              <option value="Engineering">Core Engineering</option>
              <option value="Arts">Humanities & Arts</option>
              <option value="Finance">Finance & Economics</option>
            </select>
          </div>
          <div className="w-full md:w-48 flex items-center bg-gray-50 dark:bg-slate-800 rounded-xl px-4 py-3">
            <DollarSign className="text-primary mr-2" size={18} />
            <select className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-100 font-medium cursor-pointer text-sm" value={budget} onChange={(e) => setBudget(e.target.value)}>
              <option value="Any">Any Budget</option>
              <option value="10L">&lt; 10 Lakhs</option>
              <option value="20L">&lt; 20 Lakhs</option>
              <option value="30L">&lt; 30 Lakhs</option>
              <option value="50L">&lt; 50 Lakhs</option>
              <option value="75L">&lt; 75 Lakhs</option>
            </select>
          </div>
          <div className="w-full md:w-44 flex items-center bg-gray-50 dark:bg-slate-800 rounded-xl px-4 py-3">
            <MapPin className="text-primary mr-2" size={18} />
            <select className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-100 font-medium cursor-pointer text-sm" value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="Anywhere">Global</option>
              <option value="India">India</option>
              <option value="USA">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
            </select>
          </div>
          <button type="submit" className="bg-primary hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all hover:shadow-primary/40 flex items-center justify-center whitespace-nowrap text-sm">
            <Search className="mr-2" size={18} /> Compare Now
          </button>
        </form>

        {/* Trending */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6 max-w-2xl mx-auto z-10">
          <span className="text-xs font-semibold text-gray-400 mr-1">Trending:</span>
          {suggestions.map((sug, i) => (
            <button key={i} onClick={() => handleSuggestionClick(sug)}
              className="text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-primary hover:text-white border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-full transition-all">
              {sug}
            </button>
          ))}
        </div>
      </section>

      {/* ═══ ANIMATED STATS BAR ═══ */}
      <section className="w-full bg-gradient-to-r from-primary via-blue-700 to-blue-900 py-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6 text-center text-white">
          {[
            { val: 200, suffix: "+", label: "Universities Listed", icon: Building },
            { val: 10000, suffix: "+", label: "Students Placed", icon: Users },
            { val: 25, suffix: "+", label: "Countries Covered", icon: Globe },
            { val: 95, suffix: "%", label: "Admission Success", icon: TrendingUp },
          ].map(({ val, suffix, label, icon: Icon }, i) => (
            <div key={i} className="flex flex-col items-center">
              <Icon size={24} className="mb-2 text-blue-200" />
              <p className="text-3xl md:text-4xl font-extrabold"><AnimatedCounter target={val} suffix={suffix} /></p>
              <p className="text-blue-200 text-xs font-semibold mt-1 uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FEATURED UNIVERSITIES ═══ */}
      <section className="w-full max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Featured <span className="text-primary">Universities</span></h2>
            <p className="text-gray-500 text-sm mt-1">Top-ranked institutions from our QS 2026 database</p>
          </div>
          <Link href="/compare" className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {topUniversities.map((uni, i) => (
            <div key={i} className="group bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="h-40 overflow-hidden relative">
                <img src={uni.image} alt={uni.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">QS #{uni.rank}</div>
              </div>
              <div className="p-4">
                <h3 className="font-extrabold text-gray-900 dark:text-white group-hover:text-primary transition-colors text-sm">{uni.name}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><MapPin size={12} /> {uni.country}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-400">₹{uni.fee}/yr</span>
                  <span className="text-xs text-primary font-bold flex items-center gap-1 cursor-pointer hover:underline">Details <ArrowRight size={12} /></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ EXCHANGE PROGRAM BANNER ═══ */}
      <section className="w-full max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-r from-primary via-blue-800 to-secondary rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between text-left">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-xl"></div>
          <div className="z-10 mb-6 md:mb-0">
            <span className="text-amber-300 text-xs font-extrabold tracking-widest uppercase flex items-center gap-1 mb-2">🔥 RK Consultancy Exclusive</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-3">Student Exchange Program</h2>
            <p className="text-blue-100 font-medium max-w-lg text-sm">Transfer your local Indian university credits to top-tier foreign universities. Graduate abroad with a global degree at a fraction of the cost!</p>
          </div>
          <Link href="/blog/student-exchange-guide" className="z-10 bg-white text-primary font-extrabold py-3.5 px-8 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-gray-50 transition-all hover:scale-105 whitespace-nowrap text-sm">
            Learn More →
          </Link>
        </div>
      </section>

      {/* ═══ WHY CHOOSE US ═══ */}
      <section className="w-full max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-3">Why Choose <span className="text-primary">RK Consultancy</span>?</h2>
        <p className="text-center text-gray-500 mb-10 text-sm max-w-xl mx-auto">We combine data-driven insights with expert counseling to guarantee your study-abroad success.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: BookOpen, title: "QS 2026 Data", desc: "Access the latest QS rankings including IISc, IIMs, Ivy League and 200+ global institutions.", color: "from-blue-500 to-primary" },
            { icon: Star, title: "AI-Powered Counseling", desc: "Get personalized university recommendations from our GPT-4o powered smart counselor bot.", color: "from-amber-500 to-orange-500" },
            { icon: Shield, title: "Verified Agents", desc: "Book 1:1 video sessions with certified, region-specific counselors. Priority processing guaranteed.", color: "from-emerald-500 to-green-600" },
          ].map(({ icon: Icon, title, desc, color }, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all group text-left relative overflow-hidden">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform`}>
                <Icon size={22} />
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ QUICK LINKS ═══ */}
      <section className="w-full max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Scholarship Finder", href: "/scholarships", emoji: "🎓" },
            { label: "Visa Guide", href: "/visa", emoji: "🗺️" },
            { label: "Smart Tools", href: "/tools", emoji: "🛠️" },
            { label: "Bookings", href: "/booking", emoji: "📅" },
          ].map(({ label, href, emoji }) => (
            <Link key={href} href={href}
              className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-primary/30 transition-all group text-center">
              <span className="text-3xl block mb-2">{emoji}</span>
              <p className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors">{label}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
