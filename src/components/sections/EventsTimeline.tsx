"use client";

import { useState, useRef, useCallback, useEffect, memo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
  Variants,
} from "framer-motion";
import {
  ArrowRight,
  Asterisk,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Playfair_Display, Anton, Inter } from "next/font/google";

// ─── Fonts ────────────────────────────────────────────────────────────────────
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const anton = Anton({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"] });

// ─── Animation constants ──────────────────────────────────────────────────────
const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_DURATION = 6000; // ms per slide

// ─── Types ────────────────────────────────────────────────────────────────────
interface EventTheme {
  text: string;
  bg: string;
  bgLight: string;
  border: string;
  hex: string; // raw hex for non-Tailwind uses
}

interface EventStat {
  value: string;
  label: string;
}
interface EventEntry {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  date: string;
  location: string;
  description: string;
  highlights: string[];
  stats: EventStat[];
  theme: EventTheme;
  poster: string;
}

// ─── Static data ─────────────────────────────────────────────────────────────
const EVENTS_DATA: EventEntry[] = [
  {
    id: "01",
    title: "Orientation",
    shortTitle: "ORIENTATION",
    subtitle: "Chapter Revival",
    date: "15 April, 2024",
    location: "IMAC Lab, 14th Floor, Tech Park, SRMIST",
    description:
      "An inspiring start marking the revival of the chapter, featuring insights from Prof. Venkatesh Raman, President of ACM India.",
    highlights: [
      "Insights on leveraging technology and fostering collaboration",
      "Introduction to chapter resources, events, and initiatives",
      "Laying the groundwork for a year of growth",
      "Special address by Dr. M. Suchithra and S Sembon Surakshitha",
    ],
    stats: [
      { value: "200+", label: "Attendees" },
      { value: "1", label: "Unified Vision" },
    ],
    theme: {
      text: "text-[#7B61FF]",
      bg: "bg-[#7B61FF]",
      bgLight: "bg-[#7B61FF]/10",
      border: "border-[#7B61FF]/30",
      hex: "#7B61FF",
    },
    poster: "",
  },
  {
    id: "02",
    title: "Recruitment Drive 2026",
    shortTitle: "RECRUITMENT",
    subtitle: "Join the Legacy",
    date: "March – April 2026",
    location: "Campus Wide",
    description:
      "A pivotal moment marking the evolution of our chapter as we welcome a new wave of dynamic talent and diverse expertise.",
    highlights: [
      "Join the world's largest educational computing society",
      "Welcome a new wave of dynamic talent and diverse expertise",
      "Strengthen our foundation for future innovations",
      "Technical and leadership roles available",
    ],
    stats: [
      { value: "500+", label: "Applicants Expected" },
      { value: "100+", label: "Roles Available" },
    ],
    theme: {
      text: "text-[#FF4081]",
      bg: "bg-[#FF4081]",
      bgLight: "bg-[#FF4081]/10",
      border: "border-[#FF4081]/30",
      hex: "#FF4081",
    },
    poster: "/events/recruitement2026.webp",
  },
  {
    id: "03",
    title: "Symposium on Responsible AI",
    shortTitle: "FLAGSHIP",
    subtitle: "3-Day AI Exploration",
    date: "18–20 March 2026",
    location: "Tech Park, SRMIST",
    description:
      "An immersive 3-day exploration into the ethics, development, and future of Artificial Intelligence with leading industry experts.",
    highlights: [
      "Prof. Mary Anita Rajam V – Head, Dept of CSE, Anna University",
      "Mr. Siva Venkata Satya Narayana – Founder & CEO, Altruisty Innovation",
      "Mr. Murali Kannan – DGM IT, Sun TV Network",
      "Mr. R S L Balaji – CIO, Altruisty Innovation",
    ],
    stats: [
      { value: "3 Days", label: "Duration" },
      { value: "4", label: "Keynote Speakers" },
    ],
    theme: {
      text: "text-[#00E5FF]",
      bg: "bg-[#00E5FF]",
      bgLight: "bg-[#00E5FF]/10",
      border: "border-[#00E5FF]/30",
      hex: "#00E5FF",
    },
    poster: "/events/Symposium_on_Responsible_Al.webp",
  },
];

// ─── Shared slide variants ────────────────────────────────────────────────────
// A single coherent cross-fade + micro-lift used by both panes
const slideVariants: Variants = {
  enter: { opacity: 0, y: 16 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT_EXPO },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.28, ease: EASE_OUT_EXPO },
  },
};

