"use client";

import { useState } from "react";
import { TrendingUp, Calculator, BarChart3, MapPin } from "lucide-react";

// --- ROI Calculator ---
function ROICalculator() {
  const [course, setCourse] = useState("MBA");
  const [country, setCountry] = useState("USA");
  const [years, setYears] = useState(2);

  const fees: Record<string, Record<string, number>> = {
    USA: { MBA: 5000000, "Computer Science": 4500000, Medicine: 5500000, Engineering: 4000000 },
    UK: { MBA: 3800000, "Computer Science": 3500000, Medicine: 4200000, Engineering: 3200000 },
    Canada: { MBA: 3000000, "Computer Science": 2800000, Medicine: 3400000, Engineering: 2600000 },
    Germany: { MBA: 200000, "Computer Science": 150000, Medicine: 180000, Engineering: 120000 },
    Australia: { MBA: 3500000, "Computer Science": 3200000, Medicine: 4000000, Engineering: 3000000 },
  };
  const salaries: Record<string, Record<string, number>> = {
    USA: { MBA: 9000000, "Computer Science": 10000000, Medicine: 12000000, Engineering: 8500000 },
    UK: { MBA: 6500000, "Computer Science": 7000000, Medicine: 9000000, Engineering: 6000000 },
    Canada: { MBA: 5500000, "Computer Science": 6500000, Medicine: 8000000, Engineering: 5000000 },
    Germany: { MBA: 4500000, "Computer Science": 5500000, Medicine: 7000000, Engineering: 5000000 },
    Australia: { MBA: 6000000, "Computer Science": 7000000, Medicine: 9500000, Engineering: 5500000 },
  };

  const tuition = (fees[country]?.[course] || 3000000) * years;
  const living = 800000 * years;
  const total = tuition + living;
  const salary = salaries[country]?.[course] || 5000000;
  const breakeven = Math.ceil(total / (salary - 400000));
  const roi5yr = (((salary * 5) - total) / total * 100).toFixed(0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Course</label>
          <select value={course} onChange={e => setCourse(e.target.value)} className="w-full bg-gray-50 dark:bg-slate-700 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-primary text-gray-800 dark:text-gray-100">
            {["MBA", "Computer Science", "Medicine", "Engineering"].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Country</label>
          <select value={country} onChange={e => setCountry(e.target.value)} className="w-full bg-gray-50 dark:bg-slate-700 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-primary text-gray-800 dark:text-gray-100">
            {Object.keys(fees).map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Duration (Years)</label>
          <select value={years} onChange={e => setYears(+e.target.value)} className="w-full bg-gray-50 dark:bg-slate-700 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-primary text-gray-800 dark:text-gray-100">
            {[1,2,3,4,5].map(y => <option key={y} value={y}>{y} year{y > 1 ? "s" : ""}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Investment", value: `₹${(total/100000).toFixed(1)}L`, color: "text-red-500" },
          { label: "Expected Salary/yr", value: `₹${(salary/100000).toFixed(1)}L`, color: "text-green-500" },
          { label: "Break-even Point", value: `${breakeven} yrs`, color: "text-amber-500" },
          { label: "5-Year ROI", value: `${roi5yr}%`, color: "text-primary" },
        ].map(card => (
          <div key={card.label} className="bg-gray-50 dark:bg-slate-700 rounded-2xl p-4 text-center">
            <p className={`text-2xl font-extrabold ${card.color}`}>{card.value}</p>
            <p className="text-xs text-gray-500 mt-1">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Admission Probability Meter ---
function AdmissionMeter() {
  const [gpa, setGpa] = useState(8.0);
  const [gre, setGre] = useState(310);
  const [exp, setExp] = useState(0);
  const [country, setCountry] = useState("USA");

  const base =
    ((gpa / 10) * 35) +
    ((Math.max(gre - 280, 0) / 60) * 35) +
    (Math.min(exp, 3) / 3 * 20) +
    (country === "Germany" ? 10 : country === "Canada" ? 7 : 5);
  const prob = Math.min(Math.round(base), 96);
  const tier = prob >= 80 ? "Excellent" : prob >= 65 ? "Good" : prob >= 50 ? "Moderate" : "Low";
  const color = prob >= 80 ? "bg-green-500" : prob >= 65 ? "bg-blue-500" : prob >= 50 ? "bg-amber-500" : "bg-red-500";
  const textColor = prob >= 80 ? "text-green-500" : prob >= 65 ? "text-blue-500" : prob >= 50 ? "text-amber-500" : "text-red-500";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Academic GPA / % (out of 10)</label>
          <input type="range" min="4" max="10" step="0.1" value={gpa} onChange={e => setGpa(+e.target.value)} className="w-full accent-primary" />
          <p className="text-center font-bold text-primary mt-1">{gpa.toFixed(1)} / 10</p></div>
        <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">GRE Score (300-340)</label>
          <input type="range" min="280" max="340" value={gre} onChange={e => setGre(+e.target.value)} className="w-full accent-primary" />
          <p className="text-center font-bold text-primary mt-1">{gre}</p></div>
        <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Work Experience (Years)</label>
          <input type="range" min="0" max="5" value={exp} onChange={e => setExp(+e.target.value)} className="w-full accent-primary" />
          <p className="text-center font-bold text-primary mt-1">{exp} yr{exp !== 1 ? "s" : ""}</p></div>
        <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Target Country</label>
          <select value={country} onChange={e => setCountry(e.target.value)} className="w-full bg-gray-50 dark:bg-slate-700 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-primary text-gray-800 dark:text-gray-100">
            {["USA","UK","Canada","Germany","Australia"].map(c => <option key={c}>{c}</option>)}
          </select></div>
      </div>

      <div className="bg-gray-50 dark:bg-slate-700 rounded-2xl p-8 text-center">
        <p className="text-sm text-gray-500 mb-2">Estimated Admission Probability</p>
        <p className={`text-6xl font-extrabold ${textColor}`}>{prob}%</p>
        <p className={`text-lg font-bold mt-1 ${textColor}`}>{tier} Profile</p>
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mt-4">
          <div className={`${color} h-3 rounded-full transition-all duration-700`} style={{ width: `${prob}%` }}></div>
        </div>
        <p className="text-xs text-gray-400 mt-3">Based on GPA, GRE, experience, and country factors</p>
      </div>
    </div>
  );
}

// --- Cost of Living ---
function CostOfLiving() {
  const data = [
    { country: "🇩🇪 Germany", rent: 45000, food: 15000, transport: 7000, misc: 10000 },
    { country: "🇨🇦 Canada", rent: 80000, food: 20000, transport: 10000, misc: 15000 },
    { country: "🇦🇺 Australia", rent: 90000, food: 22000, transport: 12000, misc: 15000 },
    { country: "🇬🇧 UK", rent: 95000, food: 25000, transport: 15000, misc: 18000 },
    { country: "🇸🇬 Singapore", rent: 100000, food: 20000, transport: 8000, misc: 15000 },
    { country: "🇺🇸 USA", rent: 110000, food: 28000, transport: 12000, misc: 20000 },
  ].sort((a, b) => (a.rent + a.food + a.transport + a.misc) - (b.rent + b.food + b.transport + b.misc));

  const categories = ["rent", "food", "transport", "misc"] as const;
  const colors = { rent: "bg-primary", food: "bg-amber-500", transport: "bg-green-500", misc: "bg-purple-500" };
  const maxTotal = Math.max(...data.map(d => d.rent + d.food + d.transport + d.misc));

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map(c => (
          <span key={c} className="flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400 capitalize">
            <span className={`w-3 h-3 rounded-full ${colors[c]}`}></span> {c === "misc" ? "Other" : c}
          </span>
        ))}
      </div>
      <div className="space-y-4">
        {data.map(d => {
          const total = d.rent + d.food + d.transport + d.misc;
          return (
            <div key={d.country}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{d.country}</span>
                <span className="text-sm font-bold text-primary">₹{(total/1000).toFixed(0)}K/mo</span>
              </div>
              <div className="flex h-8 rounded-xl overflow-hidden">
                {categories.map(c => (
                  <div key={c} className={`${colors[c]} transition-all`} style={{ width: `${(d[c] / maxTotal) * 100}%` }} title={`${c}: ₹${d[c].toLocaleString()}`}></div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-gray-400 mt-4">*Monthly estimates in INR. Varies by city/lifestyle.</p>
    </div>
  );
}

// --- Main Page ---
const tabs = [
  { id: "roi", label: "ROI Calculator", icon: Calculator },
  { id: "admission", label: "Admission Meter", icon: BarChart3 },
  { id: "living", label: "Cost of Living", icon: MapPin },
];

export default function ToolsPage() {
  const [tab, setTab] = useState("roi");

  return (
    <div className="py-10 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-3">Smart <span className="text-primary">Study Tools</span></h1>
        <p className="text-gray-500 dark:text-gray-400">Data-driven tools to help you make smarter study abroad decisions.</p>
      </div>

      <div className="flex gap-2 bg-gray-100 dark:bg-slate-800 p-1.5 rounded-2xl mb-8">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setTab(id)} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${tab === id ? "bg-white dark:bg-slate-700 text-primary shadow-md" : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"}`}>
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-8 shadow-md">
        {tab === "roi" && <ROICalculator />}
        {tab === "admission" && <AdmissionMeter />}
        {tab === "living" && <CostOfLiving />}
      </div>
    </div>
  );
}
