"use client";

import { useState } from "react";
import { Building, MapPin, CheckCircle, AlertCircle, X, Send } from "lucide-react";

type UniProps = {
  id: string;
  name: string;
  country: string;
  address: string;
  courseAreas: string[];
};

export function ApplicationModal({ uni }: { uni: UniProps }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    userEmail: "",
    phone: "",
    intendedCourse: uni.courseAreas[0] || "",
    pastEducation: "High School",
    pastAcademicScore: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          universityId: uni.id,
          universityName: uni.name,
          country: uni.country,
          city: uni.address,
          ...formData
        })
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else if (res.status === 401) {
        setError("You are not logged in. Please sign in or register to submit applications.");
      } else {
        setError(data.error || "Failed to submit application.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full mt-4 bg-primary hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-transform transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
      >
        <Send size={18} />
        <span>Start Application Process</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-8 shadow-2xl relative text-left overflow-hidden border border-gray-200 dark:border-gray-800">
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-6 right-6 text-gray-400 hover:text-red-500 bg-gray-100 dark:bg-slate-800 rounded-full p-2"
            >
              <X size={20} />
            </button>
            
            {success ? (
              <div className="text-center py-10 space-y-4 animate-fade-in-up">
                <CheckCircle size={64} className="mx-auto text-emerald-500" />
                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">Application Received!</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  We have safely received your application to <strong className="text-gray-800 dark:text-gray-200">{uni.name}</strong>.
                  Our senior counselors will review your profile and contact you shortly.
                </p>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="mt-6 bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-white font-bold py-3 px-8 rounded-xl hover:bg-gray-200 dark:hover:bg-slate-700 transition"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div className="animate-fade-in-up">
                <div className="mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                  <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                    <Building className="text-primary" size={24} /> 
                    Submit Application
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2 flex items-center text-sm font-medium">
                    Applying to: <strong className="text-primary ml-1 mr-2">{uni.name}</strong>
                    <MapPin size={14} className="text-gray-400 mx-1" /> {uni.address}, {uni.country}
                  </p>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex flex-col gap-2 animate-fade-in-up">
                    <div className="flex items-start gap-3">
                      <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-red-700 dark:text-red-300 font-semibold text-sm">{error}</p>
                    </div>
                    {error.includes("sign in") && (
                      <a href="/login" className="ml-7 text-xs font-bold bg-white dark:bg-slate-800 px-3 py-1.5 rounded text-primary hover:text-blue-700 w-fit border border-gray-200 dark:border-gray-700 shadow-sm transition">
                        Go to Login Page →
                      </a>
                    )}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                      <input 
                        type="email" required name="userEmail" value={formData.userEmail} onChange={handleChange}
                        className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary font-medium"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone Number</label>
                      <input 
                        type="tel" required name="phone" value={formData.phone} onChange={handleChange}
                        className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary font-medium"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Intended Course</label>
                    <select 
                      name="intendedCourse" required value={formData.intendedCourse} onChange={handleChange}
                      className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary font-medium cursor-pointer"
                    >
                      {uni.courseAreas.map(course => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Highest Education</label>
                      <select 
                        name="pastEducation" required value={formData.pastEducation} onChange={handleChange}
                        className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary font-medium cursor-pointer"
                      >
                        <option value="High School">12th Grade / High School</option>
                        <option value="Associate Degree">Associate Degree / Diploma</option>
                        <option value="Bachelor's Degree">Bachelor&apos;s Degree</option>
                        <option value="Master's Degree">Master&apos;s Degree</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Academic Score</label>
                      <input 
                        type="text" required name="pastAcademicScore" value={formData.pastAcademicScore} onChange={handleChange}
                        className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary font-medium"
                        placeholder="e.g. 85% or 8.5 CGPA"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" disabled={loading}
                    className="w-full mt-6 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-blue-800 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg transition-all disabled:opacity-70 flex justify-center items-center"
                  >
                    {loading ? (
                      <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      "Submit Application Securely"
                    )}
                  </button>
                  <p className="text-center text-xs text-gray-400 font-medium">Your data is secured with SSL encryption and saved to our cloud servers.</p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
