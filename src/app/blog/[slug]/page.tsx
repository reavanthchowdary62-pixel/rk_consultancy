import { articles } from "@/data/articles";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";

const fullContent: Record<string, string> = {
  "top-5-germany-cs": `Germany is one of the best-kept secrets for Indian CS students. With almost zero tuition at public universities, a thriving tech sector, and a post-study work visa lasting 18 months, Germany offers extraordinary value.

**Top 5 Universities:**

1. **Technical University of Munich (TUM)** — QS Rank #37. A powerhouse in CS, AI, and Robotics. Strong ties with BMW, Siemens, and MAN.

2. **RWTH Aachen University** — Known for its Engineering-CS intersection. Home to 45,000 students and a strong startup ecosystem.

3. **University of Stuttgart** — Excellent for embedded systems and automotive software. Partnered with Mercedes-Benz, Porsche, and SAP.

4. **Karlsruhe Institute of Technology (KIT)** — One of Germany's top research universities. Excellent scholarship options through DAAD.

5. **University of Hamburg** — Affordable city, strong CS program, and a growing AI research hub.

**Why Germany Works for Indians:**
- Tuition: €0–500/semester at public unis
- Living costs: €800–1,200/month (Berlin), much less in smaller cities
- DAAD Scholarships: Full funding available for meritorious applicants
- Language: Most programs available in English at PG level
- Work Rights: Part-time work (20 hrs/week) during studies + 18 months post-study visa`,
  "uk-scholarship-guide": `The United Kingdom hosts some of the world's most prestigious scholarships for Indian students. Here's a comprehensive breakdown:

**Tier 1: Fully Funded (Full tuition + stipend)**

1. **Chevening Scholarship** — UK Government's flagship. Fully funded. Requires 2+ years work experience and extraordinary leadership potential. Deadline: November each year.

2. **Gates Cambridge Scholarship** — For admission to Cambridge only. One of the most prestigious awards globally. Deadline: October.

3. **Commonwealth Scholarship** — For PG students from Commonwealth nations, including India. Fully funded. Strong focus on development impact.

**Tier 2: Partial Scholarships**

4. **GREAT Scholarship** — £10,000 for Indian students applying to UK universities. Department of Science and Technology tie-up.

5. **University-specific awards** — Most Russell Group universities (Oxford, Imperial, UCL) offer 25-50% tuition waivers for exceptional Indian applicants.

**How RK Consultancy Helps:**
Our advisors maintain live tracking of all open scholarship windows and personally review your application for the best framing.`,
  "canada-vs-australia": `Both Canada and Australia are premium study destinations for Indians. But they serve different student profiles.

**Canada at a Glance:**
- Post-Study Work Permit: Up to 3 years (PGWP — tied to program length)
- PR Pathway: Express Entry / PNP — Indians can get PR in 2-3 years
- Tuition: CAD $20,000–40,000/yr
- Best For: Technology, Business, Healthcare
- Cities: Toronto, Vancouver, Montreal

**Australia at a Glance:**
- Post-Study Work Permit: 2-4 years (varies by degree level and region)
- PR Pathway: SkillSelect points system — competitive but achievable
- Tuition: AUD $25,000–45,000/yr  
- Best For: Engineering, Nursing, Environmental Sciences
- Cities: Sydney, Melbourne, Brisbane

**Verdict:**
Choose **Canada** if you prioritize a clear, well-defined PR pathway and strong tech industry. Choose **Australia** if you prefer a warmer climate, slightly lower living costs outside major cities, and sector-specific immigration advantages.`,
  "sop-writing-tips": `Your Statement of Purpose is the single most powerful document in your application. Here's the exact framework our counselors use:

**The 5-Part SOP Framework:**

**Part 1: Hook (75 words)** — Open with a specific professional moment that sparked your interest in this field. Not "I have always been passionate about..." — that's generic. Instead: "The day our hospital's AI diagnostic tool flagged a cancer case that 3 radiologists missed, I knew where I wanted to spend my career."

**Part 2: Academic Journey (150 words)** — Discuss relevant coursework, projects, and GPA in context. Highlight research if any. Connect your undergraduate training to your proposed graduate study.

**Part 3: Professional Experience (125 words)** — For working professionals: use concrete achievements with numbers. "I led a team of 8 engineers to deliver a mobile banking app with 200K users."

**Part 4: Why This Program? (100 words)** — Name specific professors, labs, or courses at THIS university that directly align with your research interests. Generic SOPs are immediately rejected.

**Part 5: Career Goals (50 words)** — Be specific. Not "I want to be successful." Instead: "I intend to return to India and lead AI adoption in Tier-2 healthcare institutions."

**Golden Rules:** 750-1000 words. Active voice. No spelling errors. Get 3 people to review it.`,
  "mba-roi-analysis": `Is an MBA abroad worth the investment? We analyzed placement data from 200+ students.

**Average Investment by Country:**
- USA (Top 20): ₹60-80 Lakh total
- UK (Top 10): ₹45-55 Lakh total
- Canada (Top 5): ₹35-45 Lakh total

**Average Post-MBA Salary (Year 1):**
- USA: ₹90-120 Lakh/yr
- UK: ₹65-85 Lakh/yr
- Canada: ₹55-70 Lakh/yr

**Break-Even Analysis:**
- USA MBA: Typically 2-3 years post-graduation
- UK MBA: Typically 2-2.5 years
- Canada MBA: Typically 1.5-2 years

**Top Sectors Hiring MBAs in 2026:**
1. Tech (Product Management, Strategy) — highest growth
2. Consulting (McKinsey, BCG, Deloitte)
3. Finance (Investment Banking, PE)
4. Healthcare Management

**Our Verdict:** For Indians targeting global careers, an MBA abroad has a positive ROI within 3 years in nearly all cases, assuming admission to a top-30 program. The key is scholarship optimization — our team has secured an average of 35% financial aid for MBA applicants.`,
  "student-exchange-guide": `RK Consultancy's exclusive Student Exchange Program is designed for Indian students who are already enrolled in a local university but want global credentials without starting from scratch.

**How It Works:**

**Step 1: Credit Assessment**
Our team reviews your current transcript and maps your completed credits against international university frameworks. Typically, 60-80% of credits are transferable.

**Step 2: Partner University Matching**
We match you with one of our 50+ partner universities in the UK, Germany, Canada, or Australia based on your program, GPA, and budget.

**Step 3: Exchange Application**
We handle the complete application process — from documentation to financial aid requests. Most exchange students pay significantly reduced tuition.

**Step 4: Semester or Full Year Abroad**
Most students spend their penultimate year abroad. You graduate with a credential from both your home institution and the partner university in many cases.

**Step 5: Post-Exchange Opportunities**
Many exchange students convert their exchange visa into a full student visa and stay on for post-study work.

**Who Is It For?**
- Students in years 2-4 of a 4-year UG program
- Working professionals with partial degrees
- PG students seeking global research exposure

Contact our exchange specialists today to check your eligibility!`,
};

