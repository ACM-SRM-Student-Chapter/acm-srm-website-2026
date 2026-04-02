"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Linkedin, Github, Instagram, Globe } from "lucide-react";

// We keep the interface local to prevent Turbopack import crashes
interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  accentColor?: string;
  socials?: {
    linkedin?: string;
    github?: string;
    instagram?: string;
    website?: string;
  };
}

const springConfig = { damping: 30, stiffness: 100, mass: 2 };

const colorMap: Record<string, string> = {
  blue: "bg-acm-blue text-white",
  electric: "bg-acm-electric text-black",
  violet: "bg-acm-violet text-white",
  pink: "bg-acm-pink text-white",
  green: "bg-acm-green text-black",
};

export default function TeamCard({
  name,
  role,
  image,
  accentColor = "blue",
  socials,
}: TeamCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);
  const scale = useSpring(1, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const rX = (mouseY / height - 0.5) * -30;
    const rY = (mouseX / width - 0.5) * 30;
    rotateX.set(rX);
    rotateY.set(rY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => scale.set(1.05)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
      className="group relative flex h-[360px] w-full cursor-pointer flex-col items-center justify-end rounded-[2.5rem] bg-foreground/5 p-6 [perspective:1000px] z-10 hover:z-50"
    >
      <div className="absolute inset-0 z-20 rounded-[2.5rem] bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-overlay" />

      <motion.div
        style={{ transform: "translateZ(30px)" }}
        className="absolute inset-0 z-0 overflow-hidden rounded-[2.5rem]"
      >
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
      </motion.div>

      {/* Social Icons Overlay (Appears on Hover) */}
      <motion.div
        style={{ transform: "translateZ(80px)" }}
        className="absolute top-6 flex gap-3 opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-100 z-40"
      >
        {socials?.linkedin && (
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-black/50 p-2.5 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white hover:text-[#0A66C2]"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        )}
        {socials?.github && (
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-black/50 p-2.5 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white hover:text-black"
          >
            <Github className="h-5 w-5" />
          </a>
        )}
        {socials?.instagram && (
          <a
            href={socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-black/50 p-2.5 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white hover:text-[#E1306C]"
          >
            <Instagram className="h-5 w-5" />
          </a>
        )}
        {socials?.website && (
          <a
            href={socials.website}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-black/50 p-2.5 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white hover:text-[#00E5FF]"
          >
            <Globe className="h-5 w-5" />
          </a>
        )}
      </motion.div>

      <motion.div
        style={{ transform: "translateZ(60px)" }}
        className="relative z-30 w-full text-center transition-transform duration-500 group-hover:-translate-y-4"
      >
        <div
          className={`mb-3 inline-block rounded-full px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest shadow-lg ${colorMap[accentColor] || colorMap.blue}`}
        >
          {role}
        </div>
        <h3 className="text-2xl font-black text-white drop-shadow-lg">
          {name}
        </h3>
      </motion.div>
    </motion.div>
  );
}
