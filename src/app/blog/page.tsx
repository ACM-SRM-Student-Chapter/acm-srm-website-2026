"use client";

import { useState, useMemo, useCallback, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Clock,
  User,
  CalendarDays,
  ArrowRight,
  BookOpen,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Playfair_Display, Anton, Inter } from "next/font/google";
import dynamic from "next/dynamic";
import { blogPosts } from "@/data/blogs";

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

// ─── Types ────────────────────────────────────────────────────────────────────
// Use the actual shape from your data file — replace with your real type if available
type BlogPost = (typeof blogPosts)[number];

// ─── Static data ──────────────────────────────────────────────────────────────
const CATEGORIES = [
  "All",
  "Articles",
  "Tutorials",
  "Event Coverage",
  "Tech Insights",
] as const;
type Category = (typeof CATEGORIES)[number];

// Shimmer keyframe — injected once as a <style> tag, not dangerouslySetInnerHTML on a div
const SHIMMER_CSS = `@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`;

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const ShimmerEffect = memo(() => (
  <div
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent z-10"
    style={{ animation: "shimmer 1.5s infinite" }}
  />
));
ShimmerEffect.displayName = "ShimmerEffect";

const BlogCardSkeleton = memo(() => (
  <div className="flex flex-col overflow-hidden rounded-[2rem] p-3 bg-white border border-black/5 shadow-sm relative">
    <ShimmerEffect />
    <div className="h-56 w-full rounded-[1.5rem] bg-gray-100" />
    <div className="flex flex-col p-5">
      <div className="h-6 w-3/4 bg-gray-200 rounded-lg mb-3" />
      <div className="h-4 w-full bg-gray-100 rounded mb-2" />
      <div className="h-4 w-5/6 bg-gray-100 rounded mb-8" />
      <div className="flex justify-between mt-auto border-t border-black/5 pt-4">
        <div className="h-4 w-20 bg-gray-200 rounded-full" />
        <div className="h-4 w-24 bg-gray-200 rounded-full" />
      </div>
    </div>
  </div>
));
BlogCardSkeleton.displayName = "BlogCardSkeleton";

// ─── Lazy BlogCard ─────────────────────────────────────────────────────────────
const BlogCard = dynamic(() => import("@/components/ui/BlogCard"), {
  loading: () => <BlogCardSkeleton />,
  ssr: false,
});

// ─── Blog Post Modal ──────────────────────────────────────────────────────────
// z-[200] sits above the navbar (typically z-50) AND the IntroLoader (z-[9999]
// is only active during first-visit, so this is safe for the modal).
// The semi-opaque backdrop is darker than any other overlay on the site.
interface ModalProps {
  post: BlogPost;
  onClose: () => void;
  onPrev: (() => void) | null;
  onNext: (() => void) | null;
}

