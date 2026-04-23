"use client";

import { memo } from "react";
import { motion, Variants, useReducedMotion } from "framer-motion";
import {
  Globe,
  Linkedin,
  Instagram,
  Youtube,
  Twitter,
  ExternalLink,
  Play,
} from "lucide-react";
import CurvedLoop from "@/components/ui/CurvedLoop";
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
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 44 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface PartnerSocials {
  website?: string;
  youtube?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
}

interface PartnerCTA {
  text: string;
  link: string;
  // Raw Tailwind-safe bg class + hex accent for the glow
  bgClass: string;
  hex: string;
  icon: React.ReactNode;
}

interface Partner {
  name: string;
  description: string;
  logo: string;
  // Per-partner accent hex — drives glow, ring, and CTA button color
  accentHex: string;
  cta: PartnerCTA;
  socials: PartnerSocials;
}

// ─── Static data — module scope, icons are stable React elements ──────────────
const PARTNERS_DATA: Partner[] = [
  {
    name: "Next Techy Pixel",
    description:
      "A premier tech content creator hub focusing on AI, development tutorials, and project showcases for the next generation of builders.",
    logo: "/communityPartners/nextTechyPixel.webp",
    accentHex: "#FF0000",
    cta: {
      text: "Subscribe on YouTube",
      link: "https://www.youtube.com/@NextTechyPixel",
      bgClass: "bg-[#FF0000] hover:bg-[#cc0000]",
      hex: "#FF0000",
      icon: <Play className="h-3.5 w-3.5" aria-hidden />,
    },
    socials: {
      youtube: "https://www.youtube.com/@NextTechyPixel",
    },
  },
  {
    name: "React Kolkata",
    description:
      "A growing collective of React and JavaScript enthusiasts. We learn, build, and grow together through meetups, workshops, and open-source collaboration.",
    logo: "/communityPartners/ReactKolkata.webp",
    accentHex: "#61DAFB",
    cta: {
      text: "Upcoming Events",
      link: "https://reactkolkata.com/",
      bgClass: "bg-[#61DAFB] hover:bg-[#4fc8ea]",
      hex: "#61DAFB",
      icon: <ExternalLink className="h-3.5 w-3.5" aria-hidden />,
    },
    socials: {
      website: "https://reactkolkata.com/",
      youtube: "https://www.youtube.com/@ReactPlayIO/featured",
      linkedin: "https://www.linkedin.com/showcase/react-kolkata/",
      instagram: "https://www.instagram.com/reactkolkata/",
      twitter: "https://x.com/reactkolkata",
    },
  },
  {
    name: "Social Summer of Code",
    description:
      "A 3-month open-source program building an Open-Source First mindset through guided mentorship for contributors, mentors, and project admins.",
    logo: "/communityPartners/SSOC.webp",
    accentHex: "#22c55e",
    cta: {
      text: "Register for SSOC'26",
      link: "https://socialsummerofcode.com/?ref=md-nayaj-mondal",
      bgClass: "bg-[#22c55e] hover:bg-[#16a34a]",
      hex: "#22c55e",
      icon: <ExternalLink className="h-3.5 w-3.5" aria-hidden />,
    },
    socials: {
      website: "https://socialsummerofcode.com",
      linkedin: "https://www.linkedin.com/showcase/socialsummerofcode/",
      instagram: "https://www.instagram.com/socialsummerofcode/",
      twitter: "https://x.com/socialsummeroc",
    },
  },
];

// Social link config — kept module-scope to avoid recreation
const SOCIAL_CONFIG = [
  {
    key: "website" as const,
    Icon: Globe,
    label: "Website",
    hoverColor: "hover:text-acm-blue",
  },
  {
    key: "youtube" as const,
    Icon: Youtube,
    label: "YouTube",
    hoverColor: "hover:text-[#FF0000]",
  },
  {
    key: "linkedin" as const,
    Icon: Linkedin,
    label: "LinkedIn",
    hoverColor: "hover:text-[#0A66C2]",
  },
  {
    key: "instagram" as const,
    Icon: Instagram,
    label: "Instagram",
    hoverColor: "hover:text-[#E1306C]",
  },
  {
    key: "twitter" as const,
    Icon: Twitter,
    label: "X (Twitter)",
    hoverColor: "hover:text-foreground",
  },
];

