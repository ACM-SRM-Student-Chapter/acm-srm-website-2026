"use client";

import { useEffect, useRef, memo } from "react";
import {
  motion,
  useInView,
  useSpring,
  useReducedMotion,
  Variants,
} from "framer-motion";
import { Anton, Playfair_Display } from "next/font/google";

// ─── Fonts ────────────────────────────────────────────────────────────────────
const anton = Anton({ subsets: ["latin"], weight: "400" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// ─── Animation constants ──────────────────────────────────────────────────────
const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

// ─── Static data — module scope, never recreated ─────────────────────────────
interface StatEntry {
  id: number;
  label: string;
  value: number;
  suffix: string;
  // Raw hex — used for the glow and accent bar (avoids Tailwind dynamic class purging)
  hex: string;
  // Tailwind-safe accent classes
  textClass: string;
  borderClass: string;
  bgClass: string;
}

const STATS_DATA: StatEntry[] = [
  {
    id: 1,
    label: "Projects",
    value: 5,
    suffix: "+",
    hex: "#00E5FF",
    textClass: "text-acm-electric",
    borderClass: "border-acm-electric/30",
    bgClass: "bg-acm-electric/8",
  },
  {
    id: 2,
    label: "Hackathons Won",
    value: 3,
    suffix: "+",
    hex: "#7B61FF",
    textClass: "text-acm-violet",
    borderClass: "border-acm-violet/30",
    bgClass: "bg-acm-violet/8",
  },
  {
    id: 3,
    label: "Members",
    value: 70,
    suffix: "+",
    hex: "#FF4081",
    textClass: "text-acm-pink",
    borderClass: "border-acm-pink/30",
    bgClass: "bg-acm-pink/8",
  },
  {
    id: 4,
    label: "Industry Collabs",
    value: 5,
    suffix: "+",
    hex: "#00E676",
    textClass: "text-acm-green",
    borderClass: "border-acm-green/30",
    bgClass: "bg-acm-green/8",
  },
];

// ─── Counter ──────────────────────────────────────────────────────────────────
// KEY PERFORMANCE FIX: writes directly to `textContent` via a DOM ref instead
// of calling `setState` on every spring frame. This means ZERO React re-renders
// during the animation — the number updates happen entirely off the React cycle.
//
// The original used `duration: 2000` inside useSpring — that is NOT a valid
// spring option (springs only accept `damping` / `stiffness` / `mass`).
// It was silently ignored, making the spring use its defaults. Fixed below.
function Counter({
  value,
  suffix,
  hex,
}: {
  value: number;
  suffix: string;
  hex: string;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(spanRef, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  // Tuned spring: fast enough to feel snappy on small values (5→50)
  const spring = useSpring(0, { damping: 35, stiffness: 90, mass: 0.8 });

  // Trigger on scroll-into-view
  useEffect(() => {
    if (!isInView) return;
    // Reduced motion: jump straight to final value, no counting animation
    if (prefersReducedMotion) {
      if (spanRef.current) spanRef.current.textContent = `${value}${suffix}`;
      return;
    }
    spring.set(value);
  }, [isInView, spring, value, suffix, prefersReducedMotion]);

  // Direct DOM write — bypasses React reconciler entirely
  useEffect(() => {
    return spring.on("change", (v) => {
      if (spanRef.current) {
        spanRef.current.textContent = `${Math.floor(v)}${suffix}`;
      }
    });
  }, [spring, suffix]);

  return (
    <span
      ref={spanRef}
      className="tabular-nums"
      // Subtle glow matching the stat's accent color
      style={{ textShadow: `0 0 40px ${hex}60` }}
    >
      0{suffix}
    </span>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = memo(({ stat, index }: { stat: StatEntry; index: number }) => (
  <motion.div
    variants={cardVariants}
    className="relative flex flex-col items-center justify-center text-center group"
  >
    {/* Vertical divider between cards on md+ */}
    {index > 0 && (
      <span
        aria-hidden
        className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block h-12 w-px bg-foreground/8"
      />
    )}

    {/* Accent dot above the number */}
    <span
      aria-hidden
      className={`mb-3 inline-block h-1.5 w-8 rounded-full transition-all duration-500 group-hover:w-12`}
      style={{ backgroundColor: stat.hex }}
    />

    {/* Animated number */}
    <h3
      className={`${anton.className} text-5xl sm:text-6xl lg:text-7xl leading-none tracking-tight`}
      style={{ color: stat.hex }}
    >
      <Counter value={stat.value} suffix={stat.suffix} hex={stat.hex} />
    </h3>

    {/* Label */}
    <p
      className={`${playfair.className} mt-3 text-xs sm:text-sm font-semibold tracking-[0.2em] text-foreground/55 uppercase`}
    >
      {stat.label}
    </p>
  </motion.div>
));
StatCard.displayName = "StatCard";

// ─── Section ─────────────────────────────────────────────────────────────────
export default function Stats() {
  return (
    <section
      className="relative z-20 w-full py-10 sm:py-14"
      aria-label="Chapter statistics"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="
            glass-panel relative overflow-hidden
            grid grid-cols-2 gap-y-10 gap-x-4 sm:gap-8
            md:grid-cols-4
            rounded-2xl sm:rounded-3xl
            p-8 sm:p-10 md:p-12
            shadow-[0_8px_40px_rgba(0,0,0,0.06)]
            border border-foreground/6
          "
        >
          {/* Subtle radial glow at center of the panel */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(123,97,255,0.06) 0%, transparent 70%)",
            }}
          />

          {STATS_DATA.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
