import mongoose, { Schema, model, models } from "mongoose";

// ─── User Model ──────────────────────────────────────────────────────────────
const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["STUDENT", "ADMIN"], default: "STUDENT" },
  createdAt: { type: Date, default: Date.now },
  wishlist: [{ type: String }], // University IDs
});

export const User = models.User || model("User", UserSchema);

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
