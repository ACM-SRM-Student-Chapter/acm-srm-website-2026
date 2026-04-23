"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Target,
  Lightbulb,
  Globe,
  GraduationCap,
  Award,
  Star,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";
import Image from "next/image";

// Swiper CSS
import "swiper/css";
import "swiper/css/effect-cards";

// Google Fonts (Using Next.js font optimization approach)
import { Playfair_Display, Anton, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const anton = Anton({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"] });

// --- Smooth Digital Matrix Background Component ---
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "01".split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      // Semi-transparent black background to create trails
      ctx.fillStyle = "rgba(6, 0, 16, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(0, 229, 255, 1)"; // Faint acm-electric blue
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen"
    />
  );
};

// --- DATA ---
const achievements = [
  {
    title: "ACM Ambassador Award",
    description:
      "Recognized on a national level for exceptional contributions to the computing community, technical evangelism, and leadership excellence.",
    year: "2024",
    rotation: "-rotate-2",
    image: "/events/ACM_Ambassador_Award.webp",
  },
  {
    title: "ACM Winter School",
    description:
      "Multiple core members selected to participate in the highly competitive ACM India Winter Schools, engaging in advanced algorithmic and systems research.",
    year: "2024 - 2025",
    rotation: "rotate-2",
    image: "/events/ACM_Winter_School.webp",
  },
];

const testimonials = [
  {
    name: "Dr. Suchithra M",
    role: "Faculty Sponsor",
    quote:
      "The sheer dedication of this student chapter is phenomenal. They cultivate a culture of genuine technological curiosity and rigorous engineering innovation.",
  },
  {
    name: "S Sembon Surakshitha",
    role: "Past Chairperson",
    quote:
      "Leading ACM SRM was a transformative experience. It is a highly collaborative environment where theoretical ideas are rapidly engineered into reality.",
  },
  {
    name: "Rahul Agarwal",
    role: "Vice Chairperson",
    quote:
      "The technical acceleration I've experienced here is unmatched. From architectural design to deploying open-source projects, ACM is the ultimate catalyst for developers.",
  },
];

export default function AboutPage() {
  return (
    <div
      className={`relative flex min-h-screen flex-col items-center pb-0 pt-20 overflow-hidden bg-[#060010] ${inter.className}`}
    >
      {/* 1. MATRIX BACKGROUND */}
      <MatrixRain />

      {/* Dark overlay to ensure text readability */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#060010]/80 via-[#060010]/60 to-[#060010]/90 pointer-events-none" />

      {/* 2. MAIN CONTENT WRAPPER */}
      <div className="relative z-10 w-full text-white">
        {/* Page Header */}
        <div className="container mx-auto px-4 py-24 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-acm-electric/30 bg-acm-electric/10 px-5 py-2 text-sm font-bold tracking-widest uppercase text-acm-electric backdrop-blur-md"
          >
            The Premier Computing Society
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 text-6xl md:text-8xl tracking-widest uppercase text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] ${anton.className}`}
          >
            Empowering Minds, <br />
            <span className="text-transparent bg-clip-text bg-yellow-500">
              Shaping the Future
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`mx-auto max-w-2xl text-xl md:text-2xl text-white/80 leading-relaxed ${playfair.className} italic`}
          >
            We are dedicated to advancing the art, science, engineering, and
            application of computing, serving both professional and public
            interests.
          </motion.p>
        </div>

        <div className="mx-auto w-full max-w-6xl px-4 space-y-32 relative z-10">
          {/* Mission & Vision (Refined Glassmorphism Style) */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mt-10">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-[2.5rem] p-10 bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl"
            >
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-acm-blue/20 blur-[80px] transition-all group-hover:bg-acm-electric/30" />
              <div className="mb-8 inline-flex rounded-2xl bg-white/10 p-4 text-acm-electric border border-white/5">
                <Target className="h-8 w-8" />
              </div>
              <h2
                className={`mb-4 text-4xl tracking-wide uppercase ${anton.className}`}
              >
                The Mission
              </h2>
              <p className="text-lg text-white/70 leading-relaxed font-medium">
                To foster a thriving ecosystem of rigorous engineering and
                hands-on learning. We empower students with exposure to
                cutting-edge technologies, inspiring them to architect and
                innovate rather than merely consume.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-[2.5rem] p-10 bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl"
            >
              <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-acm-violet/20 blur-[80px] transition-all group-hover:bg-acm-pink/30" />
              <div className="mb-8 inline-flex rounded-2xl bg-white/10 p-4 text-acm-pink border border-white/5">
                <Lightbulb className="h-8 w-8" />
              </div>
              <h2
                className={`mb-4 text-4xl tracking-wide uppercase ${anton.className}`}
              >
                The Vision
              </h2>
              <p className="text-lg text-white/70 leading-relaxed font-medium">
                To be the premier technical platform at SRMIST where brilliant
                minds converge to build tomorrow's infrastructure. We seamlessly
                bridge the gap between academic theory and industry-grade
                software engineering.
              </p>
            </motion.div>
          </div>

          {/* About ACM India & SRMIST */}
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center bg-[#0a0a0a] p-10 md:p-16 rounded-[3rem] border border-white/10 shadow-2xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/5 px-4 py-2 text-sm font-bold tracking-widest uppercase text-acm-electric">
                <Globe className="h-4 w-4" /> The Global Network
              </div>
              <h2
                className={`text-4xl md:text-5xl leading-tight uppercase tracking-wider ${anton.className}`}
              >
                The World's Largest Computing Society
              </h2>
              <p
                className={`text-white/70 text-xl leading-relaxed ${playfair.className} italic`}
              >
                ACM brings together computing educators, researchers, and
                professionals to inspire dialogue, share resources, and address
                the field's most complex challenges.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/5 px-4 py-2 text-sm font-bold tracking-widest uppercase text-acm-violet">
                <GraduationCap className="h-4 w-4" /> Our Headquarters
              </div>
              <h2
                className={`text-4xl md:text-5xl leading-tight uppercase tracking-wider ${anton.className}`}
              >
                A Hub of Excellence and Innovation
              </h2>
              <p
                className={`text-white/70 text-xl leading-relaxed ${playfair.className} italic`}
              >
                SRM Institute of Science and Technology provides a dynamic
                environment for students to excel in software engineering,
                artificial intelligence, and systems architecture.
              </p>
            </motion.div>
          </div>

          {/* Achievements (Professional Cards with Images) */}
          <section>
            <div className="mb-16 text-center">
              <h2
                className={`text-5xl md:text-7xl uppercase tracking-widest text-transparent bg-pink-700 bg-clip-text ${anton.className}`}
              >
                Chapter Milestones
              </h2>
              <p
                className={`mt-6 text-white/60 text-xl ${playfair.className} italic max-w-2xl mx-auto`}
              >
                A testament to our technical rigor and continuous pursuit of
                excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 px-4">
              {achievements.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111111] shadow-2xl flex flex-col h-full"
                >
                  <div className="relative w-full h-64 overflow-hidden bg-black/50">
                    {/* Dark gradient overlay on top of image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent z-10" />
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop";
                      }}
                    />
                  </div>

                  <div className="p-8 relative z-20 flex flex-col flex-grow -mt-10">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-acm-electric/20 px-3 py-1 text-xs font-bold tracking-widest text-acm-electric border border-acm-electric/30 w-fit backdrop-blur-md">
                      <Award className="h-4 w-4" /> {item.year}
                    </div>
                    <h3
                      className={`mb-4 text-3xl tracking-wide uppercase ${anton.className}`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-white/70 font-medium leading-relaxed mt-auto">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Testimonials (Swiper Carousel) */}
          <section className="flex flex-col items-center py-20">
            <div className="mb-16 text-center">
              <h2
                className={`text-5xl md:text-7xl uppercase tracking-widest text-white ${anton.className}`}
              >
                Endorsements
              </h2>
              <p
                className={`mt-6 text-white/60 text-xl ${playfair.className} italic max-w-2xl mx-auto`}
              >
                The impact of our chapter through the eyes of our leadership.
              </p>
            </div>

            <div className="w-full max-w-sm sm:max-w-3xl px-4">
              <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards, Autoplay]}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                className="w-full pb-10"
              >
                {testimonials.map((test, index) => (
                  <SwiperSlide key={index} className="rounded-[2.5rem]">
                    <div className="flex h-[400px] flex-col justify-between rounded-[2.5rem] border border-white/10 bg-[#1a1a1a] p-10 shadow-2xl">
                      <div>
                        <div className="flex gap-1 mb-8">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-5 w-5 text-pink-700 fill-yellow-500"
                            />
                          ))}
                        </div>
                        <p
                          className={`text-2xl text-white/90 leading-relaxed ${playfair.className} italic`}
                        >
                          "{test.quote}"
                        </p>
                      </div>
                      <div className="mt-6 border-t border-white/10 pt-6 flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-xl text-white uppercase tracking-wider">
                            {test.name}
                          </h4>
                          <p className="text-sm font-bold tracking-widest uppercase text-white/50 mt-1">
                            {test.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
        </div>
      </div>

      {/* 3. INTERACTIVE DIAGONAL STRAPS */}
      <section className="relative w-full h-[300px] md:h-[300px] mt-10 overflow-hidden border-t border-white/5 z-20 bg-[#060010]">
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {/* Strap 1: Light Electric (Moves Right) */}
          <div className="absolute w-[150%] left-[-25%] -rotate-6 bg-[#d0fbfc] text-black shadow-2xl z-20">
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
              className="flex whitespace-nowrap py-5"
            >
              {Array(6)
                .fill("ENGINEER • ARCHITECT • DEPLOY • ACM STUDENT CHAPTER • ")
                .map((text, i) => (
                  <span
                    key={i}
                    className={`text-xl md:text-3xl uppercase tracking-[0.2em] px-4 ${anton.className}`}
                  >
                    {text}
                  </span>
                ))}
            </motion.div>
          </div>

          {/* Strap 2: Black (Moves Left) */}
          <div className="absolute w-[150%] left-[-25%] rotate-3 bg-[#0a0a0a] text-white shadow-2xl border-y border-white/10 z-30">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
              className="flex whitespace-nowrap py-5"
            >
              {Array(6)
                .fill(
                  "OPEN SOURCE • ALGORITHMS • SYSTEMS • MACHINE LEARNING • ",
                )
                .map((text, i) => (
                  <span
                    key={i}
                    className={`text-xl md:text-3xl uppercase tracking-[0.2em] px-4 text-acm-electric ${anton.className}`}
                  >
                    {text}
                  </span>
                ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
