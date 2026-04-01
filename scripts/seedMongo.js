/**
 * MongoDB Seed Script
 * Seeds the database with university data from seed.json
 * 
 * Usage: node scripts/seedMongo.js
 * Requires MONGODB_URI in .env.local
 */

const mongoose = require("mongoose");
const dns = require("dns");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env.local") });

// Force Google DNS to resolve MongoDB SRV records (fixes ISP DNS issues)
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env.local");
  console.log("Create .env.local from .env.example and add your MongoDB Atlas connection string.");
  process.exit(1);
}

// University Schema
const UniversitySchema = new mongoose.Schema({
  id: String,
  name: String,
  address: String,
  country: String,
  qsRank2026: Number,
  tuitionFeeINR: Number,
  level: String,
  courseAreas: [String],
  admissionReqs: String,
  placementPcnt: Number,
  avgSalaryINR: Number,
  locationScore: Number,
  imageUrl: String,
});

const University = mongoose.model("University", UniversitySchema);

async function seed() {
  try {
    console.log("🔌 Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected!");

    // Load seed data
    const seedPath = path.join(__dirname, "..", "src", "data", "seed.json");
    const data = JSON.parse(fs.readFileSync(seedPath, "utf-8"));
    console.log(`📦 Loaded ${data.length} universities from seed.json`);

    // Clear existing data
    await University.deleteMany({});
    console.log("🗑️  Cleared existing universities");

    // Insert all universities
    await University.insertMany(data);
    console.log(`✅ Inserted ${data.length} universities into MongoDB!`);

    // Print stats
    const count = await University.countDocuments();
    const byCountry = await University.aggregate([
      { $group: { _id: "$country", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    console.log(`\n📊 Total universities in DB: ${count}`);
    console.log("📊 By country:");
    byCountry.forEach((c) => console.log(`   ${c._id}: ${c.count}`));

    console.log("\n🎉 Seed complete! Your MongoDB database is ready.");
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
