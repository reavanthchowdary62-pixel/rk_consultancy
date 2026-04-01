"use client";

import { useState, useEffect } from "react";
import { Users, Mail, Calendar, Database, Shield, RefreshCw } from "lucide-react";

interface UserData { _id: string; name: string; email: string; role: string; createdAt: string; }
interface BookingData { _id: string; name: string; email: string; agentName: string; date: string; time: string; status: string; createdAt: string; }
interface MessageData { _id: string; name: string; email: string; phone?: string; message?: string; read: boolean; createdAt: string; }

export default function AdminPage() {
  const [tab, setTab] = useState<"users" | "bookings" | "messages">("bookings");
  const [users, setUsers] = useState<UserData[]>([]);
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [dbStatus, setDbStatus] = useState<"connected" | "disconnected" | "loading">("loading");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bRes, mRes] = await Promise.all([
        fetch("/api/booking"),
        fetch("/api/contact"),
      ]);
      const bData = await bRes.json();
      const mData = await mRes.json();

      setBookings(bData.bookings || []);
      setMessages(mData.messages || []);
      setDbStatus(bData.error ? "disconnected" : "connected");
    } catch {
      setDbStatus("disconnected");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const statusColors = {
    connected: "text-green-500 bg-green-50 dark:bg-green-900/20",
    disconnected: "text-red-500 bg-red-50 dark:bg-red-900/20",
    loading: "text-amber-500 bg-amber-50 dark:bg-amber-900/20",
  };

  return (
    <div className="py-10 px-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
            <Shield size={28} className="text-primary" /> Admin Panel
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage bookings, messages, and monitor system status.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 ${statusColors[dbStatus]}`}>
            <Database size={12} /> MongoDB: {dbStatus}
          </span>
          <button onClick={fetchData} disabled={loading} className="p-2 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors disabled:opacity-50">
            <RefreshCw size={16} className={loading ? "animate-spin text-primary" : "text-gray-600 dark:text-gray-300"} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Bookings", value: bookings.length, icon: Calendar, color: "text-primary bg-blue-50 dark:bg-blue-900/20" },
          { label: "Contact Messages", value: messages.length, icon: Mail, color: "text-amber-500 bg-amber-50 dark:bg-amber-900/20" },
          { label: "Unread Messages", value: messages.filter(m => !m.read).length, icon: Mail, color: "text-red-500 bg-red-50 dark:bg-red-900/20" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}><Icon size={22} /></div>
            <div>
              <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 dark:bg-slate-800 p-1.5 rounded-2xl mb-6">
        {([["bookings", "Counseling Bookings", Calendar], ["messages", "Contact Messages", Mail]] as const).map(([id, label, Icon]) => (
          <button key={id} onClick={() => setTab(id as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${tab === id ? "bg-white dark:bg-slate-700 text-primary shadow-md" : "text-gray-500 hover:text-gray-800"}`}>
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        {dbStatus === "disconnected" ? (
          <div className="p-12 text-center">
            <Database size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="font-bold text-gray-600 dark:text-gray-400">MongoDB Not Connected</h3>
            <p className="text-sm text-gray-400 mt-2">Add MONGODB_URI to your .env.local file and restart the server.<br />The admin panel will show live data once connected.</p>
          </div>
        ) : tab === "bookings" ? (
          bookings.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <Calendar size={40} className="mx-auto mb-3 opacity-20" />
              <p>No bookings yet. Users can book sessions at /booking.</p>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-slate-700 text-xs uppercase text-gray-500 font-bold">
                <tr><th className="p-4">Student</th><th className="p-4">Counselor</th><th className="p-4">Date & Time</th><th className="p-4">Status</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {bookings.map(b => (
                  <tr key={b._id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                    <td className="p-4"><p className="font-bold text-gray-900 dark:text-white">{b.name}</p><p className="text-xs text-gray-500">{b.email}</p></td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">{b.agentName}</td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">{b.date} · {b.time}</td>
                    <td className="p-4"><span className={`text-xs font-bold px-2.5 py-1 rounded-full ${b.status === "CONFIRMED" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{b.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : (
          messages.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <Mail size={40} className="mx-auto mb-3 opacity-20" />
              <p>No messages yet. Users can submit the contact form in the footer.</p>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-slate-700 text-xs uppercase text-gray-500 font-bold">
                <tr><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Message</th><th className="p-4">Date</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {messages.map(m => (
                  <tr key={m._id} className={`hover:bg-gray-50 dark:hover:bg-slate-700 ${!m.read ? "bg-blue-50/50 dark:bg-blue-900/10" : ""}`}>
                    <td className="p-4 font-bold text-gray-900 dark:text-white">{m.name}</td>
                    <td className="p-4 text-gray-600">{m.email}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-400 max-w-sm truncate">{m.message}</td>
                    <td className="p-4 text-xs text-gray-400">{new Date(m.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>
    </div>
  );
}
