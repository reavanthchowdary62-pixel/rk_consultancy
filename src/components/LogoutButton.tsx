"use client";

import { LogOut } from "lucide-react";

export function LogoutButton() {
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      // Hard refresh to bust cache and trigger Next.js Layout unmount
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="ml-4 flex items-center text-sm font-bold text-red-500 hover:text-red-700 transition-colors bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg border border-red-100"
    >
      <LogOut size={16} className="mr-1.5" /> Secure Logout
    </button>
  );
}
