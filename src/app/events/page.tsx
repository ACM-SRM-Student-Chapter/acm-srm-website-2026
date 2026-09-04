import { Playfair_Display, Anton, Inter } from "next/font/google";
import FlagshipEvent from "@/components/events/FlagshipEvent";
import EventCard, { RegularEvent } from "@/components/events/EventCard";
import TechGoshipsSection from "@/components/events/TechGoshipsSection";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const anton = Anton({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"] });

const REGULAR_EVENTS: RegularEvent[] = [
  {
    date: "15 April, 2024",
    title: "Orientation",
    location: "IMAC Lab, 14th Floor, Tech Park, SRMIST",
    description:
      "An engaging and inspiring start marking the revival of the chapter. Unveiling our vision for the upcoming year and introducing resources.",
    speakers: [
      "Prof. Venkatesh Raman (President, ACM India)",
      "Dr. M. Suchithra",
      "S Sembon Surakshitha",
    ],
    color: "acm-violet",
    poster: "",
  },
  {
    date: "March – April 2026",
    title: "Recruitment Drive 2026",
    location: "Campus Wide",
    description:
      "A pivotal moment marking the evolution of our chapter as we welcome a new wave of dynamic talent and diverse expertise, strengthening our foundation for future innovations.",
    color: "acm-pink",
    poster: "/events/recruitement2026.webp",
  },
];

export default function EventsPage() {
  return (
    <main
      className={`relative flex flex-col items-center pb-20 pt-20 bg-[#ffffff] overflow-hidden ${inter.className}`}
    >
      {/* ── Grid Background ──────────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      <div
        aria-hidden
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-acm-electric/10 rounded-full blur-[120px] pointer-events-none z-0"
      />
      <div
        aria-hidden
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-acm-pink/5 rounded-full blur-[120px] pointer-events-none z-0"
      />
      <div
        aria-hidden
        className="absolute bottom-1/4 left-1/3 w-[700px] h-[700px] bg-acm-violet/10 rounded-full blur-[150px] pointer-events-none z-0"
      />

      {/* ── Page Header ──────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 py-16 text-center z-10 relative animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1
          className={`mb-4 text-5xl md:text-7xl text-[#111315] uppercase tracking-wide ${anton.className}`}
        >
          Discover Our <br />
          <span className="bg-acm-violet bg-clip-text text-transparent">
            Experiences
          </span>
        </h1>

        <p
          className={`mx-auto max-w-2xl text-xl text-black/60 italic ${playfair.className}`}
        >
          From intense 24-hour coding sprints to deep-dive technical workshops,
          explore the events that shape our chapter.
        </p>
      </div>

      {/* ── ACM Tech Goships Section ─────────────────────────────────────────── */}
      <TechGoshipsSection />

      {/* ── Dark Portal ──────────────────────────────────────────────────────── */}
      <section className="relative z-20 w-full pb-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
          <div className="rounded-[3rem] bg-[#060010] p-6 sm:p-12 md:p-20 shadow-[0_30px_100px_rgba(123,97,255,0.2)] border border-white/10 relative overflow-hidden">
            
            {/* Inner Header */}
            <div className="mb-24 text-center max-w-3xl mx-auto relative z-10">
              <h2
                className={`text-4xl md:text-6xl mb-6 text-white uppercase tracking-wide ${anton.className}`}
              >
                Fostering Innovation in <br />
                <span className="bg-pink-500 bg-clip-text text-transparent">
                  Computing
                </span>
              </h2>

              <p
                className={`text-xl text-white/70 leading-relaxed italic ${playfair.className}`}
              >
                Unite creativity and technology as we shape the future through
                transformative events, ideas, connections, and a thriving
                community.
              </p>
            </div>

            {/* ── Zig-Zag Event Cards ───────────────────────────────────────── */}
            <div className="relative flex flex-col gap-20 md:gap-32 mb-32 z-10">
              {REGULAR_EVENTS.map((event, idx) => (
                <EventCard
                  key={event.title}
                  event={event}
                  isEven={idx % 2 === 0}
                />
              ))}
            </div>

            {/* ── Flagship: Interactive LaserFlow Billboard ─────────────────── */}
            <FlagshipEvent />
          </div>
        </div>
      </section>
    </main>
  );
}
