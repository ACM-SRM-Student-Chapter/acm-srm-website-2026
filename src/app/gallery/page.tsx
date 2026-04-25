"use client";

import {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useTransition,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { Playfair_Display, Anton, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const anton = Anton({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"] });

type Category =
  | "ALL"
  | "RECRUITMENT DRIVE 2026"
  | "SYMPOSIUM ON RESPONSIBLE AI"
  | "Team Moments";

interface GalleryItem {
  src: string;
  category: Exclude<Category, "ALL">;
}

// ─── OPTIMIZED Skeleton ──────────────────────────────────────────────────────────
const GallerySkeleton = () => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#111315] relative overflow-hidden transform-gpu">
      {/* OPTIMIZATION: Moved heavy Framer Motion JS rotation to pure CSS compositor keyframes */}
      <style>{`
        @keyframes spin-cw { to { transform: rotate(360deg); } }
        @keyframes spin-ccw { to { transform: rotate(-360deg); } }
        .skeleton-ring-cw { animation: spin-cw 10s linear infinite; }
        .skeleton-ring-ccw { animation: spin-ccw 15s linear infinite; }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />

      {!prefersReducedMotion && (
        <>
          <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-white/5 border-t-acm-electric/40 border-r-acm-pink/20 skeleton-ring-cw" />
          <div className="absolute w-[400px] h-[400px] md:w-[700px] md:h-[700px] rounded-full border border-white/5 border-b-acm-violet/40 skeleton-ring-ccw" />
        </>
      )}

      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : { scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.6, 0.2] }
        }
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-24 h-24 rounded-full bg-white/10 blur-2xl will-change-transform"
      />

      <p className="absolute text-white/40 font-bold uppercase tracking-[0.3em] text-xs md:text-sm animate-pulse font-sans">
        Loading Gallery…
      </p>
    </div>
  );
};

const DomeGallery = dynamic(() => import("@/components/ui/DomeGallery"), {
  ssr: false,
  loading: () => <GallerySkeleton />,
});

const CATEGORIES: Category[] = [
  "ALL",
  "RECRUITMENT DRIVE 2026",
  "SYMPOSIUM ON RESPONSIBLE AI",
  "Team Moments",
];

const RECRUITMENT_IMAGES: GalleryItem[] = [
  "/Gallery/Recruitment/10.jpg",
  "/Gallery/Recruitment/20260402_170046.jpg",
  "/Gallery/Recruitment/20260402_170456.jpg",
  "/Gallery/Recruitment/20260402_171716.jpg",
  "/Gallery/Recruitment/20260409_172353.jpg",
  "/Gallery/Recruitment/20260409_182247.jpg",
  "/Gallery/Recruitment/20260409_182304.jpg",
  "/Gallery/Recruitment/IMG-20260405-WA0001.jpg",
  "/Gallery/Recruitment/IMG-20260405-WA0002.jpg",
  "/Gallery/Recruitment/IMG-20260405-WA0003.jpg",
  "/Gallery/Recruitment/IMG-20260405-WA0004.jpg",
  "/Gallery/Recruitment/IMG-20260405-WA0005.jpg",
  "/Gallery/Recruitment/IMG-20260405-WA0006.jpg",
  "/Gallery/Recruitment/IMG-20260405-WA0007.jpg",
  "/Gallery/Recruitment/IMG-20260405-WA0008.jpg",
  "/Gallery/Recruitment/IMG-20260405-WA0009.jpg",
  "/Gallery/Recruitment/IMG20260410191506.jpg",
].map((src): GalleryItem => ({ src, category: "RECRUITMENT DRIVE 2026" }));

const SYMPOSIUM_IMAGES: GalleryItem[] = [
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/00a37094-d24b-417f-b9b0-bec717cd1e8c.JPG",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/7f5a384b-a9ab-4c5d-b6c1-4b00688c503c.JPG",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/9d51c8ce-6336-43c6-9bc8-96ed2b7b6965%202.JPG",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/80eb695c-4e40-485f-ae2e-05b1d0d1dce0.JPG",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/94f0e23e-6d29-4152-9d26-d8eb45cf6bdb.JPG",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/b6f0874c-0d55-4754-8a3c-7f69feead59b.JPG",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/d85826bf-3a88-4b09-8b8e-bfc453c7d667%202.JPG",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/e24f343f-c0b0-4271-ade1-9807b84fd960%202.JPG",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/ea234039-1dee-4f0c-aa8c-01d1686090a9.JPG",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/IMG_1839.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/IMG_1977.JPG",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/IMG_4817.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/IMG_4850.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/IMG_4855.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/IMG_4907.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/IMG_4909.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/IMG_5248.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/IMG_5316.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/IMG_5333.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/IMG_5344.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/IMG_5362.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/IMG_5387.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/IMG_5403.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/IMG_5411.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/IMG_5443.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/IMG_8989.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/IMG-20260321-WA0182.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/IMG-20260321-WA0630.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/IMG-20260321-WA0635.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/IMG-20260321-WA0653.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/IMG-20260321-WA0661.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/PHOTO-2026-03-18-12-37-54.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/PHOTO-2026-03-18-12-37-57%203.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/PHOTO-2026-03-18-12-37-57.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/PHOTO-2026-03-18-12-37-58%202.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/PHOTO-2026-03-18-12-37-58%204.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/PHOTO-2026-03-18-12-37-58.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/PHOTO-2026-03-18-12-37-59%202.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/PHOTO-2026-03-18-12-38-00.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/PHOTO-2026-03-18-12-38-07.jpg",
  "/Gallery/SYMPOSIUM_ON_RESPONSIBLE_AI/PHOTO-2026-03-18-12-38-12.jpg",
].map((src): GalleryItem => ({ src, category: "SYMPOSIUM ON RESPONSIBLE AI" }));

const TEAM_IMAGES: GalleryItem[] = [
  "/Gallery/Team_Moments/24-2-26.jpg",
  "/Gallery/Team_Moments/a7c3d1bb-b2a6-42ad-aef7-9fcf1102c919.jpg",
  "/Gallery/Team_Moments/IMG20260303181155.jpg",
  "/Gallery/Team_Moments/IMG20260312180348.jpg",
  "/Gallery/Team_Moments/IMG20260312180350.jpg",
  "/Gallery/Team_Moments/IMG20260312180353.jpg",
  "/Gallery/Team_Moments/IMG20260316171145.jpg",
  "/Gallery/Team_Moments/IMG20260316171148.jpg",
  "/Gallery/Team_Moments/IMG20260316172604.jpg",
  "/Gallery/Team_Moments/IMG20260316172610.jpg",
  "/Gallery/Team_Moments/IMG20260316172614.jpg",
  "/Gallery/Team_Moments/IMG20260318162924.jpg",
  "/Gallery/Team_Moments/IMG20260327171314.jpg",
  "/Gallery/Team_Moments/IMG20260401173212.jpg",
  "/Gallery/Team_Moments/IMG20260401173222.jpg",
  "/Gallery/Team_Moments/20260421_171728.jpg",
  "/Gallery/Team_Moments/20260421_171837.jpg",
  "/Gallery/Team_Moments/20260421_171848.jpg",
  "/Gallery/Team_Moments/20260421_172129.jpg",
  "/Gallery/Team_Moments/20260421_175210.jpg",
  "/Gallery/Team_Moments/20260421_175220.jpg",
  "/Gallery/Team_Moments/20260421_175227.jpg",
  "/Gallery/Team_Moments/20260421_175245.jpg",
  "/Gallery/Team_Moments/20260421_175250.jpg",
  "/Gallery/Team_Moments/20260421_175252.jpg",
  "/Gallery/Team_Moments/20260421_175304.jpg",
  "/Gallery/Team_Moments/20260421_175311.jpg",
  "/Gallery/Team_Moments/20260421_175319.jpg",
  "/Gallery/Team_Moments/IMG_7683.jpg",
  "/Gallery/Team_Moments/IMG_7686.jpg",
  "/Gallery/Team_Moments/IMG_7697.jpg",
  "/Gallery/Team_Moments/IMG_7708.jpg",
  "/Gallery/Team_Moments/IMG_7709.jpg",
  "/Gallery/Team_Moments/IMG_7710.jpg",
  "/Gallery/Team_Moments/IMG_7711.jpg",
  "/Gallery/Team_Moments/IMG_7720.jpg",
  "/Gallery/Team_Moments/IMG_7725.jpg",
  "/Gallery/Team_Moments/IMG_7730.jpg",
  "/Gallery/Team_Moments/IMG_7735.jpg",
  "/Gallery/Team_Moments/IMG_7744.jpg",
  "/Gallery/Team_Moments/IMG_7749.jpg",
  "/Gallery/Team_Moments/IMG_7750.jpg",
  "/Gallery/Team_Moments/IMG_7757.jpg",
  "/Gallery/Team_Moments/IMG_7758.jpg",
  "/Gallery/Team_Moments/IMG_7759.jpg",
  "/Gallery/Team_Moments/IMG_7760.jpg",
  "/Gallery/Team_Moments/IMG_7761.jpg",
  "/Gallery/Team_Moments/IMG_7763.jpg",
  "/Gallery/Team_Moments/IMG_7764.jpg",
  "/Gallery/Team_Moments/IMG_7767.jpg",
  "/Gallery/Team_Moments/IMG_7768.jpg",
  "/Gallery/Team_Moments/IMG_7769.jpg",
  "/Gallery/Team_Moments/IMG_7770.jpg",
  "/Gallery/Team_Moments/IMG_7771.jpg",
  "/Gallery/Team_Moments/IMG_7772.jpg",
  "/Gallery/Team_Moments/IMG_7774.jpg",
  "/Gallery/Team_Moments/IMG_7775.jpg",
  "/Gallery/Team_Moments/IMG_7777.jpg",
  "/Gallery/Team_Moments/IMG_7794.jpg",
  "/Gallery/Team_Moments/IMG_7795.jpg",
  "/Gallery/Team_Moments/IMG_7797.jpg",
].map((src): GalleryItem => ({ src, category: "Team Moments" }));

const ALL_GALLERY_DATA: GalleryItem[] = [
  ...RECRUITMENT_IMAGES,
  ...SYMPOSIUM_IMAGES,
  ...TEAM_IMAGES,
];

const CATEGORY_COUNTS: Record<Category, number> = {
  ALL: ALL_GALLERY_DATA.length,
  "RECRUITMENT DRIVE 2026": RECRUITMENT_IMAGES.length,
  "SYMPOSIUM ON RESPONSIBLE AI": SYMPOSIUM_IMAGES.length,
  "Team Moments": TEAM_IMAGES.length,
};

const SHORT_LABEL: Record<Category, string> = {
  ALL: "ALL",
  "RECRUITMENT DRIVE 2026": "RECRUITMENT",
  "SYMPOSIUM ON RESPONSIBLE AI": "SYMPOSIUM",
  "Team Moments": "TEAM",
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("ALL");
  const [deferredFilter, setDeferredFilter] = useState<Category>("ALL");
  const [isPending, startTransition] = useTransition();

  const filteredData = useMemo<GalleryItem[]>(
    () =>
      deferredFilter === "ALL"
        ? ALL_GALLERY_DATA
        : ALL_GALLERY_DATA.filter((item) => item.category === deferredFilter),
    [deferredFilter],
  );

  const handleFilterChange = useCallback(
    (cat: Category) => {
      if (cat === activeFilter) return;
      setActiveFilter(cat);
      startTransition(() => {
        setDeferredFilter(cat);
      });
    },
    [activeFilter],
  );

  return (
    <div
      className={`relative flex min-h-screen flex-col items-center pb-24 pt-20 bg-[#ffffff] overflow-hidden ${inter.className}`}
    >
      {/* OPTIMIZATION: Removed individual heavy blur items and replaced with native CSS radial gradients */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px),
            radial-gradient(circle at 25% 10%, rgba(0,229,255,0.08) 0%, transparent 50%),
            radial-gradient(circle at 75% 30%, rgba(255,64,129,0.04) 0%, transparent 45%),
            radial-gradient(circle at 35% 75%, rgba(123,97,255,0.08) 0%, transparent 55%)
          `,
          backgroundSize:
            "40px 40px, 40px 40px, 100% 100%, 100% 100%, 100% 100%",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container relative z-10 mx-auto px-4 py-16 text-center will-change-transform"
      >
        <motion.h1
          variants={fadeUp}
          className={`mb-6 text-5xl md:text-7xl uppercase tracking-wide text-[#111315] ${anton.className}`}
        >
          Through the <br />
          <span className="bg-acm-pink bg-clip-text text-transparent">
            Lens
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className={`mx-auto max-w-2xl text-xl text-black/60 italic ${playfair.className}`}
        >
          A visual journey of our hackathons, workshops, and the incredible
          community that makes ACM SRMIST thrive. Spin the dome to explore.
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-4 text-sm font-semibold uppercase tracking-widest text-black/30"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={activeFilter}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="inline-block"
            >
              {CATEGORY_COUNTS[activeFilter]} photos
            </motion.span>
          </AnimatePresence>
        </motion.p>
      </motion.div>

      <div className="mx-auto relative z-10 w-full max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-wrap justify-center gap-2 md:gap-3 will-change-transform"
          role="tablist"
        >
          {CATEGORIES.map((category) => {
            const isActive = activeFilter === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleFilterChange(category)}
                className={`relative rounded-full px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-bold uppercase tracking-wider transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acm-electric/60`}
              >
                {isActive && (
                  <motion.div
                    layoutId="gallery-filter-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-[#111315] shadow-[0_5px_15px_rgba(0,0,0,0.12)] will-change-transform"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span
                  className={
                    isActive
                      ? "text-white"
                      : "text-black/50 hover:text-acm-pink transition-colors duration-150"
                  }
                >
                  <span className="md:hidden">{SHORT_LABEL[category]}</span>
                  <span className="hidden md:inline">{category}</span>
                </span>
                {/* OPTIMIZATION: Removed layout prop from counts to prevent layout thrash measuring */}
                <span
                  className={`ml-1.5 inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none ${isActive ? "bg-white/20 text-white" : "bg-black/8 text-black/40"} transition-colors duration-200`}
                >
                  {CATEGORY_COUNTS[category]}
                </span>
              </button>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-[75vh] min-h-[500px] max-h-[900px] overflow-hidden rounded-[2.5rem] border border-black/5 bg-[#111315] shadow-[0_20px_60px_rgba(0,0,0,0.15)] transform-gpu"
        >
          <AnimatePresence>
            {isPending && (
              <motion.div
                key="transition-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 z-20 bg-[#111315]/80 rounded-[2.5rem] backdrop-blur-sm flex items-center justify-center"
              >
                <div className="w-10 h-10 border-4 border-white/10 border-t-acm-electric rounded-full animate-spin" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* OPTIMIZATION: Removed key= prop so DOM nodes survive filter swaps */}
          <DomeGallery
            images={filteredData}
            fit={0.8}
            minRadius={600}
            maxVerticalRotationDeg={0}
            segments={34}
            dragDampening={2}
            grayscale={false}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className={`mt-5 text-center text-sm text-black/30 italic select-none ${playfair.className}`}
        >
          Click &amp; drag to spin · Scroll to zoom
        </motion.p>
      </div>
    </div>
  );
}
