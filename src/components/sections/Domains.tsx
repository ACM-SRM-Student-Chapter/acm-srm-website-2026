"use client";

import { motion } from "framer-motion";
import { Cpu, Megaphone, Handshake, Palette, CalendarDays } from "lucide-react";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";

const domainsData = [
  {
    id: 1,
    title: "FOUNDRY",
    subtitle: "Technical",
    description:
      "The Technical Domain is the core engineering division, focused on building and innovation. It consists of three key areas: " +
      "1. Competitive Programming (DSA) – Problem-solving and algorithms. " +
      "2. Full Stack + Cloud & DevOps – Scalable apps and infrastructure. " +
      "3. AI/ML + MLOps – Intelligent systems and deployment. " +
      "Together, they power the chapter’s technology.",
    icon: <Cpu className="h-10 w-10 text-acm-electric" />,
    bgColor: "bg-acm-electric/10",
  },
  {
    id: 2,
    title: "Amplifier",
    subtitle: "PR",
    description:
      "The voice of ACM, handling public relations, outreach, and ensuring our impact reaches every corner of the campus.",
    icon: <Megaphone className="h-10 w-10 text-acm-violet" />,
    bgColor: "bg-acm-violet/10",
  },
  {
    id: 3,
    title: "Elevators",
    subtitle: "Sponsorship",
    description:
      "Driving growth through strategic industry partnerships, securing funding, and building relationships with top tech firms.",
    icon: <Handshake className="h-10 w-10 text-acm-blue" />,
    bgColor: "bg-acm-blue/10",
  },
  {
    id: 4,
    title: "Canvas",
    subtitle: "Media & Creatives",
    description:
      "Crafting the visual identity and artistic direction of the chapter through UI/UX, graphic design, and video production.",
    icon: <Palette className="h-10 w-10 text-acm-pink" />,
    bgColor: "bg-acm-pink/10",
  },
  {
    id: 5,
    title: "Orchestrators",
    subtitle: "Events",
    description:
      "Planning and executing seamless, large-scale tech events, hackathons, and symposiums from the ground up.",
    icon: <CalendarDays className="h-10 w-10 text-acm-green" />,
    bgColor: "bg-acm-green/10",
  },
];

export default function Domains() {
  return (
    <section className="relative z-20 w-full py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold tracking-tight md:text-6xl"
          >
            Together, we excel in <br />
            <span className="bg-gradient-to-r from-acm-blue via-acm-violet to-acm-pink bg-clip-text text-transparent">
              Our Domains
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-2xl text-foreground/60 text-lg md:text-xl"
          >
            Five specialized divisions working in perfect sync to create the
            ultimate computing experience. Scroll to explore.
          </motion.p>
        </div>

        {/* ScrollStack Interactive Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-6xl h-[600px] overflow-hidden rounded-[3rem] border border-foreground/10 bg-foreground/5 shadow-2xl"
        >
          {/* Scroll instruction overlay fading at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/80 to-transparent pointer-events-none z-10 flex items-end justify-center pb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-foreground/40 animate-pulse">
              Scroll Inside
            </span>
          </div>

          <ScrollStack
            itemDistance={60}
            itemScale={0.04}
            itemStackDistance={35}
            baseScale={0.85}
            blurAmount={5}
          >
            {domainsData.map((domain) => (
              <ScrollStackItem
                key={domain.id}
                itemClassName="glass-panel bg-white/80 border-t-0 shadow-lg"
              >
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-black text-foreground drop-shadow-sm">
                        {domain.title}
                      </h3>
                      <p className="mt-2 text-sm font-extrabold uppercase tracking-widest text-foreground/50">
                        {domain.subtitle}
                      </p>
                    </div>
                    <div
                      className={`flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-2xl shadow-inner ${domain.bgColor}`}
                    >
                      {domain.icon}
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-medium">
                      {domain.description}
                    </p>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </motion.div>
      </div>
    </section>
  );
}
