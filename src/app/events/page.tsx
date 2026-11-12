import { Playfair_Display, Anton, Inter } from "next/font/google";
import EventsPortal from "@/components/events/EventsPortal";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const anton = Anton({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"] });

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
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-black/60 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-acm-violet" aria-hidden />
          ACM SRMIST • EVENTS COMMAND CENTER
        </div>

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
          From intense AI building sprints to deep-dive technical talks, explore
          the events that shape our chapter.
        </p>
      </div>

      {/* ── Unified Dark Portal ──────────────────────────────────────────────── */}
      <EventsPortal />
    </main>
  );
}
