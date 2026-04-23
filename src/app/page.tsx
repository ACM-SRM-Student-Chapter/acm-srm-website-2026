import dynamic from "next/dynamic";

// --- LAZY LOADED COMPONENTS ---
// Using next/dynamic splits the code into smaller chunks,
// dramatically speeding up the initial page load time.
const Hero = dynamic(() => import("@/components/sections/Hero"));
const Stats = dynamic(() => import("@/components/sections/Stats"));
const Domains = dynamic(() => import("@/components/sections/Domains"));
const EventsTimeline = dynamic(
  () => import("@/components/sections/EventsTimeline"),
);
const CommunityPartners = dynamic(
  () => import("@/components/sections/CommunityPartners"),
);

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ACM SRM Student Chapter",
    url: "https://www.acmsrm.in",
    logo: "https://www.acmsrm.in/acm-logo.webp",
    sameAs: [
      "https://www.instagram.com/srm.acm/",
      "https://www.linkedin.com/company/srmist-acm-student-chapter/",
      "https://github.com/ACM-SRM-Student-Chapter",
      "https://x.com/acmsrm",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "SRM Institute of Science and Technology",
      addressLocality: "Kattankulathur, Chengalpattu",
      addressRegion: "Tamil Nadu",
      postalCode: "603203",
      addressCountry: "IN",
    },
  };

  return (
    <main className="flex flex-col min-h-screen bg-background pb-20">
      {/* JSON-LD Schema for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Block 1: Full-Width Hero */}
      <Hero />

      {/* Block 2: Contained Stats Section */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-24 mb-12">
        <Stats />
      </div>

      {/* Block 3: Full-Width Domains */}
      <Domains />

      {/* Block 4: Full-Width Editorial Events Timeline */}
      <EventsTimeline />

      {/* Block 5: Contained Community Partners Section */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
        <CommunityPartners />
      </div>
    </main>
  );
}
