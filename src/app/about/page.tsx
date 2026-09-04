import {
  Target,
  Lightbulb,
  Globe,
  GraduationCap,
} from "lucide-react";
import { Playfair_Display, Anton, Inter } from "next/font/google";
import MatrixRain from "@/components/sections/MatrixRain";
import ChapterMilestones from "@/components/sections/ChapterMilestones";
import Endorsements from "@/components/sections/Endorsements";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const anton = Anton({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"] });

export default function AboutPage() {
  return (
    <div
      className={`relative flex min-h-screen flex-col items-center pb-0 pt-20 overflow-hidden bg-[#060010] ${inter.className}`}
    >
      {/* 1. MATRIX BACKGROUND (Client Component) */}
      <MatrixRain />

      {/* Dark overlay to ensure text readability */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#060010]/80 via-[#060010]/60 to-[#060010]/90 pointer-events-none" />

      {/* 2. MAIN CONTENT WRAPPER */}
      <div className="relative z-10 w-full text-white">
        {/* Page Header */}
        <div className="container mx-auto px-4 py-24 text-center relative z-10 animate-in fade-in zoom-in duration-700">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-acm-electric/30 bg-acm-electric/10 px-5 py-2 text-sm font-bold tracking-widest uppercase text-acm-electric backdrop-blur-md">
            The Premier Computing Society
          </div>
          <h1
            className={`mb-6 text-6xl md:text-8xl tracking-widest uppercase text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] ${anton.className}`}
          >
            Empowering Minds, <br />
            <span className="text-transparent bg-clip-text bg-yellow-500">
              Shaping the Future
            </span>
          </h1>
          <p
            className={`mx-auto max-w-2xl text-xl md:text-2xl text-white/80 leading-relaxed ${playfair.className} italic`}
          >
            We are dedicated to advancing the art, science, engineering, and
            application of computing, serving both professional and public
            interests.
          </p>
        </div>

        <div className="mx-auto w-full max-w-6xl px-4 space-y-32 relative z-10">
          {/* Mission & Vision (Refined Glassmorphism Style) */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mt-10">
            {/* Mission */}
            <div className="group relative overflow-hidden rounded-[2.5rem] p-10 bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl transition-transform hover:-translate-y-2 duration-500">
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
            </div>

            {/* Vision */}
            <div className="group relative overflow-hidden rounded-[2.5rem] p-10 bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl transition-transform hover:-translate-y-2 duration-500">
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
            </div>
          </div>

          {/* About ACM India & SRMIST */}
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center bg-[#0a0a0a] p-10 md:p-16 rounded-[3rem] border border-white/10 shadow-2xl">
            <div className="space-y-6">
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
            </div>

            <div className="space-y-6">
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
            </div>
          </div>

          {/* Achievements (Client Component) */}
          <ChapterMilestones />

          {/* Testimonials (Client Component) */}
          <Endorsements />
        </div>
      </div>

      {/* 3. INTERACTIVE DIAGONAL STRAPS (Simplified CSS Marquee) */}
      <section className="relative w-full h-[300px] mt-10 overflow-hidden border-t border-white/5 z-20 bg-[#060010]">
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {/* Strap 1: Light Electric */}
          <div className="absolute w-[150%] left-[-25%] -rotate-6 bg-[#d0fbfc] text-black shadow-2xl z-20">
            <div className="flex whitespace-nowrap py-5 animate-scroll">
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
            </div>
          </div>

          {/* Strap 2: Black */}
          <div className="absolute w-[150%] left-[-25%] rotate-3 bg-[#0a0a0a] text-white shadow-2xl border-y border-white/10 z-30">
            <div className="flex whitespace-nowrap py-5 animate-scroll [animation-direction:reverse]">
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
