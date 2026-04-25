"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useInView,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Anton, Playfair_Display } from "next/font/google";

// Font setup
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

type CounterProps = {
  value: number;
  suffix?: string;
};

/**
 * Counter
 *
 * - Uses a MotionValue + spring to animate the numeric value.
 * - Writes directly to the DOM (span.textContent) to avoid per-frame React state updates.
 * - Throttles DOM updates to ~20fps (50ms) for a smooth but cheap animation.
 * - Respects prefers-reduced-motion.
 * - Provides an accessible aria-label for screen readers.
 */
const Counter = React.memo(
  function Counter({ value, suffix = "" }: CounterProps) {
    const spanRef = useRef<HTMLSpanElement | null>(null);
    const inViewRef = useRef<HTMLSpanElement | null>(null);
    const isInView = useInView(inViewRef, { once: true, margin: "-100px" });
    const prefersReduced = useReducedMotion();

    // Motion value and spring
    const motionVal = useMotionValue(0);
    const spring = useSpring(motionVal, {
      damping: 50,
      stiffness: 200,
    });

    // Keep an accessible text for screen readers (updated via state only when value changes)
    const [ariaText, setAriaText] = useState(() => `${Math.floor(0)}${suffix}`);

    useEffect(() => {
      if (isInView) {
        if (prefersReduced) {
          // Jump to final value immediately for reduced motion users
          motionVal.set(value);
          setAriaText(`${value}${suffix}`);
          if (spanRef.current)
            spanRef.current.textContent = `${value}${suffix}`;
        } else {
          motionVal.set(value);
        }
      }
    }, [isInView, motionVal, value, suffix, prefersReduced]);

    useEffect(() => {
      let rafId: number | null = null;
      let lastUpdate = 0;

      const unsubscribe = spring.on("change", (latest: number) => {
        const now = performance.now();
        // Throttle updates to ~20fps (every 50ms)
        if (now - lastUpdate < 50) return;
        lastUpdate = now;

        const display = Math.floor(latest);
        if (spanRef.current) {
          // Update DOM directly to avoid React re-renders
          spanRef.current.textContent = `${display}${suffix}`;
        }
        // Update aria text less frequently (only when integer changes)
        // Use requestAnimationFrame to batch DOM writes
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          setAriaText(`${display}${suffix}`);
        });
      });

      return () => {
        unsubscribe();
        if (rafId) cancelAnimationFrame(rafId);
      };
    }, [spring, suffix]);

    return (
      <span
        ref={(el) => {
          spanRef.current = el;
          inViewRef.current = el;
        }}
        className="tabular-nums"
        aria-label={ariaText}
        role="text"
      >
        {/* Initial content for SSR/first paint */}0{suffix}
      </span>
    );
  },
  // memo equality: only re-render if value or suffix changes
  (prev, next) => prev.value === next.value && prev.suffix === next.suffix,
);

const statsData = [
  { id: 1, label: "Projects", value: 2, suffix: "+" },
  { id: 2, label: "Hackathons", value: 3, suffix: "+" },
  { id: 3, label: "Members", value: 90, suffix: "+" },
  { id: 4, label: "Collabs", value: 5, suffix: "+" },
];

export default function Stats() {
  const prefersReduced = useReducedMotion();

  // Animation variants (use transforms + opacity only)
  const itemInitial = { opacity: 0, y: 20 };
  const itemAnimate = { opacity: 1, y: 0 };
  const hover = prefersReduced ? {} : { scale: 1.03 };

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative z-20 w-full py-12">
        <div className="container mx-auto px-4">
          <div className="glass-panel grid grid-cols-2 gap-6 rounded-3xl p-6 shadow-xl md:grid-cols-4 md:p-10">
            {statsData.map((stat, index) => (
              <m.div
                key={stat.id}
                initial={prefersReduced ? undefined : itemInitial}
                whileInView={prefersReduced ? undefined : itemAnimate}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                whileHover={hover}
                className="flex flex-col items-center justify-center text-center px-2 py-4"
              >
                <h3
                  className={`${anton.className} bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent font-bold`}
                  // fluid typography to reduce layout shifts across breakpoints
                  style={{
                    fontSize: "clamp(1.75rem, 6vw, 3.5rem)",
                    lineHeight: 1,
                    WebkitFontSmoothing: "antialiased",
                    MozOsxFontSmoothing: "grayscale",
                  }}
                >
                  <Counter value={stat.value} suffix={stat.suffix} />
                </h3>

                <p
                  className={`${playfair.className} mt-2 text-xs font-medium tracking-wide text-foreground/80 uppercase`}
                  style={{ letterSpacing: "0.08em" }}
                >
                  {stat.label}
                </p>
              </m.div>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