// ─── Memoised Highlight List ──────────────────────────────────────────────────
const HighlightList = memo(
  ({ highlights, themeText }: { highlights: string[]; themeText: string }) => (
    <ul className="divide-y divide-white/10 border-t border-white/10">
      {highlights.map((highlight, i) => (
        <motion.li
          key={highlight}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.35,
            ease: EASE_OUT_EXPO,
            delay: 0.15 + i * 0.07,
          }}
          className="py-4 flex items-start gap-4 text-white/70 font-medium"
        >
          <ArrowRight
            className={`w-4 h-4 shrink-0 mt-0.5 ${themeText}`}
            aria-hidden
          />
          <span className="leading-relaxed text-sm md:text-base">
            {highlight}
          </span>
        </motion.li>
      ))}
    </ul>
  ),
);
HighlightList.displayName = "HighlightList";

// ─── Memoised Stat Tile ───────────────────────────────────────────────────────
const StatTile = memo(({ value, label }: EventStat) => (
  <div>
    <div
      className={`text-3xl md:text-4xl text-white mb-0.5 ${anton.className}`}
    >
      {value}
    </div>
    <div className="text-[10px] font-bold tracking-wider text-white/50 uppercase">
      {label}
    </div>
  </div>
));
StatTile.displayName = "StatTile";

// ─── Smooth Autoplay Progress Bar ────────────────────────────────────────────
// Uses useMotionValue + useAnimationFrame → zero React state updates,
// runs entirely on the compositor thread.
const AutoplayProgress = memo(
  ({
    isPaused,
    activeIndex,
    accentHex,
    onComplete,
  }: {
    isPaused: boolean;
    activeIndex: number;
    accentHex: string;
    onComplete: () => void;
  }) => {
    const prefersReducedMotion = useReducedMotion();
    const elapsed = useMotionValue(0);
    const startRef = useRef<number | null>(null);
    const doneFired = useRef(false);

    // Reset when slide changes
    useEffect(() => {
      elapsed.set(0);
      startRef.current = null;
      doneFired.current = false;
    }, [activeIndex, elapsed]);

    useAnimationFrame((t) => {
      if (isPaused || prefersReducedMotion) {
        startRef.current = null;
        return;
      }
      if (startRef.current === null) startRef.current = t;
      const delta = t - startRef.current;
      const pct = Math.min((delta / AUTOPLAY_DURATION) * 100, 100);
      elapsed.set(pct);

      if (pct >= 100 && !doneFired.current) {
        doneFired.current = true;
        onComplete();
      }
    });

    return (
      <div className="flex items-center gap-5 shrink-0">
        <div className="relative w-28 lg:w-44 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: elapsed.getPrevious() !== undefined ? elapsed : "0%",
              backgroundColor: accentHex,
            }}
          />
        </div>
        <div className="flex items-center gap-2.5">
          <div className="bg-white/5 text-white p-1.5 rounded-full border border-white/10">
            <Asterisk
              className="w-4 h-4"
              style={{
                animation: prefersReducedMotion
                  ? "none"
                  : "spin 4s linear infinite",
              }}
              aria-hidden
            />
          </div>
          <motion.span
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[11px] font-bold tracking-widest uppercase text-white/40 w-20 tabular-nums"
          >
            {/* Display a live % reading via a counter — still no React state */}
            {EVENTS_DATA[activeIndex].id} / 03
          </motion.span>
        </div>
      </div>
    );
  },
);
AutoplayProgress.displayName = "AutoplayProgress";

// ─── Geometric Placeholder (when no poster) ───────────────────────────────────
const GeometricBackground = memo(() => (
  <>
    <div className="absolute top-0 bottom-0 right-[25%] w-px bg-white/5" />
    <div className="absolute right-[25%] top-1/2 -translate-y-1/2 translate-x-1/2 w-64 h-64 rounded-full border border-white/10" />
    <div className="absolute right-[25%] top-1/2 -translate-y-1/2 translate-x-1/2 w-40 h-40 rounded-full border border-white/10" />
    <div className="absolute right-[25%] top-1/2 -translate-y-1/2 translate-x-1/2 w-16 h-16 rounded-full border border-white/20 bg-white/5" />
  </>
));
GeometricBackground.displayName = "GeometricBackground";

