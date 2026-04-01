# StudyManager

StudyManager is a full-stack educational platform built with Next.js 14, Tailwind CSS, Prisma, and the Vercel AI SDK. It helps students (specifically from India/Gujarat) find and compare domestic and global universities, chat with an AI counselor, and book agent meetings.

## Requirements

- **Node.js**: v18.17+
- **Database**: PostgreSQL (Prisma configured) / or change provider in `schema.prisma` to sqlite for immediate local testing if desired.

## Setup Instructions

1. **Install Dependencies**
   Navigate to the project root and install NPM packages:
   ```bash
   npm install
   ```
   *(Note: This project strictly utilizes Next.js App Router and doesn't require a separate Express server container as originally scoped, bringing better Vercel performance and DX).*

2. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   # PostgreSQL connection string for Prisma
   DATABASE_URL="postgresql://user:password@localhost:5432/studymanager?schema=public"

   # OpenAI Key for the StudyBot chatbot / Vercel AI SDK
   OPENAI_API_KEY="sk-..."
   ```

3. **Database Initialization**
   Run the Prisma migrations to create the schema, then generate the client:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

4. **Run Development Server**
   Start the application locally:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

## Technical Scope Delivered

- **Frontend**: Responsive, modern, mobile-first design leveraging Tailwind CSS. English interfaces with built-in layout readiness for i18n setup.
- **Backend/API**: `app/api/compare` for retrieving unified JSON. `app/api/chat` for maintaining edge-socket streaming with OpenAI models.
- **Database**: Seeded `src/data/seed.json` for rapid localized mock data without needing Postgres running locally. 
- **AI Integration**: Edge ready endpoint returning `StreamingTextResponse` hooked seamlessly into the UI via `ChatBox`.
