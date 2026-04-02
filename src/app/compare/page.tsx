"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { UniTable } from "@/components/UniTable";
import { SlidersHorizontal, MapPin, DollarSign, GraduationCap, Search, X, Sparkles } from "lucide-react";

function CompareContent() {
  const searchParams = useSearchParams();
  const rawCourse = searchParams.get("course") || "";
  const rawBudget = searchParams.get("budget") || "";
  const initialCourse = ["any", "Any"].includes(rawCourse) ? "" : rawCourse;
  const initialBudget = ["any", "Any"].includes(rawBudget) ? "" : rawBudget;
  const initialLocation = searchParams.get("loc") || "Anywhere";

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(initialCourse);
  const [budget, setBudget] = useState(initialBudget);
  const [location, setLocation] = useState(initialLocation);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/compare?course=${encodeURIComponent(course)}&budget=${encodeURIComponent(budget)}&loc=${encodeURIComponent(location)}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to fetch comparisons", err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchResults(); }, [course, budget, location]);

  const clearFilters = () => { setCourse(""); setBudget(""); setLocation("Anywhere"); };
  const hasFilters = course || budget || location !== "Anywhere";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 sm:px-6 lg:px-8 py-8">
      {/* ── Page Header ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-primary">QS 2026 Live</span>
              <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
              <span className="text-xs font-semibold text-accent-600 dark:text-accent-400">Updated Daily</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white">
              Compare <span className="gradient-brand-text">Universities</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
              {loading ? "Loading..." : <><span className="font-bold text-slate-700 dark:text-slate-300">{data.length}</span> institutions match your criteria</>}
            </p>
          </div>
          {hasFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-500 transition-colors font-semibold border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl hover:border-red-200 dark:hover:border-red-900">
              <X size={14} /> Clear Filters
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* ── Sidebar Filters ───────────────────────────────────────── */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-card sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center">
                <SlidersHorizontal size={15} className="text-white" />
              </div>
              <span className="font-display font-bold text-slate-900 dark:text-white">Filters</span>
            </div>

            <div className="space-y-5">
              {/* Course */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  <GraduationCap size={12} /> Course / Discipline
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 outline-none transition-all font-medium placeholder:text-slate-400"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  placeholder="e.g. Computer Science"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  <DollarSign size={12} /> Max Tuition / Year
                </label>
                <select
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white focus:border-primary-400 outline-none cursor-pointer font-medium"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                >
                  <option value="">Any Budget</option>
                  <option value="10L">&lt; 10 Lakhs INR/yr</option>
                  <option value="15L">&lt; 15 Lakhs INR/yr</option>
                  <option value="20L">&lt; 20 Lakhs INR/yr</option>
                  <option value="30L">&lt; 30 Lakhs INR/yr</option>
                  <option value="50L">&lt; 50 Lakhs INR/yr</option>
                  <option value="75L">&lt; 75 Lakhs INR/yr</option>
                  <option value="1Cr+">1 Cr+ (Premium)</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  <MapPin size={12} /> Country / Region
                </label>
                <select
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white focus:border-primary-400 outline-none cursor-pointer font-medium"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="Anywhere">Global (All)</option>
                  <option value="India">India</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="Singapore">Singapore</option>
                </select>
              </div>

              {/* Quick filter chips */}
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">Popular Searches</label>
                <div className="flex flex-wrap gap-2">
                  {["MBA", "CS", "Data Science", "AI", "Finance"].map((s) => (
                    <button key={s} onClick={() => setCourse(s)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${course === s ? "gradient-brand text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-950 hover:text-primary"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI suggestion hint */}
              <div className="bg-primary-50 dark:bg-primary-950/50 rounded-2xl p-4 border border-primary-100 dark:border-primary-900">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-primary" />
                  <span className="text-xs font-bold text-primary">AI Counselor Tip</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Not sure which country? Use the AI chatbot (bottom right) for personalized recommendations.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* ── Results Table ─────────────────────────────────────────── */}
        <section className="flex-1 min-w-0">
          {loading ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-card p-10">
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                      <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded w-1/2" />
                    </div>
                    <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-card overflow-hidden">
              <UniTable data={data} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-64 gap-3">
        <div className="w-3 h-3 bg-primary rounded-full animate-bounce" />
        <div className="w-3 h-3 bg-primary rounded-full animate-bounce delay-100" />
        <div className="w-3 h-3 bg-primary rounded-full animate-bounce delay-200" />
      </div>
    }>
      <CompareContent />
    </Suspense>
  );
}
