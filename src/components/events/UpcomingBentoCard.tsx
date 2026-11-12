"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Playfair_Display, Anton } from "next/font/google";
import {
  MapPin,
  Users,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  User,
  Calendar,
} from "lucide-react";
import { TECH_GOSHIPS_EVENTS, type FilterTabId } from "@/data/eventsData";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const anton = Anton({ subsets: ["latin"], weight: "400" });

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

interface UpcomingBentoCardProps {
  onNavigate?: (tab: FilterTabId) => void;
}

export default function UpcomingBentoCard({
  onNavigate,
}: UpcomingBentoCardProps) {
  const [isPosterHovered, setIsPosterHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const event = TECH_GOSHIPS_EVENTS.find((e) => e.status === "upcoming");
  if (!event) return null;

  const credentials = event.speaker.credentials
    ? event.speaker.credentials.split(" | ")
    : [];

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
      className="relative z-10"
    >
      {/* Split-Pane Bento Hero Card */}
      <div className="relative rounded-3xl bg-[#070114]/90 border border-white/10 overflow-hidden shadow-[0_25px_80px_rgba(0,229,255,0.12)]">
        {/* Subtle ambient corner glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-acm-electric/15 blur-[100px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-acm-violet/15 blur-[100px]"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 p-5 sm:p-8 lg:p-10 items-center">
          {/* Left Pane: Vertical Poster with 3D Hover Tilt */}
          <div
            className="lg:col-span-5 flex flex-col items-center justify-center"
            style={{ perspective: "1200px" }}
            onMouseEnter={() => setIsPosterHovered(true)}
            onMouseLeave={() => setIsPosterHovered(false)}
          >
            <motion.div
              animate={
                prefersReducedMotion
                  ? {}
                  : isPosterHovered
                    ? { rotateY: 0, rotateX: 0, scale: 1.02 }
                    : { rotateY: 6, rotateX: 3, scale: 1 }
              }
              transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative w-full max-w-[400px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/15 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.75)]"
            >
              <Image
                src={event.poster}
                alt={event.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

              {/* Top-left floating status pill */}
              <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-black/70 backdrop-blur-md border border-emerald-400/40 px-3.5 py-1.5">
                <span className="relative flex h-2 w-2" aria-hidden>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="font-mono text-[11px] font-bold tracking-widest text-emerald-400 uppercase">
                  {event.statusBadge}
                </span>
              </div>

              {/* Bottom series tag */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] uppercase tracking-widest text-white/80 bg-black/65 backdrop-blur-md border border-white/15 rounded-full px-3 py-1">
                  {event.title}
                </span>
                <span className="font-mono text-[11px] font-bold text-acm-electric bg-black/65 backdrop-blur-md border border-acm-electric/30 rounded-full px-2.5 py-1">
                  #{event.seriesIndex}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Pane: Event Details, Speaker, 2x2 Pillars, Venue & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Monospace Date/Time Overline */}
            <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-acm-electric uppercase tracking-widest mb-3">
              <Calendar className="w-4 h-4 shrink-0" aria-hidden />
              <span>
                {event.dateShort} • {event.time} IST
              </span>
            </div>

            {/* Anton Uppercase Topic Title */}
            <h2
              className={`text-3xl sm:text-4xl xl:text-5xl text-white uppercase tracking-wide leading-[1.08] mb-3 ${anton.className}`}
            >
              {event.topic}
            </h2>

            {/* Playfair Display Italic Subtitle */}
            {event.topicSubtitle && (
              <p
                className={`text-lg sm:text-xl text-white/75 italic mb-6 ${playfair.className}`}
              >
                {event.topicSubtitle}
              </p>
            )}

            {/* Speaker & Credential Block */}
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 sm:p-5 mb-6">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-acm-electric/25 to-acm-violet/25 border border-acm-electric/30 flex items-center justify-center text-acm-electric shrink-0">
                  <User className="w-5 h-5" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-acm-electric">
                      Featured Speaker
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-lg leading-snug mt-0.5">
                    {event.speaker.name}
                  </h3>
                  <p className="text-white/65 text-xs sm:text-sm mt-0.5">
                    {event.speaker.role}
                  </p>
                  {credentials.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {credentials.map((cred) => (
                        <span
                          key={cred}
                          className="rounded-full bg-white/5 border border-white/10 px-3 py-1 font-mono text-[11px] text-white/65"
                        >
                          {cred}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 2x2 Interactive Exploration Pillars Mini-Bento Grid */}
            {event.explorationPillars && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {event.explorationPillars.map((pillar) => (
                  <div
                    key={pillar.index}
                    className="group rounded-xl bg-white/[0.03] border border-white/10 p-3.5 hover:bg-white/[0.07] hover:border-acm-electric/35 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[11px] font-bold text-acm-electric">
                        {`// ${pillar.index}`}
                      </span>
                      <Sparkles
                        className="w-3.5 h-3.5 text-white/25 group-hover:text-acm-electric transition-colors"
                        aria-hidden
                      />
                    </div>
                    <h4 className="text-sm font-semibold text-white leading-snug">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-white/50 mt-1 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Venue & Eligibility Pills */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5 font-mono text-xs text-white/75">
                <MapPin className="w-3.5 h-3.5 text-acm-pink" aria-hidden />
                {event.venue}
              </span>
              {event.eligibility && (
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5 font-mono text-xs text-white/75">
                  <Users className="w-3.5 h-3.5 text-acm-violet" aria-hidden />
                  {event.eligibility}
                </span>
              )}
            </div>

            {/* Closing Callout & Tagline */}
            {event.closingCallout && (
              <p
                className={`text-sm text-white/60 italic leading-relaxed border-l-2 border-acm-electric/40 pl-4 mb-6 ${playfair.className}`}
              >
                “{event.closingCallout}”
              </p>
            )}

            {/* CTA & Tagline Row */}
            <div className="flex flex-wrap items-center gap-5">
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-acm-electric to-acm-violet px-7 py-3.5 text-sm font-extrabold text-[#060010] uppercase tracking-wider hover:opacity-90 transition-all shadow-[0_0_28px_rgba(0,229,255,0.3)] hover:shadow-[0_0_38px_rgba(0,229,255,0.5)]"
              >
                REGISTER NOW
                <ArrowUpRight className="w-4 h-4" aria-hidden />
              </a>

              {event.tagline && (
                <span className="font-mono text-xs uppercase tracking-widest text-white/45">
                  {event.tagline}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Quick-Navigation Banner */}
      {onNavigate && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-4 backdrop-blur-sm">
          <span className="font-mono text-xs uppercase tracking-wider text-white/50">
            Looking for earlier sessions or completed chapter events?
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate("goships")}
              className="inline-flex items-center gap-1.5 rounded-full bg-acm-electric/10 border border-acm-electric/30 px-4 py-1.5 font-mono text-xs text-acm-electric hover:bg-acm-electric/20 transition-colors"
            >
              Tech Goships Series (02)
              <ArrowRight className="w-3.5 h-3.5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => onNavigate("past")}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 font-mono text-xs text-white/75 hover:bg-white/10 hover:text-white transition-colors"
            >
              Explore 04 Past Events
              <ArrowRight className="w-3.5 h-3.5" aria-hidden />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
