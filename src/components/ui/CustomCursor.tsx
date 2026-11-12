"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorOpacity = useMotionValue(0);
  const isVisibleRef = useRef(false);

  // Motion values for the cursor position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for that smooth, trailing feel
  const springConfig = { damping: 25, stiffness: 280, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        cursorOpacity.set(1);
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      cursorOpacity.set(0);
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      cursorOpacity.set(1);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, cursorOpacity]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-8 w-8 rounded-full border border-acm-electric/70 bg-acm-electric/10 shadow-[0_0_12px_rgba(0,229,255,0.3)] md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        opacity: cursorOpacity,
      }}
    />
  );
}
