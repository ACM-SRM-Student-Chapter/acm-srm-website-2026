"use client";

import { useRef, useState, useCallback, memo } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { Calendar, MapPin, User, Sparkles } from "lucide-react";
import LaserFlow from "@/components/ui/LaserFlow";
import { Playfair_Display, Anton, Inter } from "next/font/google";

// ─── Fonts ────────────────────────────────────────────────────────────────────
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const anton = Anton({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"] });

// ─── Types ────────────────────────────────────────────────────────────────────
interface Speaker {
  role: string;
  name: string;
  description: string;
  color: string;
}

interface RegularEvent {
  date: string;
  title: string;
  location: string;
  description: string;
  speakers?: string[];
  color: string;
  poster?: string;
}

// ─── Static data — hoisted to avoid recreation on render ─────────────────────
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

const FLAGSHIP_SPEAKERS: Speaker[] = [
  {
    role: "Keynote",
    name: "Prof. Mary Anita Rajam V",
    description: "Professor & Head, CSE, Anna Univ.",
    color: "text-acm-electric",
  },
  {
    role: "Speaker",
    name: "Mr. Siva Venkata Satya Narayana",
    description: "Founder & CEO, Altruisty Innovation",
    color: "text-acm-violet",
  },
  {
    role: "Speaker",
    name: "Mr. Murali Kannan",
    description: "DGM IT, Sun TV Network",
    color: "text-acm-pink",
  },
  {
    role: "Speaker",
    name: "Mr. R S L Balaji",
    description: "CIO, Altruisty Innovation",
    color: "text-acm-blue",
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────
const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO, delay },
  }),
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = (fromLeft: boolean): Variants => ({
  hidden: { opacity: 0, x: fromLeft ? -80 : 80, y: 30 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.7, type: "spring", stiffness: 90, damping: 20 },
  },
});

