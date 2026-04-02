"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, User, CalendarDays, ArrowRight, BookOpen } from "lucide-react";

const categories = [
  "All",
  "Articles",
  "Tutorials",
  "Event Coverage",
  "Tech Insights",
];

// Placeholder data for the blog posts
const blogPosts = [
  {
    id: 1,
    title: "Understanding React Server Components in Next.js 14",
    excerpt:
      "Dive deep into the new App Router paradigm. Learn how Server Components differ from Client Components and when to use them for maximum performance.",
    category: "Tutorials",
    author: "MD Nayaj Mondal",
    date: "March 10, 2026",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: 2,
    title: "Symposium on Responsible AI: What to Expect",
    excerpt:
      "Get a sneak peek into our flagship 3-day event. We discuss the lineup of speakers, hands-on workshops, and the ethical AI debates you won't want to miss.",
    category: "Event Coverage",
    author: "Srilekha",
    date: "March 5, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?q=80&w=800&auto=format&fit=crop",
    featured: false,
  },
  {
    id: 3,
    title: "The Rise of Open Source: Why You Should Contribute",
    excerpt:
      "Open source is more than just free code. It's a collaborative ecosystem. Learn how contributing to projects like GSSoC can kickstart your software career.",
    category: "Articles",
    author: "Amritanshu Aditya",
    date: "Feb 28, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    featured: false,
  },
  {
    id: 4,
    title: "A Beginner's Guide to MLOps pipelines",
    excerpt:
      "Machine learning models are useless if they stay on your local machine. Here is a practical guide to deploying models using Docker and Kubernetes.",
    category: "Tech Insights",
    author: "Ankush Wadehra",
    date: "Feb 15, 2026",
    readTime: "12 min read",
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop",
    featured: false,
  },
  {
    id: 5,
    title: "Ideaforge Hackathon: Winners & Innovations",
    excerpt:
      "A look back at the brilliant solutions built during our 24-hour coding sprint. From IoT security to GenAI travel planners.",
    category: "Event Coverage",
    author: "Divita",
    date: "Jan 30, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
    featured: false,
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter(
    (post) => !post.featured || activeCategory !== "All",
  );

  return (
    <div className="flex min-h-screen flex-col items-center pb-24 pt-20">
      {/* Page Header */}
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-acm-pink/30 bg-acm-pink/10 px-4 py-1.5 text-sm font-bold tracking-wide text-acm-pink shadow-[0_0_15px_rgba(255,64,129,0.2)]">
            <BookOpen className="h-4 w-4" />
            CONTENT HUB
          </div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl"
        >
          The{" "}
          <span className="bg-gradient-to-r from-acm-violet to-acm-pink bg-clip-text text-transparent">
            Terminal
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto max-w-2xl text-lg text-foreground/60"
        >
          Stay updated with the latest tech insights, hands-on tutorials, and
          deep-dives into the events happening at ACM SRMIST.
        </motion.p>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 space-y-16">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="relative rounded-full px-5 py-2 text-sm font-medium transition-colors"
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="blog-filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <span
                className={
                  activeCategory === category
                    ? "text-background"
                    : "text-foreground hover:text-acm-electric"
                }
              >
                {category}
              </span>
            </button>
          ))}
        </div>

        {/* Featured Post (Only show on 'All' tab) */}
        {activeCategory === "All" && featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="group glass-panel relative grid grid-cols-1 gap-8 overflow-hidden rounded-[2.5rem] p-4 transition-all hover:shadow-[0_0_40px_rgba(123,97,255,0.15)] lg:grid-cols-2"
          >
            <div className="relative h-64 w-full overflow-hidden rounded-[2rem] lg:h-full lg:min-h-[400px]">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute left-4 top-4 rounded-full bg-acm-electric px-3 py-1 text-xs font-bold uppercase tracking-wider text-black">
                Featured • {featuredPost.category}
              </div>
            </div>
            <div className="flex flex-col justify-center p-6 lg:p-12">
              <h2 className="mb-4 text-3xl font-extrabold md:text-4xl lg:text-5xl lg:leading-tight">
                <a
                  href="#"
                  className="text-foreground transition-colors hover:text-acm-electric"
                >
                  {featuredPost.title}
                </a>
              </h2>
              <p className="mb-8 text-lg text-foreground/70 line-clamp-3">
                {featuredPost.excerpt}
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-4 text-sm font-medium text-foreground/60">
                <div className="flex items-center gap-1.5">
                  <User className="h-4 w-4 text-acm-violet" />{" "}
                  {featuredPost.author}
                </div>
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-acm-blue" />{" "}
                  {featuredPost.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-acm-pink" />{" "}
                  {featuredPost.readTime}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Posts Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {regularPosts.map((post, idx) => (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                key={post.id}
                className="group glass-panel flex flex-col overflow-hidden rounded-[2rem] p-3 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-foreground/5"
              >
                <div className="relative h-56 w-full overflow-hidden rounded-[1.5rem]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute right-4 top-4 rounded-full bg-background/80 px-3 py-1 text-xs font-bold backdrop-blur-md text-foreground">
                    {post.category}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-3 text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-acm-electric">
                    <a href="#">{post.title}</a>
                  </h3>
                  <p className="mb-6 flex-1 text-sm text-foreground/70 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-foreground/10 pt-4 text-xs font-medium text-foreground/60">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" /> {post.readTime}
                    </span>
                    <span className="flex items-center gap-1.5 group-hover:text-acm-electric transition-colors">
                      Read Article <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
