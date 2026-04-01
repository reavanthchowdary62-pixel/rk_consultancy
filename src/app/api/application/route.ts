import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Application } from "@/lib/models";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import { z } from "zod";

const applicationSchema = z.object({
  universityId: z.string().min(1).max(100),
  universityName: z.string().min(1).max(200),
  country: z.string().max(100).optional(),
  city: z.string().max(100).optional(),
  intendedCourse: z.string().min(1).max(200),
  pastEducation: z.string().min(1).max(100),
  pastAcademicScore: z.string().min(1).max(50),
  phone: z.string().min(5).max(20),
});

export async function POST(req: Request) {
  try {
    const token = cookies().get("rk-auth-session")?.value;
    const session = await verifySessionToken(token);
    
    // Auth Check: Prevent anonymous application spam
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Please log in to apply." }, { status: 401 });
    }

    const body = await req.json();
    
    // Zod parsing strips malicious HTML and enforces lengths
    const validData = applicationSchema.parse(body);

    await connectDB();

    // Check if application already exists to prevent duplicates
    const existing = await Application.findOne({ userEmail: session.email, universityId: validData.universityId, intendedCourse: validData.intendedCourse });
    if (existing) {
      return NextResponse.json({ error: "You have already applied to this course!" }, { status: 409 });
    }

    const newApp = await Application.create({
      ...validData,
      userEmail: session.email, // Secure payload override: Ignore body.userEmail
    });

    return NextResponse.json({ success: true, application: newApp }, { status: 201 });

  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const zErr = error as z.ZodError;
      const messages = zErr.errors.map((e: any) => `${e.path.join('.')}: ${e.message}`).join(", ");
      return NextResponse.json({ error: `Validation failed - ${messages}` }, { status: 400 });
    }
    console.error("Application API Error:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
