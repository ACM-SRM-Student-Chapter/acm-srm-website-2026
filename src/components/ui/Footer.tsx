"use client";

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
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import Cubes from "./Cubes";

const socialLinks = [
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

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Teams", path: "/teams" },
  { name: "Events", path: "/events" },
  { name: "Gallery", path: "/gallery" },
  { name: "Projects", path: "/projects" },
  { name: "Blogs", path: "/blog" },
];

const opportunityLinks = [
  {
    name: "Take ACM Student Membership",
    desc: "Join the global network",
    href: "#",
  },
  {
    name: "Resources",
    desc: "Access learning materials and technical guides",
    href: "#",
  },
  {
    name: "ACM Events",
    desc: "Discover upcoming workshops and meetups",
    href: "#",
  },
  {
    name: "Research",
    desc: "Explore cutting-edge tech research opportunities",
    href: "#",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Footer() {
  return (
    <footer className="relative z-20 mt-20 w-full overflow-hidden border-t border-foreground/10 bg-background/40 backdrop-blur-xl">
      {/* 3D Kinetic Background */}
      <div className="absolute inset-0 z-0 opacity-80 mix-blend-multiply pointer-events-none">
        <Cubes
          gridSize={12}
          maxAngle={35}
          radius={5}
          borderStyle="1px solid rgba(0, 0, 0, 0.04)" // Very subtle border for clean light mode
          faceColor="#ffffff" // Clean white faces
          rippleColor="#e0f2fe" // Very subtle blue tint on click
          rippleSpeed={1.5}
          autoAnimate={true}
          rippleOnClick={true}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="container relative z-10 mx-auto px-4 py-16 md:py-20"
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Brand & Contact Info */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-8 lg:pr-8"
          >
            {/* Logos */}
            <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-white/50 p-4 backdrop-blur-sm sm:gap-4 w-fit shadow-sm border border-foreground/5">
              <Image
                src="/acm-logo.webp"
                alt="ACM Logo"
                width={60}
                height={60}
                className="h-8 w-auto sm:h-10 object-contain transition-transform hover:scale-110"
              />
              <div className="h-6 sm:h-8 w-[1px] bg-foreground/10" />
              <Image
                src="/acm_logo_tablet.webp"
                alt="ACM Tablet Logo"
                width={60}
                height={60}
                className="h-8 w-auto sm:h-10 object-contain transition-transform hover:scale-110"
              />
              <div className="h-6 sm:h-8 w-[1px] bg-foreground/10" />
              <Image
                src="/srm-logo.webp"
                alt="SRM Logo"
                width={60}
                height={60}
                className="h-8 w-auto sm:h-10 object-contain transition-transform hover:scale-110"
                style={{ width: "auto", height: "auto" }}
              />
              <div className="h-6 sm:h-8 w-[1px] bg-foreground/10" />
              <Image
                src="/ctech-logo.webp"
                alt="CTech Logo"
                width={60}
                height={60}
                className="h-8 w-auto sm:h-10 object-contain transition-transform hover:scale-110"
              />
            </div>

            <div className="flex flex-col space-y-4 text-sm font-medium text-foreground/80">
              <div className="flex items-start gap-3 group">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-acm-blue transition-colors group-hover:text-acm-electric" />
                <p>
                  SRM Institute of Science and Technology
                  <br />
                  Kattankulathur, Tamil Nadu
                  <br />
                  India - 603203
                </p>
              </div>
              <div className="flex items-center gap-3 group">
                <Mail className="h-4 w-4 shrink-0 text-acm-violet transition-colors group-hover:text-acm-pink" />
                <a
                  href="mailto:acmsrmktr@gmail.com"
                  className="transition-colors hover:text-foreground"
                >
                  acmsrmktr@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <Phone className="h-4 w-4 shrink-0 text-acm-green transition-colors group-hover:text-acm-electric" />
                <a
                  href="tel:+919840775825"
                  className="transition-colors hover:text-foreground"
                >
                  +91 9840775825
                </a>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-6 md:pl-8"
          >
            <h4 className="text-lg font-bold text-foreground">Explore</h4>
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="group flex w-fit items-center text-sm font-semibold text-foreground/60 transition-colors hover:text-acm-blue"
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-acm-blue transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Column 3: Opportunities */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-6"
          >
            <h4 className="text-lg font-bold text-foreground">Opportunities</h4>
            <nav className="flex flex-col space-y-4">
              {opportunityLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex flex-col space-y-1 text-left transition-colors"
                >
                  <span className="flex items-center text-sm font-bold text-foreground/80 transition-colors group-hover:text-acm-violet">
                    {link.name}
                    <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </span>
                  <span className="text-xs font-medium text-foreground/60 transition-colors group-hover:text-foreground/80">
                    {link.desc}
                  </span>
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Column 4: Socials & CTA */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-start space-y-6 lg:items-end"
          >
            <h4 className="text-lg font-bold text-foreground">Connect</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-foreground shadow-sm transition-all duration-300 hover:bg-gradient-to-br hover:from-acm-blue hover:to-acm-violet hover:text-white hover:shadow-[0_0_20px_rgba(123,97,255,0.4)]"
                  title={social.name}
                >
                  <social.icon className="h-4 w-4" />
                  <span className="sr-only">{social.name}</span>
                </motion.a>
              ))}
            </div>

            <Link
              href="/contact"
              className="group relative mt-4 inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-acm-blue bg-transparent px-8 py-2.5 text-sm font-bold text-acm-blue transition-all hover:border-transparent"
            >
              <span className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-r from-acm-blue to-acm-electric opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="transition-colors duration-300 group-hover:text-white">
                Contact Us
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Copyright & Legal */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-col items-center justify-between border-t border-foreground/10 pt-8 sm:flex-row"
        >
          <p className="text-xs font-bold text-foreground/50">
            ACM SRM © {new Date().getFullYear()}. All Rights Reserved.
          </p>
          <div className="mt-4 flex gap-6 text-xs font-bold text-foreground/50 sm:mt-0">
            <Link href="#" className="transition-colors hover:text-acm-blue">
              Privacy Policy
            </Link>
            <Link href="#" className="transition-colors hover:text-acm-blue">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
