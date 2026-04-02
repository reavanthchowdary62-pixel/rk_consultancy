# 🎓 RK Consultancy: Global Education Platform

An enterprise-grade consultancy platform designed for Indian study-abroad aspirants. Built with **Next.js 14**, **Tailwind CSS**, and **MongoDB Atlas**.

![CI Status](https://github.com/reavanthchowdary62-pixel/rk_consultancy/actions/workflows/main.yml/badge.svg)
![Unit Tests](https://img.shields.io/badge/Tests-Vitest%2Fjsdom-green)
![PWA](https://img.shields.io/badge/PWA-Ready-blue)

🔗 **Live Application:** [rk-consultancy.vercel.app](https://rk-consultancy.vercel.app)

---

## 🛡️ Enterprise Security & Architecture

The application is built to **Elite Professional Standards (9.5/10 Audit Rating)**:

- **Automated CI/CD:** GitHub Actions pipeline for linting, building, and security checks on every push.
- **Unit Testing Suite:** Comprehensive tests for mission-critical security modules (Rate Limiting, Auth).
- **Adaptive Marketing Engine:** SEO-optimized public landing page that seamlessly converts guests to authenticated users.
- **Secure Authentication:** JWT-based session management using `jose` and `bcryptjs` for military-grade password hashing.
- **Bot & Brute-Force Defense:** Custom **IP-based Rate Limiting** on all Auth API routes (Middleware-managed).
- **Email Verification:** Live transactional email pipeline using the **Resend SDK** for account activation.
- **NoSQL Injection Protection:** Aggressive data sanitization and schema validation via **Zod**.
- **Data Integrity:** Mongoose-driven models with unique constraints and verification states.

## 🚀 Key Features

- **QS 2026 Comparison Engine:** Real-time search and comparison across 200+ global universities.
- **Smart Scholarship Finder:** Automated eligibility matching for premium scholarships.
- **Visa Information Hub:** Country-specific guides for USA, UK, Canada, Australia, and Germany.
- **Mobile Native PWA:** Full Service Worker integration for a natively installable mobile experience.
- **Enterprise Telemetry:** Built-in Vercel Analytics and Speed Insights for real-time monitoring.

## 💻 Tech Stack

- **Framework:** [Next.js 14 (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas) with Mongoose
- **Email:** [Resend](https://resend.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment:** [Vercel Edge Network](https://vercel.com/)

---

## 🛠️ Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/reavanthchowdary62-pixel/rk_consultancy.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file with:
   ```env
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   RESEND_API_KEY=your_resend_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

---

## ⚖️ Legal & Compliance

- **Privacy Policy:** [View `/privacy`](https://rk-consultancy.vercel.app/privacy)
- **Terms of Service:** [View `/terms`](https://rk-consultancy.vercel.app/terms)

*Designed & Developed by RK Consultancy Team.*
