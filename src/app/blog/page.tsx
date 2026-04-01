"use client";

import { Clock, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { articles } from "@/data/articles";

const categoryColors: Record<string, string> = {
  "Destination Guide": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  "Scholarships": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  "Comparison": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  "Application Tips": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  "Career": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  "Exchange Program": "bg-primary/10 text-primary dark:text-blue-300",
};

export default function BlogPage() {
  const [featured, ...rest] = articles;

  return (
    <div className="py-10 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-3">Knowledge <span className="text-primary">Center</span></h1>
        <p className="text-gray-500 dark:text-gray-400">Expert guides, scholarship alerts, and destination news for Indian study-abroad aspirants.</p>
      </div>

      {/* Featured */}
      <Link href={`/blog/${featured.slug}`} className="block group mb-12">
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all flex flex-col md:flex-row">
          <div className="md:w-2/5 h-56 md:h-auto overflow-hidden">
            <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="p-8 md:w-3/5 flex flex-col justify-center">
            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full self-start mb-4 ${categoryColors[featured.category]}`}>{featured.category}</span>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">{featured.title}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{featured.excerpt}</p>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Clock size={12}/> {featured.readTime}</span>
              <span>{featured.date}</span>
              <span className="ml-auto text-primary font-bold flex items-center gap-1">Read Article <ArrowRight size={14}/></span>
            </div>
          </div>
        </div>
      </Link>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map(a => (
          <Link key={a.slug} href={`/blog/${a.slug}`} className="group bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all flex flex-col">
            <div className="h-44 overflow-hidden">
              <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full self-start mb-3 ${categoryColors[a.category]}`}>{a.category}</span>
              <h3 className="font-extrabold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">{a.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex-1 line-clamp-2">{a.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-gray-400 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                <Clock size={12}/> {a.readTime} · {a.date}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
