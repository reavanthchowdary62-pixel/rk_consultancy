"use client";

import { useState, useEffect } from "react";
import { Users, Mail, Calendar, Database, Shield, RefreshCw, GraduationCap, CheckCircle, XCircle, Clock, FileText, Star as StarIcon, Save, ToggleLeft, ToggleRight } from "lucide-react";
import { csrfFetch } from "@/lib/csrf";

interface BookingData { _id: string; name: string; email: string; agentName: string; date: string; time: string; status: string; createdAt: string; }
interface MessageData { _id: string; name: string; email: string; phone?: string; message?: string; read: boolean; createdAt: string; }
interface CounselorData { _id: string; name: string; email: string; bio: string; specializations: string[]; countries: string[]; experience: number; rating: number; status: string; createdAt: string; certificates: { name: string; issuer: string; year?: number; url?: string }[]; adminNotes: string; featured: boolean; badges: string[]; totalSessions: number; totalReviews: number; }

export default function AdminPage() {
  const [tab, setTab] = useState<"bookings" | "messages" | "counselors">("bookings");
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [counselors, setCounselors] = useState<CounselorData[]>([]);
  const [loading, setLoading] = useState(false);
  const [dbStatus, setDbStatus] = useState<"connected" | "disconnected" | "loading">("loading");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bRes, mRes, cRes] = await Promise.all([
        fetch("/api/booking"),
        fetch("/api/contact"),
        fetch("/api/admin/counselors"),
      ]);
      const bData = await bRes.json();
      const mData = await mRes.json();
      const cData = await cRes.json();

      setBookings(bData.bookings || []);
      setMessages(mData.messages || []);
      setCounselors(cData.counselors || []);
      setDbStatus(bData.error ? "disconnected" : "connected");
    } catch {
      setDbStatus("disconnected");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleCounselorAction = async (id: string, action: "APPROVED" | "REJECTED" | "SUSPENDED") => {
    try {
      const res = await csrfFetch(`/api/admin/counselors?id=${id}`, {
        method: "PATCH",
        body: JSON.stringify({ action }),
      });
      if (res.ok) {
        fetchData();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update counselor");
      }
    } catch {
      alert("Network error");
    }
  };

  const saveAdminNotes = async (id: string, notes: string) => {
    try {
      await csrfFetch(`/api/admin/counselors?id=${id}`, {
        method: "PATCH",
        body: JSON.stringify({ action: "APPROVED", adminNotes: notes }),
      });
    } catch { /* silently fail */ }
  };

  const toggleFeatured = async (id: string, current: boolean) => {
    try {
      const res = await csrfFetch(`/api/admin/counselors?id=${id}`, {
        method: "PATCH",
        body: JSON.stringify({ action: "APPROVED", featured: !current }),
      });
      if (res.ok) fetchData();
    } catch { /* silently fail */ }
  };

  const statusColors: Record<string, string> = {
    connected: "text-green-500 bg-green-50 dark:bg-green-900/20",
    disconnected: "text-red-500 bg-red-50 dark:bg-red-900/20",
    loading: "text-amber-500 bg-amber-50 dark:bg-amber-900/20",
  };

  const counselorStatusColors: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    APPROVED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    REJECTED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    SUSPENDED: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
  };

  const pendingCounselors = counselors.filter(c => c.status === "PENDING").length;

  return (
    <div className="py-10 px-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
            <Shield size={28} className="text-primary" /> Admin Panel
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage bookings, messages, counselors, and monitor system status.</p>
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Bookings", value: bookings.length, icon: Calendar, color: "text-primary bg-blue-50 dark:bg-blue-900/20" },
          { label: "Messages", value: messages.length, icon: Mail, color: "text-amber-500 bg-amber-50 dark:bg-amber-900/20" },
          { label: "Counselors", value: counselors.filter(c => c.status === "APPROVED").length, icon: GraduationCap, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" },
          { label: "Pending Review", value: pendingCounselors, icon: Clock, color: pendingCounselors > 0 ? "text-red-500 bg-red-50 dark:bg-red-900/20" : "text-slate-400 bg-slate-50 dark:bg-slate-800" },
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
        {([["bookings", "Bookings", Calendar], ["messages", "Messages", Mail], ["counselors", "Counselors", GraduationCap]] as const).map(([id, label, Icon]) => (
          <button key={id} onClick={() => setTab(id as typeof tab)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all relative ${tab === id ? "bg-white dark:bg-slate-700 text-primary shadow-md" : "text-gray-500 hover:text-gray-800"}`}>
            <Icon size={16} /> {label}
            {id === "counselors" && pendingCounselors > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{pendingCounselors}</span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        {dbStatus === "disconnected" ? (
          <div className="p-12 text-center">
            <Database size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="font-bold text-gray-600 dark:text-gray-400">MongoDB Not Connected</h3>
            <p className="text-sm text-gray-400 mt-2">Add MONGODB_URI to your .env.local file and restart the server.</p>
          </div>
        ) : tab === "bookings" ? (
          bookings.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <Calendar size={40} className="mx-auto mb-3 opacity-20" />
              <p>No bookings yet.</p>
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
        ) : tab === "messages" ? (
          messages.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <Mail size={40} className="mx-auto mb-3 opacity-20" />
              <p>No messages yet.</p>
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
        ) : (
          /* Counselors Tab */
          counselors.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <GraduationCap size={40} className="mx-auto mb-3 opacity-20" />
              <p>No counselor applications yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {counselors.map(c => (
                <div key={c._id} className="p-5 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-800 flex items-center justify-center text-white font-bold text-lg shrink-0">
                        {c.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-bold text-gray-900 dark:text-white text-sm">{c.name}</h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${counselorStatusColors[c.status]}`}>{c.status}</span>
                          {c.featured && <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">⭐ Featured</span>}
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{c.email} · {c.experience}yr exp · ⭐ {c.rating.toFixed(1)} ({c.totalReviews} reviews) · {c.totalSessions} sessions</p>
                        <p className="text-xs text-gray-500 line-clamp-2 mb-2">{c.bio}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {c.specializations.slice(0, 3).map(s => (
                            <span key={s} className="text-[10px] font-bold bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-2 py-0.5 rounded-full">{s}</span>
                          ))}
                          {c.countries.slice(0, 2).map(co => (
                            <span key={co} className="text-[10px] font-bold bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 px-2 py-0.5 rounded-full">{co}</span>
                          ))}
                        </div>

                        {/* Certificates */}
                        {c.certificates && c.certificates.length > 0 && (
                          <div className="mb-2">
                            <p className="text-[10px] font-bold text-slate-400 mb-1 flex items-center gap-1"><FileText size={9} /> CERTIFICATES</p>
                            <div className="flex flex-wrap gap-1">
                              {c.certificates.map((cert, i) => (
                                <span key={i} className="text-[10px] bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                                  {cert.name} {cert.issuer ? `(${cert.issuer})` : ""} {cert.year ? `· ${cert.year}` : ""}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Admin Notes */}
                        <div className="mt-2">
                          <p className="text-[10px] font-bold text-slate-400 mb-1">ADMIN NOTES (internal)</p>
                          <div className="flex gap-2">
                            <textarea
                              defaultValue={c.adminNotes || ""}
                              placeholder="Add internal notes about this counselor..."
                              rows={2}
                              className="flex-1 bg-slate-50 dark:bg-slate-600 border border-slate-200 dark:border-slate-500 rounded-lg p-2 text-xs text-slate-700 dark:text-slate-200 outline-none focus:ring-1 focus:ring-primary resize-none placeholder-slate-400"
                              onBlur={(e) => saveAdminNotes(c._id, e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      {c.status === "PENDING" && (
                        <>
                          <button onClick={() => handleCounselorAction(c._id, "APPROVED")}
                            className="flex items-center gap-1.5 text-xs font-bold bg-emerald-600 text-white px-3 py-2 rounded-xl hover:bg-emerald-700 transition-colors w-full justify-center">
                            <CheckCircle size={13} /> Approve
                          </button>
                          <button onClick={() => handleCounselorAction(c._id, "REJECTED")}
                            className="flex items-center gap-1.5 text-xs font-bold bg-red-600 text-white px-3 py-2 rounded-xl hover:bg-red-700 transition-colors w-full justify-center">
                            <XCircle size={13} /> Reject
                          </button>
                        </>
                      )}
                      {c.status === "APPROVED" && (
                        <>
                          <button onClick={() => toggleFeatured(c._id, c.featured)}
                            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-colors w-full justify-center ${c.featured ? "bg-amber-100 text-amber-700 hover:bg-amber-200" : "border border-slate-200 dark:border-slate-600 text-slate-500 hover:bg-slate-100"}`}>
                            {c.featured ? <><ToggleRight size={13} /> Unfeatured</> : <><ToggleLeft size={13} /> Feature</>}
                          </button>
                          <button onClick={() => handleCounselorAction(c._id, "SUSPENDED")}
                            className="flex items-center gap-1.5 text-xs font-bold border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors w-full justify-center">
                            Suspend
                          </button>
                        </>
                      )}
                      {(c.status === "REJECTED" || c.status === "SUSPENDED") && (
                        <button onClick={() => handleCounselorAction(c._id, "APPROVED")}
                          className="flex items-center gap-1.5 text-xs font-bold bg-emerald-600 text-white px-3 py-2 rounded-xl hover:bg-emerald-700 transition-colors">
                          <CheckCircle size={13} /> Re-approve
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
