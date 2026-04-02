"use client";

import { useState } from "react";
import { Calendar, Clock, Video, CheckCircle, User } from "lucide-react";

const agents = [
  { id: 1, name: "Priya Mehta", specialty: "USA & Canada", experience: "8 years", rating: 4.9, avatar: "https://images.unsplash.com/photo-1494790108755-2616b612e5b8?w=80&h=80&fit=crop&crop=face" },
  { id: 2, name: "Rahul Sharma", specialty: "UK & Europe", experience: "6 years", rating: 4.8, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" },
  { id: 3, name: "Anita Patel", specialty: "Australia & Singapore", experience: "10 years", rating: 5.0, avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop&crop=face" },
  { id: 4, name: "Vikram Nair", specialty: "Germany & Japan", experience: "7 years", rating: 4.7, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" },
];

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

const getDaysInMonth = () => {
  const today = new Date();
  const days = [];
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
};

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", goal: "" });
  const [confirmed, setConfirmed] = useState(false);
  const days = getDaysInMonth();

  const [bookingLoading, setBookingLoading] = useState(false);

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingLoading(true);
    try {
      const agent = agents.find(a => a.id === selectedAgent);
      await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          agentId: selectedAgent,
          agentName: agent?.name,
          date: selectedDay?.toDateString(),
          time: selectedTime,
        }),
      });
      setConfirmed(true);
    } catch {
      alert("Failed to save booking. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (confirmed) {
    const agent = agents.find(a => a.id === selectedAgent);
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-20 px-4">
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-12 text-center max-w-md shadow-2xl">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">Session Booked!</h2>
          <p className="text-gray-500 mb-6">Your video counseling session has been confirmed. You&apos;ll receive a calendar invite on <strong>{form.email}</strong>.</p>
          <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4 text-left text-sm space-y-2 mb-6">
            <p><strong>Counselor:</strong> {agent?.name}</p>
            <p><strong>Date:</strong> {selectedDay?.toDateString()}</p>
            <p><strong>Time:</strong> {selectedTime} IST</p>
            <p><strong>Platform:</strong> Google Meet (link sent via email)</p>
          </div>
          <button onClick={() => { setConfirmed(false); setStep(1); setSelectedAgent(null); setSelectedDay(null); setSelectedTime(null); }} className="text-sm text-primary hover:underline">Book another session</button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-3">Book a <span className="text-primary">Counselor</span></h1>
        <p className="text-gray-500 dark:text-gray-400">Schedule a live 1:1 video session with a certified RK Consultancy advisor.</p>
      </div>

      {/* Steps */}
      <div className="flex items-center justify-center gap-4 mb-10">
        {["Choose Advisor", "Pick Date & Time", "Confirm Details"].map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step > i + 1 ? "bg-green-500 text-white" : step === i + 1 ? "bg-primary text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500"}`}>
              {step > i + 1 ? "✓" : i + 1}
            </div>
            <span className={`text-sm font-medium hidden sm:block ${step === i + 1 ? "text-primary" : "text-gray-400"}`}>{s}</span>
            {i < 2 && <div className="w-8 h-0.5 bg-gray-200 dark:bg-gray-700 mx-1 hidden sm:block"></div>}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Choose Your Advisor</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {agents.map(a => (
              <button key={a.id} onClick={() => { setSelectedAgent(a.id); setStep(2); }}
                className={`text-left bg-white dark:bg-slate-800 rounded-2xl border-2 p-5 hover:shadow-xl transition-all ${selectedAgent === a.id ? "border-primary" : "border-gray-100 dark:border-gray-700"}`}>
                <div className="flex items-center gap-4">
                  <img src={a.avatar} alt={a.name} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <p className="font-extrabold text-gray-900 dark:text-white">{a.name}</p>
                    <p className="text-sm text-primary">{a.specialty}</p>
                    <p className="text-xs text-gray-500">{a.experience} experience · ⭐ {a.rating}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Pick a Date & Time</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-2"><Calendar size={16}/> Available Dates</p>
              <div className="grid grid-cols-4 gap-2">
                {days.map((d, i) => (
                  <button key={i} onClick={() => setSelectedDay(d)}
                    className={`py-2.5 rounded-xl text-center text-xs font-bold transition-all border-2 ${selectedDay?.toDateString() === d.toDateString() ? "bg-primary border-primary text-white" : "bg-white dark:bg-slate-800 border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary"}`}>
                    <div>{["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()]}</div>
                    <div className="text-base mt-0.5">{d.getDate()}</div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-2"><Clock size={16}/> Available Slots (IST)</p>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map(t => (
                  <button key={t} onClick={() => setSelectedTime(t)}
                    className={`py-2.5 rounded-xl text-sm font-bold transition-all border-2 ${selectedTime === t ? "bg-primary border-primary text-white" : "bg-white dark:bg-slate-800 border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary"}`}>
                    <Video size={14} className="inline mr-1.5 mb-0.5" />{t}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setStep(1)} className="px-6 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-600 dark:text-gray-300 hover:border-primary transition-colors">← Back</button>
            <button onClick={() => selectedDay && selectedTime && setStep(3)} disabled={!selectedDay || !selectedTime} className="flex-1 bg-primary disabled:opacity-50 text-white font-bold py-3 rounded-xl hover:bg-blue-800 transition-colors">Continue →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleConfirm}>
          <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Confirm Your Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Full Name</label>
              <input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} className="w-full bg-gray-50 dark:bg-slate-700 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-primary text-gray-800 dark:text-gray-100" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
              <input required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} className="w-full bg-gray-50 dark:bg-slate-700 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-primary text-gray-800 dark:text-gray-100" placeholder="your@email.com" />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Your Study Goal</label>
            <textarea required value={form.goal} onChange={e => setForm(f => ({...f, goal: e.target.value}))} className="w-full bg-gray-50 dark:bg-slate-700 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-primary text-gray-800 dark:text-gray-100 h-24 resize-none" placeholder="E.g. I want to pursue MS in Computer Science in the USA with a budget of 50L/yr..." />
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-6 text-sm space-y-1.5">
            <p className="font-bold text-gray-800 dark:text-gray-200">Session Summary</p>
            <p className="text-gray-600 dark:text-gray-400">👤 Advisor: <strong>{agents.find(a => a.id === selectedAgent)?.name}</strong></p>
            <p className="text-gray-600 dark:text-gray-400">📅 Date: <strong>{selectedDay?.toDateString()}</strong></p>
            <p className="text-gray-600 dark:text-gray-400">🕐 Time: <strong>{selectedTime} IST</strong></p>
            <p className="text-gray-600 dark:text-gray-400">💻 Platform: <strong>Google Meet</strong> (link sent to email)</p>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(2)} className="px-6 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-600 dark:text-gray-300 hover:border-primary transition-colors">← Back</button>
            <button type="submit" className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-blue-800 transition-colors shadow-lg">Confirm Booking 🎓</button>
          </div>
        </form>
      )}
    </div>
  );
}
