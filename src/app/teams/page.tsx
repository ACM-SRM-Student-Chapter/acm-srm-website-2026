"use client";

import { useRef, useState, useMemo, useEffect, memo } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useAnimationFrame,
  useVelocity,
  useMotionValue,
  useReducedMotion,
  Variants,
} from "framer-motion";
import dynamic from "next/dynamic";
import { Playfair_Display, Anton, Inter } from "next/font/google";

// ─── Fonts ────────────────────────────────────────────────────────────────────
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const anton = Anton({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"] });

// ─── Animation constants ──────────────────────────────────────────────────────
const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO, delay },
  }),
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO, delay },
  }),
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface Socials {
  linkedin?: string;
  github?: string;
  instagram?: string;
  website?: string;
}

interface Member {
  name: string;
  role: string;
  image: string;
  socials: Socials;
  color?: string;
}

interface Division {
  name: string;
  lead: Member;
  coLead: Member;
}

interface Domain {
  title: string;
  color: string;
  head: Member[];
  coHeads: Member[];
  divisions?: Division[];
}

// ─── CSS for shimmer — injected once via <style> ──────────────────────────────
const SHIMMER_CSS = `@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`;

// ─── Skeleton Loaders ─────────────────────────────────────────────────────────
const ShimmerEffect = () => (
  <div
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent z-10"
    style={{ animation: "shimmer 1.5s infinite" }}
  />
);

const TeamCardSkeleton = memo(() => (
  <div className="h-[360px] w-full rounded-[2.5rem] bg-gray-100 border border-black/5 relative overflow-hidden flex flex-col justify-end p-6 shadow-sm">
    <ShimmerEffect />
    <div className="w-24 h-6 bg-gray-200/80 rounded-full mb-4 mx-auto" />
    <div className="w-48 h-8 bg-gray-200/80 rounded-lg mx-auto" />
  </div>
));
TeamCardSkeleton.displayName = "TeamCardSkeleton";

const IdCardSkeleton = memo(() => (
  <div className="h-[500px] w-[280px] flex flex-col items-center justify-start relative">
    <div className="absolute top-0 z-0 flex w-full flex-col items-center">
      <div className="relative flex h-24 w-16 justify-between overflow-hidden">
        <div className="h-full w-2 rotate-[15deg] bg-gray-200" />
        <div className="h-full w-2 -rotate-[15deg] bg-gray-200" />
      </div>
      <div className="z-10 -mt-2 h-4 w-6 rounded-b-md bg-gray-300" />
      <div className="z-10 h-6 w-3 rounded-full border-[3px] border-gray-300" />
    </div>
    <div className="mt-[100px] h-[380px] w-full rounded-[2rem] bg-gray-100 border border-black/5 relative overflow-hidden p-6 flex flex-col items-center shadow-md">
      <ShimmerEffect />
      <div className="h-2 w-10 rounded-full bg-gray-300 mt-2 mb-8" />
      <div className="w-40 h-40 rounded-2xl bg-gray-200/80 mb-6" />
      <div className="w-32 h-6 bg-gray-200/80 rounded-md mb-3" />
      <div className="w-20 h-4 bg-gray-200/80 rounded-md" />
    </div>
  </div>
));
IdCardSkeleton.displayName = "IdCardSkeleton";

// ─── Lazy-loaded heavy components ─────────────────────────────────────────────
const TeamCard = dynamic(() => import("../../components/ui/TeamCard"), {
  loading: () => <TeamCardSkeleton />,
  ssr: false,
});
const IdCard = dynamic(() => import("../../components/ui/IdCard"), {
  loading: () => <IdCardSkeleton />,
  ssr: false,
});

// ─── Static data (hoisted — never recreated on re-renders) ───────────────────
const FACULTY_SPONSOR: Member = {
  name: "Dr. Suchithra M",
  role: "Sponsor & Convenor",
  image: "/Team/Faculties/Dr-Suchithra-M.webp",
  socials: {
    website: "https://www.srmist.edu.in/faculty/dr-m-suchithra/",
    linkedin: "https://www.linkedin.com/in/suchithra-m-08653265/",
  },
};

