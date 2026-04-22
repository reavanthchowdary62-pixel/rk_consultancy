"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Star, MapPin, Globe, BookOpen, Clock, ArrowLeft,
  Calendar, Video, MessageCircle, Award, Shield,
  Languages, CheckCircle, ChevronRight
} from "lucide-react";

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
  availability: {
    days: string[];
    timeSlots: string[];
  };
}

export default function CounselorProfilePage() {
  const params = useParams();
  const [counselor, setCounselor] = useState<CounselorDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (params.id) {
      fetch(`/api/counselors/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.counselor) setCounselor(data.counselor);
          else setError("Counselor not found");
        })
        .catch(() => setError("Failed to load profile"))
        .finally(() => setLoading(false));
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 animate-pulse">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-full" />
              <div className="flex-1">
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-48 mb-2" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32" />
              </div>
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
          <Link href="/counselors" className="inline-flex items-center gap-2 text-sm font-bold text-primary">
            <ArrowLeft size={14} /> Back to Counselors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Back nav */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <Link href="/counselors" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary transition-colors mb-6">
          <ArrowLeft size={14} /> All Counselors
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT: Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-card">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-20 h-20 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-3xl shrink-0">
                  {counselor.profileImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={counselor.profileImage} alt={counselor.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    counselor.name.charAt(0)
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">{counselor.name}</h1>
                    <Shield size={16} className="text-emerald-500 shrink-0" />
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                      <span className="font-bold text-slate-800 dark:text-slate-200">{counselor.rating.toFixed(1)}</span>
                      <span className="text-slate-400">({counselor.totalReviews} reviews)</span>
                    </div>
                    <span className="text-slate-300 dark:text-slate-600">|</span>
                    <span className="text-slate-500">{counselor.totalSessions} sessions</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">{counselor.bio}</p>

              {/* Stats Row */}
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
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <BookOpen size={16} className="text-primary" /> Specializations
              </h2>
              <div className="flex flex-wrap gap-2">
                {counselor.specializations.map((spec) => (
                  <span key={spec} className="bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-bold text-xs px-3 py-1.5 rounded-full">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Countries */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-card">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Globe size={16} className="text-primary" /> Countries Covered
              </h2>
              <div className="flex flex-wrap gap-2">
                {counselor.countries.map((country) => (
                  <span key={country} className="bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 font-bold text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <MapPin size={10} /> {country}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-card">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Languages size={16} className="text-primary" /> Languages
              </h2>
              <div className="flex flex-wrap gap-2">
                {counselor.languages.map((lang) => (
                  <span key={lang} className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs px-3 py-1.5 rounded-full">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-card sticky top-24">
              {counselor.hourlyRate > 0 && (
                <div className="mb-4">
                  <p className="text-3xl font-display font-extrabold text-slate-900 dark:text-white">
                    ₹{counselor.hourlyRate.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-400 font-semibold">per session</p>
                </div>
              )}

              <Link href={`/booking`}
                className="btn-shine gradient-brand text-white font-bold py-3.5 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 mb-3 w-full shadow-elevated hover:scale-105 transition-all">
                <Video size={16} /> Book Video Session
              </Link>

              <button className="w-full border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold py-3 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                <MessageCircle size={16} /> Send Message
              </button>

              {/* Availability */}
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-700">
                <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <Calendar size={14} className="text-primary" /> Availability
                </h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-slate-400 font-semibold mb-1">Days</p>
                    <div className="flex flex-wrap gap-1">
                      {counselor.availability.days.map((day) => (
                        <span key={day} className="text-[10px] font-bold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full">
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold mb-1">Time Slots</p>
                    <div className="flex flex-wrap gap-1">
                      {counselor.availability.timeSlots.map((slot) => (
                        <span key={slot} className="text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full flex items-center gap-1">
                          <Clock size={8} /> {slot}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700 space-y-2">
                {["Identity Verified", "Background Checked", "Free Cancellation"].map((badge) => (
                  <div key={badge} className="flex items-center gap-2 text-xs text-slate-500">
                    <CheckCircle size={13} className="text-emerald-500 shrink-0" />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
