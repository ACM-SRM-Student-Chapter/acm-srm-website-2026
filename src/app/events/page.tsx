"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, User } from "lucide-react";
import LaserFlow from "@/components/ui/LaserFlow";
import Head from "next/head";

// --- Data ---
const regularEvents = [
  {
    date: "03 April, 2024",
    title: "Ideaforge",
    location: "IMAC LAB, 14th Floor, Tech Park, SRMIST",
    description:
      "A vibrant platform for individuals to tackle real-world challenges through innovative solutions, bringing together bright minds to collaborate and create.",
    color: "acm-electric",
  },
  {
    date: "15 April, 2024",
    title: "Orientation",
    location: "IMAC Lab, 14th Floor, Tech Park, SRMIST",
    description:
      "An engaging and inspiring start marking the revival of the chapter. Unveiling our vision for the upcoming year and introducing resources.",
    speakers: [
      "Prof. Venkatesh Raman (President, ACM India)",
      "Dr. M. Suchithra",
      "S Sembon Surakshitha",
    ],
    color: "acm-violet",
  },
  {
    date: "March - April 2026",
    title: "Recruitment Drive 2026",
    location: "Campus Wide",
    description:
      "A pivotal moment marking the evolution of our chapter as we welcome a new wave of dynamic talent and diverse expertise, strengthening our foundation for future innovations.",
    color: "acm-pink",
  },
];

