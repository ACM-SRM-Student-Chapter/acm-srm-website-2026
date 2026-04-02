"use client";

import { useEffect } from "react";
import { motion, useSpring } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  Megaphone,
  Handshake,
  Palette,
  CalendarDays,
  Code,
  Globe,
  Zap,
} from "lucide-react";

// The UI Components from React Bits
import LightRays from "@/components/ui/LightRays";
import CircularText from "@/components/ui/CircularText";
import TextPressure from "@/components/ui/TextPressure";
import Shuffle from "@/components/ui/Shuffle";
import OrbitImages from "@/components/ui/OrbitImages";

export default function Hero() {
  // Smooth springs for the mouse-following Circular Text
  const mouseX = useSpring(0, { stiffness: 100, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    // Offset by roughly half the circular text width/height to center it on the cursor
    mouseX.set(e.clientX - 100);
    mouseY.set(e.clientY - 100);
  };

  // Icons for the Orbit component (Domains & ACM Values)
  const orbitIcons = [
    <div
      key="1"
      className="bg-acm-electric/20 p-4 rounded-2xl border border-acm-electric/50 shadow-[0_0_20px_rgba(0,229,255,0.4)]"
    >
      <Cpu className="text-acm-electric w-8 h-8" />
    </div>,
    <div
      key="2"
      className="bg-acm-violet/20 p-4 rounded-2xl border border-acm-violet/50 shadow-[0_0_20px_rgba(123,97,255,0.4)]"
    >
      <Megaphone className="text-acm-violet w-8 h-8" />
    </div>,
    <div
      key="3"
      className="bg-acm-pink/20 p-4 rounded-2xl border border-acm-pink/50 shadow-[0_0_20px_rgba(255,64,129,0.4)]"
    >
      <Palette className="text-acm-pink w-8 h-8" />
    </div>,
    <div
      key="4"
      className="bg-acm-blue/20 p-4 rounded-2xl border border-acm-blue/50 shadow-[0_0_20px_rgba(0,91,181,0.4)]"
    >
      <Handshake className="text-acm-blue w-8 h-8" />
    </div>,
    <div
      key="5"
      className="bg-acm-green/20 p-4 rounded-2xl border border-acm-green/50 shadow-[0_0_20px_rgba(0,230,118,0.4)]"
    >
      <CalendarDays className="text-acm-green w-8 h-8" />
    </div>,
    <div
      key="6"
      className="bg-white/10 p-4 rounded-2xl border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
    >
      <Globe className="text-white w-8 h-8" />
    </div>,
  ];

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[100vh] w-full items-center justify-center overflow-hidden bg-[#060010] pt-20"
    >
      {/* 1. Volumetric Light Rays Background */}
      <div className="absolute inset-0 z-0 opacity-70 mix-blend-screen pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00E5FF" // ACM Electric
          raysSpeed={1.5}
          lightSpread={0.6}
          rayLength={2.5}
          followMouse={true}
          mouseInfluence={0.15}
          noiseAmount={0.05}
        />
      </div>

      {/* 2. Mouse Tracking Circular Text */}
      <motion.div
        style={{ x: mouseX, y: mouseY }}
        className="pointer-events-none fixed left-0 top-0 z-10 opacity-30 mix-blend-screen hidden lg:block"
      >
        <CircularText
          text="ACM*STUDENT*CHAPTER*SRMIST*"
          onHover="goBonkers"
          spinDuration={15}
          className="text-acm-electric"
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="container relative z-20 mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Text & CTAs */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:col-span-7">
          {/* Animated Shuffle Badge */}
          <div className="mb-6 inline-flex border border-acm-electric/30 bg-white/5 px-4 py-2 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(0,229,255,0.1)]">
            <Shuffle
              text="Association for Computing Machinery • ACM SRMIST"
              shuffleDirection="right"
              duration={1.5}
              stagger={0.02}
              colorTo="#00E5FF"
              className="text-xs sm:text-sm font-bold tracking-wider"
            />
          </div>

          {/* Headline with TextPressure */}
          <h1 className="w-full text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight tracking-tight">
            Accelerating
            <div className="relative h-[80px] sm:h-[110px] md:h-[130px] w-full my-2">
              <TextPressure
                text="INNOVATION"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#FFFFFF"
                minFontSize={60}
              />
            </div>
            in Computing
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 text-lg md:text-xl font-medium text-white/60 max-w-xl leading-relaxed"
          >
            Collaborate with like-minded peers and industry experts to push the
            boundaries of technology. Together we connect, build, and innovate.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
          >
            <Link
              href="/events"
              className="group relative flex w-full sm:w-auto items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-acm-electric to-acm-violet opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
                Explore Events
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              href="/contact"
              className="flex w-full sm:w-auto items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/40 active:scale-95"
            >
              Join Our Community
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Orbit Images (Icons) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="relative lg:col-span-5 h-[350px] sm:h-[450px] w-full flex items-center justify-center mt-10 lg:mt-0"
        >
          <OrbitImages
            elements={orbitIcons} // Using our new ReactNode support!
            shape="circle"
            radius={140}
            rotation={15}
            duration={25}
            itemSize={60}
            responsive={true}
            baseWidth={400}
            direction="normal"
            showPath={true}
            pathColor="rgba(255,255,255,0.1)"
            centerContent={
              <div className="flex flex-col items-center justify-center text-center">
                <Code className="h-12 w-12 text-white/50 mb-2" />
                <span className="text-xs font-bold tracking-[0.2em] text-white/50">
                  BUILD
                </span>
              </div>
            }
          />
        </motion.div>
      </div>

      {/* Bottom Gradient to blend into the light mode sections below */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />
    </section>
  );
}
