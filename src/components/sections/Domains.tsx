"use client";

import { memo } from "react";
import { motion, Variants, useReducedMotion } from "framer-motion";
import {
  Cpu,
  Megaphone,
  Handshake,
  Palette,
  CalendarDays,
  MousePointer2,
} from "lucide-react";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { Playfair_Display, Anton } from "next/font/google";

// ─── Fonts ────────────────────────────────────────────────────────────────────
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const anton = Anton({ subsets: ["latin"], weight: "400" });

// ─── Animation constants ──────────────────────────────────────────────────────
const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface DomainEntry {
  id: number;
  index: string; // "01" … "05"
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string; // Tailwind text-* class
  accentBg: string; // Tailwind bg-* class
  accentBorder: string; // Tailwind border-* class
  accentHex: string; // raw hex for backgroundImage gradients
}

// ─── Static data — hoisted to module scope ────────────────────────────────────
// Icons are stable React elements; keeping them here means zero re-allocation
// on every render cycle.
const DOMAINS_DATA: DomainEntry[] = [
  {
    id: 1,
    index: "01",
    title: "FOUNDRY",
    subtitle: "Technical",
    description:
      "3 divisions: Competitive Program, Web Dev + Cloud & DevOps, AI/ML + MLOps.",
    icon: <Cpu className="h-9 w-9 text-acm-electric" aria-hidden />,
    accentColor: "text-acm-electric",
    accentBg: "bg-acm-electric/10",
    accentBorder: "border-acm-electric/25",
    accentHex: "#00E5FF",
  },
  {
    id: 2,
    index: "02",
    title: "AMPLIFIER",
    subtitle: "PR & Outreach",
    description: "The voice of ACM—managing PR, outreach, and visibility.",
    icon: <Megaphone className="h-9 w-9 text-acm-violet" aria-hidden />,
    accentColor: "text-acm-violet",
    accentBg: "bg-acm-violet/10",
    accentBorder: "border-acm-violet/25",
    accentHex: "#7B61FF",
  },
  {
    id: 3,
    index: "03",
    title: "ELEVATORS",
    subtitle: "Sponsorship & Finance",
    description:
      "Driving growth through partnerships, funding, and industry relations.",
    icon: <Handshake className="h-9 w-9 text-acm-blue" aria-hidden />,
    accentColor: "text-acm-blue",
    accentBg: "bg-acm-blue/10",
    accentBorder: "border-acm-blue/25",
    accentHex: "#005BB5",
  },
  {
    id: 4,
    index: "04",
    title: "CANVAS",
    subtitle: "Social Media, Photograpy, Videography & Creatives",
    description:
      "Crafting the chapter’s visual identity through design and media.",
    icon: <Palette className="h-9 w-9 text-acm-pink" aria-hidden />,
    accentColor: "text-acm-pink",
    accentBg: "bg-acm-pink/10",
    accentBorder: "border-acm-pink/25",
    accentHex: "#FF4081",
  },
  {
    id: 5,
    index: "05",
    title: "ORCHESTRATORS",
    subtitle: "Events & Corporate",
    description:
      "Planning and executing large-scale tech events and hackathons.",
    icon: <CalendarDays className="h-9 w-9 text-acm-green" aria-hidden />,
    accentColor: "text-acm-green",
    accentBg: "bg-acm-green/10",
    accentBorder: "border-acm-green/25",
    accentHex: "#00E676",
  },
];

