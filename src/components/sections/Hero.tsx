"use client";

import { useCallback, useMemo, memo } from "react";
import { motion, useSpring, useReducedMotion, Variants } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  Megaphone,
  Handshake,
  Palette,
  CalendarDays,
  Code,
  Globe,
} from "lucide-react";
import { Playfair_Display, Anton } from "next/font/google";

import LightRays from "@/components/ui/LightRays";
import CircularText from "@/components/ui/CircularText";
import TextPressure from "@/components/ui/TextPressure";
import Shuffle from "@/components/ui/Shuffle";
import OrbitImages from "@/components/ui/OrbitImages";

// ─── Fonts ────────────────────────────────────────────────────────────────────
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const anton = Anton({ subsets: ["latin"], weight: "400" });

// ─── Animation constants ──────────────────────────────────────────────────────
const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

// Staggered entrance — children inherit the delay cascade
const heroContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease: EASE_OUT_EXPO },
  },
};

// ─── Orbit icons — module-scope so never recreated ────────────────────────────
// Each icon element is a stable React element; the array ref never changes.
const ORBIT_ICONS = [
  <div
    key="cpu"
    className="bg-acm-electric/20 p-4 rounded-2xl border border-acm-electric/50 shadow-[0_0_20px_rgba(0,229,255,0.4)]"
  >
    {" "}
    <Cpu className="text-acm-electric w-8 h-8" aria-hidden />
  </div>,
  <div
    key="megaphone"
    className="bg-acm-violet/20   p-4 rounded-2xl border border-acm-violet/50   shadow-[0_0_20px_rgba(123,97,255,0.4)]"
  >
    {" "}
    <Megaphone className="text-acm-violet   w-8 h-8" aria-hidden />
  </div>,
  <div
    key="palette"
    className="bg-acm-pink/20     p-4 rounded-2xl border border-acm-pink/50     shadow-[0_0_20px_rgba(255,64,129,0.4)]"
  >
    {" "}
    <Palette className="text-acm-pink     w-8 h-8" aria-hidden />
  </div>,
  <div
    key="handshake"
    className="bg-acm-blue/20     p-4 rounded-2xl border border-acm-blue/50     shadow-[0_0_20px_rgba(0,91,181,0.4)]"
  >
    {" "}
    <Handshake className="text-acm-blue     w-8 h-8" aria-hidden />
  </div>,
  <div
    key="calendar"
    className="bg-acm-green/20    p-4 rounded-2xl border border-acm-green/50    shadow-[0_0_20px_rgba(0,230,118,0.4)]"
  >
    {" "}
    <CalendarDays className="text-acm-green  w-8 h-8" aria-hidden />
  </div>,
  <div
    key="globe"
    className="bg-white/10        p-4 rounded-2xl border border-white/30        shadow-[0_0_20px_rgba(255,255,255,0.2)]"
  >
    {" "}
    <Globe className="text-white         w-8 h-8" aria-hidden />
  </div>,
];

// ─── Ticker text — one copy rendered twice for a clean seamless loop ──────────
const TICKER_TEXT = (
  <span className="flex items-center mx-4 text-xs sm:text-sm font-bold tracking-[0.15em] text-white/70 uppercase whitespace-nowrap">
    ASSOCIATION FOR COMPUTING MACHINERY
    <span className="text-acm-electric mx-4 text-base leading-none" aria-hidden>
      •
    </span>
    ACM Student Chapter
    <span className="text-acm-pink mx-4 text-base leading-none" aria-hidden>
      •
    </span>
    Department of Computing Technologies
    <span className="text-acm-violet mx-4 text-base leading-none" aria-hidden>
      •
    </span>
    SRMIST
    <span className="text-acm-electric mx-4 text-base leading-none" aria-hidden>
      •
    </span>
  </span>
);

// ─── Memoised CTA buttons ─────────────────────────────────────────────────────
const CTAButtons = memo(() => (
  <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
    {/* Primary — gradient-fill on hover via Framer whileHover */}
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      className="w-full sm:w-auto"
    >
      <Link
        href="/events"
        className="group relative flex w-full items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold text-black shadow-[0_0_30px_rgba(255,255,255,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        aria-label="Explore our events"
      >
        {/* Gradient overlay on hover */}
        <span
          className="absolute inset-0 rounded-full bg-gradient-to-r from-acm-electric to-acm-violet opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />
        <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
          Explore Events
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </span>
      </Link>
    </motion.div>

    {/* Secondary */}
    <motion.div
      whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.12)" }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      className="w-full sm:w-auto rounded-full"
    >
      <Link
        href="/JoinUs"
        className="flex w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        aria-label="Join our community"
      >
        Join Our Community
      </Link>
    </motion.div>
  </div>
));
CTAButtons.displayName = "CTAButtons";

