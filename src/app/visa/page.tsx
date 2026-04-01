"use client";

import { useState } from "react";
import { MapPin, Clock, CheckCircle, AlertCircle, FileText, Globe } from "lucide-react";

const visaData: Record<string, any> = {
  USA: {
    flag: "🇺🇸",
    types: [
      { name: "F-1 Student Visa", desc: "For full-time academic study at an SEVP-approved institution.", req: "I-20 form, SEVIS fee, DS-160, Proof of funds (min $30K/yr)" },
      { name: "J-1 Exchange Visa", desc: "For exchange students and research scholars.", req: "DS-2019 form, program sponsor letter, insurance coverage" },
    ],
    processing: "3-5 weeks",
    successRate: 88,
    tips: ["Apply at least 3 months before semester start", "Show strong ties to India", "Carry original financial documents to interview"],
  },
  UK: {
    flag: "🇬🇧",
    types: [
      { name: "Student Visa (Tier 4)", desc: "For students studying for more than 6 months at a licensed institution.", req: "CAS number, English proficiency (IELTS 5.5+), financial evidence (£1,334/month)" },
    ],
    processing: "3 weeks",
    successRate: 93,
    tips: ["Apply online via UKVI", "Biometrics appointment required in India", "CAS issued only after receiving offer"],
  },
  Canada: {
    flag: "🇨🇦",
    types: [
      { name: "Student Permit", desc: "Required for programs longer than 6 months.", req: "Acceptance letter, PAL/LOA, proof of funds (CAD $10,000/yr), no criminal record" },
    ],
    processing: "4-8 weeks",
    successRate: 82,
    tips: ["Apply through IRCC portal", "SDS Stream speeds process to 20 days", "Joint study permit + work permit available"],
  },
  Australia: {
    flag: "🇦🇺",
    types: [
      { name: "Subclass 500 Student Visa", desc: "For students enrolled in registered Australian courses (CRICOS).", req: "CoE, GTE statement, OSHC insurance, financial capacity (AUD $24,505/yr)" },
    ],
    processing: "4-6 weeks",
    successRate: 91,
    tips: ["Genuine Temporary Entrant (GTE) statement is crucial", "Work rights: 48 hours/fortnight during semester", "Apply after receiving CoE from university"],
  },
  Germany: {
    flag: "🇩🇪",
    types: [
      { name: "Student Visa (National D Visa)", desc: "Required for non-EU students. Converted to residence permit on arrival.", req: "Admission letter, blocked account (€11,208/yr), language proficiency, insurance" },
    ],
    processing: "6-12 weeks",
    successRate: 85,
    tips: ["Open a German blocked account (Fintiba or Expatrio)", "Apply at VFS or German Embassy in India", "Appointment slots fill up quickly — book early"],
  },
};

export default function VisaPage() {
  const [selected, setSelected] = useState("USA");
  const data = visaData[selected];

  return (
    <div className="py-10 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-3">Visa <span className="text-primary">Information Hub</span></h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Country-by-country visa guides with requirements, processing times, and success rates for Indian students.</p>
      </div>

      {/* Country Tabs */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {Object.keys(visaData).map(c => (
          <button key={c} onClick={() => setSelected(c)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border-2 ${selected === c ? "bg-primary border-primary text-white shadow-lg" : "bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary"}`}>
            {visaData[c].flag} {c}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visa Types */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Visa Types for {selected}</h2>
          {data.types.map((t: any, i: number) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="font-extrabold text-primary mb-2">{t.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t.desc}</p>
              <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4">
                <p className="text-xs font-bold uppercase text-gray-500 mb-2 flex items-center gap-1.5"><FileText size={12} /> Key Requirements</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{t.req}</p>
              </div>
            </div>
          ))}

          {/* Tips */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><CheckCircle size={18} className="text-green-500" /> Pro Tips for {selected}</h3>
            <ul className="space-y-2">
              {data.tips.map((tip: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-primary font-bold mt-0.5">✓</span> {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 text-center">
            <Clock size={28} className="text-primary mx-auto mb-2" />
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{data.processing}</p>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Avg. Processing Time</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 text-center">
            <Globe size={28} className="text-green-500 mx-auto mb-2" />
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{data.successRate}%</p>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Approval Rate for Indians</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
              <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${data.successRate}%` }}></div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4">
            <p className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5 mb-1"><AlertCircle size={14} /> Expert Tip</p>
            <p className="text-xs text-amber-700 dark:text-amber-300">RK Consultancy's visa specialists handle your complete application end-to-end. <a href="/booking" className="font-bold underline">Book a session →</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
