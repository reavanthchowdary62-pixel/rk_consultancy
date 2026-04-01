const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('crypto');

// 1. Generate 100+ unique courses
const subjects = ["Computer Science", "Artificial Intelligence", "Data Science", "Machine Learning", "Robotics", "Cyber Security", "Software Engineering", "Mathematics", "Physics", "Chemistry", "Biology", "Biotechnology", "Biomedical Engineering", "Civil Engineering", "Mechanical Engineering", "Electrical Engineering", "Electronics & Communication", "Aerospace Engineering", "Chemical Engineering", "Information Technology", "Business Administration", "Finance", "Accounting", "Marketing", "Economics", "Management", "Entrepreneurship", "Human Resources", "Supply Chain Management", "International Business", "Law", "International Law", "Corporate Law", "Criminal Law", "Intellectual Property Law", "Medicine", "Nursing", "Dentistry", "Pharmacy", "Public Health", "Veterinary Science", "Psychology", "Sociology", "Political Science", "International Relations", "History", "Philosophy", "English Literature", "Linguistics", "Creative Writing", "Journalism", "Media Studies", "Communications", "Fine Arts", "Graphic Design", "Architecture", "Interior Design", "Urban Planning", "Music", "Theatre Arts", "Film & Television", "Animation", "Fashion Design", "Culinary Arts", "Hospitality Management", "Tourism Management", "Sports Management", "Kinesiology", "Nutrition", "Dietetics", "Environmental Science", "Ecology", "Geology", "Marine Biology", "Astronomy", "Astrophysics", "Quantum Physics", "Data Analytics", "Business Analytics", "Actuarial Science", "Statistics", "Operations Research", "Information Systems", "Game Design", "Virtual Reality Development", "Blockchain Technology", "Cloud Computing", "Network Administration", "Telecommunications", "Logistics", "Project Management", "Agribusiness", "Agriculture", "Food Science", "Horticulture", "Forestry", "Wildlife Management", "Social Work", "Education", "Early Childhood Education", "Special Education", "Educational Leadership"];

// Ensure we have at least 100 courses
if (subjects.length < 100) throw new Error("Need more courses");