const FACULTIES_DATA: Member[] = [
  {
    name: "Dr M Rajalakshmi",
    role: "Core Committee",
    image: "/Team/Faculties/Dr-M-Rajalakshmi.webp",
    socials: {
      website: "https://www.srmist.edu.in/faculty/m-rajalakshmi/",
      linkedin: "#",
    },
  },
  {
    name: "Dr S Nithiya",
    role: "Core Committee",
    image: "/Team/Faculties/Dr-S-Nithiya.webp",
    socials: {
      website: "https://www.srmist.edu.in/faculty/s-nithiya/",
      linkedin: "#",
    },
  },
  {
    name: "Dr Sorna Lakshmi K",
    role: "Core Committee",
    image: "/Team/Faculties/Dr-Sorna-Lakshmi-K.webp",
    socials: {
      website: "https://www.srmist.edu.in/faculty/mrs-k-sorna-lakshmi/",
      linkedin: "#",
    },
  },
  {
    name: "Dr Nithyakani P",
    role: "Core Committee",
    image: "/Team/Faculties/Dr-Nithyakani-P.webp",
    socials: {
      website: "https://www.srmist.edu.in/faculty/p-nithyakani/",
      linkedin: "#",
    },
  },
  {
    name: "Dr M Ranjani",
    role: "Core Committee",
    image: "/Team/Faculties/Dr-M-Ranjani.webp",
    socials: {
      website: "https://www.srmist.edu.in/faculty/ms-m-ranjani/",
      linkedin: "#",
    },
  },
  {
    name: "Dr S Hemavathi",
    role: "Core Committee",
    image: "/Team/Faculties/Dr-S-Hemavathi.webp",
    socials: {
      website: "https://www.srmist.edu.in/faculty/dr-hemavathi-s/",
      linkedin: "#",
    },
  },
  {
    name: "Dr Deeban Chakravarthy V",
    role: "Core Committee",
    image: "/Team/Faculties/Dr-Deeban-Chakravarthy-V.webp",
    socials: {
      website: "https://www.srmist.edu.in/faculty/dr-v-deeban-chakravarthy/",
      linkedin: "https://www.linkedin.com/in/drdeebanchakravarthy/",
    },
  },
  {
    name: "Dr Shiju Kumar P S",
    role: "Core Committee",
    image: "/Team/Faculties/Dr-Shiju-Kumar-P-S.webp",
    socials: {
      website: "https://www.srmist.edu.in/faculty/shiju-kumar-p-s/",
      linkedin: "https://www.linkedin.com/in/dr-shiju-kumar-p-s-53b68771/",
    },
  },
  {
    name: "Dr Ramaprabha",
    role: "Core Committee",
    image: "/Team/Faculties/Dr-Ramaprabha.webp",
    socials: {
      website: "https://www.srmist.edu.in/faculty/mrs-j-ramaprabha-2/",
      linkedin: "#",
    },
  },
  {
    name: "Dr Mangalagowri R",
    role: "Core Committee",
    image: "/Team/Faculties/Dr-Mangalagowri-R.webp",
    socials: {
      website: "https://www.srmist.edu.in/faculty/dr-mangalagowri-r/",
      linkedin: "#",
    },
  },
  {
    name: "Dr G Ramya",
    role: "Core Committee",
    image: "/Team/Faculties/Dr-G-Ramya.webp",
    socials: {
      website: "https://www.srmist.edu.in/faculty/dr-g-ramya/",
      linkedin: "#",
    },
  },
  {
    name: "Dr Jishnu K S",
    role: "Core Committee",
    image: "/Team/Faculties/Dr-Jishnu-K-S.webp",
    socials: {
      website: "https://www.srmist.edu.in/faculty/jishnu-k-s/",
      linkedin: "https://www.linkedin.com/in/jishnuks17/",
    },
  },
  
];

