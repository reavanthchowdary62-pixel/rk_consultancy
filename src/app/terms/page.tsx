import { Scale } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <Scale size={48} className="text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Terms of Service</h1>
        <p className="text-gray-500 mt-2">Last Updated: October 2026</p>
      </div>
      
      <div className="prose prose-blue dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Agreement to Terms</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-prose mt-2">
            By accessing or using the RK Consultancy platform (rk-consultancy.vercel.app), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. Platform Usage</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-prose mt-2">
            You must provide accurate and complete information when booking counseling sessions or submitting university applications. The use of automated systems (bots) to spam contact forms or login portals is strictly prohibited and protected against through automated rate limiting.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. Intellectual Property</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-prose mt-2">
            The platform&apos;s original content, features, and functionality are owned by RK Consultancy and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">4. Limitations of Liability</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-prose mt-2">
            RK Consultancy provides guidance and application forwarding. However, we do not guarantee admission to any specific university. Admission decisions are solely at the discretion of the respective educational institutions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">5. Governing Law</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-prose mt-2">
            These terms shall be governed and construed in accordance with the laws of India, specifically operating from Ahmedabad, Gujarat.
          </p>
        </section>
      </div>
    </div>
  );
}
