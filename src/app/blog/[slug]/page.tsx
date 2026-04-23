import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Playfair_Display, Anton, Inter } from "next/font/google";
import { CalendarDays, Clock, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Initialize Google Fonts
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const anton = Anton({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"] });

// --- MOCK DATA FETCHING ---
// In a real app, this would fetch from a database, MDX files, or a CMS (like Sanity/Contentful)
const getPostBySlug = async (slug: string) => {
  const posts = [
    {
      slug: "understanding-react-server-components",
      title: "Understanding React Server Components in Next.js 14",
      excerpt:
        "Dive deep into the new App Router paradigm. Learn how Server Components differ from Client Components.",
      content: "This is where your rich HTML or Markdown content would go...",
      category: "Tutorials",
      author: "MD Nayaj Mondal",
      date: "March 10, 2026",
      isoDate: "2026-03-10T08:00:00+05:30", // Crucial for SEO schemas
      readTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    },
  ];
  return posts.find((p) => p.slug === slug);
};

// ==========================================
// 1. DYNAMIC METADATA GENERATION
// ==========================================
export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return { title: "Post Not Found | ACM SRMIST" };
  }

  return {
    title: `${post.title} | ACM SRMIST Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.acmsrm.in/blog/${post.slug}`,
      type: "article",
      publishedTime: post.isoDate,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

// ==========================================
// 2. THE PAGE UI & JSON-LD SCHEMA
// ==========================================
export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Google Rich Results Schema specifically for Blog Posts
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: [post.image],
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    author: [
      {
        "@type": "Person",
        name: post.author,
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "ACM SRM Student Chapter",
      logo: {
        "@type": "ImageObject",
        url: "https://www.acmsrm.in/acm-logo.webp",
      },
    },
    description: post.excerpt,
  };

  return (
    <article
      className={`relative min-h-screen bg-[#ffffff] pt-32 pb-24 overflow-hidden ${inter.className}`}
    >
      {/* Invisible Schema Script for Google Crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background Matrix/Grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-acm-electric/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="container relative z-10 mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-black/50 hover:text-acm-electric font-bold text-sm uppercase tracking-widest transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Terminal
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#111315] shadow-sm mb-6">
            {post.category}
          </div>

          <h1
            className={`text-5xl md:text-6xl lg:text-7xl uppercase tracking-wide text-[#111315] mb-8 leading-[1.1] ${anton.className}`}
          >
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm font-bold uppercase tracking-widest text-black/50 border-y border-black/5 py-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-acm-violet" /> {post.author}
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-acm-blue" /> {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-acm-pink" /> {post.readTime}
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="w-full h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-black/5 mb-16">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <div
          className={`prose prose-lg md:prose-xl max-w-none text-black/80 leading-relaxed ${playfair.className}`}
        >
          <p className="text-2xl font-medium italic text-black/60 mb-8 border-l-4 border-acm-electric pl-6">
            {post.excerpt}
          </p>
          <p>{post.content}</p>
          {/* Add your MDX renderer or HTML content here */}
        </div>
      </div>
    </article>
  );
}