export async function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const article = articles.find(a => a.slug === params.slug);
  if (!article) notFound();

  const content = fullContent[params.slug] || "Article content coming soon.";
  const related = articles.filter(a => a.slug !== params.slug).slice(0, 2);

  const renderContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("**") && line.endsWith("**") && !line.slice(2).includes("**")) {
        return <h3 key={i} className="text-lg font-extrabold text-gray-900 dark:text-white mt-6 mb-2">{line.slice(2,-2)}</h3>;
      }
      if (line.startsWith("- ") || line.match(/^\d+\./)) {
        const clean = line.replace(/^[-\d.] /, "").replace(/\*\*(.*?)\*\*/g, "$1");
        return <li key={i} className="text-gray-600 dark:text-gray-400 mb-1 ml-4">{clean}</li>;
      }
      const rendered = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      return line.trim() ? <p key={i} className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: rendered }}></p> : <br key={i} />;
    });
  };

  return (
    <div className="py-10 px-4 max-w-3xl mx-auto">
      <Link href="/blog" className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-8 transition-colors">
        <ArrowLeft size={16}/> Back to Blog
      </Link>

      <div className="mb-4 flex items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-1">
          <Tag size={12}/> {article.category}
        </span>
        <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={12}/> {article.readTime} · {article.date}</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">{article.title}</h1>

      <img src={article.image} alt={article.title} className="w-full h-64 object-cover rounded-2xl mb-8" />

      <div className="prose prose-sm max-w-none">
        {renderContent(content)}
      </div>

      {/* CTA */}
      <div className="mt-10 bg-gradient-to-r from-primary to-blue-800 text-white rounded-2xl p-8 text-center">
        <h3 className="text-xl font-extrabold mb-2">Ready for expert guidance?</h3>
        <p className="text-blue-100 text-sm mb-4">Book a free session with an RK Consultancy expert who specializes in exactly this topic.</p>
        <Link href="/booking" className="inline-block bg-white text-primary font-bold px-6 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">Book Free Session →</Link>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-12">
          <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map(r => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 hover:shadow-lg transition-all group">
                <p className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-primary transition-colors">{r.title}</p>
                <p className="text-xs text-gray-400 mt-1">{r.readTime} · {r.category}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
