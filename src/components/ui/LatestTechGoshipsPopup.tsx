"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, ArrowRight } from "lucide-react";
import { Anton, Playfair_Display } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

const anton = Anton({ subsets: ["latin"], weight: "400" });
const playfair = Playfair_Display({ subsets: ["latin"], style: ["normal", "italic"] });

const SESSION_KEY = "has_seen_techgoships_popup";

export default function LatestTechGoshipsPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show once per session
    const hasSeenPopup = sessionStorage.getItem(SESSION_KEY);
    
    if (!hasSeenPopup) {
      // Small delay before popping up for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem(SESSION_KEY, "true");
  };

  const handleLinkClick = () => {
    handleClose(); // Close popup when they click to go to the page
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal content with "Lotus-inspired" entrance animation */}
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: 0.8,
              y: 60,
              rotateX: -15
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: 0,
              rotateX: 0
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.9,
              y: 20,
              rotateX: 10
            }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 15,
              mass: 1.2
            }}
            style={{ perspective: "1000px" }}
            className="relative w-full max-w-lg bg-[#ffffff] rounded-3xl shadow-2xl overflow-hidden border border-black/10 z-10"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors text-black/60 hover:text-black"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Banner Image */}
            <div className="relative w-full h-48 bg-[#060010] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              <Image 
                src="/events/ACM Tech Goships/popup1.png" 
                alt="Tech Goships" 
                fill 
                className="object-cover object-top opacity-90"
              />
              <div className="absolute bottom-4 left-6 z-20">
                <div className="inline-flex items-center gap-2 rounded-full bg-acm-electric/20 backdrop-blur-md px-3 py-1 text-xs font-bold text-acm-electric border border-acm-electric/30 mb-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-acm-electric opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-acm-electric" />
                  </span>
                  LATEST EVENT
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <h2 className={`text-3xl uppercase tracking-wide text-black mb-2 ${anton.className}`}>
                Tech Goships: <span className="text-acm-electric">Unplugged</span>
              </h2>
              
              <p className={`text-black/70 mb-6 italic ${playfair.className} text-lg`}>
                Join us for real conversations and practical learning about Feature Engineering & Dimensionality Reduction.
              </p>

              <div className="space-y-3 mb-8 bg-black/5 p-4 rounded-2xl">
                <div className="flex items-center gap-3 text-sm text-black/80 font-medium">
                  <Calendar className="w-4 h-4 text-acm-pink" />
                  <span>11th September 2026 • 5:00 PM</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-black/80 font-medium">
                  <MapPin className="w-4 h-4 text-acm-violet" />
                  <span>TP1-204</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Link 
                  href="/events" 
                  onClick={handleLinkClick}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#111315] hover:bg-acm-electric hover:text-black transition-all duration-300 text-white font-bold uppercase tracking-wider py-4 ${anton.className} text-lg`}
                >
                  View Details <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
