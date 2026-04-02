"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DomeGallery from "@/components/ui/DomeGallery";

const categories = [
  "All",
  "Technical Events",
  "Community Building",
  "Chapter Milestones",
  "Workshops",
  "Team Moments",
];

// Rich data including category and description
const galleryData = [
  {
    id: 1,
    category: "Technical Events",
    title: "Ideaforge Hackathon",
    desc: "Over 300 students collaborating intensely to build next-generation applications.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "Community Building",
    title: "Icebreaker Session",
    desc: "Welcoming our newest cohort into the world's largest computing society.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "Workshops",
    title: "Gen AI Masterclass",
    desc: "A deep dive into LLMs, prompt engineering, and the future of AI architecture.",
    img: "https://images.unsplash.com/photo-1544531585-9847b68c8c86?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    category: "Team Moments",
    title: "Core Committee Meet",
    desc: "Late nights planning the next big technical symposium for the campus.",
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 5,
    category: "Chapter Milestones",
    title: "ACM Ambassador Award",
    desc: "Recognized nationally for outstanding contributions to the computing community.",
    img: "https://images.unsplash.com/photo-1561489413-985b06da5bee?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    category: "Technical Events",
    title: "Pair Programming Sprint",
    desc: "A specialized 24-hour sprint focusing entirely on DSA and logic optimization.",
    img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 7,
    category: "Workshops",
    title: "Web3 & Blockchain",
    desc: "Hands-on session exploring smart contracts and decentralized infrastructure.",
    img: "https://images.unsplash.com/photo-1639762681485-074b7f4ec651?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 8,
    category: "Community Building",
    title: "DevFest Meetup",
    desc: "Networking and sharing insights with leading local industry professionals.",
    img: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
  },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  // 1. Filter the data based on the selected category
  const filteredData =
    activeFilter === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === activeFilter);

  // 2. Format the data perfectly for the DomeGallery component
  const domeImages = filteredData.map((item) => ({
    src: item.img,
    alt: item.title,
    category: item.category,
    description: item.desc,
  }));

  return (
    <div className="flex min-h-screen flex-col items-center pb-24 pt-20">
      {/* Page Header */}
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl"
        >
          Through the <br />
          <span className="bg-gradient-to-r from-acm-pink to-acm-electric bg-clip-text text-transparent">
            Lens
          </span>
        </motion.h1>
        <p className="mx-auto max-w-2xl text-lg text-foreground/60">
          A visual journey of our hackathons, workshops, and the incredible
          community that makes ACM SRMIST thrive. Spin the dome to explore.
        </p>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4">
        {/* Category Filters */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className="relative rounded-full px-5 py-2 text-sm font-medium transition-colors"
            >
              {activeFilter === category && (
                <motion.div
                  layoutId="active-filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <span
                className={
                  activeFilter === category
                    ? "text-background"
                    : "text-foreground hover:text-acm-electric"
                }
              >
                {category}
              </span>
            </button>
          ))}
        </div>

        {/* Dome Gallery Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden rounded-[2.5rem] border border-foreground/10 bg-black shadow-2xl"
        >
          <DomeGallery
            // Using the active filter as the 'key' forces React to completely unmount and remount the component.
            // This ensures the 3D physics engine naturally rebuilds and respins the dome with the new filtered images!
            key={activeFilter}
            images={domeImages}
            fit={0.8}
            minRadius={600}
            maxVerticalRotationDeg={0}
            segments={34}
            dragDampening={2}
            grayscale={false}
          />
        </motion.div>
      </div>
    </div>
  );
}
