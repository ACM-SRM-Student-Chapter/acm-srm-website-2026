"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Teams", path: "/teams" },
  { name: "Events", path: "/events" },
  { name: "Gallery", path: "/gallery" },
  { name: "Projects", path: "/projects" },
  { name: "Blogs", path: "/blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  return (
    <header className="fixed top-0 z-50 flex w-full justify-center pt-6">
      <nav className="glass-panel flex items-center gap-2 rounded-full px-4 py-2 shadow-lg">
        {/* Logo Section */}
        <Link href="/" className="mr-6 flex items-center gap-3 pl-2">
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

        {/* Navigation Links */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                onMouseEnter={() => setHoveredPath(item.path)}
                onMouseLeave={() => setHoveredPath(null)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-bold tracking-wide transition-colors duration-300 ",
                  isActive || hoveredPath === item.path
                    ? "text-black shadow-md"
                    : "text-foreground/70 hover:text-foreground",
                )}
              >
                <span>{item.name}</span>

                {/* The Sliding Pill Animation */}
                {hoveredPath === item.path && (
                  <motion.div
                    layoutId="navbar-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-acm-blue"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="ml-4 pl-4 border-l border-foreground/10">
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-foreground px-6 py-2 font-medium text-background transition-transform hover:scale-105 active:scale-95"
          >
            <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-acm-electric to-acm-violet opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
            <span className="relative text-sm">Join Us</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
