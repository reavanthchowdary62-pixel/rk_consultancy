"use client";
import { Navigation } from "lucide-react";
import Link from "next/link";
import { WishlistButton } from "@/components/WishlistButton";

interface University {
  id: string;
  name: string;
  address: string;
  country: string;
  qsRank2026: number;
  tuitionFeeINR: number;
  level: string;
  courseAreas: string[];
  admissionReqs: string;
  placementPcnt: number;
  avgSalaryINR: number;
  locationScore: number;
}

export function UniTable({ data }: { data: University[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center p-12 bg-white dark:bg-slate-800 rounded-2xl shadow">
        <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">No Universities Found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your filters or search for another course.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="bg-gray-50/80 dark:bg-slate-800/80 text-gray-700 dark:text-gray-300 uppercase text-xs font-bold tracking-wider border-b border-gray-200 dark:border-gray-700">
            <th className="p-4">University Name</th>
            <th className="p-4">QS Rank 2026</th>
            <th className="p-4">Tuition (INR/yr)</th>
            <th className="p-4">Requirements</th>
            <th className="p-4">Placements</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {data.map((uni) => (
            <tr key={uni.id} className="hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors">
              <td className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold opacity-90">
                    {uni.name.charAt(0)}
                  </div>
                  <div>
                    <Link href={`/university/${uni.id}`}>
                      <h4 className="font-bold text-gray-900 dark:text-white text-base hover:text-primary transition-colors cursor-pointer">{uni.name}</h4>
                    </Link>
                    <p className="text-xs text-secondary font-semibold flex items-center mt-1">
                      <Navigation size={12} className="mr-1" /> {uni.country}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5 truncate max-w-[200px]" title={uni.address}>
                      {uni.address}
                    </p>
                  </div>
                </div>
              </td>
              <td className="p-4 font-semibold text-primary">#{uni.qsRank2026}</td>
              <td className="p-4 font-medium text-gray-700 dark:text-gray-300">
                ₹{(uni.tuitionFeeINR / 100000).toFixed(1)} Lakhs
              </td>
              <td className="p-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                {uni.admissionReqs}
              </td>
              <td className="p-4">
                <div className="flex items-center text-secondary font-semibold">
                  <span>{uni.placementPcnt}%</span>
                  <p className="text-xs text-gray-500 ml-2 font-normal">avg ₹{(uni.avgSalaryINR / 100000).toFixed(1)}L</p>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <Link href={`/university/${uni.id}`}
                    className="text-sm font-semibold bg-primary text-white hover:bg-blue-800 px-4 py-2 rounded-lg shadow-sm transition-all flex items-center">
                    View Details
                  </Link>
                  <WishlistButton id={uni.id} name={uni.name} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