// Split once — no slice() on every render
const FACULTY_ROW_1 = FACULTIES_DATA.slice(0, 8);
const FACULTY_ROW_2 = FACULTIES_DATA.slice(8, 16);

const STUDENT_CORE: (Member & { color: string })[] = [
  {
    name: "Amritanshu Aditya",
    role: "Chairperson",
    image: "/Team/chair.webp",
    color: "electric",
    socials: {
      linkedin: "https://www.linkedin.com/in/amritanshu-aditya-214821329",
      github: "https://github.com/amrit-gpt",
      instagram: "https://www.instagram.com/amritanshuaditya",
    },
  },
  {
    name: "Shreevatsa Yeelarthi",
    role: "Vice Chairperson",
    image: "/Team/vc.webp",
    color: "blue",
    socials: {
      linkedin: "https://www.linkedin.com/in/shreevatsa-yeelarthi-920a19306/",
      github: "#",
      instagram:
        "https://www.instagram.com/notvatsaaa?igsh=MTk5bm9ma3ozOG53ag%3D%3D&utm_source=qr",
    },
  },
    {
    name: "MD Nayaj Mondal",
    role: "Webmaster",
    image: "/Team/webm.webp",
    color: "electric",
     socials: {
          linkedin: "https://www.linkedin.com/in/md-nayaj-mondal",
          github: "https://github.com/mdnm18",
          instagram: "https://www.instagram.com/md._n.m._india_18/",
        },
  },
  {
    name: "Ayush Joshi",
    role: "Secretary",
    image: "/Team/SECRETARY.webp",
    color: "violet",
    socials: {
      linkedin: "https://www.linkedin.com/in/ayush-joshi-7337b9317/",
       github: "#", 
          instagram: "https://www.instagram.com/_joshi_ayush_"
    },
  },
   {
    name: "Kiran Paul K",
    role: "Joint Secretary",
    image: "/Team/JOINTSECRETARY.png",
    color: "pink",
    socials: {
      linkedin: "https://www.linkedin.com/in/kiranpauls/",
      github: "https://github.com/kiran58-max",
      instagram: "https://www.instagram.com/_kevin_j03",
    },
  },
  {
    name: "Amay Jariwala",
    role: "Treasurer",
    image: "/Team/Treasurer.webp",
    color: "green",
    socials: {
      linkedin: "https://www.linkedin.com/in/amay-jariwala",
      github: "https://github.com/Amay-Git101",
      instagram: "https://www.instagram.com/amayjariwala_1109",
    },
  },

  // {
  //   name: "announcing soon...",
  //   role: "Membership Chair",
  //   image: "#",
  //   color: "pink",
  //   socials: {
  //     linkedin: "#",
  //     github: "#",
  //     instagram: "#",
  //   },
  // },
];

const DOMAIN_FILTERS = [
  "ALL",
  "Foundry",
  "Orchestrators",
  "Elevators",
  "Amplifier",
  "Canvas",
] as const;

type DomainFilter = (typeof DOMAIN_FILTERS)[number];