// ─── Curved Arrow decorations ─────────────────────────────────────────────────
const ArrowRightCurve = memo(() => (
  <svg
    aria-hidden
    width="120"
    height="150"
    viewBox="0 0 120 150"
    fill="none"
    className="absolute -bottom-24 left-[calc(50%+20px)] hidden md:block opacity-30 z-0 pointer-events-none"
  >
    <path
      d="M10,10 Q110,40 100,130"
      stroke="white"
      strokeWidth="3"
      strokeDasharray="8 8"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M85,115 L100,135 L115,115"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));
ArrowRightCurve.displayName = "ArrowRightCurve";

const ArrowLeftCurve = memo(() => (
  <svg
    aria-hidden
    width="120"
    height="150"
    viewBox="0 0 120 150"
    fill="none"
    className="absolute -bottom-24 right-[calc(50%+20px)] hidden md:block opacity-30 z-0 pointer-events-none"
  >
    <path
      d="M110,10 Q10,40 20,130"
      stroke="white"
      strokeWidth="3"
      strokeDasharray="8 8"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M5,115 L20,135 L35,115"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));
ArrowLeftCurve.displayName = "ArrowLeftCurve";

// ─── Memoised Event Card ──────────────────────────────────────────────────────
const EventCard = memo(
  ({ event, isEven }: { event: RegularEvent; isEven: boolean }) => (
    <div className={`relative flex flex-col md:flex-row items-center w-full`}>
      {/* Connecting arrow decoration */}
      {isEven ? <ArrowRightCurve /> : <ArrowLeftCurve />}

      {/* Spacer for zig-zag */}
      <div
        className={`hidden md:block w-1/2 ${isEven ? "order-2" : "order-1"}`}
      />

      <motion.div
        variants={cardVariants(isEven)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className={`w-full md:w-1/2 relative z-10 ${isEven ? "order-1 md:pr-12" : "order-2 md:pl-12"}`}
      >
        {/* Card */}
        <motion.div
          whileHover={{
            y: -8,
            transition: { duration: 0.3, ease: EASE_OUT_EXPO },
          }}
          className="group relative flex flex-col rounded-3xl p-8 bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/[0.08] hover:border-white/20 hover:shadow-[0_0_50px_rgba(255,255,255,0.04)] transition-colors duration-300"
        >
          {/* Poster */}
          {event.poster && (
            <div className="w-full h-48 md:h-64 mb-8 rounded-2xl overflow-hidden relative border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#060010]/80 via-transparent to-transparent z-10" />
              <img
                src={event.poster}
                alt={event.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          )}

          {/* Date badge */}
          <div
            className={`mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-${event.color} w-fit`}
          >
            <Calendar className="h-4 w-4" aria-hidden />
            <time>{event.date}</time>
          </div>

          <h3
            className={`mb-3 text-4xl uppercase tracking-wide text-white ${anton.className}`}
          >
            {event.title}
          </h3>

          <div className="mb-4 flex items-start gap-2 text-sm font-medium text-white/50">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span>{event.location}</span>
          </div>

          <p
            className={`text-white/80 text-lg leading-relaxed mb-6 italic ${playfair.className}`}
          >
            {event.description}
          </p>

          {event.speakers && (
            <div className="mt-4 border-t border-white/10 pt-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/50 mb-3">
                <User className="h-3 w-3" aria-hidden /> Speakers
              </div>
              <ul className="space-y-2">
                {event.speakers.map((speaker) => (
                  <li
                    key={speaker}
                    className="text-sm font-medium text-white/80 flex items-center gap-2"
                  >
                    <div
                      className={`h-1.5 w-1.5 rounded-full bg-${event.color} shrink-0`}
                      aria-hidden
                    />
                    {speaker}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  ),
);
EventCard.displayName = "EventCard";

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EventsPage() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isFlagshipHovered, setIsFlagshipHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Stable pointer handlers — no new function references on every render
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    spotlightRef.current?.style.setProperty(
      "--mx",
      `${e.clientX - rect.left}px`,
    );
    spotlightRef.current?.style.setProperty(
      "--my",
      `${e.clientY - rect.top}px`,
    );
  }, []);

  const handleMouseEnter = useCallback(() => setIsFlagshipHovered(true), []);

  const handleMouseLeave = useCallback(() => {
    setIsFlagshipHovered(false);
    spotlightRef.current?.style.setProperty("--mx", "-9999px");
    spotlightRef.current?.style.setProperty("--my", "-9999px");
  }, []);

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
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-16 text-center z-10 relative"
      >
        <motion.h1
          variants={fadeUp}
          custom={0}
          className={`mb-4 text-5xl md:text-7xl text-[#111315] uppercase tracking-wide ${anton.className}`}
        >
          Discover Our <br />
          <span className="bg-acm-violet bg-clip-text text-transparent">
            Experiences
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          custom={0.1}
          className={`mx-auto max-w-2xl text-xl text-black/60 italic ${playfair.className}`}
        >
          From intense 24-hour coding sprints to deep-dive technical workshops,
          explore the events that shape our chapter.
        </motion.p>
      </motion.div>

      {/* ── Dark Portal ──────────────────────────────────────────────────────── */}
      <section className="relative z-20 w-full pb-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
            className="rounded-[3rem] bg-[#060010] p-6 sm:p-12 md:p-20 shadow-[0_30px_100px_rgba(123,97,255,0.2)] border border-white/10 relative overflow-hidden"
          >
            {/* Inner Header */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-24 text-center max-w-3xl mx-auto relative z-10"
            >
              <motion.h2
                variants={fadeUp}
                custom={0}
                className={`text-4xl md:text-6xl mb-6 text-white uppercase tracking-wide ${anton.className}`}
              >
                Fostering Innovation in <br />
                <span className="bg-pink-500 bg-clip-text text-transparent">
                  Computing
                </span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                custom={0.1}
                className={`text-xl text-white/70 leading-relaxed italic ${playfair.className}`}
              >
                Unite creativity and technology as we shape the future through
                transformative events, ideas, connections, and a thriving
                community.
              </motion.p>
            </motion.div>

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
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
              className="relative w-full overflow-hidden rounded-[2.5rem] shadow-2xl bg-black border border-white/10 group cursor-crosshair"
              style={{ minHeight: "500px" }}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Laser background — intensity driven by hover state */}
              <div className="absolute inset-0 z-0">
                <LaserFlow
                  color="#7B61FF"
                  horizontalBeamOffset={0.1}
                  verticalBeamOffset={0.0}
                  wispSpeed={
                    isFlagshipHovered && !prefersReducedMotion ? 40 : 15
                  }
                  flowSpeed={
                    isFlagshipHovered && !prefersReducedMotion ? 1.5 : 0.35
                  }
                  wispIntensity={
                    isFlagshipHovered && !prefersReducedMotion ? 20 : 5
                  }
                  wispDensity={
                    isFlagshipHovered && !prefersReducedMotion ? 2.5 : 1
                  }
                />
              </div>

              {/* Mouse spotlight mask */}
              <div
                ref={spotlightRef}
                aria-hidden
                className="absolute inset-0 z-10 pointer-events-none opacity-60 transition-opacity duration-300"
                style={
                  {
                    "--mx": "-9999px",
                    "--my": "-9999px",
                    maskImage:
                      "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.8) 100px, rgba(255,255,255,0.2) 250px, rgba(255,255,255,0) 400px)",
                    WebkitMaskImage:
                      "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.8) 100px, rgba(255,255,255,0.2) 250px, rgba(255,255,255,0) 400px)",
                  } as React.CSSProperties
                }
              >
                <div className="absolute inset-0 bg-gradient-to-br from-acm-electric/30 via-transparent to-acm-violet/30 mix-blend-screen" />
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(#ffffff 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
              </div>

              {/* Content — text left, poster right */}
              <div className="relative z-20 flex flex-col lg:flex-row items-center justify-between p-8 md:p-16 h-full gap-12 pointer-events-none">
                {/* Left: Text */}
                <div className="flex-1 w-full">
                  {/* Flagship badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                    className="inline-flex items-center gap-2 rounded-full border border-acm-violet/50 bg-acm-violet/20 px-4 py-1.5 text-sm font-extrabold tracking-widest text-acm-violet backdrop-blur-md mb-8"
                  >
                    <span className="relative flex h-2 w-2" aria-hidden>
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-acm-violet opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-acm-violet" />
                    </span>
                    <Sparkles className="h-3.5 w-3.5" aria-hidden />
                    FLAGSHIP EVENT
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.65,
                      ease: EASE_OUT_EXPO,
                      delay: 0.05,
                    }}
                    className={`text-5xl md:text-7xl uppercase tracking-wide text-white mb-6 drop-shadow-[0_0_15px_rgba(123,97,255,0.5)] ${anton.className}`}
                  >
                    Symposium on <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-acm-electric to-acm-violet">
                      Responsible AI
                    </span>
                  </motion.h3>

                  {/* Date / location chips */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.55,
                      ease: EASE_OUT_EXPO,
                      delay: 0.1,
                    }}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-white/70 font-medium mb-10"
                  >
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                      <Calendar
                        className="h-5 w-5 text-acm-electric"
                        aria-hidden
                      />
                      <time dateTime="2026-03-18">18–20 March 2026</time>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                      <MapPin className="h-5 w-5 text-acm-pink" aria-hidden />
                      <span>Tech Park, SRMIST</span>
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className={`text-xl text-white/80 leading-relaxed mb-10 max-w-xl italic ${playfair.className}`}
                  >
                    Join us for an immersive 3-day exploration into the ethics,
                    development, and future of Artificial Intelligence with
                    leading industry experts.
                  </motion.p>

                  {/* Speakers grid */}
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 border-t border-white/10 pt-8 max-w-2xl"
                  >
                    {FLAGSHIP_SPEAKERS.map((s) => (
                      <motion.div key={s.name} variants={fadeUp}>
                        <h4
                          className={`font-bold text-xs uppercase tracking-wider mb-1 ${s.color}`}
                        >
                          {s.role}
                        </h4>
                        <p className="text-white font-bold text-sm">{s.name}</p>
                        <p className="text-white/50 text-xs">{s.description}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Right: 3-D Poster */}
                <div
                  className="w-full lg:w-[400px] flex justify-center lg:justify-end"
                  style={{ perspective: "1000px" }}
                >
                  <motion.div
                    animate={
                      prefersReducedMotion
                        ? {}
                        : isFlagshipHovered
                          ? { rotateY: 0, rotateX: 0, scale: 1.05 }
                          : { rotateY: -12, rotateX: 6, scale: 1 }
                    }
                    transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                    className="relative w-full max-w-[320px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-white/10"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Gloss sheen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent z-10 pointer-events-none" />
                    <img
                      src="/events/Symposium_on_Responsible_Al.webp"
                      alt="Symposium on Responsible AI Poster"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop";
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
