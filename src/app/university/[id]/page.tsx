import { MapPin, Navigation, IndianRupee, Trophy, GraduationCap, Building } from "lucide-react";
import seedData from "@/data/seed.json";

export default function UniversityDetailPage({ params }: { params: { id: string } }) {
  const uni = seedData.find((u) => u.id === params.id);

  if (!uni) {
    return (
      <div className="text-center py-20 text-gray-500">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">University Not Found</h2>
        <p>Return to search to find another awesome university.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto w-full mt-4 bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-lg overflow-hidden animate-fade-in-up">
      {/* Hero Header with Image */}
      <div className="relative h-96 w-full">
        <img 
          src={uni.imageUrl || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f"} 
          alt={uni.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 w-full z-10">
          <div className="flex items-center space-x-3 mb-3">
            <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider flex items-center">
              <Trophy size={14} className="mr-1" /> QS {uni.qsRank2026}
            </span>
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white uppercase tracking-wider">
              {uni.level} Level
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 shadow-sm">{uni.name}</h1>
          <p className="text-gray-300 font-medium flex items-center text-sm md:text-base max-w-2xl">
            <MapPin size={18} className="mr-2 text-primary" /> {uni.address}, {uni.country}
          </p>
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Key Info row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8 border-b border-gray-100 dark:border-gray-800">
            <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-xl">
              <p className="text-xs text-gray-500 font-bold uppercase mb-1">Avg Tuition</p>
              <p className="font-extrabold text-lg text-gray-900 dark:text-white flex items-center">
                <IndianRupee size={16} className="text-gray-400 mr-1"/> {(uni.tuitionFeeINR / 100000).toFixed(1)}L/yr
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-xl">
              <p className="text-xs text-gray-500 font-bold uppercase mb-1">Placement Rate</p>
              <p className="font-extrabold text-lg text-secondary">{uni.placementPcnt}%</p>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-xl">
              <p className="text-xs text-gray-500 font-bold uppercase mb-1">Avg Salary</p>
              <p className="font-extrabold text-lg text-gray-900 dark:text-white flex items-center">
                <IndianRupee size={16} className="text-gray-400 mr-1"/> {(uni.avgSalaryINR / 100000).toFixed(1)}L/yr
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-xl">
              <p className="text-xs text-gray-500 font-bold uppercase mb-1">Location Score</p>
              <p className="font-extrabold text-lg text-gray-900 dark:text-white">{uni.locationScore}/10</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold flex items-center text-gray-800 dark:text-gray-100 mb-4">
              <GraduationCap className="mr-3 text-primary" size={24} /> Available Courses
            </h2>
            <div className="flex flex-wrap gap-2">
              {uni.courseAreas.map((course, idx) => (
                <span key={idx} className="bg-primary/5 text-primary border border-primary/20 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-primary hover:text-white transition-colors cursor-pointer">
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800 border border-blue-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center mb-4">
              <Building className="mr-2 text-primary" size={20} /> Admissions Hub
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Requirements</p>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{uni.admissionReqs}</p>
              </div>
              <button className="w-full mt-4 bg-primary hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-transform transform hover:-translate-y-0.5">
                Start Application Process
              </button>
              <p className="text-xs text-center text-gray-500 mt-2 font-medium">RK Consultancy guarantees priority processing.</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
             <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Location Mapping</h3>
             <div className="w-full h-32 bg-gray-200 dark:bg-slate-700 rounded-xl flex items-center justify-center text-gray-400 font-medium">
               [Map Integration Placeholder]
               <br/>{uni.country}
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
