"use client";

import { Search, MapPin, DollarSign, GraduationCap, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
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
    if (suggestion === "Data Science") desc = "Data Science offers extremely high ROI globally, particularly in the USA and UK, with massive demand across tech ecosystems. Average starting salaries exceed $100,000 in top networks.";
    if (suggestion === "MBA") desc = "A Master of Business Administration offers premium leadership pathways. Focus your search on IIMs in India or Ivy League tiers for maximum global networking power.";
    if (suggestion === "Artificial Intelligence") desc = "AI and Machine Learning are the most rapidly growing fields of 2026. Top universities offer dedicated research grants and immediate tech placements.";
    if (suggestion === "Computer Science") desc = "Computer Science and IT sectors drive the digital economy. Expect robust placement networks in hubs like Silicon Valley, London, and Bangalore.";
    
    setSelectedTopic({ name: suggestion, desc });
  };

  const suggestions = ["Data Science", "MBA", "Computer Science", "Artificial Intelligence", "Finance"];

  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-20 px-4 text-center">
      
      {/* Topic Info Modal */}
      {selectedTopic && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-8 shadow-2xl relative text-left">
            <button onClick={() => setSelectedTopic(null)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500">
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4">{selectedTopic.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-8">
              {selectedTopic.desc}
            </p>
            <button 
              onClick={() => {
                setCourse(selectedTopic.name);
                setSelectedTopic(null);
                router.push(`/compare?course=${encodeURIComponent(selectedTopic.name)}&budget=Any&loc=Anywhere`);
              }}
              className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-transform transform hover:scale-105 shadow-lg"
            >
              Search {selectedTopic.name} Universities
            </button>
          </div>
        </div>
      )}

      <div className="space-y-6 max-w-4xl mx-auto relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary leading-tight animate-fade-in-up">
          RK Consultancy
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto drop-shadow-sm">
          Your premier global education counselor. Compare QS 2026 ranked global & domestic universities, calculate budgets, and book verified agent consultations instantly.
        </p>
      </div>

      <form 
        onSubmit={handleSearch}
        className="w-full max-w-4xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-3xl shadow-2xl p-4 md:p-6 transition-all hover:shadow-primary/20 flex flex-col md:flex-row gap-4 relative z-10"
      >
        <div className="flex-1 flex items-center bg-gray-50 dark:bg-slate-800 rounded-xl px-4 py-3">
          <GraduationCap className="text-gray-400 mr-3" size={24} />
          <select 
            className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-100 font-medium cursor-pointer"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
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
        
        <div className="w-full md:w-56 flex items-center bg-gray-50 dark:bg-slate-800 rounded-xl px-4 py-3">
          <DollarSign className="text-gray-400 mr-2" size={20} />
          <select 
            className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-100 font-medium cursor-pointer"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option value="Any">Any Budget</option>
            <option value="10L">&lt; 10 Lakhs INR/yr</option>
            <option value="20L">&lt; 20 Lakhs INR/yr</option>
            <option value="30L">&lt; 30 Lakhs INR/yr</option>
            <option value="50L">&lt; 50 Lakhs INR/yr</option>
            <option value="75L">&lt; 75 Lakhs INR/yr</option>
            <option value="1Cr+">1 Cr+ (Premium)</option>
          </select>
        </div>

        <div className="w-full md:w-48 flex items-center bg-gray-50 dark:bg-slate-800 rounded-xl px-4 py-3">
          <MapPin className="text-gray-400 mr-2" size={20} />
          <select 
            className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-100 font-medium cursor-pointer"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="Anywhere">Global</option>
            <option value="India">India (Domestic)</option>
            <option value="USA">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
            <option value="Singapore">Singapore</option>
            <option value="UAE">UAE / Dubai</option>
          </select>
        </div>

        <button 
          type="submit"
          className="bg-primary hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-primary/50 flex items-center justify-center whitespace-nowrap"
        >
          <Search className="mr-2" size={20} /> Compare Now
        </button>
      </form>

      {/* Advanced Ad Banner */}
      <div className="w-full max-w-4xl bg-gradient-to-r from-primary via-blue-800 to-secondary rounded-2xl p-6 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between text-left transform hover:scale-[1.01] transition-transform cursor-pointer">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="z-10 mb-4 md:mb-0">
          <span className="text-amber-300 text-sm font-extrabold tracking-wider uppercase flex items-center mb-1">🔥 RK Consultancy Exclusive</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">Student Exchange Program</h2>
          <p className="text-blue-100 mt-2 font-medium max-w-lg">Seamlessly transfer your local Indian university credits to top-tier Foreign Universities. Graduate abroad with a global degree at a fraction of the cost!</p>
        </div>
        <button className="z-10 bg-white text-primary font-extrabold py-3 px-6 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-gray-50 transition-colors whitespace-nowrap" onClick={() => router.push('#footer')}>
          Learn More
        </button>
      </div>

      {/* Trending Suggestions */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4 max-w-2xl mx-auto z-10 animate-fade-in-up delay-150">
        <span className="text-sm font-semibold text-gray-500 mr-2">Trending:</span>
        {suggestions.map((sug, i) => (
          <button 
            key={i} 
            onClick={() => handleSuggestionClick(sug)}
            className="text-xs font-semibold bg-white/50 dark:bg-slate-800/50 hover:bg-primary hover:text-white border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-full transition-colors backdrop-blur-sm"
          >
            {sug}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto z-10">
        {[
          { title: "2026 Rankings", desc: "Access the latest QS Data (IISc, IIMs, Ivy League) to ensure top-tier choices." },
          { title: "AI Counseling", desc: "Get highly personalized university recs from our GPT-4o powered counselor." },
          { title: "Book Certified Agents", desc: "Schedule instant 1:1 sessions with verified region-specific agents (e.g., in Rajkot)." }
        ].map((feature, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 text-left group">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
