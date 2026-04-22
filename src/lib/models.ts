import mongoose, { Schema, model, models } from "mongoose";

// ─── User Model ──────────────────────────────────────────────────────────────
const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["STUDENT", "COUNSELOR", "ADMIN"], default: "STUDENT" },
  createdAt: { type: Date, default: Date.now },
  wishlist: [{ type: String }], // University IDs
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
});

UserSchema.index({ email: 1 }, { unique: true });

export const User = models.User || model("User", UserSchema);

// ─── Counselor Profile Model ─────────────────────────────────────────────────
const CounselorSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  bio: { type: String, maxlength: 1000, default: "" },
  specializations: [{ type: String, trim: true }],
  countries: [{ type: String, trim: true }],
  languages: [{ type: String, trim: true }],
  experience: { type: Number, default: 0 },
  profileImage: { type: String, default: "" },
  hourlyRate: { type: Number, default: 0 },
  availability: {
    days: [{ type: String }],
    timeSlots: [{ type: String }],
  },
  certificates: [{
    name: { type: String, required: true, trim: true },     // e.g. "ICEF Certified Agent"
    issuer: { type: String, trim: true },                   // e.g. "ICEF"
    year: { type: Number },                                  // e.g. 2024
    url: { type: String, default: "" },                      // Link to certificate
  }],
  badges: [{ type: String }],                                // Auto-assigned: "Top Rated", "100+ Sessions", etc.
  adminNotes: { type: String, default: "" },                 // Internal notes from admin
  featured: { type: Boolean, default: false },               // Featured on homepage
  rating: { type: Number, default: 0, min: 0, max: 5 },
  totalReviews: { type: Number, default: 0 },
  totalSessions: { type: Number, default: 0 },
  status: { type: String, enum: ["PENDING", "APPROVED", "REJECTED", "SUSPENDED"], default: "PENDING" },
  createdAt: { type: Date, default: Date.now },
  approvedAt: { type: Date },
});

CounselorSchema.index({ status: 1 });
CounselorSchema.index({ countries: 1 });
CounselorSchema.index({ specializations: 1 });
CounselorSchema.index({ rating: -1 });

export const Counselor = models.Counselor || model("Counselor", CounselorSchema);

// ─── Counselor Review Model ─────────────────────────────────────────────────
const ReviewSchema = new Schema({
  counselorId: { type: Schema.Types.ObjectId, ref: "Counselor", required: true },
  studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  studentName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, maxlength: 500, default: "" },
  createdAt: { type: Date, default: Date.now },
});

ReviewSchema.index({ counselorId: 1, createdAt: -1 });
ReviewSchema.index({ counselorId: 1, studentId: 1 }, { unique: true }); // One review per student per counselor

export const Review = models.Review || model("Review", ReviewSchema);

// ─── Booking Model ───────────────────────────────────────────────────────────
const BookingSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  goal: { type: String },
  agentId: { type: Number, required: true },
  agentName: { type: String },
  date: { type: String },
  time: { type: String },
  status: { type: String, enum: ["PENDING", "CONFIRMED", "CANCELLED"], default: "PENDING" },
  createdAt: { type: Date, default: Date.now },
});

BookingSchema.index({ email: 1, date: 1 });

export const Booking = models.Booking || model("Booking", BookingSchema);

// ─── Contact Message Model ───────────────────────────────────────────────────
const ContactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

export const ContactMessage = models.ContactMessage || model("ContactMessage", ContactSchema);

// ─── University Save/Tracking Model ─────────────────────────────────────────
const SavedUniversitySchema = new Schema({
  userEmail: { type: String, required: true },
  universityId: { type: String, required: true },
  universityName: { type: String },
  savedAt: { type: Date, default: Date.now },
});

SavedUniversitySchema.index({ userEmail: 1, universityId: 1 }, { unique: true });
export const SavedUniversity = models.SavedUniversity || model("SavedUniversity", SavedUniversitySchema);

// ─── University Application Model ───────────────────────────────────────────
const ApplicationSchema = new Schema({
  userEmail: { type: String, required: true },
  universityId: { type: String, required: true },
  universityName: { type: String, required: true },
  country: { type: String },
  city: { type: String },
  intendedCourse: { type: String, required: true }, // Chosen from university's available courses
  pastEducation: { type: String, required: true }, // High School, Bachelor's, etc.
  pastAcademicScore: { type: String, required: true }, // e.g., 85% or 8.5 CGPA
  phone: { type: String, required: true },
  status: { type: String, enum: ["PENDING", "REVIEWING", "ACCEPTED", "REJECTED"], default: "PENDING" },
  createdAt: { type: Date, default: Date.now },
});

export const Application = models.Application || model("Application", ApplicationSchema);
