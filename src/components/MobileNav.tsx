"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/compare", label: "Compare" },
  { href: "/scholarships", label: "Scholarships" },
  { href: "/visa", label: "Visa Guide" },
  { href: "/booking", label: "Book Counselor" },
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/success-stories", label: "Stories" },
  { href: "/scholars", label: "Scholars" },
  { href: "/dashboard", label: "Dashboard" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(!open)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors" aria-label="Toggle menu">
        {open ? <X size={22} className="text-gray-700 dark:text-gray-200" /> : <Menu size={22} className="text-gray-700 dark:text-gray-200" />}
      </button>

      {open && (
        <div className="fixed inset-0 top-16 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg">
          <nav className="flex flex-col p-6 space-y-1">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                className="text-lg font-semibold text-gray-700 dark:text-gray-200 py-3 px-4 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors">
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