// ─── Memoised Ticker ──────────────────────────────────────────────────────────
// Two copies of the content animated from x:0 → x:-50% → loop.
// This is pixel-perfect seamless because at -50% the layout is visually
// identical to 0% (copy 2 slides into copy 1's position).
const Ticker = memo(({ paused }: { paused: boolean }) => (
  <div
    className="w-full overflow-hidden border-y border-white/10 bg-white/5 backdrop-blur-md py-3 sm:py-4 pointer-events-none select-none"
    aria-hidden
  >
    <motion.div
      className="flex will-change-transform"
      animate={{ x: paused ? "0%" : ["-50%", "0%"] }}
      initial={{ x: "0%" }}
      transition={
        paused
          ? { duration: 0 }
          : {
              ease: "linear",
              duration: 36,
              repeat: Infinity,
              repeatType: "loop",
            }
      }
    >
      {/* Two identical copies — the second slides into view as the first exits */}
      <div className="flex shrink-0">{TICKER_TEXT}</div>
      <div className="flex shrink-0">{TICKER_TEXT}</div>
      {/* Extra copies so gaps never show at very wide viewports */}
      <div className="flex shrink-0">{TICKER_TEXT}</div>
      <div className="flex shrink-0">{TICKER_TEXT}</div>
    </motion.div>
  </div>
));
Ticker.displayName = "Ticker";

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  // Springs for the cursor-following circular text
  const mouseX = useSpring(0, { stiffness: 100, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 20 });

  // Stable handler — no new function on every render
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      mouseX.set(e.clientX - 100);
      mouseY.set(e.clientY - 100);
    },
    [mouseX, mouseY],
  );

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#060010] pt-24 sm:pt-28"
      aria-label="Hero — ACM Student Chapter SRMIST"
    >
      {/* ── 1. Volumetric Light Rays ─────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-0 opacity-70 mix-blend-screen pointer-events-none"
        aria-hidden
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#00E5FF"
          raysSpeed={1.5}
          lightSpread={0.6}
          rayLength={2.5}
          followMouse={!prefersReducedMotion}
          mouseInfluence={0.15}
          noiseAmount={0.05}
        />
      </div>

      {/* ── 2. Cursor-following Circular Text (desktop only) ─────────────────── */}
      {!prefersReducedMotion && (
        <motion.div
          style={{ x: mouseX, y: mouseY }}
          className="pointer-events-none fixed left-0 top-0 z-10 opacity-30 mix-blend-screen hidden lg:block"
          aria-hidden
        >
          <CircularText
            text="ACM*STUDENT*CHAPTER*SRMIST*"
            onHover="goBonkers"
            spinDuration={15}
            className="text-acm-electric"
          />
        </motion.div>
      )}

      {/* ── 3. Main content ──────────────────────────────────────────────────── */}
      <div className="container relative z-20 mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-12 items-center">
        {/* Left column: badge + headline + subtitle */}
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center lg:items-start text-center lg:text-left lg:col-span-7 order-1"
        >
          {/* Shuffle badge */}
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex border border-acm-electric/30 bg-white/5 px-4 py-2 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(0,229,255,0.08)]"
          >
            <Shuffle
              text="Association for Computing Machinery"
              shuffleDirection="right"
              duration={1.5}
              stagger={0.02}
              colorTo="#00E5FF"
              className="text-xs sm:text-sm font-bold tracking-wider text-white"
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className={`w-full flex flex-col items-center lg:items-start text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight tracking-widest uppercase ${anton.className}`}
          >
            {/* TextPressure — responsive container uses aspect-ratio instead of fixed heights */}
            <div className="relative h-[200px] sm:h-[300px] md:h-[350px] w-full max-w-[300px] sm:max-w-[450px] md:max-w-[550px] mb-2 sm:mb-4">
              <TextPressure
                text="ACM"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#FFFFFF"
                minFontSize={80}
              />
            </div>
            <span>Student Chapter</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className={`mt-6 text-base md:text-lg font-medium text-white/55 max-w-lg leading-relaxed italic ${playfair.className}`}
          >
            Collaborate with like-minded peers and industry experts to push the
            boundaries of technology. Together we connect, build, and innovate.
          </motion.p>
        </motion.div>

        {/* Right column: Orbit */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="relative lg:col-span-5 h-[320px] sm:h-[420px] md:h-[460px] w-full flex items-center justify-center order-2"
          aria-hidden
        >
          <OrbitImages
            elements={ORBIT_ICONS}
            shape="circle"
            radius={140}
            rotation={15}
            duration={prefersReducedMotion ? 0 : 25}
            itemSize={60}
            responsive={true}
            baseWidth={400}
            direction="normal"
            showPath={true}
            pathColor="rgba(255,255,255,0.08)"
            centerContent={
              <div className="flex flex-col items-center justify-center text-center">
                <Code className="h-10 w-10 text-white/40 mb-1.5" aria-hidden />
                <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
                  BUILD
                </span>
              </div>
            }
          />
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.55 }}
          className="lg:col-span-7 order-3 lg:-mt-6"
        >
          <CTAButtons />
        </motion.div>

        {/* Full-width ticker — sits in the grid flow, no viewport-hack required */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.9 }}
          className="order-4 lg:col-span-12 w-[100vw] relative left-1/2 -translate-x-1/2 mt-8 lg:mt-12"
        >
          <Ticker paused={!!prefersReducedMotion} />
        </motion.div>
      </div>

      {/* ── Bottom gradient — blends into light-mode sections ────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-white pointer-events-none"
        aria-hidden
      />
    </section>
  );
}
