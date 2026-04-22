"use client";

import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { csrfFetch } from '@/lib/csrf';

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await csrfFetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setSent(false), 5000);
      } else {
        alert("Failed to send. Please try again.");
      }
    } catch {
      alert("Network error.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center py-8">
        <CheckCircle size={40} className="text-green-400 mx-auto mb-3" />
        <p className="text-white font-bold">Message Sent!</p>
        <p className="text-gray-400 text-sm mt-1">We&apos;ll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
        type="text" placeholder="Your Name" className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl placeholder-gray-500 text-white focus:ring-2 focus:ring-primary outline-none" />
      <input required value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
        type="email" placeholder="Email Address" className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl placeholder-gray-500 text-white focus:ring-2 focus:ring-primary outline-none" />
      <input value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))}
        type="tel" placeholder="Phone (optional)" className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl placeholder-gray-500 text-white focus:ring-2 focus:ring-primary outline-none" />
      <textarea required value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))}
        placeholder="What courses are you interested in?" rows={3} className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl placeholder-gray-500 text-white focus:ring-2 focus:ring-primary outline-none resize-none"></textarea>
      <button type="submit" disabled={loading}
        className="w-full bg-primary hover:bg-blue-600 font-bold py-3 rounded-xl transition-colors text-white flex items-center justify-center gap-2 disabled:opacity-60">
        {loading ? "Sending..." : <><Send size={16} /> Submit Request</>}
      </button>
    </form>
  );
}
