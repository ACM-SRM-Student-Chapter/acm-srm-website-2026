"use client";

import { useState, useRef, useCallback, useEffect, memo } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useAnimationFrame,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  Asterisk,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Playfair_Display, Anton } from "next/font/google";
import {
  PAST_EVENTS,
  type PastEvent,
  type PastEventStat,
} from "@/data/eventsData";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const anton = Anton({ subsets: ["latin"], weight: "400" });

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_DURATION = 6000;

const THEME_MAP: Record<
  PastEvent["color"],
  { text: string; bg: string; bgLight: string; border: string }
> = {
  "acm-electric": {
    text: "text-acm-electric",
    bg: "bg-acm-electric",
    bgLight: "bg-acm-electric/10",
    border: "border-acm-electric/30",
  },
  "acm-pink": {
    text: "text-acm-pink",
    bg: "bg-acm-pink",
    bgLight: "bg-acm-pink/10",
    border: "border-acm-pink/30",
  },
  "acm-violet": {
    text: "text-acm-violet",
    bg: "bg-acm-violet",
    bgLight: "bg-acm-violet/10",
    border: "border-acm-violet/30",
  },
  "acm-blue": {
    text: "text-acm-blue",
    bg: "bg-acm-blue",
    bgLight: "bg-acm-blue/10",
    border: "border-acm-blue/30",
  },
};

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
    transition: { duration: 0.25, ease: EASE_OUT_EXPO },
  },
};

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
            delay: 0.12 + i * 0.06,
          }}
          className="py-3.5 flex items-start gap-3.5 text-white/75 font-medium"
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

const StatTile = memo(({ value, label }: PastEventStat) => (
  <div>
    <div className={`text-3xl md:text-4xl text-white mb-0.5 ${anton.className}`}>
      {value}
    </div>
    <div className="font-mono text-[10px] font-bold tracking-wider text-white/50 uppercase">
      {label}
    </div>
  </div>
));
StatTile.displayName = "StatTile";

const AutoplayProgress = memo(
  ({
    isPaused,
    activeIndex,
    accentHex,
    totalCount,
    currentId,
    onComplete,
  }: {
    isPaused: boolean;
    activeIndex: number;
    accentHex: string;
    totalCount: number;
    currentId: string;
    onComplete: () => void;
  }) => {
    const prefersReducedMotion = useReducedMotion();
    const elapsed = useMotionValue(0);
    const widthPct = useTransform(elapsed, (v) => `${v}%`);
    const startRef = useRef<number | null>(null);
    const doneFired = useRef(false);

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
      <div className="flex items-center gap-4 shrink-0">
        <div className="relative w-28 lg:w-40 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: widthPct,
              backgroundColor: accentHex,
            }}
          />
        </div>
        <div className="flex items-center gap-2.5">
          <div className="bg-white/5 text-white p-1.5 rounded-full border border-white/10">
            <Asterisk
              className={`w-4 h-4 ${prefersReducedMotion ? "" : "animate-spin"}`}
              style={
                prefersReducedMotion ? undefined : { animationDuration: "4s" }
              }
              aria-hidden
            />
          </div>
          <motion.span
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-[11px] font-bold tracking-widest uppercase text-white/45 tabular-nums"
          >
            {currentId} / {String(totalCount).padStart(2, "0")}
          </motion.span>
        </div>
      </div>
    );
  },
);
AutoplayProgress.displayName = "AutoplayProgress";

const GeometricBackground = memo(() => (
  <>
    <div className="absolute top-0 bottom-0 right-[25%] w-px bg-white/5" />
    <div className="absolute right-[25%] top-1/2 -translate-y-1/2 translate-x-1/2 w-64 h-64 rounded-full border border-white/10" />
    <div className="absolute right-[25%] top-1/2 -translate-y-1/2 translate-x-1/2 w-40 h-40 rounded-full border border-white/10" />
    <div className="absolute right-[25%] top-1/2 -translate-y-1/2 translate-x-1/2 w-16 h-16 rounded-full border border-white/20 bg-white/5" />
  </>
));
GeometricBackground.displayName = "GeometricBackground";