const DOMAINS: Domain[] = [
  {
    title: "Foundry",
    color: "electric",
    head: [
      {
        name: "Rajrupa Das",
        role: "Head",
        image: "/Team/headtech.webp",
        socials: {
          linkedin: "https://www.linkedin.com/in/rajrupa-das-8b9597324",
          github: "https://github.com/RajrupaDas",
          instagram: "#",
        },
      },
      {
        name: "Yatindra Rai",
        role: "Co-Head",
        image: "/Team/leadaiml.webp",
        socials: {
          linkedin: "https://www.linkedin.com/in/yatindra-rai-6a3181324/",
          github:
            "https://github.com/YatindraRai002?tab=overview&from=2026-07-01&to=2026-07-06",
          instagram: "https://www.instagram.com/yatindra_0045/",
        },
      },
    ],
    coHeads: [],
    divisions: [
          {
        name: "Competitive Programming",
        lead: {
          name: "MD Ashif Iqbal",
          role: "Lead",
          image: "/Team/leadcpo.webp",
          socials: {
            linkedin: "https://www.linkedin.com/in/md-ashif-iqbal/",
            github: "https://github.com/ashif-iqbal",
            instagram: "https://www.instagram.com/_ashif.x_x",
          },
        },
        coLead: {
          name: "Raushan Kumar",
          role: "Co-Lead",
          image: "#",
          socials: {
            linkedin: "https://www.linkedin.com/in/raushan-kumar1504/",
            github: "https://github.com/Raushan1504",
            instagram: "https://www.instagram.com/rashukumar1504/",
          },
        },
      },
            {
        name: "Web Dev + Cloud & DevOps",
        lead: {
          name: "Om Prakash Samal",
          role: "Lead",
          image: "/Team/coleadwebdev.webp",
          socials: {
            linkedin: "https://www.linkedin.com/in/om-prakash-samal06/",
            github: "https://github.com/Om-Prakash-Samal",
            instagram: "https://www.instagram.com/om_prakash_samal18/",
          },
        },
        coLead: {
          name: "Mohammed Fahad Kasim",
          role: "Co-Lead",
          image: "#",
          socials: {
            linkedin:
              "https://www.linkedin.com/in/mohammed-fahad-kasim-0bb97a256/",
            github: "#",
            instagram: "https://www.instagram.com/fahadchamp18/",
          },
        },
      },
      {
        name: "AI/ML & MLOps",
        lead: {
          name: "Shudhanshu Kumar",
          role: "Lead",
          image: "/Team/leadwebdev.webp",
          socials: {
            linkedin: "https://www.linkedin.com/in/shudhanshukumar",
            github: "https://github.com/Shudhanshu9122",
            instagram: "https://www.instagram.com/fit_shudhanshu_",
          },
        },
        coLead: {
          name: "Sai Sraddha Krishnan",
          role: "Co-Lead",
          image: "#",
          socials: {
            linkedin:
              "https://www.linkedin.com/in/sai-sraddha-krishnan-9813193a6/",
            github: "#",
            instagram: "https://www.instagram.com/sshraddha.krishnan/",
          },
        },
      },
    ],
  },
  {
    title: "Orchestrators",
    color: "blue",
    head: [
      {
        name: "Ved Vardhan Vishnoi",
        role: "Head",
        image: "#",
        socials: {
          linkedin: "https://www.linkedin.com/in/ved-vardhan-vishnoi/",
          instagram: "https://www.instagram.com/veeeeed__/",
        },
      },
    ],
    coHeads: [
      {
        name: "PUNYATOYA BISWAL",
        role: "Co-Head",
        image: "/Team/coheadevents.png",
        socials: {
          linkedin: "https://www.linkedin.com/in/punyatoya-biswal-66720437a/",
          instagram: "https://www.instagram.com/punya_si07/",
        },
      },
      {
        name: "announcing soon...",
        role: "Co-Head",
        image: "#",
        socials: {
          linkedin: "#",
          instagram: "#",
        },
      },
    ],
  },
  {
    title: "Elevators",
    color: "green",
    head: [
      {
        name: "ANUSHKA S TIWARI",
        role: "Head",
        image: "#",
        socials: {
          linkedin: "https://www.linkedin.com/in/anushka-s-tiwari-382410384/",
          instagram: "https://www.instagram.com/anuusshka._/",
        },
      },
    ],
    coHeads: [
      {
        name: "SHREYANKA CHAKRABARTI",
        role: "Co-Head",
        image: "/Team/coleadsponsor.webp",
        socials: {
          linkedin:
            "https://www.linkedin.com/in/shreyanka-chakrabarti-1bb912353/",
          instagram: "https://www.instagram.com/_.shreyaannkkaaa/",
        },
      },
      {
        name: "Jay Solanki",
        role: "Co-Head",
        image: "/Team/coleadsponsor2.webp",
        socials: {
          linkedin: "https://www.linkedin.com/in/jay-solanki-b7116a329",
          instagram: "https://www.instagram.com/jay.solankii_20",
        },
      },
    ],
  },
  {
    title: "Amplifier",
    color: "violet",
    head: [
      {
        name: "Samayshrey Patnaik",
        role: "Head",
        image: "/Team/Headpr.png",
        socials: {
          linkedin: "https://www.linkedin.com/in/samayshrey-patnaik/",
          instagram: "https://www.instagram.com/isomoii/",
        },
      },
    ],
    coHeads: [
      {
        name: "ARPITA MOHAPATRA",
        role: "Co-Head",
        image: "#",
        socials: {
          linkedin: "https://www.linkedin.com/in/arpita-mohapatra-2b4387397/",
          instagram: "https://www.instagram.com/arpitamoha_1005/",
        },
      },
      {
        name: "ARUNIMA NIGAM",
        role: "Co-Head",
        image: "#",
        socials: {
          linkedin: "https://www.linkedin.com/in/arunima-nigam-12a444378/",
          instagram: "https://www.instagram.com/aru_nigss/",
        },
      },
    ],
  },
  {
    title: "Canvas",
    color: "pink",
    head: [
      {
        name: "announcing soon...",
        role: "Head",
        image: "#",
        socials: {
          linkedin: "#",
          instagram: "#",
        },
      },
    ],
    coHeads: [
      {
        name: "announcing soon...",
        role: "Co-Head",
        image: "#",
        socials: {
          linkedin: "#",
          instagram: "#",
        },
      },
      {
        name: "announcing soon...",
        role: "Co-Head",
        image: "#",
        socials: {
          linkedin: "#",
          instagram: "#",
        },
      },
    ],
  },
];