const countries = [
  { name: "India", cities: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Rajkot", "Surat", "Jaipur", "Lucknow", "Chandigarh"], prefix: ["Indian Institute of Technology", "National Institute of Technology", "University of", "State University", "Institute of Management", "Global University", "Amity Node", "Symbiosis Campus"], feeRange: [200000, 2500000], addyExtra: ["Road", "Marg", "Campus", "Nagar"] },
  { name: "USA", cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Seattle", "Boston"], prefix: ["University of", "State University", "Institute of Technology", "College", "Tech", "A&M", "Global Campus"], feeRange: [2500000, 6000000], addyExtra: ["Ave", "St", "Blvd", "Lane"] },
  { name: "UK", cities: ["London", "Birmingham", "Manchester", "Glasgow", "Newcastle", "Sheffield", "Leeds", "Bristol", "Liverpool", "Edinburgh", "Cardiff", "Belfast"], prefix: ["University of", "Imperial College", "King's College", "Royal College", "Institute of", "Metropolitan University"], feeRange: [1800000, 4500000], addyExtra: ["Road", "Square", "Street", "Way"] },
  { name: "Canada", cities: ["Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton", "Ottawa", "Quebec City", "Winnipeg", "Hamilton", "Kitchener"], prefix: ["University of", "Tech", "Polytechnic", "Institute", "College"], feeRange: [1500000, 3500000], addyExtra: ["St", "Ave", "Drive", "Boulevard"] },
  { name: "Australia", cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Cranbourne", "Canberra", "Newcastle"], prefix: ["University of", "Institute", "Tech", "Global College", "Metro Uni"], feeRange: [1600000, 3800000], addyExtra: ["St", "Road", "Parade", "Highway"] },
  { name: "Germany", cities: ["Berlin", "Munich", "Frankfurt", "Hamburg", "Cologne", "Stuttgart", "Düsseldorf", "Leipzig", "Dresden"], prefix: ["Technical University of", "University of", "Institute of Technology", "Applied Sciences", "Global Uni"], feeRange: [50000, 800000], addyExtra: ["Straße", "Platz", "Allee", "Weg"] }
];

const hardcoded = [
  { name: "Indian Institute of Science (IISc)", address: "CV Raman Rd, Bengaluru, Karnataka 560012", country: "India", qsRank2026: 96, fee: 200000 },
  { name: "Massachusetts Institute of Technology (MIT)", address: "77 Massachusetts Ave, Cambridge, MA 02139", country: "USA", qsRank2026: 1, fee: 4800000 },
  { name: "IIM Ahmedabad", address: "Vastrapur, Ahmedabad, Gujarat 380015", country: "India", qsRank2026: 42, fee: 2500000 },
  { name: "Stanford University", address: "450 Serra Mall, Stanford, CA 94305", country: "USA", qsRank2026: 2, fee: 5200000 },
  { name: "University of Oxford", address: "Wellington Square, Oxford OX1 2JD", country: "UK", qsRank2026: 3, fee: 3800000 },
  { name: "University of Cambridge", address: "The Old Schools, Trinity Ln, Cambridge CB2 1TN", country: "UK", qsRank2026: 4, fee: 3900000 },
  { name: "IIT Bombay", address: "Main Gate Rd, IIT Area, Powai, Mumbai, Maharashtra 400076", country: "India", qsRank2026: 110, fee: 250000 },
  { name: "University of Toronto", address: "27 King's College Cir, Toronto, ON M5S", country: "Canada", qsRank2026: 21, fee: 3000000 },
  { name: "University of Melbourne", address: "Parkville VIC 3010", country: "Australia", qsRank2026: 14, fee: 2800000 },
  { name: "Technical University of Munich", address: "Arcisstraße 21, 80333 München", country: "Germany", qsRank2026: 37, fee: 100000 }
];

let rankCounter = 1;
const universities = [];

// Helper to get random item
const randItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
// Helper to get multiple random distinct items
const randItems = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const uniPhotos = [
  "1541339907198-e08756dedf3f", "1562774053-701939374585", "1498243691581-b145c3f54a5a", 
  "1523050854058-8df90110c9f1", "1606761568499-6d2451b68ce9", "1592280771190-3e2e4d571952",
  "1519451241324-20b4ea2c4220", "1581362072978-2c40c88bc6cb", "1503676260728-1c00da094a0b",
  "1525926572889-bd0f406ab9ab", "1613896527026-f195d5c81e5b", "1549057861-68997a3eeec9",
  "1493612278195-61f15904aa02", "1521587760476-6c12a4b040da", "1535905557558-afc4877eea81"
];

// Add hardcoded first
hardcoded.forEach(hc => {
  universities.push({
    id: `hc-${rankCounter}`,
    name: hc.name,
    address: hc.address,
    country: hc.country,
    qsRank2026: hc.qsRank2026,
    tuitionFeeINR: hc.fee,
    level: randItem(["UG", "PG", "BOTH"]),
    courseAreas: randItems(subjects, randInt(15, 30)),
    admissionReqs: "Competitive Scores (SAT/JEE/GRE), High GPA, Strong SOP",
    placementPcnt: randInt(90, 100),
    avgSalaryINR: hc.country === "India" ? randInt(1000000, 3500000) : randInt(4000000, 10000000),
    locationScore: parseFloat((Math.random() * 2 + 8).toFixed(1)),
    imageUrl: `https://images.unsplash.com/photo-${randItem(uniPhotos)}?auto=format&fit=crop&q=80&w=800&h=500`
  });
  rankCounter++;
});

// Generate remaining 190 universities to total 200
for (let i = 0; i < 190; i++) {
  const cInfo = randItem(countries);
  const city = randItem(cInfo.cities);
  const prefix = randItem(cInfo.prefix);
  
  // Create realistic names based on prefix format
  let uName = prefix.includes("of") ? `${prefix} ${city}` : `${city} ${prefix}`;
  // Sometimes add a random surname or direction for variety
  if (Math.random() > 0.7) {
    const specials = ["Global", "Metro", "International", "Central", "Western", "Northern", "City"];
    uName = `${randItem(specials)} ${uName}`;
  }

  // Ensure unique rank roughly between 50 and 1500
  let uRank = hcRanks = hardcoded.map(h => h.qsRank2026);
  let rank = randInt(50, 1500);
  while (universities.find(u => u.qsRank2026 === rank)) {
    rank = randInt(50, 1500);
  }

  // Address generation
  const streetNum = randInt(10, 9999);
  const streetName = randItem(["Main", "Park", "University", "College", "Oak", "Pine", "Maple", "Cedar", "Washington", "Victoria", "Gandhi", "Nehru", "Patel", "King"]);
  const uAddy = `${streetNum} ${streetName} ${randItem(cInfo.addyExtra)}, ${city}`;

  universities.push({
    id: `un-${Math.random().toString(36).substr(2, 9)}`,
    name: uName,
    address: uAddy,
    country: cInfo.name,
    qsRank2026: rank,
    tuitionFeeINR: randInt(cInfo.feeRange[0], cInfo.feeRange[1]),
    level: randItem(["UG", "PG", "BOTH"]),
    courseAreas: randItems(subjects, randInt(8, 20)),
    admissionReqs: cInfo.name === "India" ? "10+2 > 60%, National Entrance Test" : "IELTS/TOEFL > 6.5, Academic Transcripts, LORs",
    placementPcnt: randInt(65, 98),
    avgSalaryINR: cInfo.name === "India" ? randInt(400000, 1500000) : randInt(2500000, 7000000),
    locationScore: parseFloat((Math.random() * 4 + 6).toFixed(1)),
    imageUrl: `https://images.unsplash.com/photo-${randItem(uniPhotos)}?auto=format&fit=crop&q=80&w=800&h=500`
  });
}

const targetPath = path.join(__dirname, '..', 'src', 'data', 'seed.json');
fs.writeFileSync(targetPath, JSON.stringify(universities, null, 2));

console.log(`Successfully generated ${universities.length} universities encompassing ${subjects.length} unique courses.`);
console.log(`Saved to ${targetPath}`);
