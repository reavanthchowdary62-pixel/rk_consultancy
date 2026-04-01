"use client";

import { useState } from "react";
import { Award, Clock, Globe, Search, Filter } from "lucide-react";

const scholarships = [
  { id: 1, name: "Inlaks Shivdasani Foundation", country: "UK / Europe", course: "Any", amount: "₹80 Lakh/yr", deadline: "Oct 31, 2026", eligibility: "Indian nationals under 30, top academics", url: "#" },
  { id: 2, name: "Chevening Scholarship", country: "UK", course: "Any PG", amount: "Full Funding", deadline: "Nov 5, 2026", eligibility: "2+ years work experience, leadership potential", url: "#" },
  { id: 3, name: "Commonwealth Scholarship", country: "UK", course: "Any PG", amount: "Full Funding", deadline: "Dec 15, 2026", eligibility: "Citizens of Commonwealth nations, strong academics", url: "#" },
  { id: 4, name: "Fulbright-Nehru Fellowship", country: "USA", course: "Research / PG", amount: "Full Funding", deadline: "Jul 15, 2026", eligibility: "Indian citizenship, outstanding academics, leadership", url: "#" },
  { id: 5, name: "Gates Cambridge Scholarship", country: "UK", course: "Any PG / PhD", amount: "Full Funding", deadline: "Oct 14, 2026", eligibility: "Any nationality, admitted to Cambridge Uni", url: "#" },
  { id: 6, name: "DAAD Scholarship", country: "Germany", course: "Any", amount: "€850-1200/month", deadline: "Nov 1, 2026", eligibility: "Indian nationals, German university admission", url: "#" },
  { id: 7, name: "Australia Awards Scholarship", country: "Australia", course: "UG / PG", amount: "Full Funding", deadline: "Apr 30, 2026", eligibility: "Citizens of eligible countries, public sector", url: "#" },
  { id: 8, name: "Ontario Graduate Scholarship", country: "Canada", course: "PG / PhD", amount: "CAD $15,000/yr", deadline: "Jan 31, 2026", eligibility: "Enrolled in Ontario university graduate programs", url: "#" },
  { id: 9, name: "Aga Khan Foundation Scholarship", country: "Global", course: "Any PG", amount: "Partial Funding", deadline: "Mar 31, 2026", eligibility: "Academically outstanding students with financial need", url: "#" },
  { id: 10, name: "MEXT Japanese Government Scholarship", country: "Japan", course: "Any", amount: "Full Funding", deadline: "Jun 10, 2026", eligibility: "Indian nationals, admitted to Japanese university", url: "#" },
  { id: 11, name: "Erasmus+ Scholarship", country: "Europe", course: "Any", amount: "€850/month", deadline: "Rolling", eligibility: "Enrolled at partner institution", url: "#" },
  { id: 12, name: "Singapore International Graduate Award", country: "Singapore", course: "PhD", amount: "Full + Stipend", deadline: "Dec 31, 2026", eligibility: "First class degree, research aptitude", url: "#" },
  { id: 13, name: "Rhodes Scholarship", country: "UK", course: "Any PG", amount: "Full Funding", deadline: "Sep 15, 2026", eligibility: "Indian nationals under 25, exceptional achievers", url: "#" },
  { id: 14, name: "Tata Endowment Scholarship", country: "Global", course: "Any", amount: "Up to ₹25 Lakh", deadline: "Mar 31, 2026", eligibility: "Indian nationals, meritorious students", url: "#" },
  { id: 15, name: "GREAT Scholarship", country: "UK", course: "Any PG", amount: "£10,000", deadline: "Jun 30, 2026", eligibility: "Indian students starting UK courses", url: "#" },
];

const countries = ["All Countries", "UK", "USA", "Canada", "Australia", "Germany", "Europe", "Japan", "Singapore", "Global"];
const courses = ["All Courses", "Any", "Any PG", "Any UG", "Research / PG", "PhD", "UG / PG"];

export default function ScholarshipsPage() {
  const [countryFilter, setCountryFilter] = useState("All Countries");
  const [courseFilter, setCourseFilter] = useState("All Courses");
  const [search, setSearch] = useState("");

  const filtered = scholarships.filter(s =>
    (countryFilter === "All Countries" || s.country.includes(countryFilter)) &&
    (courseFilter === "All Courses" || s.course.includes(courseFilter.replace("All Courses", ""))) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.country.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="py-10 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Scholarship <span className="text-secondary">Finder</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Browse 15+ internationally recognized scholarships available for Indian students. Filter by country and course to find the best fit.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search scholarships..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-700 rounded-xl text-sm outline-none focus:ring-2 ring-primary text-gray-800 dark:text-gray-100" />
        </div>
        <select value={countryFilter} onChange={e => setCountryFilter(e.target.value)} className="bg-gray-50 dark:bg-slate-700 rounded-xl px-4 py-2.5 text-sm text-gray-800 dark:text-gray-100 outline-none focus:ring-2 ring-primary cursor-pointer">
          {countries.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={courseFilter} onChange={e => setCourseFilter(e.target.value)} className="bg-gray-50 dark:bg-slate-700 rounded-xl px-4 py-2.5 text-sm text-gray-800 dark:text-gray-100 outline-none focus:ring-2 ring-primary cursor-pointer">
          {courses.map(c => <option key={c}>{c}</option>)}
        </select>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Filter size={16} /> {filtered.length} results
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(s => (
          <div key={s.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 rounded-xl flex items-center justify-center shrink-0">
                  <Award size={20} className="text-amber-500" />
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-full">{s.amount}</span>
              </div>
              <h3 className="font-extrabold text-gray-900 dark:text-white text-base mb-2 group-hover:text-primary transition-colors">{s.name}</h3>
              <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Globe size={12} /> {s.country}</p>
              <p className="text-xs text-gray-500 mb-3">Course: {s.course}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-slate-700 rounded-lg p-2">{s.eligibility}</p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Clock size={12} className="text-red-400" />
                <span>Deadline: <strong>{s.deadline}</strong></span>
              </div>
              <a href={s.url} className="text-xs font-bold text-primary hover:underline">Apply →</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
