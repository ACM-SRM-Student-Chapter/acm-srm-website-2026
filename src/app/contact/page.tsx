"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Instagram, ArrowLeft, Lock, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
        className="group glass-panel relative w-full max-w-2xl overflow-hidden rounded-[2.5rem] p-10 text-center shadow-2xl md:p-16"
      >
        {/* Subtle Background Glows */}
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-acm-pink/10 blur-[80px]" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-acm-violet/10 blur-[80px]" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Animated Status Badge */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm font-bold tracking-wide text-red-500 backdrop-blur-md"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
            </span>
            RECRUITMENTS CLOSED
          </motion.div>

          {/* Icon */}
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-foreground/5 text-foreground shadow-inner">
            <Lock className="h-10 w-10 opacity-80" />
          </div>

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Thank You For Your <br />
            <span className="bg-gradient-to-r from-acm-violet to-acm-pink bg-clip-text text-transparent">
              Interest
            </span>
          </h1>

          <p className="mb-10 max-w-lg text-lg text-foreground/70 leading-relaxed">
            Our recruitment process for the ACM Student Chapter SRMIST is
            currently closed. We are overwhelmed by the response and are excited
            to work with our new cohort!
            <br />
            <br />
            Stay tuned for future opportunities, workshops, and open events by
            following our social media channels.
          </p>

          {/* Action Buttons */}
          <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex w-full items-center justify-center overflow-hidden rounded-full bg-foreground px-8 py-4 font-bold text-background transition-transform hover:scale-105 active:scale-95 sm:w-auto"
            >
              <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              <span className="relative z-10 flex items-center gap-2">
                <Instagram className="h-5 w-5" />
                Follow on Instagram
              </span>
            </a>

            <Link
              href="/"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-foreground/20 bg-background/50 px-8 py-4 font-bold text-foreground backdrop-blur-md transition-colors hover:bg-foreground/5 hover:text-acm-electric sm:w-auto active:scale-95 transition-transform"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Home
            </Link>
          </div>

          {/* Secondary Contact Info */}
          <div className="mt-12 flex items-center gap-2 text-sm font-medium text-foreground/50">
            <Mail className="h-4 w-4" />
            <span>
              Have an urgent inquiry? Reach out via our social channels.
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
