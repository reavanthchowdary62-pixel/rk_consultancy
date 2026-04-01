import mongoose from "mongoose";
import dns from "dns";

// Force Google DNS locally only (fixes local ISP DNS issues). Vercel blocks this in production.
if (process.env.NODE_ENV === 'development') {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
}

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  console.warn("⚠️  MONGODB_URI not set. Database features will be disabled.");
}

// Cached connection to prevent reconnecting on every request in dev
let cached = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (!MONGODB_URI) return null;
  
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { 
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000,
        serverApi: {
          version: '1',
          strict: true,
          deprecationErrors: true,
        }
      })
      .then((m) => m)
      .catch((err) => {
        cached.promise = null;
        console.error("MongoDB connection failed:", err.message);
        return null;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export const isDBConnected = () =>
  mongoose.connection.readyState === 1;
