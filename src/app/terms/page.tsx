import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service | ACM SRMIST",
  description: "Terms of Service for ACM SRMIST student chapter website.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#060010] text-white pt-32 pb-24 px-6 sm:px-12 font-sans">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-acm-electric hover:underline mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          BACK TO HOME
        </Link>
        <h1 className="text-4xl sm:text-6xl font-bold uppercase tracking-wider mb-6">
          Terms of Service
        </h1>
        <div className="space-y-6 text-white/70 leading-relaxed text-sm sm:text-base border-t border-white/10 pt-6">
          <p>
            Welcome to the ACM SRMIST official portal. By using this site, you agree to comply with our community guidelines, SRMIST code of conduct, and standard internet usage norms.
          </p>
          <p>
            All event schedules, designs, and content are provided for educational and community enrichment purposes. Unlawful scraping, disruption of services, or impersonation of ACM SRMIST representatives is strictly prohibited.
          </p>
          <p>
            For further queries or permission requests regarding chapter media, please contact our team at{" "}
            <a href="mailto:acm@srmist.edu.in" className="text-acm-electric hover:underline">
              acm@srmist.edu.in
            </a>.
          </p>
        </div>
      </div>
    </main>
  );
}
