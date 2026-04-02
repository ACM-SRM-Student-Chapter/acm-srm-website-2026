"use client";

import { motion } from "framer-motion";
import { CalendarDays, MapPin, Mic2, Sparkles } from "lucide-react";

export default function SymposiumHighlight() {
  return (
    <section className="relative z-20 w-full py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2rem] border border-acm-electric/20 bg-gradient-to-br from-foreground/5 to-foreground/10 p-8 backdrop-blur-3xl md:p-16 lg:p-20"
        >
          {/* Animated Background Glow */}
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-acm-violet/20 blur-[100px]" />
          <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-acm-electric/20 blur-[100px]" />

          <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left Column: Event Details */}
            <div className="flex flex-col items-start justify-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-acm-electric/50 bg-acm-electric/10 px-4 py-1.5 text-sm font-bold tracking-wide text-acm-electric shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                <Sparkles className="h-4 w-4" />
                FLAGSHIP EVENT
              </div>

              <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Symposium on <br />
                <span className="bg-gradient-to-r from-acm-blue via-acm-violet to-acm-electric bg-clip-text text-transparent">
                  Responsible AI
                </span>
              </h2>

              <p className="mb-8 max-w-lg text-lg text-foreground/70">
                Join us for an immersive 3-day exploration into the ethics,
                development, and future of Artificial Intelligence with leading
                industry experts.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background/50 backdrop-blur-md">
                    <CalendarDays className="h-5 w-5 text-acm-violet" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase text-foreground/50">
                      Date
                    </span>
                    <span className="font-semibold text-foreground">
                      18–20 March 2026
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background/50 backdrop-blur-md">
                    <MapPin className="h-5 w-5 text-acm-electric" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase text-foreground/50">
                      Venue
                    </span>
                    <span className="font-semibold text-foreground">
                      Tech Park, SRMIST
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Speakers & Actions */}
            <div className="flex flex-col justify-center space-y-6 lg:pl-12">
              <h3 className="flex items-center gap-2 text-xl font-bold text-foreground">
                <Mic2 className="h-5 w-5 text-acm-pink" />
                Keynote Speakers
              </h3>

              <div className="flex flex-col gap-4">
                {/* Speaker 1 */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="glass-panel flex items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-foreground/5"
                >
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-acm-blue to-acm-violet" />
                  <div>
                    <h4 className="font-bold text-foreground">
                      Dr. Geetha Raju
                    </h4>
                    <p className="text-sm text-foreground/60">IIT Madras</p>
                  </div>
                </motion.div>

                {/* Speaker 2 */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="glass-panel flex items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-foreground/5"
                >
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-acm-violet to-acm-pink" />
                  <div>
                    <h4 className="font-bold text-foreground">
                      Dr. Mary Anita Rajam V
                    </h4>
                    <p className="text-sm text-foreground/60">
                      Anna University
                    </p>
                  </div>
                </motion.div>
              </div>

              <a
                href="https://forms.gle/h78c3AYiYnm8o4VE6"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="mt-4 w-full rounded-full bg-foreground px-8 py-4 font-bold text-background transition-transform hover:scale-[1.02] active:scale-[0.98]">
                  Register Now
                </button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
