"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Playfair_Display, Anton } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const anton = Anton({ subsets: ["latin"], weight: "400" });

interface ProjectProps {
  project: {
    id: string | number;
    title: string;
    description: string;
    image: string;
    tech: string[];
    github: string;
    live: string;
  };
  index: number;
}

export default function ProjectCard({ project, index }: ProjectProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative flex flex-col overflow-hidden rounded-[2rem] p-2 transition-all hover:-translate-y-2 bg-white border border-black/5 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,91,181,0.15)]"
    >
      {/* Image Preview */}
      <div className="relative h-64 w-full overflow-hidden rounded-[1.5rem]">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent opacity-60 transition-opacity group-hover:opacity-20" />
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Floating Action Buttons */}
        <div className="absolute right-4 top-4 z-20 flex gap-2 translate-x-12 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-acm-electric hover:text-black"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-acm-blue"
          >
            <ExternalLink className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3
          className={`mb-3 text-3xl uppercase tracking-wide text-[#111315] ${anton.className}`}
        >
          {project.title}
        </h3>
        <p
          className={`mb-6 flex-1 text-black/70 text-lg leading-relaxed ${playfair.className}`}
        >
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-black/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-black/60 transition-colors group-hover:bg-acm-blue/10 group-hover:text-acm-blue font-sans"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
