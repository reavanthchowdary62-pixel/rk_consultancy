import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ChatBox } from "@/components/ChatBox";
import { GraduationCap } from "lucide-react";
import { cookies } from "next/headers";
import { ContactForm } from "@/components/ContactForm";
import { LogoutButton } from "@/components/LogoutButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NotificationBell } from "@/components/NotificationBell";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { MobileNav } from "@/components/MobileNav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const viewport: Viewport = {
  themeColor: "#1e3a8a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "RK Consultancy | Premier Global Education Counselor",
  description: "Compare QS 2026 ranked universities, calculate ROI, find scholarships, and book expert counseling sessions. Trusted by 10,000+ Indian students.",
  keywords: "study abroad, university rankings, QS 2026, Indian students, MBA abroad, scholarships, visa guide",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "RK Consult",
  },
  applicationName: "RK Consultancy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = cookies().has("rk-auth-session");

  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col pt-16">
        <WishlistProvider>
        {isAuthenticated && (
          <header className="fixed top-0 left-0 w-full h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center px-6 z-50">
            <div className="flex h-full items-center justify-between w-full max-w-7xl mx-auto">
              <a href="/dashboard" className="text-xl font-bold text-primary flex items-center">
                <GraduationCap className="mr-2" size={24} /> RK Consultancy
              </a>
              <nav className="hidden md:flex items-center space-x-5 text-sm font-semibold text-gray-600 dark:text-gray-300">
                <a href="/" className="hover:text-primary transition-colors">Home</a>
                <a href="/compare" className="hover:text-primary transition-colors">Compare</a>
                <a href="/scholarships" className="hover:text-primary transition-colors">Scholarships</a>
                <a href="/visa" className="hover:text-primary transition-colors">Visa Guide</a>
                <a href="/booking" className="hover:text-primary transition-colors">Bookings</a>
                <a href="/tools" className="hover:text-primary transition-colors">Tools</a>
                <a href="/blog" className="hover:text-primary transition-colors">Blog</a>
                <a href="/success-stories" className="hover:text-primary transition-colors">Stories</a>
                <a href="/scholars" className="hover:text-primary transition-colors">Scholars</a>
              </nav>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <NotificationBell />
                <a href="/dashboard" className="hidden md:inline-flex bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors">Dashboard</a>
                <LogoutButton />
                <MobileNav />
              </div>
            </div>
          </header>
        )}

        <main className="flex-grow flex flex-col relative w-full max-w-7xl mx-auto p-6">
          {children}
        </main>
        
        {isAuthenticated && (
          <>
            <footer id="footer" className="bg-slate-900 border-t border-slate-800 text-white mt-20 pb-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl font-extrabold mb-4 flex items-center"><GraduationCap className="mr-3 text-primary" size={32}/> RK Consultancy</h2>
                  <p className="text-gray-400 mb-6 max-w-sm">We provide expert counseling to Indian students, ensuring secure admissions in top universities worldwide based on the latest 2026 QS mappings.</p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400"><strong className="text-white">Email:</strong> contact@rkconsultancy.edu</p>
                    <p className="text-sm text-gray-400"><strong className="text-white">Phone:</strong> +91 98765 43210</p>
                    <p className="text-sm text-gray-400"><strong className="text-white">Location:</strong> Ahmedabad, Gujarat, India</p>
                  </div>
                </div>
                <div className="bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-700">
                  <h3 className="text-xl font-bold mb-4">Request Callback</h3>
                  <ContactForm />
                </div>
              </div>
              <div className="text-center text-sm text-gray-600 border-t border-slate-800 pt-8 mt-4">
                &copy; 2026 RK Consultancy. All rights reserved.
              </div>
            </footer>
            <ChatBox />
          </>
        )}

        </WishlistProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