const BlogModal = memo(({ post, onClose, onPrev, onNext }: ModalProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Auto-focus close button on open for keyboard accessibility
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  // Keyboard: Escape → close, ← → navigate
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-lg"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={post.title}
    >
      <motion.article
        initial={{ opacity: 0, scale: 0.94, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{
          opacity: 0,
          scale: 0.94,
          y: 16,
          transition: { duration: 0.25, ease: EASE_OUT_EXPO },
        }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        className={`bg-white w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-[2.5rem] shadow-[0_32px_80px_rgba(0,0,0,0.5)] relative ${inter.className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Close ── */}
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close article"
          className="absolute top-5 right-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-acm-electric hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>

        {/* ── Prev / Next navigation ── */}
        {onPrev && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous article"
            className="absolute top-1/2 -translate-y-1/2 left-4 z-20 hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-acm-violet hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
        )}
        {onNext && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next article"
            className="absolute top-1/2 -translate-y-1/2 right-4 z-20 hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-acm-electric hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        )}

        {/* ── Hero image ── */}
        <div className="relative h-56 sm:h-72 md:h-96 w-full overflow-hidden rounded-t-[2.5rem]">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <div className="absolute bottom-6 left-6 right-14">
            <span className="mb-3 inline-block rounded-full bg-acm-electric px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-black">
              {post.category}
            </span>
            <h2
              className={`text-2xl sm:text-4xl md:text-5xl text-white uppercase tracking-wide leading-tight ${anton.className}`}
            >
              {post.title}
            </h2>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="p-6 sm:p-10 md:p-12">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-5 text-[11px] font-bold uppercase tracking-widest text-black/45 border-b border-black/6 pb-6 mb-8">
            <div className="flex items-center gap-2">
              <User className="h-3.5 w-3.5 text-acm-violet" aria-hidden />{" "}
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-3.5 w-3.5 text-acm-blue" aria-hidden />{" "}
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-acm-pink" aria-hidden />{" "}
              {post.readTime}
            </div>
          </div>

          {/* Pull quote */}
          <p
            className={`text-xl sm:text-2xl text-black/75 font-medium italic mb-8 border-l-4 border-acm-electric pl-5 ${playfair.className}`}
          >
            {post.excerpt}
          </p>

          {/* Body text */}
          <div
            className={`text-base sm:text-lg text-black/65 leading-relaxed space-y-6 ${playfair.className} whitespace-pre-wrap`}
          >
            {post.content}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
});
BlogModal.displayName = "BlogModal";

// ─── Featured Card ────────────────────────────────────────────────────────────
const FeaturedCard = memo(
  ({ post, onClick }: { post: BlogPost; onClick: () => void }) => (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
      whileHover={{
        y: -4,
        transition: { type: "spring", stiffness: 320, damping: 24 },
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`Read featured post: ${post.title}`}
      className="group bg-white relative grid grid-cols-1 gap-6 overflow-hidden rounded-[2.5rem] p-4 border border-black/5 cursor-pointer
               shadow-[0_4px_24px_rgba(0,0,0,0.05)]
               hover:shadow-[0_20px_60px_rgba(123,97,255,0.15)]
               transition-shadow duration-500 lg:grid-cols-2"
    >
      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden rounded-[2rem] lg:h-full lg:min-h-[400px]">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-acm-electric px-3 py-1 text-xs font-bold uppercase tracking-wider text-black">
          Featured · {post.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center p-4 sm:p-8 lg:p-12">
        <h2
          className={`mb-4 text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide leading-[1.1] text-[#111315] transition-colors group-hover:text-acm-electric ${anton.className}`}
        >
          {post.title}
        </h2>
        <p
          className={`mb-8 text-lg text-black/65 leading-relaxed italic line-clamp-3 ${playfair.className}`}
        >
          {post.excerpt}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-black/45">
          <div className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-acm-violet" aria-hidden />{" "}
            {post.author}
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-acm-blue" aria-hidden />{" "}
            {post.date}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-acm-pink" aria-hidden />{" "}
            {post.readTime}
          </div>
          <div className="ml-auto flex items-center gap-1 text-acm-violet font-bold text-xs uppercase tracking-widest group-hover:gap-2 transition-all">
            Read More <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </div>
        </div>
      </div>
    </motion.div>
  ),
);
FeaturedCard.displayName = "FeaturedCard";

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // ── Memoised derived data ──────────────────────────────────────────────────
  const filteredPosts = useMemo(
    () =>
      activeCategory === "All"
        ? blogPosts
        : blogPosts.filter((p) => p.category === activeCategory),
    [activeCategory],
  );

  const featuredPost = useMemo(() => blogPosts.find((p) => p.featured), []);
  const regularPosts = useMemo(
    () => filteredPosts.filter((p) => !p.featured || activeCategory !== "All"),
    [filteredPosts, activeCategory],
  );

  // Category counts — pre-computed once
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: blogPosts.length };
    CATEGORIES.forEach((cat) => {
      if (cat !== "All")
        counts[cat] = blogPosts.filter((p) => p.category === cat).length;
    });
    return counts;
  }, []);

  // ── Modal helpers ──────────────────────────────────────────────────────────
  // The "all posts" flat list used for prev/next navigation in the modal
  const allPostsFlat = useMemo(() => blogPosts, []);

  const selectedIdx = useMemo(
    () =>
      selectedPost
        ? allPostsFlat.findIndex((p) => p.id === selectedPost.id)
        : -1,
    [selectedPost, allPostsFlat],
  );

  const handlePrev = useCallback(() => {
    if (selectedIdx > 0) setSelectedPost(allPostsFlat[selectedIdx - 1]);
  }, [selectedIdx, allPostsFlat]);

  const handleNext = useCallback(() => {
    if (selectedIdx < allPostsFlat.length - 1)
      setSelectedPost(allPostsFlat[selectedIdx + 1]);
  }, [selectedIdx, allPostsFlat]);

  const handleClose = useCallback(() => setSelectedPost(null), []);

  const handleFilterChange = useCallback((cat: Category) => {
    setActiveCategory(cat);
  }, []);

  // ── Scroll lock — correctly in useEffect, not render ──────────────────────
  useEffect(() => {
    document.body.style.overflow = selectedPost ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPost]);

  return (
    <>
      <style>{SHIMMER_CSS}</style>

      {/* ── Modal ──────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedPost && (
          <BlogModal
            key={selectedPost.id}
            post={selectedPost}
            onClose={handleClose}
            onPrev={selectedIdx > 0 ? handlePrev : null}
            onNext={selectedIdx < allPostsFlat.length - 1 ? handleNext : null}
          />
        )}
      </AnimatePresence>

      {/* ── Page ───────────────────────────────────────────────────────────── */}
      <div
        className={`relative flex min-h-screen flex-col items-center pb-24 pt-20 bg-white overflow-hidden ${inter.className}`}
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
            <div className="inline-flex items-center gap-2 rounded-full border border-acm-pink/30 bg-acm-pink/10 px-4 py-1.5 text-sm font-bold tracking-wide text-acm-pink backdrop-blur-md bg-white/50">
              <BookOpen className="h-4 w-4" aria-hidden /> CONTENT HUB
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className={`mb-6 text-5xl md:text-7xl uppercase tracking-wide text-[#111315] ${anton.className}`}
          >
            The{" "}
            <span className="bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text text-transparent">
              Terminal
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className={`mx-auto max-w-2xl text-xl text-black/60 italic ${playfair.className}`}
          >
            Stay updated with the latest tech insights, hands-on tutorials, and
            deep-dives into the events happening at ACM SRMIST.
          </motion.p>
        </motion.div>

        {/* ── Content ─────────────────────────────────────────────────────── */}
        <div className="mx-auto relative z-10 w-full max-w-7xl px-4 sm:px-6 space-y-14">
          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE_OUT_EXPO }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3"
            role="tablist"
            aria-label="Filter blog posts by category"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const count = categoryCounts[cat] ?? 0;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleFilterChange(cat)}
                  className="relative rounded-full px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
                >
                  {isActive && (
                    <motion.div
                      layoutId="blog-filter-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-[#111315] shadow-[0_5px_15px_rgba(0,0,0,0.12)]"
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
                        : "text-black/55 hover:text-acm-electric transition-colors"
                    }
                  >
                    {cat}
                  </span>
                  <span
                    className={`ml-1.5 inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none transition-colors ${isActive ? "bg-white/20 text-white" : "bg-black/8 text-black/40"}`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Featured post */}
          <AnimatePresence mode="wait">
            {activeCategory === "All" && featuredPost && (
              <FeaturedCard
                key="featured"
                post={featuredPost}
                onClick={() => setSelectedPost(featuredPost)}
              />
            )}
          </AnimatePresence>

          {/* Regular posts grid */}
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {regularPosts.map((post, idx) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  index={idx}
                  onClick={() => setSelectedPost(post)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          <AnimatePresence>
            {regularPosts.length === 0 && !featuredPost && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-24 text-center"
              >
                <p
                  className={`text-xl text-black/35 italic ${playfair.className}`}
                >
                  No posts in this category yet — check back soon.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
