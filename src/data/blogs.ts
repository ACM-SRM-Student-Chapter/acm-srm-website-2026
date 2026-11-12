export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Articles" | "Tutorials" | "Event Coverage" | "Tech Insights";
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
  linkedinUrl?: string;
  youtubeUrl?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 4,
    slug: "ultimate-guide-ats-friendly-resume-ai-latex",
    title:
      "Ultimate Guide: How to Build a Killer, ATS-Friendly Resume Using AI & LaTeX",
    excerpt:
      "Recruiters spend an average of just 6 to 8 seconds scanning a resume—and up to 75% of resumes are filtered out by ATS bots before a human ever sees them.",
    content:
      "If you are using multi-column templates, graphics, tables, or text boxes, ATS parsers often scramble your data into an instant rejection. By combining AI to sharpen your impact bullets with LaTeX on Overleaf for clean, machine-readable formatting, you can craft a single-page tech resume that beats ATS algorithms and stands out to recruiters.\n\nRead the complete step-by-step guide—covering the 7-section Golden ATS Structure, the Action Verb + Task + Impact formula, and the Master AI Prompt Cheat Sheet—on the original LinkedIn article, or watch the full walkthrough on YouTube.",
    category: "Tutorials",
    author: "MD Nayaj Mondal",
    date: "July 3, 2026",
    readTime: "6 min read",
    image: "/BlogsPoster/th1.png",
    featured: true,
    linkedinUrl:
      "https://www.linkedin.com/pulse/ultimate-guide-how-build-killer-ats-friendly-resume-using-dmp5f",
    youtubeUrl: "https://youtu.be/tFrYzUAZWzg?si=RZNqYabN6Plahru1",
  },
  {
    id: 1,
    slug: "understanding-react-server-components",
    title: "Understanding React Server Components in Next.js 14",
    excerpt:
      "Dive deep into the new App Router paradigm. Learn how Server Components differ from Client Components and when to use them for maximum performance.",
    content:
      "Here is the full content of the blog. You can write paragraphs of text here explaining React Server Components, how they stream HTML directly from the server, reduce client-side JavaScript bundles, and drastically improve your Core Web Vitals. \n\nThis makes building scalable MERN or Next.js applications much more efficient.",
    category: "Tutorials",
    author: "MD Nayaj Mondal",
    date: "March 10, 2026",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    featured: false,
  },
  {
    id: 2,
    slug: "symposium-on-responsible-ai-what-to-expect",
    title: "Symposium on Responsible AI: What to Expect",
    excerpt:
      "Get a sneak peek into our flagship 3-day event. We discuss the lineup of speakers, hands-on workshops, and the ethical AI debates you won't want to miss.",
    content:
      "Full details about the upcoming AI symposium. We will be covering the ethical implications of Large Language Models, bias in machine learning datasets, and how the industry is pivoting towards responsible AI frameworks.",
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
    slug: "the-rise-of-open-source-why-you-should-contribute",
    title: "The Rise of Open Source: Why You Should Contribute",
    excerpt:
      "Open source is more than just free code. It's a collaborative ecosystem. Learn how contributing to projects like GSSoC can kickstart your software career.",
    content:
      "Contributing to open source is one of the best ways to learn by building. Programs like GSSoC and Hacktoberfest provide a structured environment to understand version control, collaborate with global teams, and push robust code to production environments.",
    category: "Articles",
    author: "Amritanshu Aditya",
    date: "Feb 28, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    featured: false,
  },
];
