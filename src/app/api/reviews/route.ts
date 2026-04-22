import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Review, Counselor } from "@/lib/models";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import { z } from "zod";

const reviewSchema = z.object({
  counselorId: z.string().min(1),
  rating: z.number().min(1).max(5),
  comment: z.string().max(500).optional(),
});

// GET /api/reviews?counselorId=xxx — Get reviews for a counselor
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const counselorId = searchParams.get("counselorId");
    if (!counselorId) return NextResponse.json({ error: "counselorId required" }, { status: 400 });

    const db = await connectDB();
    if (!db) return NextResponse.json({ reviews: [] });

    const reviews = await Review.find({ counselorId }).sort({ createdAt: -1 }).limit(50);
    return NextResponse.json({ reviews });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown";
    console.error("Reviews GET error:", msg);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST /api/reviews — Submit a review (logged-in students only)
export async function POST(req: Request) {
  try {
    const token = cookies().get("rk-auth-session")?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const validData = reviewSchema.parse(body);

    const db = await connectDB();
    if (!db) return NextResponse.json({ error: "Database not connected" }, { status: 500 });

    // Check for duplicate review
    const existing = await Review.findOne({ counselorId: validData.counselorId, studentId: session.id });
    if (existing) return NextResponse.json({ error: "You have already reviewed this counselor" }, { status: 409 });

    // Create review
    const review = await Review.create({
      ...validData,
      studentId: session.id,
      studentName: session.email.split("@")[0],
    });

    // Update counselor's rating
    const allReviews = await Review.find({ counselorId: validData.counselorId });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    
    // Auto-assign badges
    const badges: string[] = [];
    if (avgRating >= 4.8 && allReviews.length >= 3) badges.push("Top Rated");
    
    const counselor = await Counselor.findById(validData.counselorId);
    if (counselor) {
      if (counselor.totalSessions >= 100) badges.push("100+ Sessions");
      if (counselor.totalSessions >= 50) badges.push("Experienced");
      if (counselor.experience >= 5) badges.push("Senior Expert");
      const existingBadges = counselor.badges || [];
      if (existingBadges.includes("Quick Responder")) badges.push("Quick Responder");
    }

    await Counselor.findByIdAndUpdate(validData.counselorId, {
      rating: Math.round(avgRating * 10) / 10,
      totalReviews: allReviews.length,
      badges: Array.from(new Set(badges)),
    });

    return NextResponse.json({ success: true, reviewId: review._id.toString() });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Invalid review data" }, { status: 400 });
    const msg = error instanceof Error ? error.message : "Unknown";
    console.error("Review POST error:", msg);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
