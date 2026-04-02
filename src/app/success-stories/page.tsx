"use client";

import { Quote, Award } from "lucide-react";

const stories = [
  { name: "Arjun Patel", from: "Ahmedabad", uni: "University of Toronto", course: "MS Computer Science", scholarship: "Ontario Graduate Scholarship", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face", flag: "🇨🇦", quote: "RK Consultancy guided me through every step — from shortlisting universities to visa preparation. I got a full scholarship I didn't even know I was eligible for!", year: "2025" },
  { name: "Sneha Rao", from: "Bangalore", uni: "University of Edinburgh", course: "MBA Strategic Management", scholarship: "Chevening Scholarship", image: "https://images.unsplash.com/photo-1494790108755-2616b612e5b8?w=200&h=200&fit=crop&crop=face", flag: "🇬🇧", quote: "The agent assigned to me knew exactly which universities fit my budget and academic profile. Got a Chevening fully-funded offer in 4 months!", year: "2025" },
  { name: "Karan Singh", from: "Delhi", uni: "Technical University of Munich", course: "M.Sc. Robotics", scholarship: "DAAD Fellowship", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face", flag: "🇩🇪", quote: "Germany was my dream. RK helped me open a blocked account, prepare my SOP, and get my DAAD fellowship. Best decision of my life.", year: "2024" },
  { name: "Priya Desai", from: "Surat", uni: "University of Melbourne", course: "BPharm (Hons)", scholarship: "Australia Awards Partial Funding", image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=200&fit=crop&crop=face", flag: "🇦🇺", quote: "From Surat to Melbourne! I was nervous but RK Consultancy made the process smooth and transparent. My visa was approved in just 3 weeks.", year: "2025" },
  { name: "Rohan Mehta", from: "Rajkot", uni: "Stanford University", course: "MS Data Science", scholarship: "Need-based Aid (70% tuition)", image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop&crop=face", flag: "🇺🇸", quote: "I never thought Stanford was possible for me. RK's counselor spotted my potential and pushed me to apply. Now I'm living in Silicon Valley!", year: "2024" },
  { name: "Meera Krishnan", from: "Chennai", uni: "University of Amsterdam", course: "MA International Relations", scholarship: "Holland Scholarship", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=face", flag: "🇳🇱", quote: "RK Consultancy introduced me to the Holland Scholarship which I had never heard of. That single advice saved me ₹8 lakhs. Incredible team!", year: "2025" },
];

const stats = [
  { value: "10,000+", label: "Students Placed" },
  { value: "98%", label: "Visa Approval Rate" },
  { value: "50+", label: "Countries Covered" },
  { value: "₹200Cr+", label: "Scholarships Secured" },
];

export default function SuccessStoriesPage() {
  return (
    <div className="py-10 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Student <span className="text-secondary">Success Stories</span></h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Real students. Real universities. Real results. Here&apos;s how RK Consultancy transformed their futures.</p>
      </div>

      {/* Stats Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {stats.map(s => (
          <div key={s.label} className="bg-gradient-to-br from-primary to-blue-800 text-white rounded-2xl p-6 text-center shadow-xl">
            <p className="text-3xl font-extrabold">{s.value}</p>
            <p className="text-blue-200 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Story Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((s, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 hover:shadow-2xl transition-all flex flex-col group">
            <div className="flex items-center gap-4 mb-5">
              <img src={s.image} alt={s.name} className="w-16 h-16 rounded-full object-cover border-4 border-primary/20 group-hover:border-primary transition-colors" />
              <div>
                <p className="font-extrabold text-gray-900 dark:text-white">{s.name}</p>
                <p className="text-xs text-gray-500">{s.from}, India → {s.uni} {s.flag}</p>
                <p className="text-xs text-primary font-semibold mt-0.5">{s.course}</p>
              </div>
            </div>

            <blockquote className="text-sm text-gray-600 dark:text-gray-400 italic flex-1 relative pl-4">
              <Quote size={28} className="absolute -top-2 -left-1 text-primary/10 rotate-180" />
              "{s.quote}"
            </blockquote>

            <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-amber-600 font-bold">
                <Award size={14} /> {s.scholarship}
              </div>
              <span className="text-xs text-gray-400">Batch {s.year}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 bg-gradient-to-r from-primary to-blue-800 rounded-3xl p-10 text-center text-white">
        <h2 className="text-3xl font-extrabold mb-3">Your Story Could Be Next</h2>
        <p className="text-blue-100 mb-6">Join thousands of Indian students who trusted RK Consultancy with their global education journey.</p>
        <a href="/booking" className="inline-block bg-white text-primary font-extrabold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-lg">Book Free Consultation →</a>
      </div>
    </div>
  );
}
