"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Playfair_Display, Anton } from "next/font/google";
import {
  Calendar,
  MapPin,
  Clock,
  Trophy,
  ExternalLink,
  Sparkles,
  Zap,
  Target,
  ShieldCheck,
  Cpu,
  Users,
  Award,
  CheckCircle2,
  Copy,
  Check,
  Layers,
} from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const anton = Anton({ subsets: ["latin"], weight: "400" });

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const WHATS_IN_STORE = [
  {
    icon: Clock,
    title: "8-Hour AI Sprint",
    description:
      "An intensive 8-hour AI building challenge pushing creativity and rapid implementation.",
    color: "text-acm-electric",
    border: "border-acm-electric/20",
    bg: "bg-acm-electric/5",
  },
  {
    icon: Target,
    title: "Surprise Problem Statement",
    description:
      "A curated problem statement revealed live on event day to test genuine problem-solving.",
    color: "text-acm-violet",
    border: "border-acm-violet/20",
    bg: "bg-acm-violet/5",
  },
  {
    icon: Cpu,
    title: "Hack2Skill AI Evaluation",
    description:
      "Instant, unbiased AI-powered initial evaluation through the Hack2Skill platform.",
    color: "text-acm-pink",
    border: "border-acm-pink/20",
    bg: "bg-acm-pink/5",
  },
  {
    icon: Users,
    title: "Showcase to Industry Panel",
    description:
      "Top 10 finalists present and pitch their working solutions live before industry experts.",
    color: "text-acm-blue",
    border: "border-acm-blue/20",
    bg: "bg-acm-blue/5",
  },
  {
    icon: ShieldCheck,
    title: "Comprehensive Rubric",
    description:
      "Evaluation based on code quality, security, efficiency, testing, accessibility & problem alignment.",
    color: "text-emerald-400",
    border: "border-emerald-400/20",
    bg: "bg-emerald-400/5",
  },
  {
    icon: Award,
    title: "Recognition & ₹50K Prizes",
    description:
      "Win up to ₹50,000 in prizes, exclusive certificates, and spotlight for top performers.",
    color: "text-amber-300",
    border: "border-amber-300/20",
    bg: "bg-amber-300/5",
  },
];

