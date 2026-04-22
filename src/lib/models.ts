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
  specializations: [{ type: String, trim: true }],       // e.g. ["MBA", "Computer Science", "Medicine"]
  countries: [{ type: String, trim: true }],              // e.g. ["USA", "UK", "Canada"]
  languages: [{ type: String, trim: true }],              // e.g. ["English", "Hindi", "Telugu"]
  experience: { type: Number, default: 0 },               // Years of experience
  profileImage: { type: String, default: "" },            // URL to profile image
  hourlyRate: { type: Number, default: 0 },               // INR per session
  availability: {
    days: [{ type: String }],                             // e.g. ["Monday", "Tuesday", "Wednesday"]
    timeSlots: [{ type: String }],                        // e.g. ["9:00 AM", "10:00 AM"]
  },
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

export const Counselor = models.Counselor || model("Counselor", CounselorSchema);

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