export default function PastEventsView() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const advance = useCallback(() => {
    setActiveIndex((i) => (i + 1) % PAST_EVENTS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + PAST_EVENTS.length) % PAST_EVENTS.length);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % PAST_EVENTS.length);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handlePrev, handleNext]);

  const ev = PAST_EVENTS[activeIndex];
  const theme = THEME_MAP[ev.color];

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
      className="relative z-10"
      aria-label="Past events timeline"
    >
      {/* Dynamic subtle radial glow matching active event */}
      <motion.div
        aria-hidden
        key={`glow-${ev.id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute -inset-6 pointer-events-none rounded-3xl"
        style={{
          background: `radial-gradient(ellipse 60% 45% at 75% 60%, ${ev.hex}18 0%, transparent 70%)`,
        }}
      />

      {/* 1. Header */}
      <div className="relative z-10 mb-10">
        <div className="font-mono text-[11px] font-bold tracking-[0.25em] text-acm-electric uppercase mb-4 flex items-center gap-2">
          <span className="w-8 h-px bg-acm-electric" aria-hidden />
          {"// 03 — PAST EVENTS ARCHIVE"}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <h2
            className={`text-4xl sm:text-5xl md:text-6xl tracking-wide text-white uppercase leading-none ${anton.className}`}
          >
            Building Community <br className="hidden md:block" />
            Through Events{" "}
            <span className="text-white/20" aria-hidden>
              —
            </span>
          </h2>
          <p
            className={`max-w-md text-white/60 text-base md:text-lg leading-relaxed italic ${playfair.className}`}
          >
            From flagship AI sprints to orientations, look back at the
            milestones that shaped our chapter.
          </p>
        </div>
      </div>

      {/* 2. Controls Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end mb-7 gap-5">
        <div className="flex-1 min-w-0 w-full">
          {/* Active Event Title */}
          <div className="min-h-[3.25rem] mb-4 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h3
                key={ev.id}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className={`text-3xl md:text-4xl lg:text-5xl uppercase tracking-wider text-white leading-tight ${anton.className}`}
              >
                {ev.title}
              </motion.h3>
            </AnimatePresence>
          </div>

          {/* Pill Tabs */}
          <div
            className="flex items-center gap-2 overflow-x-auto pb-1"
            role="tablist"
            aria-label="Past event selector"
          >
            {PAST_EVENTS.map((item, idx) => {
              const isActive = activeIndex === idx;
              const itemTheme = THEME_MAP[item.color];
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveIndex(idx)}
                  className="relative flex items-center justify-center h-10 rounded-full text-sm font-bold tracking-widest outline-none focus-visible:ring-2 focus-visible:ring-white/40 shrink-0"
                >
                  <motion.span
                    layout={!prefersReducedMotion}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                    className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                      isActive
                        ? itemTheme.bg
                        : "bg-white/5 hover:bg-white/10 border border-white/10"
                    }`}
                  />
                  <span
                    className={`relative z-10 px-4 flex items-center gap-2 font-mono text-xs ${
                      isActive ? "text-[#060010]" : "text-white/55"
                    }`}
                  >
                    <span>{item.index}</span>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.span
                          initial={
                            prefersReducedMotion
                              ? { opacity: 1 }
                              : { opacity: 0, maxWidth: 0 }
                          }
                          animate={{ opacity: 1, maxWidth: "10rem" }}
                          exit={
                            prefersReducedMotion
                              ? { opacity: 0 }
                              : { opacity: 0, maxWidth: 0 }
                          }
                          transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                          className={`overflow-hidden whitespace-nowrap uppercase text-xs ${anton.className} tracking-wider`}
                        >
                          {item.shortTitle}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop Autoplay Progress + Prev/Next */}
        <div className="hidden sm:flex items-center gap-4">
          <AutoplayProgress
            isPaused={isHovered}
            activeIndex={activeIndex}
            accentHex={ev.hex}
            totalCount={PAST_EVENTS.length}
            currentId={ev.index}
            onComplete={advance}
          />
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous past event"
              className="p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next past event"
              className="p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Split Card Grid */}
      <div
        className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left Pane: Event Details */}
        <div className="lg:col-span-7 bg-white/[0.04] rounded-[2rem] p-6 md:p-9 border border-white/10 relative overflow-hidden backdrop-blur-xl shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={ev.id}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col h-full"
            >
              {/* Date + Location Chips */}
              <div className="flex flex-wrap items-center gap-2.5 mb-6">
                <div
                  className={`inline-flex items-center gap-2 rounded-full ${theme.bgLight} px-4 py-1.5 font-mono text-xs font-bold ${theme.text} ${theme.border} border w-fit`}
                >
                  <Calendar className="h-3.5 w-3.5" aria-hidden />
                  <time>{ev.date}</time>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium text-white/60 border border-white/10 w-fit">
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  <span>{ev.location}</span>
                </div>
              </div>

              {/* Subtitle & Description */}
              <p
                className={`text-white/80 leading-relaxed text-lg md:text-xl mb-7 ${playfair.className} italic`}
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
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h4
                    className={`text-xl tracking-wide text-white uppercase ${anton.className}`}
                  >
                    Event Highlights
                  </h4>
                  {ev.registrationUrl && (
                    <a
                      href={ev.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider ${theme.text} hover:underline`}
                    >
                      Event Page
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden />
                    </a>
                  )}
                </div>
                <HighlightList
                  highlights={ev.highlights}
                  themeText={theme.text}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Pane: Visual / Poster */}
        <div className="lg:col-span-5 bg-black rounded-[2rem] p-6 md:p-9 relative overflow-hidden flex flex-col justify-between min-h-[380px] md:min-h-[440px] shadow-2xl border border-white/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              className="absolute inset-0 z-0 pointer-events-none"
            >
              {ev.poster ? (
                <>
                  <Image
                    src={ev.poster}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover opacity-45"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/25" />
                </>
              ) : (
                <GeometricBackground />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Top Badges */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <div
              className={`w-9 h-9 rounded-full border ${theme.border} ${theme.bgLight} flex items-center justify-center backdrop-blur-sm`}
            >
              <div
                className={`w-2 h-2 ${theme.bg} rounded-full animate-pulse`}
                aria-hidden
              />
            </div>

            <div className="font-mono text-[10px] font-bold tracking-[0.2em] text-white/75 uppercase bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/15">
              ACM SRMIST
            </div>
          </div>

          {/* Ghost Index + Stats */}
          <div className="relative mt-16 z-10 flex justify-between items-end">
            <AnimatePresence mode="wait">
              <motion.span
                key={ev.id}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.08 }}
                transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                aria-hidden
                className={`absolute -left-4 -bottom-12 text-[9rem] md:text-[11rem] text-white/[0.05] leading-none select-none pointer-events-none ${anton.className}`}
              >
                {ev.index}
              </motion.span>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.38, ease: EASE_OUT_EXPO, delay: 0.08 },
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                  transition: { duration: 0.22, ease: EASE_OUT_EXPO },
                }}
                className="flex flex-wrap gap-6 md:gap-8 w-full bg-black/60 px-5 py-4 rounded-2xl backdrop-blur-md border border-white/10"
              >
                {ev.stats.map((stat) => (
                  <StatTile key={stat.label} {...stat} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 4. Mobile Progress Dots & Prev/Next */}
      <div
        className="relative z-10 mt-6 flex sm:hidden items-center justify-center gap-4"
        aria-label="Slide indicators"
      >
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous event"
          className="p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          {PAST_EVENTS.map((e, idx) => (
            <button
              key={e.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to ${e.title}`}
              aria-current={activeIndex === idx}
              className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              style={{
                width: activeIndex === idx ? "2rem" : "0.5rem",
                backgroundColor:
                  activeIndex === idx ? ev.hex : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next event"
          className="p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
