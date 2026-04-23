"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { Playfair_Display, Anton } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const anton = Anton({ subsets: ["latin"], weight: "400" });

interface BlogCardProps {
  post: any;
  index: number;
  onClick: () => void;
}

export default function BlogCard({ post, index, onClick }: BlogCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group bg-white flex flex-col overflow-hidden rounded-[2rem] p-3 transition-all hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-black/5 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-56 w-full overflow-hidden rounded-[1.5rem]">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md text-[#111315]">
          {post.category}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3
          className={`mb-3 text-2xl uppercase tracking-wide leading-tight text-[#111315] transition-colors group-hover:text-acm-electric ${anton.className}`}
        >
          {post.title}
        </h3>
        <p
          className={`mb-6 flex-1 text-lg text-black/70 leading-relaxed italic line-clamp-3 ${playfair.className}`}
        >
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-black/5 pt-4 text-xs font-bold uppercase tracking-widest text-black/50 font-sans">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" /> {post.readTime}
          </span>
          <span className="flex items-center gap-1.5 group-hover:text-acm-electric transition-colors">
            Read Article <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