// ─── Main Component ───────────────────────────────────────────────────────────
export default function EventsTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  // Stable advance — wraps to start
  const advance = useCallback(() => {
    setActiveIndex((i) => (i + 1) % EVENTS_DATA.length);
  }, []);

  const handleTabClick = useCallback((idx: number) => {
    setActiveIndex(idx);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + EVENTS_DATA.length) % EVENTS_DATA.length);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % EVENTS_DATA.length);
  }, []);

  // Keyboard navigation: ← → arrow keys
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handlePrev, handleNext]);

  const ev = EVENTS_DATA[activeIndex];

  return (
    <section
      className={`relative w-full py-24 md:py-32 bg-[#060010] text-white overflow-hidden border-y border-white/5 ${inter.className}`}
      aria-label="Events timeline"
    >
      {/* Subtle radial glow that shifts with the active event's color */}
      <motion.div
        aria-hidden
        key={ev.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 70% 60%, ${ev.theme.hex}18 0%, transparent 70%)`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* ── 1. Header ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="mb-14"
        >
          <div className="text-[11px] font-bold tracking-[0.25em] text-[#00E5FF] uppercase mb-5 flex items-center gap-2">
            <span className="w-8 h-px bg-[#00E5FF]" aria-hidden />
            OUR JOURNEY
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2
              className={`text-5xl md:text-7xl tracking-wide text-white uppercase leading-none ${anton.className}`}
            >
              Building Community <br className="hidden md:block" />
              Through Events{" "}
              <span className="text-white/20" aria-hidden>
                —
              </span>
            </h2>
            <p
              className={`max-w-md text-white/55 text-lg md:text-xl leading-relaxed lg:pb-3 ${playfair.className} italic`}
            >
              From flagship symposiums to orientations, we create opportunities
              for students to learn, build, and grow together.
            </p>
          </div>
        </motion.div>

        {/* ── 2. Controls bar ────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-6">
          {/* Tab title + pill tabs */}
          <div className="flex-1 min-w-0">
            {/* Live event title — 2-line reserved height prevents layout shift */}
            <div className="h-14 mb-5 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={ev.id}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className={`text-3xl md:text-5xl uppercase tracking-wider text-white leading-tight ${anton.className}`}
                >
                  {ev.title}
                </motion.h3>
              </AnimatePresence>
            </div>

            {/* Pill tabs */}
            <div
              className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1"
              role="tablist"
              aria-label="Event selector"
            >
              {EVENTS_DATA.map((e, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={e.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleTabClick(idx)}
                    className="relative flex items-center justify-center h-11 rounded-full text-sm font-bold tracking-widest outline-none focus-visible:ring-2 focus-visible:ring-white/40 shrink-0"
                  >
                    {/* Animated background pill */}
                    <motion.span
                      layout
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                      className={`absolute inset-0 rounded-full ${isActive ? e.theme.bg : "bg-white/5 hover:bg-white/10"} transition-colors duration-200`}
                    />
                    <span
                      className={`relative z-10 px-4 flex items-center gap-2 ${isActive ? "text-black" : "text-white/50"}`}
                    >
                      <span>{e.id}</span>
                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            initial={{ opacity: 0, maxWidth: 0 }}
                            animate={{ opacity: 1, maxWidth: "10rem" }}
                            exit={{ opacity: 0, maxWidth: 0 }}
                            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                            className={`overflow-hidden whitespace-nowrap uppercase text-xs ${anton.className} tracking-wider`}
                          >
                            {e.shortTitle}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Progress bar + counter — hidden on mobile, replaced by dots below */}
          <div className="hidden sm:flex">
            <AutoplayProgress
              isPaused={isHovered}
              activeIndex={activeIndex}
              accentHex={ev.theme.hex}
              onComplete={advance}
            />
          </div>
        </div>

        {/* ── 3. Card grid ───────────────────────────────────────────────────── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* ── Left pane: event details ─────────────────────────────────────── */}
          <div className="lg:col-span-7 bg-white/[0.04] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 border border-white/10 relative overflow-hidden backdrop-blur-xl shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={ev.id}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col h-full"
              >
                {/* Date + Location chips */}
                <div className="flex flex-wrap items-center gap-3 mb-7">
                  <div
                    className={`inline-flex items-center gap-2 rounded-full ${ev.theme.bgLight} px-4 py-1.5 text-xs font-bold ${ev.theme.text} ${ev.theme.border} border w-fit backdrop-blur-md`}
                  >
                    <Calendar className="h-3.5 w-3.5" aria-hidden />
                    <time>{ev.date}</time>
                  </div>
                  {ev.location && (
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium text-white/55 border border-white/5 w-fit">
                      <MapPin className="h-3.5 w-3.5" aria-hidden />
                      <span>{ev.location}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p
                  className={`text-white/75 leading-relaxed text-lg md:text-xl mb-8 ${playfair.className} italic`}
                >
                  <strong className="text-white font-bold not-italic">
                    {ev.subtitle}
                  </strong>
                  <span className="text-white/25 mx-2 not-italic" aria-hidden>
                    —
                  </span>
                  {ev.description}
                </p>

                {/* Highlights */}
                <div className="mt-auto">
                  <h4
                    className={`text-xl tracking-wide mb-3 text-white uppercase ${anton.className}`}
                  >
                    Event Highlights
                  </h4>
                  <HighlightList
                    highlights={ev.highlights}
                    themeText={ev.theme.text}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Right pane: visual / poster ──────────────────────────────────── */}
          <div className="lg:col-span-5 bg-black rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[380px] md:min-h-[450px] shadow-2xl border border-white/10">
            {/* Background: poster or geometric shapes */}
            <AnimatePresence mode="wait">
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
                className="absolute inset-0 z-0 pointer-events-none"
              >
                {ev.poster ? (
                  <>
                    <img
                      src={ev.poster}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover opacity-35 mix-blend-screen"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-transparent" />
                  </>
                ) : (
                  <GeometricBackground />
                )}
              </motion.div>
            </AnimatePresence>

            {/* ACM badge */}
            <div className="absolute top-6 right-6 text-[10px] font-bold tracking-[0.2em] text-white/70 uppercase z-10 bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/15">
              ACM SRMIST
            </div>

            {/* Pulsing indicator */}
            <AnimatePresence mode="wait">
              <motion.div
                key={ev.id}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative z-10 mt-8"
              >
                <div
                  className={`w-10 h-10 rounded-full border ${ev.theme.border} ${ev.theme.bgLight} flex items-center justify-center backdrop-blur-sm`}
                >
                  <div
                    className={`w-2 h-2 ${ev.theme.bg} rounded-full animate-pulse`}
                    aria-hidden
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Stats row + ghost number */}
            <div className="relative mt-16 z-10 flex justify-between items-end">
              {/* Giant ghost number */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={ev.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.08 }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                  aria-hidden
                  className={`absolute -left-6 -bottom-14 text-[10rem] md:text-[12rem] text-white/[0.04] leading-none select-none pointer-events-none ${anton.className}`}
                >
                  {ev.id}
                </motion.span>
              </AnimatePresence>

              {/* Stats */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.4,
                      ease: EASE_OUT_EXPO,
                      delay: 0.1,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                    transition: { duration: 0.25, ease: EASE_OUT_EXPO },
                  }}
                  className="flex gap-6 md:gap-8 w-full bg-black/50 px-5 py-4 rounded-xl md:rounded-2xl backdrop-blur-md border border-white/10"
                >
                  {ev.stats.map((stat) => (
                    <StatTile key={stat.label} {...stat} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Mobile progress dots ───────────────────────────────────────────── */}
        <div
          className="mt-6 flex sm:hidden items-center justify-center gap-4"
          aria-label="Slide indicators"
        >
          {/* Prev / Next arrows */}
          <button
            onClick={handlePrev}
            aria-label="Previous event"
            className="p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {EVENTS_DATA.map((e, idx) => (
              <button
                key={e.id}
                onClick={() => handleTabClick(idx)}
                aria-label={`Go to ${e.title}`}
                aria-current={activeIndex === idx}
                className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                style={{
                  width: activeIndex === idx ? "2rem" : "0.5rem",
                  backgroundColor:
                    activeIndex === idx
                      ? ev.theme.hex
                      : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next event"
            className="p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Spin keyframe (used by the Asterisk) */}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </section>
  );
}
