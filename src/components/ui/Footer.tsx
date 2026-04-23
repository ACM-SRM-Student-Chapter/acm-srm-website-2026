"use client";

import { useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Instagram,
  Linkedin,
  Github,
  Twitter,
  ArrowUpRight,
  MapPin,
  Mail,
  Phone,
  Youtube,
  ArrowUp,
} from "lucide-react";
import { motion, Variants, useReducedMotion } from "framer-motion";
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
};

// ─── Module-scope constants — computed once, never recreated ─────────────────
const CURRENT_YEAR = new Date().getFullYear();

const SOCIAL_LINKS = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/srm.acm/",
    name: "Instagram",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/srmist-acm-student-chapter/posts/?feedView=all",
    name: "LinkedIn",
  },
  {
    icon: Github,
    href: "https://github.com/ACM-SRM-Student-Chapter",
    name: "GitHub",
  },
  { icon: Twitter, href: "https://x.com/acmsrm?s=21", name: "X (Twitter)" },
  {
    icon: Youtube,
    href: "https://www.youtube.com/channel/UC3BtTD_QuSV4EdFZPr782XA",
    name: "YouTube",
  },
];

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Teams", path: "/teams" },
  { name: "Events", path: "/events" },
  { name: "Gallery", path: "/gallery" },
  { name: "Projects", path: "/projects" },
  { name: "Blogs", path: "/blog" },
  {
    name: "Meet the Developer",
    path: "https://www.linkedin.com/in/md-nayaj-mondal/",
    external: true,
  },
];

// External URLs — intentionally NOT using Next.js <Link>
const OPPORTUNITY_LINKS = [
  {
    name: "Take ACM Student Membership",
    desc: "Join the global network",
    href: "https://services.acm.org/public/qj/proflevel/proflevel_control.cfm?level=3&country=India&form_type=Student&promo=ACMMSDEPT&pay=DD",
  },
  {
    name: "ACM Digital Library",
    desc: "Access research and academic materials",
    href: "https://dl.acm.org",
  },
  {
    name: "ACM Learning Center",
    desc: "Access learning materials & technical guides",
    href: "https://learning.acm.org",
  },
  {
    name: "ACM Events",
    desc: "Discover upcoming workshops and meetups",
    href: "https://event.india.acm.org",
  },
  {
    name: "Research",
    desc: "Explore cutting-edge tech research",
    href: "https://india.acm.org/research",
  },
];

const LOGOS = [
  { src: "/acm-logo.webp", alt: "ACM Logo" },
  { src: "/acm_logo_tablet.webp", alt: "ACM Tablet Logo" },
  { src: "/srm-logo.webp", alt: "SRM Logo" },
  { src: "/ctech-logo.webp", alt: "CTech Logo" },
];