// ─── Partner Card ─────────────────────────────────────────────────────────────
const PartnerCard = memo(({ partner }: { partner: Partner }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      variants={cardVariants}
      whileHover={
        prefersReducedMotion
          ? {}
          : {
              y: -6,
              transition: { type: "spring", stiffness: 320, damping: 22 },
            }
      }
      className="group glass-panel relative flex flex-col items-center rounded-[2rem] p-8 text-center overflow-hidden
                 border border-foreground/6
                 shadow-[0_4px_24px_rgba(0,0,0,0.05)]
                 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)]
                 transition-shadow duration-500"
    >
      {/* Per-partner radial accent glow — pure CSS, zero DOM cost */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${partner.accentHex}18 0%, transparent 70%)`,
        }}
      />

      {/* Logo */}
      <motion.div
        whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="mb-6 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full
                   border-2 border-foreground/8 bg-foreground/5 shadow-sm"
        // Accent ring on hover using box-shadow (avoids extra DOM node)
        style={{ ["--accent" as any]: partner.accentHex }}
      >
        <img
          src={partner.logo}
          alt={`${partner.name} logo`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          onError={(e) => {
            // `via.placeholder.com` is deprecated — use a data URI grey square
            (e.target as HTMLImageElement).src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect width='96' height='96' fill='%23e5e7eb'/%3E%3C/svg%3E";
          }}
        />
      </motion.div>

      {/* Name */}
      <h3
        className={`mb-3 text-2xl sm:text-3xl uppercase tracking-wider text-foreground leading-tight ${anton.className}`}
      >
        {partner.name}
      </h3>

      {/* Description — flex-grow pushes CTA + socials to the bottom */}
      <p
        className={`mb-6 text-base sm:text-lg leading-relaxed text-foreground/65 flex-grow ${playfair.className} italic`}
      >
        {partner.description}
      </p>

      {/* CTA button */}
      <a
        href={partner.cta.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${partner.cta.text} — ${partner.name}`}
        className={`
          mb-8 inline-flex items-center gap-2 rounded-full
          px-5 py-2.5 text-xs font-bold uppercase tracking-wider
          text-white shadow-md
          transition-all duration-200 hover:scale-105 active:scale-95
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
          ${partner.cta.bgClass}
        `}
        // CTA glow matches the button color
        style={{ boxShadow: `0 4px 20px ${partner.cta.hex}45` }}
      >
        {partner.cta.icon}
        {partner.cta.text}
      </a>

      {/* Social links */}
      <div className="mt-auto flex w-full items-center justify-center gap-4 border-t border-foreground/8 pt-5">
        {SOCIAL_CONFIG.map(({ key, Icon, label, hoverColor }) => {
          const href = partner.socials[key];
          if (!href) return null;
          return (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${partner.name} on ${label}`}
              className={`text-foreground/35 transition-colors duration-200 ${hoverColor}
                          focus-visible:outline-none focus-visible:text-foreground`}
            >
              <Icon className="h-5 w-5" aria-hidden />
            </a>
          );
        })}
      </div>
    </motion.article>
  );
});
PartnerCard.displayName = "PartnerCard";

// ─── Section ─────────────────────────────────────────────────────────────────
export default function CommunityPartners() {
  return (
    <section
      className="relative z-20 w-full py-24 md:py-32 overflow-hidden bg-background"
      aria-labelledby="partners-heading"
    >
      {/* Interactive background marquee */}
      <div
        className="absolute inset-0 z-0 flex items-center pointer-events-none"
        aria-hidden
      >
        <CurvedLoop
          marqueeText="COMMUNITY ✦ PARTNERS ✦ COLLABORATORS ✦"
          speed={1.5}
          curveAmount={300}
          interactive={false} // decorative — don't steal pointer events from cards
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* ── Header ──────────────────────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 md:mb-20 text-center"
        >
          <motion.span
            variants={fadeUp}
            className="mb-4 block text-[11px] font-bold tracking-[0.32em] uppercase text-foreground/30"
          >
            Our ecosystem
          </motion.span>

          <motion.h2
            variants={fadeUp}
            id="partners-heading"
            className={`text-5xl md:text-7xl uppercase tracking-wide text-foreground leading-tight ${anton.className}`}
          >
            Backed by the <br className="hidden sm:block" />
            <span className="bg-acm-pink bg-clip-text text-transparent">
              Best in Tech
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className={`mx-auto mt-6 max-w-xl text-lg md:text-xl text-foreground/60 ${playfair.className} italic`}
          >
            We collaborate with industry leaders, content creators, and
            open-source platforms to bring unparalleled opportunities to our
            chapter members.
          </motion.p>
        </motion.div>

        {/* ── Partner grid ────────────────────────────────────────────────────── */}
        {/* 1-col → 2-col sm → 3-col lg. Cards are full equal-height flex columns */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 xl:gap-8 items-stretch"
        >
          {PARTNERS_DATA.map((partner) => (
            <PartnerCard key={partner.name} partner={partner} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
