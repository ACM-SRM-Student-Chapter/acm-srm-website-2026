"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Code2 } from "lucide-react";

// Placeholder data for ACM Projects (I included some Full Stack & IoT concepts based on your background!)
const projectsData = [
  {
    id: 1,
    title: "Project Vault",
    description:
      "A centralized, open-source repository for SRM students to store, share, and collaborate on academic and hackathon projects.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    tech: ["Next.js", "Tailwind", "Node.js", "MongoDB"],
    github: "#",
    live: "#",
  },
  {
    id: 2,
    title: "Smart Travel Planner",
    description:
      "An AI-powered web application that generates personalized travel itineraries based on budget, weather, and user preferences.",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop",
    tech: ["React", "Python", "FastAPI", "OpenAI"],
    github: "#",
    live: "#",
  },
  {
    id: 3,
    title: "IoT Campus Security System",
    description:
      "A hardware-software integrated solution using ESP32 and computer vision to monitor access points across the university campus.",
    image:
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=1000&auto=format&fit=crop",
    tech: ["C++", "Python", "OpenCV", "AWS IoT"],
    github: "#",
    live: "#",
  },
  {
    id: 4,
    title: "ACM Student Portal PWA",
    description:
      "A progressive web app for chapter members to track event registrations, domain updates, and internal leaderboards.",
    image:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1000&auto=format&fit=crop",
    tech: ["React", "PWA", "Firebase", "Framer Motion"],
    github: "#",
    live: "#",
  },
];

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center pb-24 pt-20">
      {/* Page Header */}
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-acm-blue/30 bg-acm-blue/10 px-4 py-1.5 text-sm font-bold tracking-wide text-acm-blue shadow-[0_0_15px_rgba(0,91,181,0.2)]">
            <Code2 className="h-4 w-4" />
            OPEN SOURCE
          </div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl"
        >
          Built by <br />
          <span className="bg-gradient-to-r from-acm-electric to-acm-blue bg-clip-text text-transparent">
            ACM SRM
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto max-w-2xl text-lg text-foreground/60"
        >
          Explore the tools, applications, and systems engineered by our student
          body. We believe in learning by building.
        </motion.p>
      </div>

      {/* Projects Grid */}
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group glass-panel relative flex flex-col overflow-hidden rounded-[2rem] p-2 transition-all hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(0,229,255,0.15)]"
            >
              {/* Image Preview */}
              <div className="relative h-64 w-full overflow-hidden rounded-[1.5rem]">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent opacity-60 transition-opacity group-hover:opacity-20" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Floating Action Buttons */}
                <div className="absolute right-4 top-4 z-20 flex gap-2 translate-x-12 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  <a
                    href={project.github}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-acm-electric hover:text-black"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href={project.live}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-acm-blue"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <h3 className="mb-3 text-2xl font-bold text-foreground">
                  {project.title}
                </h3>
                <p className="mb-6 flex-1 text-foreground/70 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-foreground/5 px-3 py-1 text-xs font-semibold text-foreground/70 transition-colors group-hover:bg-acm-blue/10 group-hover:text-acm-blue"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
