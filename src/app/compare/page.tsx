"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { UniTable } from "@/components/UniTable";
import { SlidersHorizontal, MapPin, DollarSign, GraduationCap } from "lucide-react";

function CompareContent() {
  const searchParams = useSearchParams();
  // Strip wildcard values so API treats them as "show all"
  const rawCourse = searchParams.get("course") || "";
  const rawBudget = searchParams.get("budget") || "";
  const initialCourse = ["any", "Any"].includes(rawCourse) ? "" : rawCourse;
  const initialBudget = ["any", "Any"].includes(rawBudget) ? "" : rawBudget;
  const initialLocation = searchParams.get("loc") || "Anywhere";

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
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

  useEffect(() => {
    fetchResults();
  }, [course, budget, location]); // Re-fetch when filters change

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-10">
      <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm h-fit sticky top-24 z-10">
        <div className="flex items-center mb-6 text-gray-800 dark:text-gray-100 font-bold text-lg">
          <SlidersHorizontal className="mr-2" size={20} /> Filters
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-500 uppercase flex items-center"><GraduationCap size={14} className="mr-1" /> Course</label>
            <input 
              type="text" 
              className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="e.g. Computer Science"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-500 uppercase flex items-center"><DollarSign size={14} className="mr-1" /> Max Tuition</label>
            <select 
              className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none cursor-pointer"
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

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-500 uppercase flex items-center"><MapPin size={14} className="mr-1" /> Location</label>
            <select 
              className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none cursor-pointer"
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
        </div>
      </aside>

      <section className="flex-1">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              University Rankings 2026
            </h2>
            <p className="text-gray-500 mt-1 font-medium">{data.length} institutions match your criteria</p>
          </div>
        </div>
        
        {loading ? (
          <div className="flex space-x-2 justify-center items-center h-64">
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce delay-75"></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce delay-150"></div>
          </div>
        ) : (
          <UniTable data={data} />
        )}
      </section>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-500 animate-pulse">Loading Comparison Interface...</div>}>
      <CompareContent />
    </Suspense>
  );
}
