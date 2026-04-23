"use client";

import { useState, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Code2, Github, Layers } from "lucide-react";
import { Playfair_Display, Anton, Inter } from "next/font/google";
import dynamic from "next/dynamic";
import { projectsData } from "@/data/projects";

// ─── Fonts ────────────────────────────────────────────────────────────────────
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const anton = Anton({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"] });

// ─── Animation constants ──────────────────────────────────────────────────────
const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

// ─── Shimmer CSS — injected once via <style>, not dangerouslySetInnerHTML ─────
const SHIMMER_CSS = `@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`;

// ─── Types ─────────────────────────────────────────────────────────────────────
type Project = (typeof projectsData)[number];

// ─── Derive unique tech tags for filter pills ─────────────────────────────────
// Done at module scope — computed once, never recreated
const ALL_TAGS: string[] = Array.from(
  new Set(projectsData.flatMap((p) => (p as any).tags ?? [])),
).sort() as string[];

const FILTER_OPTIONS = ["All", ...ALL_TAGS];

// Pre-compute per-tag counts
const TAG_COUNTS: Record<string, number> = { All: projectsData.length };
ALL_TAGS.forEach((tag) => {
  TAG_COUNTS[tag] = projectsData.filter((p) =>
    ((p as any).tags ?? []).includes(tag),
  ).length;
});

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const ShimmerEffect = memo(() => (
  <div
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent z-10"
    style={{ animation: "shimmer 1.5s infinite" }}
  />
));
ShimmerEffect.displayName = "ShimmerEffect";

const ProjectCardSkeleton = memo(() => (
  <div className="flex flex-col overflow-hidden rounded-[2rem] p-2 bg-white border border-black/5 shadow-sm relative">
    <ShimmerEffect />
    <div className="h-64 w-full rounded-[1.5rem] bg-gray-100" />
    <div className="flex flex-col p-6 sm:p-8">
      <div className="h-8 w-3/4 bg-gray-200 rounded-lg mb-4" />
      <div className="h-4 w-full bg-gray-100 rounded mb-2" />
      <div className="h-4 w-5/6 bg-gray-100 rounded mb-8" />
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-gray-200 rounded-full" />
        <div className="h-6 w-20 bg-gray-200 rounded-full" />
        <div className="h-6 w-14 bg-gray-200 rounded-full" />
      </div>
    </div>
  </div>
));
ProjectCardSkeleton.displayName = "ProjectCardSkeleton";

// ─── Lazy ProjectCard ─────────────────────────────────────────────────────────
const ProjectCard = dynamic(() => import("@/components/ui/ProjectCard"), {
  loading: () => <ProjectCardSkeleton />,
  ssr: false,
});

// ─── Stats bar — shown above the grid ─────────────────────────────────────────
const StatsBar = memo(
  ({ total, showing }: { total: number; showing: number }) => (
    <motion.div
      layout
      className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-black/30 px-1"
    >
      <span>
        <AnimatePresence mode="wait">
          <motion.span
            key={showing}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="inline-block"
          >
            {showing}
          </motion.span>
        </AnimatePresence>{" "}
        / {total} projects
      </span>
      <span className="flex items-center gap-1.5">
        <Layers className="h-3 w-3" aria-hidden /> Open Source
      </span>
    </motion.div>
  ),
);
StatsBar.displayName = "StatsBar";

// ─── Empty state ──────────────────────────────────────────────────────────────
const EmptyState = memo(({ tag }: { tag: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
    className="col-span-full py-28 flex flex-col items-center gap-4 text-center"
  >
    <div className="w-16 h-16 rounded-2xl bg-acm-blue/8 border border-acm-blue/20 flex items-center justify-center">
      <Github className="h-7 w-7 text-acm-blue/50" aria-hidden />
    </div>
    <p className={`text-xl text-black/35 italic ${playfair.className}`}>
      No projects tagged{" "}
      <strong className="not-italic font-bold text-acm-blue/60">"{tag}"</strong>{" "}
      yet.
    </p>
    <p className="text-xs font-bold uppercase tracking-widest text-black/25">
      Check back soon
    </p>
  </motion.div>
));
EmptyState.displayName = "EmptyState";

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const [activeTag, setActiveTag] = useState("All");

  // Memoised filtered list
  const filteredProjects = useMemo<Project[]>(
    () =>
      activeTag === "All"
        ? projectsData
        : projectsData.filter((p) =>
            ((p as any).tags ?? []).includes(activeTag),
          ),
    [activeTag],
  );

  const handleTagChange = useCallback((tag: string) => setActiveTag(tag), []);

  return (
    <>
      <style>{SHIMMER_CSS}</style>

      <main
        className={`relative flex min-h-screen flex-col items-center pb-24 pt-20 bg-white overflow-hidden ${inter.className}`}
        aria-labelledby="projects-heading"
      >
        {/* Grid background */}
        <div
          aria-hidden
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        <div
          aria-hidden
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-acm-electric/10 rounded-full blur-[120px] pointer-events-none z-0"
        />
        <div
          aria-hidden
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-acm-pink/5 rounded-full blur-[120px] pointer-events-none z-0"
        />
        <div
          aria-hidden
          className="absolute bottom-1/4 left-1/3 w-[700px] h-[700px] bg-acm-violet/10 rounded-full blur-[150px] pointer-events-none z-0"
        />

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="container relative z-10 mx-auto px-4 py-16 text-center"
        >
          <motion.div variants={fadeUp} className="mb-4 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-acm-blue/30 bg-acm-blue/10 px-4 py-1.5 text-sm font-bold tracking-wide text-acm-blue bg-white/50 backdrop-blur-md">
              <Code2 className="h-4 w-4" aria-hidden /> OPEN SOURCE
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            id="projects-heading"
            className={`mb-6 text-5xl md:text-7xl text-[#111315] uppercase tracking-wide ${anton.className}`}
          >
            Built by <br />
            <span className="bg-acm-blue bg-clip-text text-transparent">
              ACM Student Chapter SRM
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className={`mx-auto max-w-2xl text-xl text-black/60 italic ${playfair.className}`}
          >
            Explore the tools, applications, and systems engineered by our
            student body. We believe in learning by building.
          </motion.p>
        </motion.div>

        {/* ── Content ─────────────────────────────────────────────────────── */}
        <div className="mx-auto relative z-10 w-full max-w-7xl px-4 sm:px-6 space-y-8">
          {/* Tech tag filters — only render if tags exist */}
          {FILTER_OPTIONS.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: EASE_OUT_EXPO }}
              className="flex flex-wrap justify-center gap-2 sm:gap-3"
              role="tablist"
              aria-label="Filter projects by technology"
            >
              {FILTER_OPTIONS.map((tag) => {
                const isActive = activeTag === tag;
                const count = TAG_COUNTS[tag] ?? 0;
                return (
                  <button
                    key={tag}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleTagChange(tag)}
                    className="relative rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acm-blue/30"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="projects-filter-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-[#111315] shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span
                      className={
                        isActive
                          ? "text-white"
                          : "text-black/55 hover:text-acm-blue transition-colors"
                      }
                    >
                      {tag}
                    </span>
                    <span
                      className={`ml-1.5 inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none ${isActive ? "bg-white/20 text-white" : "bg-black/8 text-black/40"}`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          )}

          {/* Live count bar */}
          <StatsBar
            total={projectsData.length}
            showing={filteredProjects.length}
          />

          {/* Projects grid — 1 col → 2 col md */}
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <motion.div
                    key={(project as any).id}
                    layout
                    initial={{ opacity: 0, y: 36, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      y: 20,
                      scale: 0.97,
                      transition: { duration: 0.2 },
                    }}
                    transition={{
                      duration: 0.5,
                      ease: EASE_OUT_EXPO,
                      delay: index * 0.07,
                    }}
                  >
                    <ProjectCard project={project} index={index} />
                  </motion.div>
                ))
              ) : (
                <EmptyState key="empty" tag={activeTag} />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </>
  );
}