// ─── BACKGROUND WATERMARK TEXT MAP ────────────────────────────────────────────
const DOMAIN_BACKGROUND_TEXT: Record<string, string> = {
  Foundry:
    "Technical Web Dev Cloud & DevOps Competitive Programming AI/ML MLOps",
  Amplifier: "PR\n & \nOutreach \n\n\n",
  Elevators: "Sponsorship\n & \nFinance",
  Canvas: "Creatives Social Media \nVideography\n & \nPhotography",
  Orchestrators: "Events\n & \nCorporate",
};

// Subtle per-domain color wash — raw rgba values for backgroundImage use
const DOMAIN_GLOW: Record<string, string> = {
  electric: "rgba(0,240,255,0.055)",
  violet: "rgba(123,97,255,0.055)",
  green: "rgba(0,200,100,0.055)",
  pink: "rgba(255,0,128,0.055)",
  blue: "rgba(0,120,255,0.055)",
};

// ─── Reusable Section Header ──────────────────────────────────────────────────
const SectionHeader = memo(
  ({
    label,
    index,
    accent,
  }: {
    label: string;
    index: number;
    accent: string;
  }) => (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="mb-16 flex flex-col items-center text-center relative z-10"
    >
      <motion.span
        variants={fadeUp}
        custom={0}
        className="mb-3 text-[11px] font-bold uppercase tracking-[0.32em] text-black/30"
      >
        0{index}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        custom={0.05}
        className={`text-4xl md:text-5xl uppercase tracking-wider text-[#111315] ${anton.className}`}
      >
        {label}
      </motion.h2>
      <motion.div
        variants={fadeUp}
        custom={0.1}
        className={`mt-4 h-[3px] w-20 rounded-full bg-acm-${accent}`}
      />
    </motion.div>
  ),
);
SectionHeader.displayName = "SectionHeader";

