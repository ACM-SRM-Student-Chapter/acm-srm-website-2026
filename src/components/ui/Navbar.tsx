"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Home,
  Info,
  Users,
  CalendarDays,
  Image as ImageIcon,
  Code2,
  BookOpen,
} from "lucide-react";

// Map each route to a specific icon
const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "About Us", path: "/about", icon: Info },
  { name: "Teams", path: "/teams", icon: Users },
  { name: "Events", path: "/events", icon: CalendarDays },
  { name: "Gallery", path: "/gallery", icon: ImageIcon },
  { name: "Projects", path: "/projects", icon: Code2 },
  { name: "Blogs", path: "/blog", icon: BookOpen },
];

export default function Navbar() {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  // Smooth liquid spring for the "water drop" moving effect
  const liquidSpring = {
    type: "spring",
    stiffness: 400,
    damping: 30,
    mass: 0.8,
  };

  // Determine which item the pill should currently highlight
  const activeItem = hoveredPath || pathname;

  return (
    <>
      {/* --- TOP NAVBAR (Logos & CTA for all screens + Desktop Links) --- */}
      <header className="fixed top-0 z-[100] flex w-full justify-center pt-4 md:pt-6 px-4 pointer-events-none">
        <nav
          className="glass-panel pointer-events-auto flex w-full md:w-auto items-center justify-between md:justify-start gap-2 rounded-full px-4 py-2 shadow-[0_20px_60px_rgba(0,0,0,0.1)] backdrop-blur-3xl bg-white/80 border border-white/50"
          onMouseLeave={() => setHoveredPath(null)}
        >
          {/* Logo Section */}
          <Link href="/" className="mr-0 md:mr-6 flex items-center gap-3 pl-2">
            <Image
              src="/acm-logo.webp"
              alt="ACM Logo"
              width={36}
              height={36}
              className="object-contain"
            />
            <Image
              src="/srm-logo.webp"
              alt="SRM Logo"
              width={82}
              height={82}
              className="h-8 w-auto sm:h-10 object-contain"
              style={{ width: "auto", height: "auto" }}
            />
          </Link>

          {/* Navigation Links (Desktop/Large Screens Only) */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isSelected = activeItem === item.path;
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onMouseEnter={() => setHoveredPath(item.path)}
                  className={cn(
                    "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold tracking-wide transition-colors duration-300",
                    isSelected
                      ? "text-black"
                      : "text-black/60 hover:text-black",
                  )}
                >
                  <Icon className="h-4 w-4 relative z-10" />
                  <span className="relative z-10">{item.name}</span>

                  {/* The Sliding Pill Animation */}
                  {isSelected && (
                    <motion.div
                      layoutId="desktop-navbar-pill"
                      className="absolute inset-0 z-0 rounded-full bg-acm-blue/15 border border-acm-blue/20"
                      transition={liquidSpring}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA Button (Always Visible) */}
          <div className="ml-0 md:ml-4 pl-0 md:pl-4 border-none md:border-l border-black/10">
            <Link
              href="/JoinUs"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#111315] px-6 py-2.5 font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-md"
            >
              <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-acm-electric to-acm-violet opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              <span className="relative text-sm tracking-wide">Join Us</span>
            </Link>
          </div>
        </nav>
      </header>

      {/* --- BOTTOM NAVBAR (Mobile & iPad Vertical Only) --- */}
      <div className="fixed bottom-6 left-0 right-0 z-[100] flex justify-center px-4 md:hidden pointer-events-none">
        <nav className="glass-panel pointer-events-auto flex w-full max-w-[400px] items-center justify-between gap-1 rounded-full px-3 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-3xl bg-white/85 border border-white/50">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "relative flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300",
                  isActive
                    ? "text-acm-blue shadow-sm"
                    : "text-black/50 hover:text-black",
                )}
              >
                <Icon className="h-5 w-5 relative z-10" />

                {/* The Sliding Pill Animation (Mobile Version) */}
                {isActive && (
                  <motion.div
                    layoutId="mobile-navbar-pill"
                    className="absolute inset-0 z-0 rounded-full bg-acm-blue/15 border border-acm-blue/20"
                    transition={liquidSpring}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