// --- Funny Casual SVG Arrows ---
const ArrowRightCurve = () => (
  <svg
    width="120"
    height="150"
    viewBox="0 0 120 150"
    fill="none"
    className="absolute -bottom-24 left-[calc(50%+20px)] hidden md:block opacity-40 z-0"
  >
    <path
      d="M10,10 Q110,40 100,130"
      stroke="white"
      strokeWidth="3"
      strokeDasharray="8 8"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M85,115 L100,135 L115,115"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowLeftCurve = () => (
  <svg
    width="120"
    height="150"
    viewBox="0 0 120 150"
    fill="none"
    className="absolute -bottom-24 right-[calc(50%+20px)] hidden md:block opacity-40 z-0"
  >
    <path
      d="M110,10 Q10,40 20,130"
      stroke="white"
      strokeWidth="3"
      strokeDasharray="8 8"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M5,115 L20,135 L35,115"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function EventsPage() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isFlagshipHovered, setIsFlagshipHovered] = useState(false);

  // Mouse mask effect for the flagship event
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (spotlightRef.current) {
      spotlightRef.current.style.setProperty("--mx", `${x}px`);
      spotlightRef.current.style.setProperty("--my", `${y}px`);
    }
  };

  return (
    <main className="flex flex-col items-center pb-20 pt-20 bg-background">
      <Head>
        <title>Events | ACM SRMIST</title>
        <meta
          name="description"
          content="Explore our hackathons, workshops, and the upcoming Symposium on Responsible AI."
        />
      </Head>

      {/* Page Header (Light Mode) */}
      <div className="container mx-auto px-4 py-12 text-center z-10 relative">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-5xl font-extrabold tracking-tight md:text-7xl"
        >
          Discover Our <br />
          <span className="bg-gradient-to-r from-acm-electric to-acm-violet bg-clip-text text-transparent">
            Experiences
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto max-w-2xl text-lg text-foreground/60"
        >
          From intense 24-hour coding sprints to deep-dive technical workshops,
          explore the events that shape our chapter.
        </motion.p>
      </div>

      {/* THE DARK PORTAL CONTAINER */}
      <section className="relative z-20 w-full pb-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
          <div className="rounded-[3rem] bg-[#060010] p-6 sm:p-12 md:p-20 shadow-[0_20px_80px_rgba(123,97,255,0.15)] border border-white/5 relative overflow-hidden">
            {/* Inner Header */}
            <div className="mb-24 text-center max-w-3xl mx-auto relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-extrabold tracking-tight md:text-5xl mb-6 text-white"
              >
                Fostering Innovation in <br />
                <span className="bg-gradient-to-r from-acm-blue via-acm-violet to-acm-pink bg-clip-text text-transparent">
                  Computing
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-white/60 leading-relaxed"
              >
                Unite creativity and technology as we shape the future through
                transformative events, ideas, connections, and a thriving
                community.
              </motion.p>
            </div>

            {/* Regular Events - Zig Zag with Casual Arrows */}
            <div className="relative flex flex-col gap-20 md:gap-32 mb-32 z-10">
              {regularEvents.map((event, idx) => {
                const isEven = idx % 2 === 0;

                return (
                  <div
                    key={idx}
                    className="relative flex flex-col md:flex-row items-center w-full"
                  >
                    {/* Connecting Arrows */}
                    {idx < regularEvents.length - 1 &&
                      (isEven ? <ArrowRightCurve /> : <ArrowLeftCurve />)}
                    {idx === regularEvents.length - 1 && <ArrowRightCurve />}

                    {/* Empty space for alternating layout */}
                    <div
                      className={`hidden md:block w-1/2 ${isEven ? "order-2" : "order-1"}`}
                    />

                    {/* Event Card */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -100 : 100, y: 50 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{
                        duration: 0.7,
                        type: "spring",
                        bounce: 0.4,
                      }}
                      className={`w-full md:w-1/2 relative z-10 ${isEven ? "order-1 md:pr-12" : "order-2 md:pl-12"}`}
                    >
                      <div className="group relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 bg-white/5 border border-white/10 backdrop-blur-xl hover:-translate-y-2 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                        <div
                          className={`mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-${event.color}`}
                        >
                          <Calendar className="h-4 w-4" />
                          {event.date}
                        </div>
                        <h3 className="mb-3 text-3xl font-black text-white">
                          {event.title}
                        </h3>
                        <div className="mb-4 flex items-start gap-2 text-sm font-medium text-white/50">
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                          <span>{event.location}</span>
                        </div>
                        <p className="text-white/70 leading-relaxed mb-6">
                          {event.description}
                        </p>

                        {event.speakers && (
                          <div className="mt-4 border-t border-white/10 pt-4">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/50 mb-3">
                              <User className="h-3 w-3" /> Speakers
                            </div>
                            <ul className="space-y-2">
                              {event.speakers.map((speaker, i) => (
                                <li
                                  key={i}
                                  className="text-sm font-medium text-white/80 flex items-center gap-2"
                                >
                                  <div
                                    className={`h-1.5 w-1.5 rounded-full bg-${event.color}`}
                                  />
                                  {speaker}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* FLAGSHIP EVENT: Interactive LaserFlow Billboard with Poster */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full overflow-hidden rounded-[2.5rem] shadow-2xl bg-black border border-white/10 group cursor-crosshair"
              style={{ minHeight: "500px" }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsFlagshipHovered(true)}
              onMouseLeave={() => {
                setIsFlagshipHovered(false);
                if (spotlightRef.current) {
                  spotlightRef.current.style.setProperty("--mx", "-9999px");
                  spotlightRef.current.style.setProperty("--my", "-9999px");
                }
              }}
            >
              {/* Dynamic Laser Background (Increases intensity on hover!) */}
              <div className="absolute inset-0 z-0">
                <LaserFlow
                  color="#7B61FF"
                  horizontalBeamOffset={0.1}
                  verticalBeamOffset={0.0}
                  wispSpeed={isFlagshipHovered ? 40 : 15}
                  flowSpeed={isFlagshipHovered ? 1.5 : 0.35}
                  wispIntensity={isFlagshipHovered ? 20 : 5}
                  wispDensity={isFlagshipHovered ? 2.5 : 1}
                />
              </div>

              {/* Mouse Spotlight Mask Reveal */}
              <div
                ref={spotlightRef}
                className="absolute inset-0 z-10 pointer-events-none opacity-60 transition-opacity duration-300"
                style={
                  {
                    "--mx": "-9999px",
                    "--my": "-9999px",
                    maskImage:
                      "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.8) 100px, rgba(255,255,255,0.2) 250px, rgba(255,255,255,0) 400px)",
                    WebkitMaskImage:
                      "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.8) 100px, rgba(255,255,255,0.2) 250px, rgba(255,255,255,0) 400px)",
                  } as any
                }
              >
                <div className="absolute inset-0 bg-gradient-to-br from-acm-electric/30 via-transparent to-acm-violet/30 mix-blend-screen" />
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(#ffffff 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
              </div>

              {/* Content Overlay (Text Left, Poster Right) */}
              <div className="relative z-20 flex flex-col lg:flex-row items-center justify-between p-8 md:p-16 h-full gap-12 pointer-events-none">
                {/* Left Side: Text Details */}
                <div className="flex-1 w-full">
                  <div className="inline-flex items-center gap-2 rounded-full border border-acm-violet/50 bg-acm-violet/20 px-4 py-1.5 text-sm font-extrabold tracking-widest text-acm-violet backdrop-blur-md mb-8">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-acm-violet opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-acm-violet"></span>
                    </span>
                    FLAGSHIP EVENT
                  </div>

                  <h3 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-[0_0_15px_rgba(123,97,255,0.5)]">
                    Symposium on <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-acm-electric to-acm-violet">
                      Responsible AI
                    </span>
                  </h3>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-white/70 font-medium mb-10">
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                      <Calendar className="h-5 w-5 text-acm-electric" />
                      <span>18-20 March 2026</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                      <MapPin className="h-5 w-5 text-acm-pink" />
                      <span>Tech Park, SRMIST</span>
                    </div>
                  </div>

                  <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-xl">
                    Join us for an immersive 3-day exploration into the ethics,
                    development, and future of Artificial Intelligence with
                    leading industry experts.
                  </p>

                  {/* Speakers Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 border-t border-white/10 pt-8 max-w-2xl">
                    <div>
                      <h4 className="text-acm-electric font-bold text-xs uppercase tracking-wider mb-1">
                        Keynote
                      </h4>
                      <p className="text-white font-bold text-sm">
                        Prof. Mary Anita Rajam V
                      </p>
                      <p className="text-white/50 text-xs">
                        Professor & Head, CSE, Anna Univ.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-acm-violet font-bold text-xs uppercase tracking-wider mb-1">
                        Speaker
                      </h4>
                      <p className="text-white font-bold text-sm">
                        Mr. Siva Venkata Satya Narayana
                      </p>
                      <p className="text-white/50 text-xs">
                        Founder & CEO, Altruisty Innovation
                      </p>
                    </div>
                    <div>
                      <h4 className="text-acm-pink font-bold text-xs uppercase tracking-wider mb-1">
                        Speaker
                      </h4>
                      <p className="text-white font-bold text-sm">
                        Mr. Murali Kannan
                      </p>
                      <p className="text-white/50 text-xs">
                        DGM IT, Sun TV Network
                      </p>
                    </div>
                    <div>
                      <h4 className="text-acm-blue font-bold text-xs uppercase tracking-wider mb-1">
                        Speaker
                      </h4>
                      <p className="text-white font-bold text-sm">
                        Mr. R S L Balaji
                      </p>
                      <p className="text-white/50 text-xs">
                        CIO, Altruisty Innovation
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side: The 3D Poster */}
                <div className="w-full lg:w-[400px] flex justify-center lg:justify-end perspective-[1000px]">
                  <div
                    className={`relative w-full max-w-[320px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-white/10 transition-all duration-700 ease-out ${isFlagshipHovered ? "rotate-y-0 rotate-x-0 scale-105" : "-rotate-y-12 rotate-x-6 scale-100"}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent z-10 pointer-events-none" />
                    <img
                      src="/events/Symposium on Responsible Al.jpeg"
                      alt="Symposium on Responsible AI Poster"
                      className="w-full h-full object-cover relative z-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop";
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
