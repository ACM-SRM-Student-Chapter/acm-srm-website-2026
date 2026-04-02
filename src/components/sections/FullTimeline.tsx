"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

const allEvents = [
  {
    date: "August 2024",
    title: "Recruitment Drive 2024",
    type: "Community",
    desc: "Welcoming the brightest minds of SRMIST to the world's largest computing society.",
  },
  {
    date: "15 April",
    title: "Orientation",
    type: "Chapter",
    desc: "An engaging start marking the revival of the chapter, featuring insights from Prof. Venkatesh Raman.",
  },
  {
    date: "03 April",
    title: "Ideaforge",
    type: "Ideathon",
    desc: "A vibrant platform for individuals to tackle real-world challenges through innovative solutions.",
  },
  {
    date: "Upcoming",
    title: "Pair Programming Hackathon",
    type: "Hackathon",
    desc: "A 24-hour coding sprint focusing on collaboration, DSA, and Full Stack development.",
  },
  {
    date: "Upcoming",
    title: "Health Conclave",
    type: "Tech x Med",
    desc: "Bridging the gap between medical sciences and AI-driven technological innovation.",
  },
  {
    date: "Upcoming",
    title: "Refresher Course on Generative AI",
    type: "Workshop",
    desc: "Hands-on sessions diving deep into LLMs, prompt engineering, and AI architecture.",
  },
];

export default function FullTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative z-20 w-full py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Chapter Timeline</h2>
          <p className="mt-4 text-foreground/60">
            Our journey of pushing boundaries.
          </p>
        </div>

        <div className="relative mx-auto max-w-3xl">
          {/* Background Line */}
          <div className="absolute left-[20px] top-0 h-full w-[2px] bg-foreground/10 md:left-1/2 md:-ml-[1px]" />

          {/* Animated Draw Line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[20px] top-0 w-[2px] bg-acm-blue md:left-1/2 md:-ml-[1px]"
          />

          <div className="flex flex-col gap-16">
            {allEvents.map((event, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row ${isEven ? "md:flex-row-reverse" : ""} items-center`}
                >
                  {/* Glowing Node */}
                  <div className="absolute left-[20px] z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-background ring-4 ring-background md:left-1/2">
                    <div className="h-2 w-2 rounded-full bg-acm-blue" />
                  </div>

                  <div className="hidden w-1/2 md:block" />

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                    className={`ml-12 w-full md:ml-0 md:w-1/2 ${isEven ? "md:pl-10" : "md:pr-10"}`}
                  >
                    <div className="group glass-panel rounded-3xl p-6 transition-all hover:bg-foreground/5">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-bold text-acm-violet">
                          {event.date}
                        </span>
                        <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-xs font-semibold">
                          {event.type}
                        </span>
                      </div>
                      <h3 className="mb-2 text-xl font-bold">{event.title}</h3>
                      <p className="text-sm text-foreground/70">{event.desc}</p>

                      <button className="mt-4 inline-flex items-center text-sm font-bold text-foreground transition-colors hover:text-acm-electric">
                        View Details{" "}
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