// ─── Domain Card ──────────────────────────────────────────────────────────────
// Extracted and memoised — only re-renders if its own data changes (which
// it never does, since the data is module-level constant).
const DomainCard = memo(({ domain }: { domain: DomainEntry }) => (
  <div className="flex h-full flex-col justify-between p-6 sm:p-8 md:p-10 relative overflow-hidden">
    {/* Per-domain radial color wash — pure CSS, no extra DOM node */}
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(ellipse 55% 45% at 95% 5%, ${domain.accentHex}10 0%, transparent 70%)`,
      }}
    />

    {/* Top row: index + title + subtitle / icon */}
    <div className="relative flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        {/* Index eyebrow */}
        <span
          className={`text-[11px] font-bold tracking-[0.3em] uppercase ${domain.accentColor} mb-3 block`}
        >
          {domain.index} — {domain.subtitle}
        </span>

        <h3
          className={`text-3xl sm:text-5xl md:text-6xl text-[#111315] uppercase tracking-wide leading-none ${anton.className}`}
        >
          {domain.title}
        </h3>
      </div>

      {/* Icon tile */}
      <div
        className={`shrink-0 flex h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 items-center justify-center rounded-2xl border ${domain.accentBg} ${domain.accentBorder} shadow-sm`}
      >
        {domain.icon}
      </div>
    </div>

    {/* Description */}
    <div className="relative mt-8 sm:mt-10">
      {/* Accent rule */}
      <div
        className={`h-px w-12 ${domain.accentBg.replace("/10", "")} mb-6 rounded-full`}
        style={{ backgroundColor: domain.accentHex }}
        aria-hidden
      />
      <p
        className={`text-xs sm:text-lg md:text-lg text-black/70 leading-relaxed whitespace-pre-line ${playfair.className}`}
      >
        {domain.description}
      </p>
    </div>

    {/* Bottom-right ghost number */}
    <span
      aria-hidden
      className={`absolute -bottom-4 -right-2 text-[7rem] sm:text-[9rem] font-black leading-none select-none pointer-events-none opacity-[0.04] ${anton.className}`}
      style={{ color: domain.accentHex }}
    >
      {domain.index}
    </span>
  </div>
));
DomainCard.displayName = "DomainCard";

// ─── Animated scroll hint ─────────────────────────────────────────────────────
const ScrollHint = memo(() => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white to-transparent pointer-events-none z-10 flex items-end justify-center pb-5">
      <motion.div
        className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-black/35"
        animate={prefersReducedMotion ? {} : { y: [0, 4, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <MousePointer2 className="h-3.5 w-3.5" aria-hidden />
        Scroll inside to explore
      </motion.div>
    </div>
  );
});
ScrollHint.displayName = "ScrollHint";

// ─── Section ─────────────────────────────────────────────────────────────────
export default function Domains() {
  return (
    <section
      className="relative z-20 w-full py-24 md:py-32 overflow-hidden bg-white"
      aria-labelledby="domains-heading"
    >
      {/* Grid background */}
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

      {/* Ambient glows — consistent with rest of site */}
      <div
        aria-hidden
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-acm-violet/[0.07] rounded-full blur-[120px] pointer-events-none z-0"
      />
      <div
        aria-hidden
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-acm-electric/[0.05] rounded-full blur-[120px] pointer-events-none z-0"
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* ── Section Header ────────────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <motion.span
            variants={fadeUp}
            className="mb-4 text-[11px] font-bold tracking-[0.32em] uppercase text-black/30"
          >
            What we do
          </motion.span>

          <motion.h2
            variants={fadeUp}
            id="domains-heading"
            className={`text-5xl md:text-7xl tracking-wide text-[#111315] uppercase leading-tight ${anton.className}`}
          >
            Together, we excel in <br className="hidden sm:block" />
            <span className="bg-acm-violet bg-clip-text text-transparent">
              Our Domains
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className={`mt-6 max-w-xl text-black/60 text-lg md:text-xl ${playfair.className} italic`}
          >
            Five specialised divisions working in perfect sync to create the
            ultimate computing experience.
          </motion.p>
        </motion.div>

        {/* ── ScrollStack container ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          // Responsive height: taller on desktop, comfortable on mobile
          className="relative mx-auto w-full max-w-5xl h-[520px] sm:h-[580px] md:h-[620px] overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-black/8 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.07)]"
        >
          <ScrollHint />

          <ScrollStack
            itemDistance={60}
            itemScale={0.04}
            itemStackDistance={35}
            baseScale={0.85}
            blurAmount={5}
          >
            {DOMAINS_DATA.map((domain) => (
              <ScrollStackItem
                key={domain.id}
                itemClassName="bg-white border border-black/5 shadow-lg"
              >
                <DomainCard domain={domain} />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </motion.div>

        {/* ── Domain legend strip ───────────────────────────────────────────── */}
        {/* Visible summary row below the stack so users know what's inside
            before they start scrolling */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.2 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
          aria-label="Domain list"
        >
          {DOMAINS_DATA.map((domain) => (
            <div
              key={domain.id}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider border ${domain.accentBg} ${domain.accentBorder} ${domain.accentColor}`}
            >
              {domain.icon && (
                // Render a small icon clone for the badge
                <span className="scale-75 -ml-1 inline-flex">
                  {domain.icon}
                </span>
              )}
              {domain.title}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
