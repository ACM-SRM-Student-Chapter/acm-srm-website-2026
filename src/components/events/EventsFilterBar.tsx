"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FILTER_TABS, type FilterTabId } from "@/data/eventsData";

interface EventsFilterBarProps {
  activeFilter: FilterTabId;
  onFilterChange: (tab: FilterTabId) => void;
}

export default function EventsFilterBar({
  activeFilter,
  onFilterChange,
}: EventsFilterBarProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      role="tablist"
      aria-label="Filter events"
      className="relative z-20 mb-10 rounded-2xl border border-white/10 bg-[#070114]/90 p-2 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        {/* Left: Segmented Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onFilterChange(tab.id)}
                className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-mono text-xs sm:text-sm uppercase tracking-wider transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-acm-electric ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-white/50 hover:text-white/80 border border-transparent hover:border-white/10"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId={prefersReducedMotion ? undefined : "activeFilterPill"}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 30 }
                    }
                    className="absolute inset-0 rounded-full bg-acm-electric/15 border border-acm-electric/50 shadow-[0_0_20px_rgba(0,229,255,0.2)]"
                    aria-hidden
                  />
                )}

                <span className="relative z-10 hidden sm:inline">{tab.label}</span>
                <span className="relative z-10 sm:hidden">{tab.shortLabel}</span>

                <span
                  className={`relative z-10 font-mono text-[11px] tabular-nums px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-acm-electric/20 text-acm-electric font-bold"
                      : "bg-white/5 text-white/40"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Developer Telemetry */}
        <div className="flex items-center justify-between lg:justify-end gap-2.5 px-3 py-1.5 lg:py-0 border-t border-white/5 lg:border-t-0">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-white/40">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            {"// TIMES IN IST"}
          </span>
        </div>
      </div>
    </div>
  );
}