// ─── Velocity Marquee ─────────────────────────────────────────────────────────
const VelocityMarquee = memo(
  ({ items, baseVelocity }: { items: Member[]; baseVelocity: number }) => {
    const prefersReducedMotion = useReducedMotion();
    const [isPaused, setIsPaused] = useState(false);

    const trackRef = useRef<HTMLDivElement>(null);
    const baseX = useRef(0);
    const resetAt = useRef(-2400); // overwritten after mount

    // Measure one copy's real rendered width for a pixel-perfect seamless loop
    useEffect(() => {
      if (!trackRef.current) return;
      // trackRef contains 3 identical copies; one copy = total / 3
      resetAt.current = -(trackRef.current.scrollWidth / 3);
    }, [items]);

    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 400,
    });
    const xPos = useMotionValue(0);

    // Memoize tripled array — never recreated unless items changes
    const tripled = useMemo(() => [...items, ...items, ...items], [items]);

    useAnimationFrame((_t, delta) => {
      if (isPaused || prefersReducedMotion) return;

      let moveBy = baseVelocity * (delta / 1000);
      // Scroll boost: speed up proportionally to scroll velocity
      moveBy += moveBy * (Math.abs(smoothVelocity.get()) / 100);
      baseX.current += moveBy;

      // Snap back exactly one copy's width for a seamless infinite loop
      if (baseX.current <= resetAt.current) baseX.current = 0;
      if (baseX.current > 0) baseX.current = resetAt.current;

      xPos.set(baseX.current);
    });

    return (
      <div
        className="relative flex w-full overflow-hidden whitespace-nowrap py-4"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-label="Scrolling faculty cards — hover to pause"
      >
        <motion.div
          ref={trackRef}
          className="flex gap-5 px-3 will-change-transform"
          style={{ x: xPos }}
        >
          {tripled.map((faculty, idx) => (
            // Stable keys: name + position in tripled array avoids collision across copies
            <div
              key={`${faculty.name}-${idx}`}
              className="w-[260px] sm:w-[290px] shrink-0"
            >
              <TeamCard {...faculty} accentColor="blue" />
            </div>
          ))}
        </motion.div>
      </div>
    );
  },
);
VelocityMarquee.displayName = "VelocityMarquee";

