import { NextResponse } from "next/server";
import seedData from "@/data/seed.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const courseRaw = searchParams.get("course") || "";
  const budget = searchParams.get("budget") || "";
  const location = searchParams.get("loc") || "Anywhere";

  // Treat "Any", "any", empty as wildcard
  const course = ["any", ""].includes(courseRaw.toLowerCase()) ? "" : courseRaw.toLowerCase();

  let results = [...seedData];

  // Filter by course (skip if wildcard)
  if (course) {
    results = results.filter((uni) =>
      uni.courseAreas.some(area => area.toLowerCase().includes(course))
    );
  }

  // Filter by location
  if (location && location !== "Anywhere" && location !== "Global") {
    results = results.filter((uni) => uni.country.toLowerCase() === location.toLowerCase());
  }

  // Filter by budget (skip if "Any", "No Limit", or empty)
  const skipBudget = ["", "any", "no limit", "1cr+"].includes(budget.toLowerCase());
  if (budget && !skipBudget) {
    // Handle "10L" → 10 * 100000, "75L" → 75 * 100000
    const numStr = budget.toLowerCase().replace("l", "").trim();
    const maxINR = parseFloat(numStr) * 100000;
    if (!isNaN(maxINR)) {
      results = results.filter((uni) => uni.tuitionFeeINR <= maxINR);
    }
  }

  // Sort by QS Rank ascending
  results.sort((a, b) => a.qsRank2026 - b.qsRank2026);

  return NextResponse.json(results);
}
