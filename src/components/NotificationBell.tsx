"use client";

import { useState } from "react";
import { Bell, X } from "lucide-react";

const alerts = [
  { id: 1, title: "MIT Application Deadline", body: "Early Action Deadline in 3 days — Nov 1", time: "3d", urgent: true },
  { id: 2, title: "Oxford Round 2 Opens", body: "New scholarship slots available for Indian students", time: "1w", urgent: false },
  { id: 3, title: "UK Student Visa Update", body: "Processing time reduced to 3 weeks for 2026", time: "2w", urgent: false },
  { id: 4, title: "IIM CAT Registration", body: "CAT 2026 registration window closing soon", time: "3w", urgent: true },
];

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState<number[]>([]);
  const visible = alerts.filter(a => !dismissed.includes(a.id));

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="relative p-2 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
      >
        <Bell size={16} className="text-gray-600 dark:text-gray-300" />
        {visible.length > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {visible.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 z-[200] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <h3 className="font-bold text-gray-900 dark:text-white text-sm">Deadline Alerts</h3>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={16}/></button>
          </div>
          <div className="max-h-72 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-700">
            {visible.length === 0 && (
              <p className="text-center text-gray-400 py-8 text-sm">All caught up! 🎉</p>
            )}
            {visible.map(a => (
              <div key={a.id} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 group">
                <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${a.urgent ? "bg-red-500" : "bg-blue-400"}`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{a.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{a.body}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-xs text-gray-400">{a.time}</span>
                  <button onClick={() => setDismissed(d => [...d, a.id])} className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-gray-500 transition-all"><X size={12}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
