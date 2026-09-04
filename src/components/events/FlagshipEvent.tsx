"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, MapPin, User, Sparkles } from "lucide-react";
import LaserFlow from "@/components/ui/LaserFlow";
import { Playfair_Display, Anton } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const anton = Anton({ subsets: ["latin"], weight: "400" });

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO, delay },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const FLAGSHIP_SPEAKERS = [
  {
    role: "Keynote",
    name: "Prof. Mary Anita Rajam V",
    description: "Professor & Head, CSE, Anna Univ.",
    color: "text-acm-electric",
  },
  {
    role: "Speaker",
    name: "Mr. Siva Venkata Satya Narayana",
    description: "Founder & CEO, Altruisty Innovation",
    color: "text-acm-violet",
  },
  {
    role: "Speaker",
    name: "Mr. Murali Kannan",
    description: "DGM IT, Sun TV Network",
    color: "text-acm-pink",
  },
  {
    role: "Speaker",
    name: "Mr. R S L Balaji",
    description: "CIO, Altruisty Innovation",
    color: "text-acm-blue",
  },
];

export default function FlagshipEvent() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isFlagshipHovered, setIsFlagshipHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    spotlightRef.current?.style.setProperty(
      "--mx",
      `${e.clientX - rect.left}px`,
    );
    spotlightRef.current?.style.setProperty(
      "--my",
      `${e.clientY - rect.top}px`,
    );
  }, []);

  const handleMouseEnter = useCallback(() => setIsFlagshipHovered(true), []);

  const handleMouseLeave = useCallback(() => {
    setIsFlagshipHovered(false);
    spotlightRef.current?.style.setProperty("--mx", "-9999px");
    spotlightRef.current?.style.setProperty("--my", "-9999px");
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
      className="relative w-full overflow-hidden rounded-[2.5rem] shadow-2xl bg-black border border-white/10 group cursor-crosshair mt-32"
      style={{ minHeight: "500px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Laser background */}
      <div className="absolute inset-0 z-0">
        <LaserFlow
          color="#7B61FF"
          horizontalBeamOffset={0.1}
          verticalBeamOffset={0.0}
          wispSpeed={isFlagshipHovered && !prefersReducedMotion ? 40 : 15}
          flowSpeed={isFlagshipHovered && !prefersReducedMotion ? 1.5 : 0.35}
          wispIntensity={isFlagshipHovered && !prefersReducedMotion ? 20 : 5}
          wispDensity={isFlagshipHovered && !prefersReducedMotion ? 2.5 : 1}
        />
      </div>

      {/* Mouse spotlight mask */}
      <div
        ref={spotlightRef}
        aria-hidden
        className="absolute inset-0 z-10 pointer-events-none opacity-60 transition-opacity duration-300"
        style={
          {
            "--mx": "-9999px",
            "--my": "-9999px",
            maskImage:
              "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.8) 100px, rgba(255,255,255,0.2) 250px, rgba(255,255,255,0) 400px)",
            WebkitMaskImage:
              "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.8) 100px, rgba(255,255,255,0.2) 250px, rgba(255,255,255,0) 400px)",
          } as React.CSSProperties
        }
      >
        <div className="absolute inset-0 bg-gradient-to-br from-acm-electric/30 via-transparent to-acm-violet/30 mix-blend-screen" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col lg:flex-row items-center justify-between p-8 md:p-16 h-full gap-12 pointer-events-none">
        {/* Left: Text */}
        <div className="flex-1 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="inline-flex items-center gap-2 rounded-full border border-acm-violet/50 bg-acm-violet/20 px-4 py-1.5 text-sm font-extrabold tracking-widest text-acm-violet backdrop-blur-md mb-8"
          >
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-acm-violet opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-acm-violet" />
            </span>
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            FLAGSHIP EVENT
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.65,
              ease: EASE_OUT_EXPO,
              delay: 0.05,
            }}
            className={`text-5xl md:text-7xl uppercase tracking-wide text-white mb-6 drop-shadow-[0_0_15px_rgba(123,97,255,0.5)] ${anton.className}`}
          >
            Symposium on <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-acm-electric to-acm-violet">
              Responsible AI
            </span>
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.55,
              ease: EASE_OUT_EXPO,
              delay: 0.1,
            }}
            className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-white/70 font-medium mb-10"
          >
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
              <Calendar className="h-5 w-5 text-acm-electric" aria-hidden />
              <time dateTime="2026-03-18">18–20 March 2026</time>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
              <MapPin className="h-5 w-5 text-acm-pink" aria-hidden />
              <span>Tech Park, SRMIST</span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className={`text-xl text-white/80 leading-relaxed mb-10 max-w-xl italic ${playfair.className}`}
          >
            Join us for an immersive 3-day exploration into the ethics,
            development, and future of Artificial Intelligence with
            leading industry experts.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 border-t border-white/10 pt-8 max-w-2xl"
          >
            {FLAGSHIP_SPEAKERS.map((s) => (
              <motion.div key={s.name} variants={fadeUp}>
                <h4
                  className={`font-bold text-xs uppercase tracking-wider mb-1 ${s.color}`}
                >
                  {s.role}
                </h4>
                <p className="text-white font-bold text-sm">{s.name}</p>
                <p className="text-white/50 text-xs">{s.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right: 3-D Poster */}
        <div
          className="w-full lg:w-[400px] flex justify-center lg:justify-end"
          style={{ perspective: "1000px" }}
        >
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : isFlagshipHovered
                  ? { rotateY: 0, rotateX: 0, scale: 1.05 }
                  : { rotateY: -12, rotateX: 6, scale: 1 }
            }
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            className="relative w-full max-w-[320px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-white/10"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent z-10 pointer-events-none" />
            <img
              src="/events/Symposium_on_Responsible_Al.webp"
              alt="Symposium on Responsible AI Poster"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop";
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
