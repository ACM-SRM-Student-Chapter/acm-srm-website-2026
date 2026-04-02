"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, PanInfo, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CarouselItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color?: string;
}

interface CarouselProps {
  items: CarouselItem[];
  autoplay?: boolean;
  autoplayDelay?: number;
}

export default function Carousel({
  items,
  autoplay = true,
  autoplayDelay = 4000,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || isHovered) return;
    const timer = setInterval(nextSlide, autoplayDelay);
    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, nextSlide]);

  // Handle Swipe/Drag
  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 50; // Minimum distance to trigger swipe
    if (info.offset.x > threshold) prevSlide();
    else if (info.offset.x < -threshold) nextSlide();
  };

  return (
    <div
      className="relative flex w-full flex-col items-center justify-center overflow-visible py-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Coverflow Container */}
      <div className="relative flex h-[420px] w-full max-w-6xl items-center justify-center [perspective:1200px]">
        <AnimatePresence initial={false}>
          {items.map((item, index) => {
            // Calculate circular distance from the current index
            let diff = index - currentIndex;
            if (diff > items.length / 2) diff -= items.length;
            if (diff < -items.length / 2) diff += items.length;

            const isActive = diff === 0;
            const isVisible = Math.abs(diff) <= 2; // Show only the active card and 2 cards on each side

            if (!isVisible) return null;

            // Physics and Positioning Math
            const xPos = diff * 105; // Spacing percentage
            const scale = isActive ? 1 : 0.85 - Math.abs(diff) * 0.05;
            const zIndex = 50 - Math.abs(diff);
            const opacity = isActive ? 1 : 1 - Math.abs(diff) * 0.35;
            const rotateY = diff * -15; // Cards gently turn inwards

            return (
              <motion.div
                key={item.id}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                initial={false}
                animate={{
                  x: `${xPos}%`,
                  scale,
                  zIndex,
                  opacity,
                  rotateY,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 1,
                }}
                onClick={() => {
                  if (!isActive) setCurrentIndex(index);
                }}
                className={`absolute flex h-[360px] w-[280px] sm:w-[340px] flex-col rounded-[2rem] border border-foreground/10 bg-background/70 p-8 shadow-2xl backdrop-blur-2xl transition-all duration-300 ${
                  isActive
                    ? "cursor-grab active:cursor-grabbing shadow-[0_20px_50px_rgba(0,0,0,0.1)] "
                    : "cursor-pointer hover:bg-background/90"
                }`}
              >
                {/* Card Icon */}
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground/5 shadow-inner">
                  {item.icon}
                </div>

                {/* Card Content */}
                <h3 className="text-2xl font-black text-foreground">
                  {item.title}
                </h3>
                <span className="mb-4 text-xs font-bold tracking-widest text-foreground/50 uppercase">
                  {item.subtitle}
                </span>
                <p className="text-sm leading-relaxed text-foreground/70">
                  {item.description}
                </p>

                {/* Glowing Active Border */}
                {isActive && (
                  <motion.div
                    layoutId="active-domain-border"
                    className="absolute bottom-0 left-0 h-1.5 w-full rounded-b-[2rem] bg-gradient-to-r from-acm-electric to-acm-violet"
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="mt-8 flex items-center gap-6 z-50">
        <button
          onClick={prevSlide}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 text-foreground transition-colors hover:bg-foreground/10 hover:text-acm-electric"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex gap-3">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-8 bg-acm-electric shadow-[0_0_10px_#00E5FF]"
                  : "w-2.5 bg-foreground/20 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 text-foreground transition-colors hover:bg-foreground/10 hover:text-acm-electric"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
