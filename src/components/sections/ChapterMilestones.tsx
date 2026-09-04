"use client";

import { useEffect, useRef } from "react";
import { Award } from "lucide-react";
import Image from "next/image";
import { Playfair_Display, Anton } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const anton = Anton({ subsets: ["latin"], weight: "400" });

const achievements = [
  {
    title: "LFX Mentorship",
    description:
      "Selected for the Linux Foundation Mentorship Program (LFX’26) under LF Decentralized Trust to contribute to the BiniBFT consensus project.",
    year: "2026",
    image: "/Achivements/LFX.webp",
  },
  {
    title: "Region Coordinator",
    description:
      "Appointed as Regional Coordinator for Region 4 (Tamil Nadu & Kerala) by ACM India to support and guide student chapters.",
    year: "2025 - 2026",
    image: "/Achivements/Region_Coordinator.webp",
  },
  {
    title: "ACM Winter School",
    description:
      "Selected for the prestigious ACM Winter School 2024 at DA-IICT on 'Algorithms for Big Data and Machine Learning'.",
    year: "2024 - 2025",
    image: "/Achivements/ACM_Winter_School.webp",
  },
  {
    title: "ACM Ambassador Award",
    description:
      "Recognized on a national level for exceptional contributions to the computing community, technical evangelism, and leadership excellence.",
    year: "2024",
    image: "/Achivements/ACM_Ambassador_Award.webp",
  },
];

export default function ChapterMilestones() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;
    const scrollerContent = Array.from(scrollerRef.current.children);
    
    // Duplicate items for infinite scroll effect
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true) as HTMLElement;
      scrollerRef.current?.appendChild(duplicatedItem);
    });
  }, []);

  return (
    <section className="py-20 overflow-hidden relative">
      <div className="mb-16 text-center px-4">
        <h2
          className={`text-5xl md:text-7xl uppercase tracking-widest text-transparent bg-pink-700 bg-clip-text ${anton.className}`}
        >
          Chapter Milestones
        </h2>
        <p
          className={`mt-6 text-white/60 text-xl ${playfair.className} italic max-w-2xl mx-auto`}
        >
          A testament to our technical rigor and continuous pursuit of excellence.
        </p>
      </div>

      <div
        ref={containerRef}
        className="w-full relative flex items-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
      >
        <div
          ref={scrollerRef}
          className="flex w-max min-w-full gap-8 py-4 px-4 hover:[animation-play-state:paused] animate-scroll"
        >
          {achievements.map((item, idx) => (
            <div
              key={`${item.title}-${idx}`}
              className="group relative flex-shrink-0 w-[300px] sm:w-[350px] aspect-[3/4] overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-[#111111] cursor-pointer"
            >
              {/* Poster Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 300px, 350px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Default Subtle Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060010]/90 via-[#060010]/20 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

              {/* Default Info (Bottom) */}
              <div className="absolute bottom-0 left-0 p-6 z-10 transition-transform duration-500 group-hover:translate-y-8 group-hover:opacity-0">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-acm-electric/20 px-3 py-1 text-xs font-bold tracking-widest text-acm-electric border border-acm-electric/30 backdrop-blur-md">
                  <Award className="h-4 w-4" /> {item.year}
                </div>
                <h3
                  className={`text-2xl uppercase tracking-wide text-white drop-shadow-md ${anton.className}`}
                >
                  {item.title}
                </h3>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/70 backdrop-blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100 flex flex-col justify-center p-8 text-center z-20">
                <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full bg-acm-electric/20 px-3 py-1 text-xs font-bold tracking-widest text-acm-electric border border-acm-electric/30 backdrop-blur-md mx-auto w-fit">
                  <Award className="h-4 w-4" /> {item.year}
                </div>
                <h3
                  className={`mb-4 text-3xl tracking-wide uppercase text-white ${anton.className}`}
                >
                  {item.title}
                </h3>
                <p className="text-white/80 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