export default function PromptWarsSection() {
  const [copied, setCopied] = useState(false);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const registrationUrl = "https://hack2skill.com/event/promptwars-x-acmsrm";

  const handleCopyLink = useCallback(() => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(registrationUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }, [registrationUrl]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    spotlightRef.current?.style.setProperty(
      "--mx",
      `${e.clientX - rect.left}px`
    );
    spotlightRef.current?.style.setProperty(
      "--my",
      `${e.clientY - rect.top}px`
    );
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    spotlightRef.current?.style.setProperty("--mx", "-9999px");
    spotlightRef.current?.style.setProperty("--my", "-9999px");
  }, []);

  return (
    <section className="relative z-20 w-full py-10 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
        <div
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative rounded-[2.5rem] sm:rounded-[3rem] bg-[#070114] p-6 sm:p-10 md:p-16 border border-white/10 shadow-[0_30px_100px_rgba(0,229,255,0.18)] overflow-hidden"
        >
          {/* ── Background Glow & Grid ─────────────────────────────────────────── */}
          <div
            ref={spotlightRef}
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-500 z-0"
            style={
              {
                "--mx": "-9999px",
                "--my": "-9999px",
                maskImage:
                  "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.7) 120px, rgba(255,255,255,0.1) 320px, transparent 500px)",
                WebkitMaskImage:
                  "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.7) 120px, rgba(255,255,255,0.1) 320px, transparent 500px)",
              } as React.CSSProperties
            }
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-acm-electric/25 via-acm-violet/20 to-acm-pink/25 mix-blend-screen" />
          </div>

          {/* Static Ambient Orbs */}
          <div
            aria-hidden
            className="absolute -top-32 -left-32 w-96 h-96 bg-acm-electric/15 rounded-full blur-[120px] pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -right-32 w-96 h-96 bg-acm-violet/20 rounded-full blur-[140px] pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-acm-pink/10 rounded-full blur-[160px] pointer-events-none"
          />

          <div className="relative z-10 flex flex-col gap-12 md:gap-16">
            {/* ── Top Header Bar & Badges ──────────────────────────────────────── */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-8">
              {/* Collaboration Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2.5 rounded-full bg-white/5 border border-white/15 px-4 py-2 backdrop-blur-md">
                  <div className="flex items-center gap-1" aria-hidden>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold tracking-wide text-white/90">
                    In collaboration with{" "}
                    <strong className="text-white font-bold">Google for Developers</strong>
                  </span>
                </div>

                <div className="hidden sm:inline-flex items-center gap-2 rounded-full bg-acm-violet/15 border border-acm-violet/30 px-3.5 py-1.5 text-xs font-bold text-acm-violet">
                  <Sparkles className="w-3.5 h-3.5" />
                  ACM SRM STUDENT CHAPTER
                </div>
              </div>

              {/* Live Status Pill */}
              <div className="inline-flex items-center gap-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 text-xs sm:text-sm font-bold text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                UPCOMING • REGISTRATIONS OPEN
              </div>
            </div>

            {/* ── Main Hero Split: Left Info + Right Poster ────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Title, Narrative, Prizes & Quick Meta (7 cols) */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold tracking-widest text-acm-electric uppercase mb-3">
                  <Zap className="w-4 h-4 text-acm-electric" />
                  Build. Prompt. Innovate. Compete.
                </div>

                <h2
                  className={`text-4xl sm:text-6xl md:text-7xl font-normal uppercase tracking-tight text-white mb-6 drop-shadow-[0_0_25px_rgba(0,229,255,0.4)] ${anton.className}`}
                >
                   PROMPT WARS
                  
                </h2>

                <p
                  className={`text-lg sm:text-xl text-white/90 leading-relaxed italic mb-4 ${playfair.className}`}
                >
                  What happens when creativity meets AI, and ideas turn into
                  working solutions? It’s time to find out!
                </p>

                <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8">
                  The <strong className="text-white">ACM Student Chapter, SRMIST</strong>, in
                  collaboration with <strong className="text-white">Google for Developers</strong>,
                  presents <span className="text-acm-electric font-semibold">Prompt Wars</span>—an
                  intensive 8-hour AI Building Challenge where participants transform ideas into
                  practical solutions through AI-assisted building and prompt engineering.
                </p>

                {/* Prize Highlight Box */}
                <div className="relative rounded-2xl bg-gradient-to-r from-amber-500/15 via-acm-violet/15 to-acm-electric/15 border border-amber-400/30 p-5 sm:p-6 mb-8 overflow-hidden backdrop-blur-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 shrink-0">
                        <Trophy className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="text-xs uppercase font-bold tracking-widest text-amber-300">
                          Prize Pool
                        </div>
                        <div
                          className={`text-2xl sm:text-3xl text-white font-bold tracking-wide ${anton.className}`}
                        >
                          Win Up To ₹50,000!
                        </div>
                        <p className="text-xs text-white/60 mt-0.5">
                          *Final prize pool scales based on the total number of submissions.
                        </p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 self-start sm:self-center px-3 py-1.5 rounded-lg bg-white/10 text-xs font-semibold text-white/80 border border-white/10">
                      <Layers className="w-3.5 h-3.5 text-acm-electric" />
                      Solo Participation
                    </div>
                  </div>
                </div>

                {/* Key Event Metadata Tiles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <Calendar className="w-5 h-5 text-acm-electric shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-white/50 uppercase font-semibold">
                        Event Date
                      </div>
                      <div className="text-sm font-bold text-white">
                        Tuesday, 27 October 2026
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <Clock className="w-5 h-5 text-acm-pink shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-white/50 uppercase font-semibold">
                        Registration Deadline
                      </div>
                      <div className="text-sm font-bold text-acm-pink">
                        26 October 2026 (Closing Soon)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm sm:col-span-2">
                    <MapPin className="w-5 h-5 text-acm-violet shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-white/50 uppercase font-semibold">
                        Venue
                      </div>
                      <div className="text-sm font-bold text-white">
                        TP-2 (Room 712) & GD Naidu Hall (Main Campus), SRMIST, Kattankulathur
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <a
                    href={registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-acm-electric via-acm-violet to-acm-pink p-[2px] font-bold text-white shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:shadow-[0_0_45px_rgba(0,229,255,0.7)] transition-all duration-300 hover:scale-[1.02]"
                  >
                    <span className="flex w-full items-center justify-center gap-2.5 rounded-[14px] bg-[#0c051e] px-8 py-4 transition-colors group-hover:bg-transparent text-white font-extrabold uppercase tracking-wider text-sm sm:text-base">
                      Register Now on Hack2Skill
                      <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </a>

                  <button
                    onClick={handleCopyLink}
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 px-6 py-4 text-sm font-bold text-white transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-white/70" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column: 3D Interactive Poster (5 cols) */}
              <div
                className="lg:col-span-5 flex flex-col items-center justify-center"
                style={{ perspective: "1200px" }}
              >
                <motion.div
                  animate={
                    prefersReducedMotion
                      ? {}
                      : isHovered
                        ? { rotateY: 0, rotateX: 0, scale: 1.03 }
                        : { rotateY: -8, rotateX: 4, scale: 1 }
                  }
                  transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                  className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[2/3] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] border-4 border-white/15 bg-black group/poster"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Image
                    src="/events/PromptWar.jpeg"
                    alt="Prompt Wars Official Poster"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover transition-transform duration-700 ease-out group-hover/poster:scale-105"
                  />

                  {/* Gloss Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-white/10 pointer-events-none" />

                  {/* Floating Badges on Poster */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] font-bold text-acm-electric border border-white/15">
                      Hack2Skill AI
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-white/15">
                      ₹50,000 Pool
                    </span>
                  </div>

                  <a
                    href={registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 left-4 right-4 z-10 py-3 px-4 rounded-xl bg-white/90 hover:bg-white text-black font-extrabold text-xs uppercase tracking-wider text-center shadow-lg transition-transform group-hover/poster:translate-y-0 translate-y-1 flex items-center justify-center gap-1.5 backdrop-blur-md"
                  >
                    Open Registration Page
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </motion.div>
                <p className="text-xs text-white/40 mt-4 text-center">
                  Official Event Poster • ACM SRMIST × Google for Developers
                </p>
              </div>
            </div>

            {/* ── What's In Store Grid ─────────────────────────────────────────── */}
            <div className="pt-6 border-t border-white/10">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-acm-pink mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Event Highlights
                </div>
                <h3
                  className={`text-3xl sm:text-4xl text-white uppercase tracking-wide ${anton.className}`}
                >
                  What’s In Store?
                </h3>
                <p
                  className={`text-sm sm:text-base text-white/70 italic mt-2 ${playfair.className}`}
                >
                  Everything you need to know about the 8-hour sprint.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {WHATS_IN_STORE.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className={`relative rounded-2xl p-6 ${item.bg} border ${item.border} backdrop-blur-md hover:bg-white/10 transition-all duration-300 flex flex-col justify-between`}
                    >
                      <div>
                        <div className="p-3 rounded-xl bg-white/5 w-fit mb-4">
                          <Icon className={`w-6 h-6 ${item.color}`} />
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">
                          {item.title}
                        </h4>
                        <p className="text-sm text-white/70 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── The Challenge Process (3 Steps) ─────────────────────────────── */}
            <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 sm:p-10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-acm-electric mb-1">
                    <Zap className="w-3.5 h-3.5" />
                    How It Works
                  </div>
                  <h3
                    className={`text-2xl sm:text-3xl text-white uppercase tracking-wide ${anton.className}`}
                  >
                    The Challenge Journey
                  </h3>
                </div>
                <div className="text-xs text-white/50 max-w-sm">
                  Solo event • 1 participant per registration. Receive AI-guided
                  benchmarks and compete for a spot in the offline finale.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                {/* Step 1 */}
                <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-acm-electric">
                      01
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-white/50 bg-white/5 px-2.5 py-1 rounded-full">
                      Sprint
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    Build & Prompt
                  </h4>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Receive the live problem statement on event day. Utilize AI-assisted
                    building and prompt craft to construct your end-to-end working solution
                    in 8 hours.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-acm-violet">
                      02
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-white/50 bg-white/5 px-2.5 py-1 rounded-full">
                      AI Evaluation
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    Hack2Skill Automated Check
                  </h4>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Submit code to Hack2Skill for automated, AI-driven assessment judging
                    code quality, security, efficiency, test coverage, and accessibility.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-amber-300">
                      03
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-white/50 bg-white/5 px-2.5 py-1 rounded-full">
                      Grand Finale
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    Top 10 Offline Showcase
                  </h4>
                  <p className="text-sm text-white/70 leading-relaxed">
                    The top 10 finalists qualify for offline pitch presentations before
                    an esteemed industry panel at TP-2 & GD Naidu Hall for up to ₹50,000!
                  </p>
                </div>
              </div>
            </div>

            {/* ── Closing Callout & Bottom CTA ───────────────────────────────── */}
            <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
              <p
                className={`text-lg sm:text-xl text-white/90 italic mb-3 ${playfair.className}`}
              >
                “Whether you’re passionate about AI, curious about vibe coding, or
                eager to turn your ideas into real-world applications, Prompt Wars
                is your opportunity to build, experiment, and compete.”
              </p>
              <div
                className={`text-xl sm:text-2xl text-acm-electric uppercase tracking-wider mb-8 ${anton.className}`}
              >
                Imagine it. Build it. Compete. Make an impact.
              </div>

              <a
                href={registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-white hover:bg-white/90 text-black font-extrabold px-10 py-4 text-base uppercase tracking-wider shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Claim Your Spot on Hack2Skill
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>

              <p className="text-xs text-white/50 mt-6 tracking-wide">
                Organised by{" "}
                <span className="text-white font-semibold">
                  ACM Student Chapter, SRMIST
                </span>{" "}
                • In collaboration with{" "}
                <span className="text-white font-semibold">
                  Google for Developers
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
