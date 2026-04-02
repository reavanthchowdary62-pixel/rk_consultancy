import { Shield, BookOpen } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <Shield size={48} className="text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Privacy Policy</h1>
        <p className="text-gray-500 mt-2">Last Updated: October 2026</p>
      </div>
      
      <div className="prose prose-blue dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Information We Collect</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-prose mt-2">
            At RK Consultancy, we collect information necessary to provide you with premium global educational counseling. This includes your name, email address, phone number, academic records, and intended course preferences when you create an account or submit an application.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. How We Use Your Data</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-prose mt-2">
            Your data is strictly used to evaluate your eligibility for international universities, securely process applications, manage counseling bookings, and send you important updates regarding your study abroad journey.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. Data Security & Encryption</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-prose mt-2">
            We employ industry-standard security measures. All user passwords are encrypted using Bcrypt hashing algorithms, and sensitive database records are secured within our MongoDB Atlas cloud deployment. Traffic to and from our servers is encrypted via TLS/SSL.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">4. Third-Party Sharing</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-prose mt-2">
            We do not sell your data. We only share necessary application credentials with partner universities and institutions directly related to your study abroad applications.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">5. Your Rights</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-prose mt-2">
            You reserve the right to request access to, modification of, or deletion of your personal data at any time by contacting our administratiors at contact@rkconsultancy.edu.
          </p>
        </section>
      </div>
    </div>
  );
}
