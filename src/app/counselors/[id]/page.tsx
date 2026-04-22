"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Star, MapPin, Globe, BookOpen, Clock, ArrowLeft,
  Calendar, Video, MessageCircle, Award, Shield,
  Languages, CheckCircle, Trophy, Zap, FileText, Send
} from "lucide-react";
import { csrfFetch } from "@/lib/csrf";

interface CounselorDetail {
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
  badges: string[];
  certificates: { name: string; issuer: string; year?: number; url?: string }[];
  featured: boolean;
  availability: { days: string[]; timeSlots: string[] };
}

interface ReviewData {
  _id: string;
  studentName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const badgeConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  "Top Rated": { icon: <Trophy size={11} />, color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
  "100+ Sessions": { icon: <Zap size={11} />, color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" },
  "Experienced": { icon: <Award size={11} />, color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
  "Senior Expert": { icon: <Shield size={11} />, color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" },
  "Quick Responder": { icon: <Clock size={11} />, color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300" },
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CounselorProfilePage() {
  const params = useParams();
  const [counselor, setCounselor] = useState<CounselorDetail | null>(null);
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Review form
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewResult, setReviewResult] = useState<{ success?: boolean; error?: string } | null>(null);

  useEffect(() => {
    if (params.id) {
      Promise.all([
        fetch(`/api/counselors/${params.id}`).then(r => r.json()),
        fetch(`/api/reviews?counselorId=${params.id}`).then(r => r.json()),
      ]).then(([cData, rData]) => {
        if (cData.counselor) setCounselor(cData.counselor);
        else setError("Counselor not found");
        setReviews(rData.reviews || []);
      }).catch(() => setError("Failed to load profile"))
        .finally(() => setLoading(false));
    }
  }, [params.id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitting(true);
    setReviewResult(null);
    try {
      const res = await csrfFetch("/api/reviews", {
        method: "POST",
        body: JSON.stringify({ counselorId: params.id, rating: reviewRating, comment: reviewComment }),
      });
      const data = await res.json();
      if (res.ok) {
        setReviewResult({ success: true });
        setReviewComment("");
        // Refresh reviews
        const rRes = await fetch(`/api/reviews?counselorId=${params.id}`);
        const rData = await rRes.json();
        setReviews(rData.reviews || []);
      } else {
        setReviewResult({ error: data.error });
      }
    } catch { setReviewResult({ error: "Network error" }); }
    finally { setReviewSubmitting(false); }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 animate-pulse">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-full" />
              <div className="flex-1"><div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-48 mb-2" /><div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32" /></div>
            </div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !counselor) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-2">Not Found</h2>
          <p className="text-slate-500 text-sm mb-6">{error || "This counselor profile doesn't exist."}</p>
          <Link href="/counselors" className="inline-flex items-center gap-2 text-sm font-bold text-primary"><ArrowLeft size={14} /> Back to Counselors</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <Link href="/counselors" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary transition-colors mb-6"><ArrowLeft size={14} /> All Counselors</Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-card">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-20 h-20 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-3xl shrink-0 overflow-hidden">
                  {counselor.profileImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={counselor.profileImage} alt={counselor.name} className="w-full h-full rounded-full object-cover" />
                  ) : counselor.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h1 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">{counselor.name}</h1>
                    <Shield size={16} className="text-emerald-500 shrink-0" />
                    {counselor.featured && (
                      <span className="bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><Trophy size={8} /> Featured</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm flex-wrap">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                      <span className="font-bold text-slate-800 dark:text-slate-200">{counselor.rating.toFixed(1)}</span>
                      <span className="text-slate-400">({counselor.totalReviews} reviews)</span>
                    </div>
                    <span className="text-slate-300 dark:text-slate-600">|</span>
                    <span className="text-slate-500">{counselor.totalSessions} sessions</span>
                    <span className="text-slate-300 dark:text-slate-600">|</span>
                    <span className="text-slate-500">{counselor.experience} years exp</span>
                  </div>
                </div>
              </div>

              {/* Badges */}
              {counselor.badges && counselor.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {counselor.badges.map((badge) => {
                    const cfg = badgeConfig[badge] || { icon: <Award size={11} />, color: "bg-slate-100 text-slate-600" };
                    return (
                      <span key={badge} className={`text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 ${cfg.color}`}>
                        {cfg.icon} {badge}
                      </span>
                    );
                  })}
                </div>
              )}

              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">{counselor.bio}</p>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-4 text-center">
                  <p className="text-2xl font-display font-extrabold text-slate-900 dark:text-white">{counselor.experience}</p>
                  <p className="text-xs text-slate-400 font-semibold mt-0.5">Years Exp</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-4 text-center">
                  <p className="text-2xl font-display font-extrabold text-slate-900 dark:text-white">{counselor.totalSessions}</p>
                  <p className="text-xs text-slate-400 font-semibold mt-0.5">Sessions</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-4 text-center">
                  <p className="text-2xl font-display font-extrabold text-amber-500">{counselor.rating.toFixed(1)}</p>
                  <p className="text-xs text-slate-400 font-semibold mt-0.5">Rating</p>
                </div>
              </div>
            </div>

            {/* Specializations */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-card">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2"><BookOpen size={16} className="text-primary" /> Specializations</h2>
              <div className="flex flex-wrap gap-2">
                {counselor.specializations.map((s) => <span key={s} className="bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-bold text-xs px-3 py-1.5 rounded-full">{s}</span>)}
              </div>
            </div>

            {/* Countries & Languages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-card">
                <h2 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-2"><Globe size={14} className="text-primary" /> Countries</h2>
                <div className="flex flex-wrap gap-2">{counselor.countries.map((c) => <span key={c} className="bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 font-bold text-xs px-3 py-1.5 rounded-full flex items-center gap-1"><MapPin size={10} />{c}</span>)}</div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-card">
                <h2 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-2"><Languages size={14} className="text-primary" /> Languages</h2>
                <div className="flex flex-wrap gap-2">{counselor.languages.map((l) => <span key={l} className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs px-3 py-1.5 rounded-full">{l}</span>)}</div>
              </div>
            </div>

            {/* Certificates */}
            {counselor.certificates && counselor.certificates.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-card">
                <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <FileText size={16} className="text-primary" /> Certificates & Credentials
                </h2>
                <div className="space-y-3">
                  {counselor.certificates.map((cert, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                        <Shield size={16} className="text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{cert.name}</p>
                        <p className="text-xs text-slate-400">{cert.issuer}{cert.year ? ` · ${cert.year}` : ""}</p>
                      </div>
                      {cert.url && (
                        <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary hover:underline shrink-0">View</a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Availability Calendar */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-card">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Calendar size={16} className="text-primary" /> Weekly Availability
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr>
                      <th className="p-2 text-left text-slate-400 font-semibold">Time</th>
                      {DAYS.map(d => (
                        <th key={d} className={`p-2 text-center font-bold ${counselor.availability.days.some(day => day.toLowerCase().startsWith(d.toLowerCase())) ? "text-primary" : "text-slate-300 dark:text-slate-600"}`}>
                          {d}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {counselor.availability.timeSlots.map(slot => (
                      <tr key={slot}>
                        <td className="p-2 text-slate-500 font-semibold whitespace-nowrap">{slot}</td>
                        {DAYS.map(d => {
                          const available = counselor.availability.days.some(day => day.toLowerCase().startsWith(d.toLowerCase()));
                          return (
                            <td key={d} className="p-1.5 text-center">
                              <div className={`w-full h-7 rounded-lg flex items-center justify-center text-[9px] font-bold ${available ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300" : "bg-slate-50 dark:bg-slate-700/30 text-slate-300 dark:text-slate-600"}`}>
                                {available ? "✓" : "—"}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-card">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Star size={16} className="text-amber-400" /> Student Reviews ({reviews.length})
              </h2>

              {reviews.length === 0 ? (
                <p className="text-sm text-slate-400 py-4 text-center">No reviews yet. Be the first to review!</p>
              ) : (
                <div className="space-y-4 mb-6">
                  {reviews.map((r) => (
                    <div key={r._id} className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary font-bold text-xs">{r.studentName.charAt(0).toUpperCase()}</div>
                          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{r.studentName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map(s => <Star key={s} size={11} className={s <= r.rating ? "text-amber-400 fill-amber-400" : "text-slate-300"} />)}
                        </div>
                      </div>
                      {r.comment && <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{r.comment}</p>}
                      <p className="text-[10px] text-slate-400 mt-2">{new Date(r.createdAt).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Write Review */}
              <form onSubmit={handleReviewSubmit} className="pt-4 border-t border-slate-100 dark:border-slate-700">
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Write a Review</h3>
                {reviewResult?.success && <p className="text-xs text-emerald-600 font-bold mb-3">✓ Review submitted!</p>}
                {reviewResult?.error && <p className="text-xs text-red-600 font-bold mb-3">✗ {reviewResult.error}</p>}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-slate-500 font-semibold">Rating:</span>
                  {[1,2,3,4,5].map(s => (
                    <button key={s} type="button" onClick={() => setReviewRating(s)}>
                      <Star size={18} className={`transition-colors cursor-pointer ${s <= reviewRating ? "text-amber-400 fill-amber-400" : "text-slate-300 hover:text-amber-300"}`} />
                    </button>
                  ))}
                </div>
                <textarea value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} placeholder="Share your experience..." maxLength={500} rows={3}
                  className="w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl p-3 text-sm text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary resize-none placeholder-slate-400 mb-3" />
                <button type="submit" disabled={reviewSubmitting}
                  className="bg-primary text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center gap-2 hover:bg-primary-700 transition-colors disabled:opacity-50">
                  <Send size={12} /> {reviewSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-card sticky top-24">
              {counselor.hourlyRate > 0 && (
                <div className="mb-4">
                  <p className="text-3xl font-display font-extrabold text-slate-900 dark:text-white">₹{counselor.hourlyRate.toLocaleString()}</p>
                  <p className="text-xs text-slate-400 font-semibold">per session</p>
                </div>
              )}
              <Link href="/booking" className="btn-shine gradient-brand text-white font-bold py-3.5 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 mb-3 w-full shadow-elevated hover:scale-105 transition-all">
                <Video size={16} /> Book Video Session
              </Link>
              <button className="w-full border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold py-3 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                <MessageCircle size={16} /> Send Message
              </button>
              {/* Trust */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700 space-y-2">
                {["Identity Verified", "Background Checked", "Free Cancellation"].map((b) => (
                  <div key={b} className="flex items-center gap-2 text-xs text-slate-500"><CheckCircle size={13} className="text-emerald-500 shrink-0" />{b}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
