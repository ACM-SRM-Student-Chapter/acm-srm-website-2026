import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | ACM SRMIST",
  description: "Privacy Policy for ACM SRMIST student chapter website.",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <div className="space-y-6 text-white/70 leading-relaxed text-sm sm:text-base border-t border-white/10 pt-6">
          <p>
            ACM SRMIST values your privacy. This website is a showcase of chapter events, publications, and student community initiatives at SRM Institute of Science and Technology.
          </p>
          <p>
            We do not collect personal data without your explicit consent. Any contact forms, event registrations, or newsletter signups are securely processed and never shared with third-party advertisers.
          </p>
          <p>
            If you have questions about our data practices or want your details updated/removed from any chapter record, reach out to us at{" "}
            <a href="mailto:acm@srmist.edu.in" className="text-acm-electric hover:underline">
              acm@srmist.edu.in
            </a>.
          </p>
        </div>
      </div>
    </main>
  );
}
