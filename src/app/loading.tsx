"use client";

import { useEffect, useRef, useState, useCallback, memo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Anton, Cormorant_Garamond } from "next/font/google";

// ─── Fonts ────────────────────────────────────────────────────────────────────
const anton = Anton({ subsets: ["latin"], weight: "400" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

// ─── Constants ────────────────────────────────────────────────────────────────
const TYPED_TEXT = "ACM Student Chapter";
const STORAGE_KEY = "acm-intro-seen";

// How long (ms) to linger after the full sequence finishes before dismissing
const LINGER_DURATION = 900;

// ─── Cursor ───────────────────────────────────────────────────────────────────
const Cursor = memo(() => (
  <motion.span
    animate={{ opacity: [1, 0, 1] }}
    transition={{ duration: 0.85, repeat: Infinity, ease: "linear" }}
    aria-hidden
    className="inline-block w-[3px] h-[0.8em] bg-acm-electric ml-1 align-middle rounded-sm"
  />
));
Cursor.displayName = "Cursor";

// ─── Typing text ─────────────────────────────────────────────────────────────
// Direct DOM writes — zero React re-renders during the animation.
function TypingText({ onDone }: { onDone: () => void }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const idxRef = useRef(0);
  const [done, setDone] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      if (spanRef.current) spanRef.current.textContent = TYPED_TEXT;
      setDone(true);
      onDone();
      return;
    }

    const id = setInterval(() => {
      idxRef.current += 1;
      if (spanRef.current) {
        spanRef.current.textContent = TYPED_TEXT.slice(0, idxRef.current);
      }
      if (idxRef.current >= TYPED_TEXT.length) {
        clearInterval(id);
        setDone(true);
        onDone();
      }
    }, 55);

    return () => clearInterval(id);
  }, [onDone, prefersReducedMotion]);

  return (
    <span className="inline-flex items-baseline">
      <span ref={spanRef} />
      {!done && <Cursor />}
    </span>
  );
}

// ─── Spinner ─────────────────────────────────────────────────────────────────
const Spinner = memo(() => {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) {
    return (
      <div className="w-16 h-16 mb-10 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-acm-electric" />
      </div>
    );
  }
  return (
    <div className="relative w-16 h-16 md:w-20 md:h-20 mb-10">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border-t-[2px] border-r-[2px] border-acm-electric"
        style={{
          borderBottomColor: "transparent",
          borderLeftColor: "transparent",
        }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[5px] rounded-full border-b-[2px] border-l-[2px] border-acm-violet"
        style={{
          borderTopColor: "transparent",
          borderRightColor: "transparent",
        }}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[11px] rounded-full border-t-[1.5px] border-acm-pink"
        style={{
          borderRightColor: "transparent",
          borderBottomColor: "transparent",
          borderLeftColor: "transparent",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-1.5 h-1.5 rounded-full bg-white"
        />
      </div>
    </div>
  );
});
Spinner.displayName = "Spinner";

// ─── IntroLoader ─────────────────────────────────────────────────────────────
export default function IntroLoader() {
  // null  = not yet checked (avoids flash)
  // true  = show overlay
  // false = skip (returning visitor)
  const [show, setShow] = useState<boolean | null>(null);
  const [typingDone, setTypingDone] = useState(false);
  const [visible, setVisible] = useState(true); // drives AnimatePresence
  const prefersReducedMotion = useReducedMotion();

  // ── Session check — runs once after hydration ──────────────────────────────
  useEffect(() => {
    try {
      const seen = sessionStorage.getItem(STORAGE_KEY);
      if (seen) {
        setShow(false);
      } else {
        setShow(true);
        // Lock scroll while greeting is visible
        document.body.style.overflow = "hidden";
      }
    } catch {
      // sessionStorage blocked (private/incognito edge cases) — skip intro
      setShow(false);
    }
  }, []);

  // ── Dismiss: start exit animation, unlock scroll ──────────────────────────
  const dismiss = useCallback(() => {
    setVisible(false);
    document.body.style.overflow = "";
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  // ── Auto-dismiss after SRMIST appears + linger ────────────────────────────
  useEffect(() => {
    if (!typingDone) return;
    // Linger slightly shorter for reduced motion users
    const delay = prefersReducedMotion ? 200 : LINGER_DURATION;
    const id = setTimeout(dismiss, delay);
    return () => clearTimeout(id);
  }, [typingDone, dismiss, prefersReducedMotion]);

  // Don't render anything until we know whether to show
  if (show === null || show === false) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro-loader"
          // Exit: lift up and dissolve — like lifting a curtain
          initial={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: -32,
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          }}
          // Pointer events off once animating out so the page is immediately interactive
          onAnimationComplete={(def) => {
            if ((def as any).opacity === 0) {
              // Fully gone — nothing to clean up, component unmounts via AnimatePresence
            }
          }}
          className={`
            fixed inset-0 z-[9999]
            flex min-h-[100svh] flex-col items-center justify-center
            overflow-hidden
            bg-[#060010]/70 backdrop-blur-2xl
            ${cormorant.className}
          `}
          role="status"
          aria-label="Loading ACM Student Chapter SRMIST"
          aria-live="polite"
        >
          {/* ── Ambient glows ───────────────────────────────────────────────── */}
          <motion.div
            aria-hidden
            animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[560px] md:h-[560px] bg-acm-electric/20 rounded-full blur-[90px] pointer-events-none"
          />
          <motion.div
            aria-hidden
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.35, 0.15] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[760px] md:h-[760px] bg-acm-violet/10 rounded-full blur-[110px] pointer-events-none"
          />
          <motion.div
            aria-hidden
            animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.25, 0.1] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-acm-pink/15 rounded-full blur-[100px] pointer-events-none"
          />

          {/* ── Glass card ──────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="
              relative z-10 flex flex-col items-center text-center
              px-8 py-10 sm:px-14 sm:py-12 mx-4
              rounded-[2rem] sm:rounded-[2.5rem]
              bg-white/[0.04] border border-white/10 backdrop-blur-sm
              shadow-[0_8px_48px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]
              max-w-[90vw] sm:max-w-xl
            "
          >
            <Spinner />

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-acm-electric/80 text-sm sm:text-base font-light italic tracking-[0.35em] mb-5 select-none"
            >
              Welcome to
            </motion.p>

            {/* Headline */}
            <h1
              className={`text-3xl sm:text-5xl md:text-6xl text-white uppercase tracking-widest leading-tight ${anton.className}`}
            >
              <span className="block mb-1">
                <TypingText onDone={() => setTypingDone(true)} />
              </span>

              {/* SRMIST — blooms in after typing */}
              <AnimatePresence>
                {typingDone && (
                  <motion.span
                    initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="block bg-gradient-to-r from-acm-blue via-acm-violet to-acm-pink bg-clip-text text-transparent"
                  >
                    SRMIST
                  </motion.span>
                )}
              </AnimatePresence>
            </h1>

            {/* Pulsing dots — visible during the linger window */}
            <AnimatePresence>
              {typingDone && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  aria-hidden
                  className="mt-8 flex items-center gap-2"
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.2,
                      }}
                      className="inline-block w-1.5 h-1.5 rounded-full bg-acm-electric/70"
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Fine print */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute bottom-6 text-[11px] font-semibold tracking-[0.25em] uppercase text-white/20 select-none"
            aria-hidden
          >
            ACM · SRMIST · {new Date().getFullYear()}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
