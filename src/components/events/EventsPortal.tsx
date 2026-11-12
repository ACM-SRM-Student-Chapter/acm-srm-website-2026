"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { FilterTabId } from "@/data/eventsData";
import EventsFilterBar from "./EventsFilterBar";
import UpcomingBentoCard from "./UpcomingBentoCard";
import TechGoshipsSection from "./TechGoshipsSection";
import PastEventsView from "./PastEventsView";

export default function EventsPortal() {
  const [activeFilter, setActiveFilter] = useState<FilterTabId>("upcoming");

  return (
    <section className="relative z-20 w-full pb-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
        <div className="relative rounded-[2.5rem] sm:rounded-[3rem] bg-[#060010] p-5 sm:p-10 md:p-14 shadow-[0_30px_100px_rgba(123,97,255,0.2)] border border-white/10 overflow-hidden">
          {/* GFG-Inspired 48px Blueprint Structural Grid Overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
              `,
              backgroundSize: "48px 48px",
            }}
          />

          {/* Subtle Ambient Orbs inside Dark Portal */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-acm-electric/10 blur-[140px] z-0"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-acm-violet/10 blur-[150px] z-0"
          />

          {/* Interactive Segmented Filter Bar */}
          <EventsFilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          {/* Active View */}
          <AnimatePresence mode="wait">
            {activeFilter === "upcoming" && (
              <UpcomingBentoCard
                key="upcoming"
                onNavigate={setActiveFilter}
              />
            )}
            {activeFilter === "goships" && (
              <TechGoshipsSection key="goships" />
            )}
            {activeFilter === "past" && <PastEventsView key="past" />}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

