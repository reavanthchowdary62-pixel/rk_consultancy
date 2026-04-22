"use client";

import { useState } from "react";
import { csrfFetch } from "@/lib/csrf";
import {
  GraduationCap, Globe, BookOpen, Languages, Clock,
  CheckCircle, AlertCircle, ArrowLeft, Sparkles, Shield,
  FileText, Plus, Trash2, Image
} from "lucide-react";
import Link from "next/link";

const COUNTRIES = ["USA", "UK", "Canada", "Australia", "Germany", "Singapore", "India", "Japan", "France", "Netherlands"];
const SPECIALIZATIONS = ["MBA", "Computer Science", "Artificial Intelligence", "Data Science", "Medicine", "Engineering", "Finance", "Law", "Pharmacy", "Design"];
const LANGUAGES = ["English", "Hindi", "Telugu", "Tamil", "Bengali", "Marathi", "Gujarati", "Kannada", "Malayalam", "Urdu"];
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const TIME_SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

interface Certificate {
  name: string;
  issuer: string;
  year: number | undefined;
  url: string;
}

export default function CounselorRegisterPage() {
  const [bio, setBio] = useState("");
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>(["English"]);
  const [experience, setExperience] = useState(1);
  const [hourlyRate, setHourlyRate] = useState(500);
  const [profileImage, setProfileImage] = useState("");
  const [days, setDays] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; message?: string; error?: string } | null>(null);

  const toggleList = (list: string[], item: string, setter: (l: string[]) => void) => {
    setter(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const addCertificate = () => {
    if (certificates.length >= 10) return;
    setCertificates([...certificates, { name: "", issuer: "", year: undefined, url: "" }]);
  };

  const updateCert = (idx: number, field: keyof Certificate, value: string | number) => {
    const updated = [...certificates];
    updated[idx] = { ...updated[idx], [field]: value };
    setCertificates(updated);
  };

  const removeCert = (idx: number) => {
    setCertificates(certificates.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (specializations.length === 0) return setResult({ error: "Select at least 1 specialization" });
    if (countries.length === 0) return setResult({ error: "Select at least 1 country" });
    if (days.length === 0 || timeSlots.length === 0) return setResult({ error: "Select your availability" });

    // Validate certificates
    const validCerts = certificates.filter(c => c.name.trim());
    
    setLoading(true);
    setResult(null);
    try {
      const res = await csrfFetch("/api/counselors/register", {
        method: "POST",
        body: JSON.stringify({
          bio, specializations, countries, languages, experience, hourlyRate, profileImage,
          availability: { days, timeSlots },
          certificates: validCerts,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult({ success: true, message: data.message });
      } else {
        setResult({ error: data.error || "Registration failed" });
      }
    } catch {
      setResult({ error: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (result?.success) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 text-center max-w-md shadow-card border border-slate-100 dark:border-slate-700">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
            <CheckCircle size={32} className="text-emerald-500" />
          </div>
          <h2 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white mb-2">Application Submitted!</h2>
          <p className="text-slate-500 text-sm mb-6">{result.message}</p>
          <Link href="/counselors" className="inline-flex items-center gap-2 text-sm font-bold text-primary"><ArrowLeft size={14} /> Back to Counselors</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero */}
      <section className="bg-slate-950 py-14 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#3b82f6 1px,transparent 1px),linear-gradient(90deg,#3b82f6 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 border border-white/20">
            <Shield size={12} className="text-emerald-400" /> Become a Verified Counselor
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-3">
            Join Our <span className="gradient-brand-text">Expert Network</span>
          </h1>
          <p className="text-white/60 text-sm max-w-md mx-auto">
            Help Indian students achieve their study-abroad dreams. Get verified, get booked, get paid.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 -mt-6 pb-16 relative z-10">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-card space-y-8">

          {result?.error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 flex items-start gap-3">
              <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
              <p className="text-red-700 dark:text-red-300 text-sm font-semibold">{result.error}</p>
            </div>
          )}

          {/* Profile Image */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
              <Image size={14} /> Profile Photo URL
            </label>
            <input type="url" value={profileImage} onChange={(e) => setProfileImage(e.target.value)}
              placeholder="https://example.com/your-photo.jpg (optional)"
              className="w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl p-3 text-sm text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary placeholder-slate-400" />
            <p className="text-xs text-slate-400 mt-1">Paste a link to your professional photo. Square photos work best.</p>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Professional Bio *</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} required maxLength={1000} rows={4}
              placeholder="Tell students about your experience, approach, and what makes you unique..."
              className="w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl p-3 text-sm text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary resize-none placeholder-slate-400" />
            <p className="text-xs text-slate-400 mt-1 text-right">{bio.length}/1000</p>
          </div>

          {/* Specializations */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
              <BookOpen size={14} /> Specializations *
            </label>
            <div className="flex flex-wrap gap-2">
              {SPECIALIZATIONS.map((s) => (
                <button key={s} type="button" onClick={() => toggleList(specializations, s, setSpecializations)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${specializations.includes(s)
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-primary"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Countries */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
              <Globe size={14} /> Countries You Cover *
            </label>
            <div className="flex flex-wrap gap-2">
              {COUNTRIES.map((c) => (
                <button key={c} type="button" onClick={() => toggleList(countries, c, setCountries)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${countries.includes(c)
                    ? "bg-accent-600 text-white border-accent-600 shadow-sm"
                    : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-accent-600"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
              <Languages size={14} /> Languages *
            </label>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((l) => (
                <button key={l} type="button" onClick={() => toggleList(languages, l, setLanguages)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${languages.includes(l)
                    ? "bg-slate-900 dark:bg-slate-200 text-white dark:text-slate-900 border-slate-900 dark:border-slate-200 shadow-sm"
                    : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-slate-400"}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Experience + Rate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Years of Experience *</label>
              <input type="number" min={0} max={50} value={experience} onChange={(e) => setExperience(Number(e.target.value))} required
                className="w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl p-3 text-sm text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Rate per Session (₹)</label>
              <input type="number" min={0} max={100000} value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl p-3 text-sm text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>

          {/* Certificates */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
              <FileText size={14} /> Certificates & Credentials
            </label>
            <p className="text-xs text-slate-400 mb-3">Add your professional certificates to build trust with students.</p>
            
            <div className="space-y-3 mb-3">
              {certificates.map((cert, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 border border-slate-200 dark:border-slate-600">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-500">Certificate #{idx + 1}</span>
                    <button type="button" onClick={() => removeCert(idx)} className="text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" placeholder="Certificate name *" value={cert.name} onChange={(e) => updateCert(idx, "name", e.target.value)} required
                      className="bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 rounded-lg p-2.5 text-xs text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary placeholder-slate-400" />
                    <input type="text" placeholder="Issuing organization" value={cert.issuer} onChange={(e) => updateCert(idx, "issuer", e.target.value)}
                      className="bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 rounded-lg p-2.5 text-xs text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary placeholder-slate-400" />
                    <input type="number" placeholder="Year" min={1990} max={2030} value={cert.year || ""} onChange={(e) => updateCert(idx, "year", Number(e.target.value))}
                      className="bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 rounded-lg p-2.5 text-xs text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary placeholder-slate-400" />
                    <input type="url" placeholder="Link to certificate (optional)" value={cert.url} onChange={(e) => updateCert(idx, "url", e.target.value)}
                      className="bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 rounded-lg p-2.5 text-xs text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary placeholder-slate-400" />
                  </div>
                </div>
              ))}
            </div>

            <button type="button" onClick={addCertificate} disabled={certificates.length >= 10}
              className="flex items-center gap-2 text-xs font-bold text-primary hover:text-primary-700 transition-colors disabled:text-slate-300 disabled:cursor-not-allowed">
              <Plus size={14} /> Add Certificate {certificates.length > 0 && `(${certificates.length}/10)`}
            </button>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
              <Clock size={14} /> Availability *
            </label>
            <p className="text-xs text-slate-400 mb-3">Select days and time slots you&apos;re available</p>
            <div className="mb-3">
              <p className="text-xs font-semibold text-slate-500 mb-2">Days</p>
              <div className="flex flex-wrap gap-2">
                {DAYS.map((d) => (
                  <button key={d} type="button" onClick={() => toggleList(days, d, setDays)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${days.includes(d)
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                      : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-emerald-400"}`}>
                    {d.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-2">Time Slots</p>
              <div className="flex flex-wrap gap-2">
                {TIME_SLOTS.map((t) => (
                  <button key={t} type="button" onClick={() => toggleList(timeSlots, t, setTimeSlots)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${timeSlots.includes(t)
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-primary"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading}
            className="btn-shine gradient-brand text-white font-bold py-4 px-8 rounded-2xl text-sm flex items-center justify-center gap-2 w-full shadow-elevated hover:scale-[1.02] transition-all disabled:opacity-60 disabled:hover:scale-100">
            <Sparkles size={16} />
            {loading ? "Submitting Application..." : "Submit Application for Review"}
          </button>

          <p className="text-xs text-slate-400 text-center">
            Your application will be reviewed by our admin team within 24-48 hours.
          </p>
        </form>
      </div>
    </div>
  );
}