// ─── Memoised Social Icon Button ──────────────────────────────────────────────
// Extracted so the row never re-renders unless the data changes (it never does)
const SocialButton = memo(
  ({
    href,
    name,
    Icon,
  }: {
    href: string;
    name: string;
    Icon: React.ElementType;
  }) => {
    const prefersReducedMotion = useReducedMotion();
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Follow us on ${name}`}
        whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.1 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.93 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="
        group flex h-11 w-11 items-center justify-center rounded-full
        bg-white text-foreground
        border border-foreground/8
        shadow-[0_4px_12px_rgba(0,0,0,0.06)]
        transition-colors duration-300
        hover:bg-gradient-to-br hover:from-acm-blue hover:to-acm-violet
        hover:text-white hover:border-transparent
        hover:shadow-[0_8px_20px_rgba(123,97,255,0.28)]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acm-violet/50
      "
      >
        <Icon className="h-4 w-4" aria-hidden />
      </motion.a>
    );
  },
);
SocialButton.displayName = "SocialButton";

// ─── Memoised Nav Link ────────────────────────────────────────────────────────
const NavLink = memo(
  ({
    name,
    path,
    external,
  }: {
    name: string;
    path: string;
    external?: boolean;
  }) => {
    const commonClass =
      "group flex w-fit items-center text-xs font-bold uppercase tracking-widest text-foreground/55 transition-colors hover:text-acm-blue focus-visible:outline-none focus-visible:text-acm-blue";

    const content = (
      <span className="relative pb-0.5">
        {name}
        <span
          className="absolute bottom-0 left-0 h-[2px] w-0 bg-acm-blue transition-all duration-300 group-hover:w-full"
          aria-hidden
        />
      </span>
    );

    return external ? (
      <a
        href={path}
        target="_blank"
        rel="noopener noreferrer"
        className={commonClass}
      >
        {content}
      </a>
    ) : (
      <Link href={path} className={commonClass}>
        {content}
      </Link>
    );
  },
);
NavLink.displayName = "NavLink";

// ─── Memoised Opportunity Link ────────────────────────────────────────────────
const OpportunityLink = memo(
  ({ name, desc, href }: { name: string; desc: string; href: string }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col space-y-0.5 text-left focus-visible:outline-none"
    >
      <span className="flex items-center text-xs font-bold uppercase tracking-wider text-foreground/75 transition-colors group-hover:text-acm-violet">
        {name}
        <ArrowUpRight
          className="ml-1 h-3 w-3 opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
          aria-hidden
        />
      </span>
      <span
        className={`text-xs text-foreground/50 transition-colors group-hover:text-foreground/70 ${playfair.className} italic`}
      >
        {desc}
      </span>
    </a>
  ),
);
OpportunityLink.displayName = "OpportunityLink";

// ─── Footer ───────────────────────────────────────────────────────────────────
export default function Footer() {
  const prefersReducedMotion = useReducedMotion();

  // Stable — no new function on every render
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "instant" : "smooth",
    });
  }, [prefersReducedMotion]);

  return (
    <footer
      className={`relative z-20 mt-20 w-full overflow-hidden border-t border-foreground/10 bg-background/40 backdrop-blur-xl ${inter.className}`}
      aria-label="Site footer"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="container relative z-10 mx-auto px-4 sm:px-6 py-16 md:py-20 max-w-7xl"
      >
        {/* ── Main grid ──────────────────────────────────────────────────────── */}
        {/* 1-col → 2-col sm → 4-col lg, consistent with the rest of the site */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 xl:gap-14">
          {/* Col 1: Brand + Contact ─────────────────────────────────────────── */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-8 lg:pr-2"
          >
            {/* Logo strip — consistent sizing via a shared h-9 class */}
            <div className="flex flex-auto items-center gap-5 sm:gap-0 rounded-2xl bg-white/60 p-3 sm:p-3 backdrop-blur-sm w-full shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-foreground/5">
              {LOGOS.map((logo, i) => (
                <span
                  key={logo.src}
                  className="flex items-center gap-2 sm:gap-2"
                >
                  {i > 0 && (
                    <span
                      className="h-6 sm:h-6 w-px bg-foreground/10"
                      aria-hidden
                    />
                  )}
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={100}
                    height={100}
                    className="h-9 w-auto sm:h-9 md:h-9 object-contain transition-transform hover:scale-110"
                  />
                </span>
              ))}
            </div>

            {/* Contact details */}
            <address
              className={`not-italic flex flex-col space-y-4 text-sm font-medium text-foreground/75 ${playfair.className} italic`}
            >
              <div className="flex items-start gap-3 group">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-acm-blue transition-colors group-hover:text-acm-electric"
                  aria-hidden
                />
                <p className="leading-relaxed">
                  SRM Institute of Science and Technology
                  <br />
                  Kattankulathur, Tamil Nadu
                  <br />
                  India – 603203
                </p>
              </div>
              <div className="flex items-center gap-3 group">
                <Mail
                  className="h-4 w-4 shrink-0 text-acm-violet transition-colors group-hover:text-acm-pink"
                  aria-hidden
                />
                <a
                  href="mailto:acmsrmktr@gmail.com"
                  className="transition-colors hover:text-acm-electric focus-visible:outline-none focus-visible:text-acm-electric"
                >
                  acmsrmktr@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <Phone
                  className="h-4 w-4 shrink-0 text-acm-green transition-colors group-hover:text-acm-electric"
                  aria-hidden
                />
                <a
                  href="tel:+919513731600"
                  className="transition-colors hover:text-acm-electric focus-visible:outline-none"
                >
                  +91 95137 31600
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <Phone
                  className="h-4 w-4 shrink-0 text-acm-green transition-colors group-hover:text-acm-electric"
                  aria-hidden
                />
                <a
                  href="tel:+918797760111"
                  className="transition-colors hover:text-acm-electric focus-visible:outline-none"
                >
                  +91 87977 60111
                </a>
              </div>
            </address>
          </motion.div>

          {/* Col 2: Navigation ──────────────────────────────────────────────── */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-6"
          >
            <h4
              className={`text-xl tracking-wider text-foreground uppercase ${anton.className}`}
            >
              Explore
            </h4>
            <nav
              aria-label="Site navigation"
              className="flex flex-col space-y-3.5"
            >
              {NAV_LINKS.map((link) => (
                <NavLink key={link.name} {...link} />
              ))}
            </nav>
          </motion.div>

          {/* Col 3: Opportunities ───────────────────────────────────────────── */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-6"
          >
            <h4
              className={`text-xl tracking-wider text-foreground uppercase ${anton.className}`}
            >
              Opportunities
            </h4>
            <nav
              aria-label="ACM opportunities"
              className="flex flex-col space-y-5"
            >
              {OPPORTUNITY_LINKS.map((link) => (
                <OpportunityLink key={link.name} {...link} />
              ))}
            </nav>
          </motion.div>

          {/* Col 4: Socials + CTA ───────────────────────────────────────────── */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-6"
          >
            <h4
              className={`text-xl tracking-wider text-foreground uppercase ${anton.className}`}
            >
              Connect
            </h4>

            {/* Social icon grid — 3 across so it doesn't overflow on narrow columns */}
            <div
              className="flex flex-wrap gap-2.5"
              role="list"
              aria-label="Social media links"
            >
              {SOCIAL_LINKS.map((s) => (
                <div key={s.name} role="listitem">
                  <SocialButton href={s.href} name={s.name} Icon={s.icon} />
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <Link
              href="/contact"
              className="
                group relative mt-2 inline-flex w-fit items-center justify-center
                overflow-hidden rounded-full
                border-2 border-acm-blue bg-transparent
                px-7 py-3 text-xs font-bold uppercase tracking-widest text-acm-blue
                transition-all duration-300
                hover:border-transparent hover:text-white
                hover:shadow-[0_8px_24px_rgba(0,91,181,0.3)]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acm-blue/50
              "
            >
              {/* Gradient fill — lives BEHIND text via z-0 */}
              <span
                aria-hidden
                className="absolute inset-0 z-0 bg-gradient-to-r from-acm-blue to-acm-electric opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span className="relative z-10">Contact Us</span>
            </Link>

            {/* Small tagline */}
            <p
              className={`text-xs text-foreground/40 leading-relaxed max-w-[200px] ${playfair.className} italic`}
            >
              Part of the world's largest educational computing society.
            </p>
          </motion.div>
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────────────────── */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-col items-center justify-between border-t border-foreground/10 pt-8 sm:flex-row gap-5"
        >
          <p className="text-[11px] font-bold uppercase tracking-widest text-foreground/40 text-center sm:text-left">
            ACM SRM © {CURRENT_YEAR}. All Rights Reserved.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-5 text-[11px] font-bold uppercase tracking-widest text-foreground/40">
            <Link
              href="/privacy"
              className="transition-colors hover:text-acm-blue focus-visible:outline-none focus-visible:text-acm-blue"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-acm-blue focus-visible:outline-none focus-visible:text-acm-blue"
            >
              Terms of Service
            </Link>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              whileHover={prefersReducedMotion ? {} : { y: -2 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="
                group ml-2 flex items-center gap-2 text-foreground/40
                hover:text-acm-electric transition-colors
                focus-visible:outline-none focus-visible:text-acm-electric
              "
            >
              <span>TOP</span>
              <span
                aria-hidden
                className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground/6 border border-foreground/8 transition-all duration-200 group-hover:bg-acm-electric/12 group-hover:border-acm-electric/25 group-hover:text-acm-electric"
              >
                <ArrowUp className="h-3 w-3" />
              </span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