// ─── Domain Section ───────────────────────────────────────────────────────────
const DomainSection = memo(
  ({ domain, index }: { domain: Domain; index: number }) => (
    <section className="container mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        className="rounded-[2.5rem] p-6 sm:p-10 md:p-16 relative overflow-hidden border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.05)] bg-white flex flex-col items-center"
        style={{
          // Subtle per-domain color radial wash at the top — no extra DOM node
          backgroundImage: `radial-gradient(ellipse 80% 40% at 50% 0%, ${DOMAIN_GLOW[domain.color]} 0%, transparent 100%)`,
        }}
      >
        {/* ─── CREATIVE BACKGROUND WATERMARK TEXT ─── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden opacity-[0.04] select-none">
          <span
            className={`text-[12vw] leading-none text-center whitespace-pre-wrap px-4 ${playfair.className} italic font-black`}
            style={{ wordBreak: "break-word" }}
          >
            {DOMAIN_BACKGROUND_TEXT[domain.title] || domain.title}
          </span>
        </div>

        {/* Ensure content sits above the watermark */}
        <div className="relative z-10 w-full flex flex-col items-center">
          <SectionHeader
            label={domain.title}
            index={index + 3}
            accent={domain.color}
          />

          {/* ─── Foundry Domain: Head & Co-Head, then Division-wise Leads & Co-Leads ─── */}
          {domain.divisions ? (
            <div className="flex flex-col items-center w-full">
              {/* Head & Co-Head */}
              <div className="flex flex-col items-center w-full mb-12">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-black/5 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-black/60 border border-black/10">
                  Domain Leadership
                </div>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  className="flex w-full max-w-3xl flex-wrap justify-center gap-6 md:gap-8"
                >
                  {domain.head.map((member) => (
                    <motion.div
                      key={member.name}
                      variants={cardReveal}
                      className="w-full sm:w-[calc(50%-16px)] md:w-[38%]"
                    >
                      <TeamCard {...member} accentColor={domain.color} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Visual divider */}
              <div
                className={`w-20 h-px bg-acm-${domain.color}/30 mb-14`}
                aria-hidden
              />

              {/* Division-wise Leads & Co-Leads */}
              <div className="flex flex-col items-center w-full gap-10">
                <div className="text-center">
                  <div className="text-xs font-mono font-bold uppercase tracking-widest text-black/40 mb-1">
                    Technical Divisions
                  </div>
                  <div
                    className={`text-2xl md:text-3xl uppercase tracking-wide text-[#111315] ${anton.className}`}
                  >
                    Division Leads &amp; Co-Leads
                  </div>
                </div>

                <div className="flex flex-col gap-10 w-full max-w-5xl">
                  {domain.divisions.map((division) => (
                    <div
                      key={division.name}
                      className="w-full flex flex-col items-center rounded-3xl bg-black/[0.015] border border-black/5 p-6 md:p-8"
                    >
                      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-acm-electric/40 bg-acm-electric/10 px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#111315]">
                        <span className="w-2 h-2 rounded-full bg-acm-electric" />
                        {division.name}
                      </div>

                      <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        className="flex w-full max-w-3xl flex-wrap justify-center gap-6 md:gap-8"
                      >
                        <motion.div
                          variants={cardReveal}
                          className="w-full sm:w-[calc(50%-16px)] md:w-[38%]"
                        >
                          <TeamCard
                            {...division.lead}
                            accentColor={domain.color}
                          />
                        </motion.div>
                        <motion.div
                          variants={cardReveal}
                          className="w-full sm:w-[calc(50%-16px)] md:w-[38%]"
                        >
                          <TeamCard
                            {...division.coLead}
                            accentColor={domain.color}
                          />
                        </motion.div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ─── Standard Domains: Head, then Co-Heads ─── */
            <div className="flex flex-col items-center gap-10 w-full">
              {/* Head */}
              <div className="flex flex-col items-center w-full">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-black/5 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-black/60 border border-black/10">
                  Domain Head
                </div>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  className="flex w-full max-w-3xl flex-wrap justify-center gap-6 md:gap-8"
                >
                  {domain.head.map((member) => (
                    <motion.div
                      key={member.name}
                      variants={cardReveal}
                      className="w-full sm:w-[calc(50%-16px)] md:w-[38%]"
                    >
                      <TeamCard {...member} accentColor={domain.color} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Visual divider between rows */}
              <div
                className={`w-16 h-px bg-acm-${domain.color}/25`}
                aria-hidden
              />

              {/* Co-Heads */}
              <div className="flex flex-col items-center w-full">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-black/5 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-black/60 border border-black/10">
                  Domain Co-Heads
                </div>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  className="flex w-full max-w-5xl flex-wrap justify-center gap-6 md:gap-8"
                >
                  {domain.coHeads.map((member, idx) => (
                    <motion.div
                      key={`${member.name}-${idx}`}
                      variants={cardReveal}
                      custom={idx * 0.08}
                      className="w-full sm:w-[calc(50%-16px)] md:w-[calc(33%-16px)] lg:w-[calc(28%-16px)]"
                    >
                      <TeamCard {...member} accentColor={domain.color} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  ),
);
DomainSection.displayName = "DomainSection";

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TeamsPage() {
  const [selectedDomain, setSelectedDomain] = useState<DomainFilter>("ALL");
  const prefersReducedMotion = useReducedMotion();

  const displayedDomains = useMemo(() => {
    if (selectedDomain === "ALL") return DOMAINS;
    return DOMAINS.filter((d) => d.title === selectedDomain);
  }, [selectedDomain]);

  return (
    <>
      {/* Shimmer keyframe — a single <style> tag is cleaner than dangerouslySetInnerHTML on a div */}
      <style>{SHIMMER_CSS}</style>

      <div
        className={`relative flex flex-col items-center pb-32 pt-20 overflow-hidden bg-[#ffffff] ${inter.className}`}
      >
        {/* ── Grid Background ───────────────────────────────────────────────── */}
        <div
          aria-hidden
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Ambient glows — consistent with gallery & events pages */}
        <div
          aria-hidden
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-acm-blue/10 rounded-full blur-[120px] pointer-events-none z-0"
        />
        <div
          aria-hidden
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-acm-violet/[0.08] rounded-full blur-[120px] pointer-events-none z-0"
        />
        <div
          aria-hidden
          className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-acm-electric/[0.06] rounded-full blur-[150px] pointer-events-none z-0"
        />

        {/* ── Page Header ───────────────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="container relative z-10 mx-auto px-4 py-16 text-center"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="mb-4 text-[11px] font-bold uppercase tracking-[0.35em] text-black/30"
          >
            The people powering the chapter
          </motion.p>
          <motion.h1
            variants={fadeUp}
            custom={0.05}
            className={`mb-6 text-5xl md:text-7xl uppercase tracking-wide text-[#111315] ${anton.className}`}
          >
            Meet the Minds <br />
            <span className="text-acm-blue">Behind ACM SRM</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={0.1}
            className={`mx-auto max-w-xl text-lg text-black/50 italic ${playfair.className}`}
          >
            Faculty who guide us, student leaders who drive us, and domain
            experts who ship the work.
          </motion.p>
        </motion.div>

        {/* ── All Sections ──────────────────────────────────────────────────── */}
        <div className="w-full relative z-10 space-y-32 md:space-y-40">
          {/* 01 — Faculty Leadership (Constant) */}
          <section className="w-full">
            <div className="container mx-auto px-4">
              <SectionHeader
                label="Faculty Leadership"
                index={1}
                accent="blue"
              />
            </div>

            {/* Sponsor & Convenor — centered, max-width constrained */}
            <div className="container mx-auto px-4 mb-16 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                className="w-full max-w-[360px]"
              >
                <TeamCard {...FACULTY_SPONSOR} accentColor="violet" />
              </motion.div>
            </div>

            {/* Core Committee Marquee — full-bleed */}
            <div className="w-full flex flex-col gap-6 overflow-hidden">
              <VelocityMarquee items={FACULTY_ROW_1} baseVelocity={-50} />
              <VelocityMarquee items={FACULTY_ROW_2} baseVelocity={50} />
            </div>
          </section>

          {/* 02 — Office Bearers (Constant / Interactive ID Cards) */}
          <section className="container mx-auto px-4 sm:px-6">
            <SectionHeader label="Office Bearers" index={2} accent="violet" />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`-mt-8 mb-16 text-center text-black/40 text-base italic ${playfair.className}`}
            >
              Grab and swing the cards
            </motion.p>

            {/* 1-col mobile → 2-col sm → 3-col md */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-20 gap-x-4 justify-items-center max-w-5xl mx-auto">
              {STUDENT_CORE.map((member, idx) => {
                return (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.65,
                      delay: (idx % 3) * 0.15,
                      type: "spring",
                      stiffness: 80,
                      damping: 18,
                    }}
                  >
                    <IdCard {...member} />
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* 03 — Domains with Interactive Domain Filter */}
          <section className="w-full">
            <div className="container mx-auto px-4 mb-4">
              <SectionHeader label="Our Domains" index={3} accent="electric" />
            </div>

            {/* Domain Filter Bar */}
            <div className="container mx-auto px-4 sm:px-6 mb-16 flex justify-center">
              <div
                role="tablist"
                aria-label="Filter domains"
                className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-black/[0.04] border border-black/10 backdrop-blur-md shadow-sm"
              >
                {DOMAIN_FILTERS.map((filter) => {
                  const isActive = selectedDomain === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedDomain(filter)}
                      className={`relative rounded-full px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 ${
                        isActive ? "text-white" : "text-black/60 hover:text-black"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId={
                            prefersReducedMotion
                              ? undefined
                              : "team-domain-pill"
                          }
                          className="absolute inset-0 -z-10 rounded-full bg-[#111315] shadow-[0_5px_15px_rgba(0,0,0,0.15)]"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                      <span>{filter === "ALL" ? "All Domains" : filter}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Domain Cards List */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDomain}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                className="w-full space-y-24 md:space-y-32"
              >
                {displayedDomains.map((domain) => {
                  const domainIndex = DOMAINS.findIndex(
                    (d) => d.title === domain.title,
                  );
                  return (
                    <DomainSection
                      key={domain.title}
                      domain={domain}
                      index={domainIndex}
                    />
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </section>
        </div>
      </div>
    </>
  );
}
