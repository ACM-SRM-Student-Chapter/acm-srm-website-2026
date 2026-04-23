"use client";

import { motion } from "framer-motion";
import { Linkedin, Github, Instagram } from "lucide-react";
import { Playfair_Display, Anton } from "next/font/google";

// Initialize Google Fonts
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const anton = Anton({ subsets: ["latin"], weight: "400" });

interface IdCardProps {
  name: string;
  role: string;
  image: string;
  color?: string;
  socials?: {
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
}

const colorMap: Record<string, string> = {
  blue: "from-[#005bb5] to-[#0A0A0A]",
  electric: "from-[#00E5FF] to-[#0A0A0A]",
  violet: "from-[#7B61FF] to-[#0A0A0A]",
  pink: "from-[#FF4081] to-[#0A0A0A]",
  green: "from-[#00E676] to-[#0A0A0A]",
};

const textMap: Record<string, string> = {
  blue: "text-[#005bb5]",
  electric: "text-[#3FA9D6]",
  violet: "text-[#7B61FF]",
  pink: "text-[#FF4081]",
  green: "text-[#00A844]",
};

export default function IdCard({
  name,
  role,
  image,
  color = "electric",
  socials,
}: IdCardProps) {
  return (
    <div className="relative flex flex-col items-center justify-start h-[500px] w-[280px]">
      {/* 1. The Lanyard (CSS Drawn) */}
      <div className="absolute top-0 z-0 flex w-full flex-col items-center">
        {/* Left/Right Strings */}
        <div className="relative flex h-24 w-16 justify-between overflow-hidden">
          <div className="h-full w-2 rotate-[15deg] bg-gradient-to-b from-[#111] to-[#222] shadow-inner" />
          <div className="h-full w-2 -rotate-[15deg] bg-gradient-to-b from-[#111] to-[#222] shadow-inner" />
        </div>
        {/* Lanyard Clip/Hook */}
        <div className="z-10 -mt-2 h-4 w-6 rounded-b-md bg-zinc-400 bg-gradient-to-b from-zinc-300 to-zinc-500 shadow-md" />
        <div className="z-10 h-6 w-3 rounded-full border-[3px] border-zinc-400" />
      </div>

      {/* 2. The Swinging Badge */}
      <motion.div
        drag
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        dragElastic={0.4}
        whileDrag={{ scale: 1.05, cursor: "grabbing" }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative z-20 mt-[100px] flex h-[380px] w-full cursor-grab flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-background/80 shadow-2xl backdrop-blur-2xl"
      >
        {/* Glowing Background Accent */}
        <div
          className={`absolute inset-0 bg-gradient-to-b opacity-20 ${colorMap[color] || colorMap.electric}`}
        />

        {/* Card Header (Punch Hole & Logo) */}
        <div className="flex w-full flex-col items-center pb-4 pt-4 relative z-10">
          <div className="h-2 w-10 rounded-full bg-black/50 shadow-inner" />{" "}
          {/* Punch hole */}
          <div className="mt-4 text-[10px] font-black tracking-[0.2em] text-foreground/40">
            ACM Student Chapter SRMIST
          </div>
        </div>

        {/* Profile Image (Square cut) */}
        <div className="mx-auto h-45 w-40 overflow-hidden rounded-2xl border border-white/10 bg-black shadow-inner z-10 relative">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-all duration-500 hover:scale-110"
          />
        </div>

        {/* Identification Text */}
        <div className="flex flex-1 flex-col items-center justify-center p-6 text-center z-10">
          <h3
            className={`text-2xl leading-tight text-foreground uppercase ${anton.className} tracking-wide`}
          >
            {name}
          </h3>
          <div
            className={`mt-2 font-bold uppercase tracking-widest text-[11px] ${textMap[color] || textMap.electric} ${playfair.className} italic`}
          >
            {role}
          </div>
        </div>

        {/* Footer (Social Links & Barcode) */}
        <div className="flex w-full items-center justify-between border-t border-white/10 bg-black/40 px-6 py-4 z-10">
          <div className="flex gap-2">
            {socials?.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-foreground/50 transition-colors hover:text-[#0A66C2]"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            {socials?.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noreferrer"
                className="text-foreground/50 transition-colors hover:text-white"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {socials?.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-foreground/50 transition-colors hover:text-[#E1306C]"
              >
                <Instagram className="h-4 w-4" />
              </a>
            )}
          </div>

          {/* Aesthetic Barcode */}
          <div className="flex h-5 items-center gap-[2px] opacity-30">
            <div className="h-full w-1 bg-white"></div>
            <div className="h-full w-[2px] bg-white"></div>
            <div className="h-full w-1 bg-white"></div>
            <div className="h-full w-[3px] bg-white"></div>
            <div className="h-full w-[1px] bg-white"></div>
            <div className="h-full w-1 bg-white"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
