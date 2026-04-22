"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Star, MapPin, Globe, BookOpen, Clock, Search,
  ChevronRight, Users, Award, Shield, Sparkles
} from "lucide-react";

interface CounselorData {
  _id: string;
  name: string;
  bio: string;
  specializations: string[];
  countries: string[];
  languages: string[];
  experience: number;
  profileImage: string;
  hourlyRate: number;
  rating: number;
  totalReviews: number;
  totalSessions: number;
}

export default function CounselorsPage() {
  const [counselors, setCounselors] = useState<CounselorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [countryFilter, setCountryFilter] = useState("");
  const [specFilter, setSpecFilter] = useState("");

  useEffect(() => {
    fetchCounselors();
  }, [countryFilter, specFilter]);

  const fetchCounselors = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (countryFilter) params.set("country", countryFilter);
      if (specFilter) params.set("specialization", specFilter);
      const res = await fetch(`/api/counselors?${params}`);
      const data = await res.json();
      setCounselors(data.counselors || []);
    } catch {
      console.error("Failed to fetch counselors");
    } finally {
      setLoading(false);
    }
  };

  const allCountries = ["USA", "UK", "Canada", "Australia", "Germany", "Singapore", "India", "Japan"];
  const allSpecs = ["MBA", "Computer Science", "Medicine", "Engineering", "Data Science", "Finance", "AI", "Law"];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero */}
      <section className="bg-slate-950 relative overflow-hidden py-16 px-4">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#3b82f6 1px,transparent 1px),linear-gradient(90deg,#3b82f6 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-6 border border-white/20">
            <Shield size={12} className="text-emerald-400" />
            Verified & Background-Checked
          </div>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-4">
            Expert <span className="gradient-brand-text">Counselors</span>
          </h1>
          <p className="text-white/60 text-base max-w-lg mx-auto mb-8">
            Book 1:1 video sessions with certified study-abroad counselors. Region-specific, highly rated, available within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-white/50 text-xs font-semibold">
            <span className="flex items-center gap-1.5"><Users size={14} className="text-primary-400" /> All Verified</span>
            <span className="flex items-center gap-1.5"><Clock size={14} className="text-accent-400" /> 24hr Response</span>
            <span className="flex items-center gap-1.5"><Award size={14} className="text-amber-400" /> 4.8+ Average Rating</span>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-5xl mx-auto px-4 -mt-6 relative z-20">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 bg-slate-50 dark:bg-slate-700/50 rounded-xl px-3 py-3">
            <Globe size={16} className="text-primary shrink-0" />
            <select className="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200 font-semibold cursor-pointer text-sm"
              value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)}>
              <option value="">All Countries</option>
              {allCountries.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex-1 flex items-center gap-2 bg-slate-50 dark:bg-slate-700/50 rounded-xl px-3 py-3">
            <BookOpen size={16} className="text-primary shrink-0" />
            <select className="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200 font-semibold cursor-pointer text-sm"
              value={specFilter} onChange={(e) => setSpecFilter(e.target.value)}>
              <option value="">All Specializations</option>
              {allSpecs.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <button onClick={() => { setCountryFilter(""); setSpecFilter(""); }}
            className="text-xs font-bold text-slate-400 hover:text-primary transition-colors px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700">
            Clear
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-3xl p-6 animate-pulse border border-slate-100 dark:border-slate-700">
                <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full mb-4" />
                <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mb-2" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full mb-4" />
                <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-xl" />
              </div>
            ))}
          </div>
        ) : counselors.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Search size={30} className="text-slate-400" />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-2">No Counselors Found</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
              {countryFilter || specFilter
                ? "Try adjusting your filters to find available counselors."
                : "Our first counselors are being onboarded. Check back soon!"}
            </p>
            <Link href="/counselors/register"
              className="inline-flex items-center gap-2 gradient-brand text-white font-bold py-3 px-6 rounded-2xl text-sm hover:scale-105 transition-transform">
              <Sparkles size={14} /> Become a Counselor
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-500 font-semibold mb-6">{counselors.length} counselor{counselors.length !== 1 ? "s" : ""} available</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {counselors.map((c) => (
                <Link href={`/counselors/${c._id}`} key={c._id}
                  className="card-hover bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-card group block">
                  {/* Avatar + Rating */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-xl shrink-0 group-hover:scale-110 transition-transform">
                      {c.profileImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={c.profileImage} alt={c.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        c.name.charAt(0)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-base text-slate-900 dark:text-white truncate">{c.name}</h3>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star size={12} className="text-amber-400 fill-amber-400" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{c.rating.toFixed(1)}</span>
                        <span className="text-xs text-slate-400">({c.totalReviews} reviews)</span>
                      </div>
                    </div>
                    <span className="badge badge-accent text-[10px] shrink-0">{c.experience}yr exp</span>
                  </div>

                  {/* Bio */}
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-4">{c.bio}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {c.countries.slice(0, 3).map((country) => (
                      <span key={country} className="text-[10px] font-bold bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <MapPin size={9} /> {country}
                      </span>
                    ))}
                    {c.specializations.slice(0, 2).map((spec) => (
                      <span key={spec} className="text-[10px] font-bold bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 px-2 py-0.5 rounded-full">
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
                    <span className="text-xs text-slate-400">{c.totalSessions} sessions</span>
                    <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      View Profile <ChevronRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* CTA */}
        <div className="mt-16 gradient-brand rounded-3xl p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-52 h-52 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
          <div className="relative z-10">
            <h2 className="font-display font-extrabold text-2xl text-white mb-3">Are You an Education Expert?</h2>
            <p className="text-white/70 text-sm mb-6 max-w-md mx-auto">
              Join RK Consultancy as a verified counselor. Help Indian students achieve their study-abroad dreams.
            </p>
            <Link href="/counselors/register"
              className="btn-shine bg-white text-primary-900 font-extrabold py-3 px-8 rounded-2xl shadow-lg hover:scale-105 transition-all text-sm inline-block">
              Apply as Counselor →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
