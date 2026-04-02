"use client";

import { motion } from "framer-motion";
import {
  Target,
  Lightbulb,
  Globe,
  GraduationCap,
  Award,
  Star,
  Coffee,
  Rocket,
  Code,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";
import Antigravity from "@/components/ui/Antigravity";

// Swiper CSS
import "swiper/css";
import "swiper/css/effect-cards";

const achievements = [
  {
    title: "ACM Ambassador Award",
    description:
      "Recognized nationally for outstanding contributions to the computing community. (Yes, we have a shiny trophy to prove it).",
    year: "2024",
    rotation: "-rotate-2",
  },
  {
    title: "ACM Winter School",
    description:
      "Multiple members selected for the prestigious ACM India Winter Schools. Basically, we sent our best nerds to learn more nerd stuff.",
    year: "2024 - 2025",
    rotation: "rotate-2",
  },
];

const testimonials = [
  {
    name: "Dr. Suchithra M",
    role: "Faculty Sponsor",
    quote:
      "The sheer dedication of this student chapter is phenomenal. They don't just host events; they cultivate a culture of genuine technological curiosity and innovation.",
  },
  {
    name: "S Sembon Surakshitha",
    role: "Past Chairperson",
    quote:
      "Leading ACM SRM was a transformative experience. It is a place where ideas turn into reality, and members turn into lifelong collaborators.",
  },
  {
    name: "Rahul Agarwal",
    role: "Vice Chairperson",
    quote:
      "The technical growth I've experienced here is unmatched. From building open-source projects to organizing hackathons, ACM is the ultimate catalyst for developers.",
  },
];

// Floating Emojis/Icons for the funny vibe
const floatingIcons = [
  { Icon: Coffee, x: "10%", y: "20%", delay: 0, rotate: 15 },
  { Icon: Rocket, x: "85%", y: "15%", delay: 1, rotate: -20 },
  { Icon: Code, x: "80%", y: "80%", delay: 2, rotate: 10 },
];

export default function AboutPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center pb-0 pt-20 overflow-hidden bg-background">
      {/* 1. GLOBAL 3D BACKGROUND (Antigravity) */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Antigravity
          count={50} // Reduced slightly for global performance
          magnetRadius={20}
          ringRadius={20}
          waveSpeed={2}
          particleSize={0.5}
          color="#00E5FF" // Electric Blue capsules matching the theme
          autoAnimate={true}
          fieldStrength={15}
          particleShape="capsule"
        />
        {/* White overlay to wash out the 3D slightly so text remains highly readable */}
        <div className="absolute inset-0 bg-white/40 mix-blend-overlay pointer-events-none" />
      </div>

      {/* 2. MAIN CONTENT WRAPPER */}
      <div className="relative z-10 w-full">
        {/* Playful Floating Icons */}
        {floatingIcons.map((item, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              rotate: [item.rotate, item.rotate + 10, item.rotate],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut",
            }}
            className="absolute hidden lg:flex items-center justify-center p-4 bg-white/50 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 z-0"
            style={{ left: item.x, top: item.y }}
          >
            <item.Icon className="w-8 h-8 text-acm-violet opacity-60" />
          </motion.div>
        ))}

        {/* Page Header */}
        <div className="container mx-auto px-4 py-20 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-acm-pink/30 bg-acm-pink/10 px-4 py-1.5 text-sm font-bold text-acm-pink backdrop-blur-md"
          >
            👋 Welcome to our corner of the internet
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-5xl font-black tracking-tight md:text-7xl drop-shadow-sm"
          >
            Empowering Minds, <br />
            <span className="bg-gradient-to-r from-acm-blue via-acm-violet to-acm-pink bg-clip-text text-transparent">
              Shaping the Future
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-2xl text-lg font-medium text-foreground/70"
          >
            We are dedicated to technical, professional, and personal
            development in the context of computer science.
            <br />
            <span className="text-sm font-bold text-acm-blue mt-2 inline-block">
              (And surviving on 3 hours of sleep and caffeine ☕).
            </span>
          </motion.p>
        </div>

        <div className="mx-auto w-full max-w-6xl px-4 space-y-32 relative z-10">
          {/* Mission & Vision (Quirky Infographic Style) */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mt-10">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, rotate: -1 }} // Funny hover wobble
              className="group glass-panel relative overflow-hidden rounded-[2.5rem] p-10 bg-white/70 shadow-[0_20px_40px_rgba(0,0,0,0.05)] cursor-crosshair"
            >
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-acm-blue/20 blur-[80px] transition-all group-hover:bg-acm-electric/30" />
              <div className="mb-6 inline-flex rounded-2xl bg-acm-blue/10 p-4 text-acm-blue shadow-inner">
                <Target className="h-8 w-8" />
              </div>
              <h2 className="mb-4 text-3xl font-black">Our Master Plan 🎯</h2>
              <p className="text-lg text-foreground/80 leading-relaxed font-medium">
                To foster a thriving ecosystem of hands-on learning, empowering
                students with exposure to the latest tech. We inspire members to
                not just consume technology, but to lead and innovate.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, rotate: 1 }} // Funny hover wobble
              className="group glass-panel relative overflow-hidden rounded-[2.5rem] p-10 bg-white/70 shadow-[0_20px_40px_rgba(0,0,0,0.05)] cursor-crosshair"
            >
              <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-acm-violet/20 blur-[80px] transition-all group-hover:bg-acm-pink/30" />
              <div className="mb-6 inline-flex rounded-2xl bg-acm-violet/10 p-4 text-acm-violet shadow-inner">
                <Lightbulb className="h-8 w-8" />
              </div>
              <h2 className="mb-4 text-3xl font-black">The Big Dream 🔮</h2>
              <p className="text-lg text-foreground/80 leading-relaxed font-medium">
                To be the premier platform at SRMIST where brilliant minds
                converge to build tomorrow's tech. Collaboration seamlessly
                bridging the gap between academic theory and industry-grade
                engineering.
              </p>
            </motion.div>
          </div>

          {/* About ACM India & SRMIST */}
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center bg-white/40 p-8 md:p-16 rounded-[3rem] border border-white/50 shadow-xl backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm border border-foreground/5 px-4 py-2 text-sm font-extrabold tracking-widest uppercase text-acm-electric">
                <Globe className="h-4 w-4" /> The Global Network
              </div>
              <h2 className="text-3xl font-black md:text-5xl leading-tight">
                The World's Largest Educational Computing Society
              </h2>
              <p className="text-foreground/70 text-lg font-medium">
                ACM brings together computing educators, researchers, and
                professionals to inspire dialogue, share resources, and address
                the field's challenges.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm border border-foreground/5 px-4 py-2 text-sm font-extrabold tracking-widest uppercase text-acm-blue">
                <GraduationCap className="h-4 w-4" /> Our Headquarters
              </div>
              <h2 className="text-3xl font-black md:text-5xl leading-tight">
                A Hub of Excellence and Innovation
              </h2>
              <p className="text-foreground/70 text-lg font-medium">
                SRM Institute of Science and Technology is one of the top
                ranking universities in India. A dynamic environment for
                students to excel in software engineering, AI, and systems
                architecture.
              </p>
            </motion.div>
          </div>

          {/* Achievements (Scrapbook Style) */}
          <section>
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-black md:text-6xl text-transparent bg-gradient-to-r from-acm-violet to-acm-electric bg-clip-text">
                Shameless Flexing 🏆
              </h2>
              <p className="mt-4 text-foreground/60 font-medium">
                Okay, maybe a little bit of showing off. But we earned it!
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 px-4 md:px-12">
              {achievements.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    rotate: item.rotation === "rotate-2" ? 2 : -2,
                  }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                  transition={{ type: "spring", bounce: 0.4 }}
                  className={`group relative overflow-hidden rounded-3xl border-2 border-white bg-white/80 p-8 shadow-2xl backdrop-blur-xl ${item.rotation}`}
                >
                  <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-acm-electric/20 blur-[50px] transition-all group-hover:bg-acm-blue/30" />
                  <Award className="mb-6 h-12 w-12 text-acm-electric" />
                  <h3 className="mb-3 text-3xl font-black">{item.title}</h3>
                  <span className="mb-4 inline-block rounded-full bg-acm-violet/10 px-3 py-1 text-xs font-black tracking-widest text-acm-violet">
                    CLASS OF {item.year}
                  </span>
                  <p className="text-foreground/80 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Testimonials (Swiper Carousel) */}
          <section className="flex flex-col items-center py-20">
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-black md:text-5xl">Receipts.</h2>
              <p className="mt-4 text-foreground/60 font-medium text-lg">
                Don't just take our word for it... (Seriously, read these) 👀
              </p>
            </div>

            <div className="w-full max-w-sm sm:max-w-3xl px-4">
              <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards, Autoplay]}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                className="w-full pb-10"
              >
                {testimonials.map((test, index) => (
                  <SwiperSlide key={index} className="rounded-[2.5rem]">
                    <div className="glass-panel flex h-[400px] flex-col justify-between rounded-[2.5rem] border border-white/5 bg-white/10 p-10 shadow-2xl backdrop-blur-3xl">
                      <div>
                        <div className="flex gap-1 mb-6">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-6 w-6 text-acm-yellow fill-acm-yellow"
                            />
                          ))}
                        </div>
                        <p className="text-xl font-bold italic text-foreground/90 leading-relaxed">
                          "{test.quote}"
                        </p>
                      </div>
                      <div className="mt-6 border-t border-foreground/10 pt-6 flex items-center justify-between">
                        <div>
                          <h4 className="font-black text-xl text-foreground">
                            {test.name}
                          </h4>
                          <p className="text-sm font-bold tracking-wider uppercase text-acm-electric">
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

      {/* 3. INTERACTIVE DIAGONAL STRAPS (Now sitting purely on top of the global Antigravity) */}
      <section className="relative w-full h-[300px] md:h-[300px] mt-6 overflow-hidden border-t border-foreground/5 z-20">
        {/* Diagonal Straps Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {/* Strap 1: Light Electric (Moves Right) */}
          <div className="absolute w-[150%] left-[-25%] -rotate-6 bg-[#d0fbfc] text-black shadow-2xl z-20">
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
              className="flex whitespace-nowrap py-5"
            >
              {Array(6)
                .fill("INNOVATE • CONNECT • EXCEL • ACM STUDENT CHAPTER • ")
                .map((text, i) => (
                  <span
                    key={i}
                    className="text-sm md:text-xl font-black uppercase tracking-[0.2em] px-4"
                  >
                    {text}
                  </span>
                ))}
            </motion.div>
          </div>

          {/* Strap 2: Black (Moves Left) */}
          <div className="absolute w-[150%] left-[-25%] rotate-3 bg-[#0a0a0a] text-white shadow-2xl border-y-4 border-acm-blue z-30">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
              className="flex whitespace-nowrap py-5"
            >
              {Array(6)
                .fill("GET IN TOUCH • START A CONVERSATION • JOIN ACM SRM • ")
                .map((text, i) => (
                  <span
                    key={i}
                    className="text-sm md:text-xl font-black uppercase tracking-[0.2em] px-4"
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
