import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Counselor } from "@/lib/models";

// GET /api/counselors — Public list of approved counselors with sort & search
export async function GET(req: Request) {
  try {
    const db = await connectDB();
    if (!db) return NextResponse.json({ counselors: [], error: "Database not connected" });

    const { searchParams } = new URL(req.url);
    const country = searchParams.get("country");
    const specialization = searchParams.get("specialization");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "rating";
    const featured = searchParams.get("featured");

    // Build filter — only show APPROVED counselors
    const filter: Record<string, unknown> = { status: "APPROVED" };
    if (country) filter.countries = country;
    if (specialization) filter.specializations = specialization;
    if (featured === "true") filter.featured = true;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { bio: { $regex: search, $options: "i" } },
        { specializations: { $regex: search, $options: "i" } },
        { countries: { $regex: search, $options: "i" } },
      ];
    }

    // Build sort
    let sortObj: Record<string, 1 | -1> = { rating: -1, totalSessions: -1 };
    switch (sort) {
      case "experience": sortObj = { experience: -1 }; break;
      case "sessions": sortObj = { totalSessions: -1 }; break;
      case "price-low": sortObj = { hourlyRate: 1 }; break;
      case "price-high": sortObj = { hourlyRate: -1 }; break;
      case "newest": sortObj = { createdAt: -1 }; break;
      case "reviews": sortObj = { totalReviews: -1 }; break;
      default: sortObj = { rating: -1, totalSessions: -1 };
    }

    const counselors = await Counselor.find(filter)
      .select("-userId -email -adminNotes") // Don't expose private fields publicly
      .sort(sortObj)
      .limit(50);

    return NextResponse.json({ counselors });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Counselors list error:", message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
