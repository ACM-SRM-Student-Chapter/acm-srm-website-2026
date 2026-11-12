"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Playfair_Display, Anton } from "next/font/google";
import {
  MapPin,
  User,
  CheckCircle,
  ArrowUpRight,
  Users,
} from "lucide-react";
import { TECH_GOSHIPS_EVENTS, type TechGoshipEvent } from "@/data/eventsData";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const anton = Anton({ subsets: ["latin"], weight: "400" });

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

function StatusBadge({ event }: { event: TechGoshipEvent }) {
  if (event.status === "upcoming") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-black/70 backdrop-blur-md border border-emerald-400/40 px-3 py-1.5">
        <span className="relative flex h-2 w-2" aria-hidden>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        <span className="font-mono text-[11px] font-bold tracking-widest text-emerald-400 uppercase">
          UPCOMING • {event.dateShort}
        </span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 px-3 py-1.5">
      <CheckCircle className="w-3.5 h-3.5 text-white/60" aria-hidden />
      <span className="font-mono text-[11px] font-bold tracking-widest text-white/60 uppercase">
        COMPLETED • {event.dateShort}
      </span>
    </span>
  );
}

function ExpandedPanelContent({ event }: { event: TechGoshipEvent }) {
  const credentials = event.speaker.credentials
    ? event.speaker.credentials.split(" | ")
    : [];

  return (
    <div className="flex flex-col justify-center p-6 lg:p-8 h-full overflow-y-auto">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <span className="font-mono text-xs text-acm-electric tracking-widest uppercase">
          {event.date} • {event.time} IST
        </span>
        <span className="font-mono text-xs font-bold text-white/40">
          #{event.seriesIndex}
        </span>
      </div>

      <h3
        className={`text-2xl xl:text-3xl text-white uppercase tracking-wide leading-tight mb-2 ${anton.className}`}
      >
        {event.topic}
      </h3>

      {event.topicSubtitle && (
        <p
          className={`text-base text-white/75 italic mb-4 ${playfair.className}`}
        >
          {event.topicSubtitle}
        </p>
      )}

      {event.status === "past" && (
        <p className="text-sm text-white/65 leading-relaxed mb-5">
          {event.description}
        </p>
      )}

      {/* Speaker Block */}
      <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3.5 mb-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-acm-electric/15 border border-acm-electric/30 flex items-center justify-center text-acm-electric shrink-0">
            <User className="w-4 h-4" aria-hidden />
          </div>
          <div className="min-w-0">
            <div className="text-white font-bold text-sm">
              {event.speaker.name}
            </div>
            <div className="text-white/55 text-xs leading-snug mt-0.5">
              {event.speaker.role}
            </div>
            {credentials.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {credentials.map((cred) => (
                  <span
                    key={cred}
                    className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 font-mono text-[10px] text-white/55"
                  >
                    {cred}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Exploration Pillars for Upcoming */}
      {event.explorationPillars && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {event.explorationPillars.map((pillar) => (
            <div
              key={pillar.index}
              className="rounded-lg bg-white/[0.03] border border-white/10 p-2.5"
            >
              <div className="font-mono text-[10px] text-acm-electric mb-0.5">
                {`// ${pillar.index}`}
              </div>
              <div className="text-xs font-medium text-white/85 leading-snug">
                {pillar.title}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Meta pills */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 font-mono text-[11px] text-white/65">
          <MapPin className="w-3.5 h-3.5 text-acm-pink" aria-hidden />
          {event.venue}
        </span>
        {event.eligibility && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 font-mono text-[11px] text-white/65">
            <Users className="w-3.5 h-3.5 text-acm-violet" aria-hidden />
            {event.eligibility}
          </span>
        )}
      </div>

      {/* Action / Status */}
      {event.status === "upcoming" ? (
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-acm-electric to-acm-violet px-6 py-3 text-xs sm:text-sm font-extrabold text-[#060010] uppercase tracking-wider hover:opacity-90 transition-opacity shadow-[0_0_24px_rgba(0,229,255,0.3)] w-fit"
          >
            REGISTER NOW
            <ArrowUpRight className="w-4 h-4" aria-hidden />
          </a>
          {event.tagline && (
            <span className="font-mono text-[11px] uppercase tracking-widest text-white/40">
              {event.tagline}
            </span>
          )}
        </div>
      ) : (
        <div className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white/45 w-fit">
          <CheckCircle className="w-4 h-4" aria-hidden />
          Registration Closed / Completed
        </div>
      )}
    </div>
  );
}

export default function TechGoshipsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
      className="relative z-10"
    >
      {/* Section Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-acm-electric block mb-2">
            {"// 02 — RECURRING TECHNICAL TALK SERIES"}
          </span>
          <h2
            className={`text-3xl sm:text-5xl text-white uppercase tracking-wide ${anton.className}`}
          >
            ACM Tech Goships:{" "}
            <span className="text-acm-electric">Unplugged</span>
          </h2>
        </div>
        <p
          className={`text-base sm:text-lg text-white/65 italic max-w-xl ${playfair.className}`}
        >
          Real conversations, practical learning, and sharing knowledge within
          our student community.
        </p>
      </div>

      {/* Desktop: Horizontal Kinetic Accordion (lg+) */}
      <div className="hidden lg:flex gap-4 h-[600px]">
        {TECH_GOSHIPS_EVENTS.map((event, index) => {
          const isExpanded = activeIndex === index;

          return (
            <motion.div
              key={event.id}
              layout={!prefersReducedMotion}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              role="button"
              tabIndex={0}
              aria-expanded={isExpanded}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveIndex(index);
                }
              }}
              className={`relative h-full rounded-3xl overflow-hidden border transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-acm-electric ${
                isExpanded
                  ? "flex-[4] border-white/15 bg-[#070114]/95 cursor-default shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                  : "flex-[0.85] border-white/10 bg-white/[0.03] hover:border-white/25 cursor-pointer"
              }`}
            >
              {isExpanded ? (
                <div className="grid grid-cols-12 h-full">
                  {/* Left Poster */}
                  <div className="col-span-5 relative h-full overflow-hidden bg-black">
                    <Image
                      src={event.poster}
                      alt={event.title}
                      fill
                      sizes="35vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25 pointer-events-none" />
                    <div className="absolute top-4 left-4 z-10">
                      <StatusBadge event={event} />
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className="col-span-7 h-full overflow-hidden">
                    <ExpandedPanelContent event={event} />
                  </div>
                </div>
              ) : (
                /* Collapsed Vertical Strip */
                <div className="relative h-full w-full flex flex-col items-center justify-between py-6">
                  <Image
                    src={event.poster}
                    alt=""
                    fill
                    sizes="15vw"
                    className="object-cover opacity-25 grayscale transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060010] via-[#060010]/75 to-[#060010]/60" />

                  <div className="relative z-10 font-mono text-2xl font-black text-white/45">
                    {event.seriesIndex}
                  </div>

                  <div className="relative z-10 flex-1 flex items-center justify-center">
                    <span className="-rotate-90 whitespace-nowrap font-mono text-xs uppercase tracking-[0.28em] text-white/55">
                      {event.title}
                    </span>
                  </div>

                  <div className="relative z-10 font-mono text-[10px] uppercase tracking-widest text-white/35">
                    {event.dateShort}
                  </div>
                </div>
              )}

              {/* Bottom Progress Bar Glow */}
              <div
                aria-hidden
                className={`absolute bottom-0 left-0 right-0 h-1 transition-opacity duration-300 ${
                  isExpanded
                    ? event.accentColor === "acm-electric"
                      ? "bg-gradient-to-r from-acm-electric to-acm-violet shadow-[0_0_16px_rgba(0,229,255,0.6)] opacity-100"
                      : "bg-gradient-to-r from-acm-violet to-acm-pink shadow-[0_0_16px_rgba(123,97,255,0.5)] opacity-100"
                    : "bg-white/10 opacity-40"
                }`}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Mobile / Tablet: Clean Vertical Stack (< lg) */}
      <div className="flex flex-col gap-6 lg:hidden">
        {TECH_GOSHIPS_EVENTS.map((event) => (
          <div
            key={event.id}
            className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#070114]/90"
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden bg-black">
              <Image
                src={event.poster}
                alt={event.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070114] via-transparent to-black/30" />
              <div className="absolute top-4 left-4 z-10">
                <StatusBadge event={event} />
              </div>
              <div className="absolute top-4 right-4 z-10 font-mono text-sm font-bold text-white/80 bg-black/60 backdrop-blur-md border border-white/15 rounded-full px-3 py-1">
                #{event.seriesIndex}
              </div>
            </div>

            <ExpandedPanelContent event={event} />

            <div
              aria-hidden
              className={`h-1 w-full ${
                event.accentColor === "acm-electric"
                  ? "bg-gradient-to-r from-acm-electric to-acm-violet"
                  : "bg-gradient-to-r from-acm-violet to-acm-pink"
              }`}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
