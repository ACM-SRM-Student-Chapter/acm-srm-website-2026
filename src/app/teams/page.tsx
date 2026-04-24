"use client";

import { useRef, useState, useMemo, useEffect, memo } from "react";
import {
  motion,
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
interface Domain {
  title: string;
  color: string;
  row1: Member[];
  row2: Member[];
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
    name: "Dr Bhargavi G",
    role: "Core Committee",
    image: "/Team/Faculties/Dr-Bhargavi-G.webp",
    socials: {
      website: "https://www.srmist.edu.in/faculty/mrs-bhargavi-g/",
      linkedin: "https://www.linkedin.com/in/bhargavi-g-6832911b7/",
    },
  },
  {
    name: "Dr Ajanthaa Lakkshmanan",
    role: "Core Committee",
    image: "/Team/Faculties/Dr-Ajanthaa-Lakkshmanan.webp",
    socials: {
      website: "https://www.srmist.edu.in/faculty/dr-ajanthaa-lakkshmanan/",
      linkedin: "https://www.linkedin.com/in/ajanthaa-lakkshmanan-3458602a0/",
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
    name: "Dr U M Prakash",
    role: "Core Committee",
    image: "/Team/Faculties/Dr-U-M-Prakash.webp",
    socials: {
      website: "https://www.srmist.edu.in/faculty/mr-u-m-prakash/",
      linkedin: "https://www.linkedin.com/in/prakashmuthusamyum",
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
  {
    name: "Dr Dandumahanti Bhanu Priya",
    role: "Core Committee",
    image: "/Team/Faculties/Dr-Dandumahanti-Bhanu-Priya.webp",
    socials: {
      website: "https://www.srmist.edu.in/faculty/dr-dandumahanti-bhanu-priya/",
      linkedin:
        "https://www.linkedin.com/in/bhanu-priya-dandumahanti-5b6361145/",
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
    name: "Dhruv Pratap Singh",
    role: "Secretary",
    image: "/Team/SECRETARY.webp",
    color: "violet",
    socials: {
      linkedin: "https://www.linkedin.com/in/dhruv-pratap-singh-044872341",
      github: "https://github.com/Dhruv2-lang",
      instagram: "https://www.instagram.com/dhruv_singh2303/",
    },
  },
  {
    name: "Mahathi Indu T",
    role: "Joint Secretary",
    image: "/Team/JOINTSECRETARY.webp",
    color: "pink",
    socials: {
      linkedin: "https://www.linkedin.com/in/mahathi-t",
      github: "https://github.com/Mahathi935",
      instagram: "https://www.instagram.com/moonlily593",
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
  {
    name: "Kevin Godfrey",
    role: "Webmaster",
    image: "/Team/webm.webp",
    color: "electric",
    socials: {
      linkedin: "https://www.linkedin.com/in/kevin-godfrey-9b5643326/",
      github: "https://github.com/Jarvis-the-og",
      instagram: "https://www.instagram.com/rish_abhdeva/",
    },
  },
  {
    name: "Srilekha Kramadhati",
    role: "Membership Chair",
    image: "/Team/mc.webp",
    color: "pink",
    socials: {
      linkedin: "https://www.linkedin.com/in/srilekha-kramadhati",
      github: "#",
      instagram: "#",
    },
  },
];

const DOMAINS: Domain[] = [
  {
    title: "Foundry",
    color: "electric",
    row1: [
      {
        name: "MD Nayaj Mondal",
        role: "Head",
        image: "/Team/headtech.webp",
        socials: {
          linkedin: "https://www.linkedin.com/in/md-nayaj-mondal",
          github: "https://github.com/mdnm18",
          instagram: "https://www.instagram.com/md._n.m._india_18/",
        },
      },
      {
        name: "Rajrupa Das",
        role: "Co-Head",
        image: "/Team/coheadtech.webp",
        socials: {
          linkedin: "https://www.linkedin.com/in/rajrupa-das-8b9597324",
          github: "https://github.com/RajrupaDas",
          instagram: "#",
        },
      },
    ],
    row2: [
      {
        name: "MD Ashif Iqbal",
        role: "Lead – Competitive Programming",
        image: "/Team/leadcpo.webp",
        socials: {
          linkedin: "https://www.linkedin.com/in/md-ashif-iqbal/",
          github: "https://github.com/ashif-iqbal",
          instagram: "https://www.instagram.com/_ashif.x_x",
        },
      },
      {
        name: "Shudhanshu Kumar",
        role: "Lead – Web Dev + Cloud & DevOps",
        image: "/Team/leadwebdev.webp",
        socials: {
          linkedin: "https://www.linkedin.com/in/shudhanshukumar",
          github: "https://github.com/Shudhanshu9122",
          instagram: "https://www.instagram.com/fit_shudhanshu_",
        },
      },
      {
        name: "Ankush Wadehra",
        role: "Lead – AI/ML & MLOps",
        image: "Team/leadaiml.webp",
        socials: {
          linkedin: "https://www.linkedin.com/in/ankush-wadehra-bb64b0258",
          github: "https://github.com/beastgotfried",
          instagram: "#",
        },
      },
      {
        name: "Om Prakash Samal",
        role: "Co-Lead – Web Dev + Cloud & DevOps",
        image: "/Team/coleadwebdev.webp",
        socials: {
          linkedin: "https://www.linkedin.com/in/om-prakash-samal06/",
          github: "https://github.com/Om-Prakash-Samal",
          instagram: "https://www.instagram.com/om_prakash_samal18/",
        },
      },
    ],
  },
  {
    title: "Amplifier",
    color: "violet",
    row1: [
      {
        name: "Krishansh Verma",
        role: "Lead",
        image: "/Team/leadpr.webp",
        socials: {
          linkedin: "https://www.linkedin.com/in/krishansh-verma-787967215/",
          instagram: "https://www.instagram.com/krishansh_031/",
        },
      },
    ],
    row2: [
      {
        name: "Jay Solanki",
        role: "Co-lead",
        image: "/Team/coleadpr1.webp",
        socials: {
          linkedin: "https://www.linkedin.com/in/jay-solanki-b7116a329",
          instagram: "https://www.instagram.com/jay.solankii_20",
        },
      },
      {
        name: "Ipshita Sharma",
        role: "Co-lead",
        image: "/Team/coleadpr.webp",
        socials: {
          linkedin: "https://www.linkedin.com/in/ipshita-sharma-2a2984327",
          instagram: "https://www.instagram.com/ipshita_sharmaa/",
        },
      },
    ],
  },
  {
    title: "Elevators",
    color: "green",
    row1: [
      {
        name: "Dhruv Mahajan",
        role: "Lead",
        image: "/Team/leadsponsership.webp",
        socials: {
          linkedin: "https://www.linkedin.com/in/dhruvmahajan22",
          instagram: "https://www.instagram.com/dhru.v_22",
        },
      },
    ],
    row2: [
      {
        name: "Yatharth Garg",
        role: "Co-lead",
        image: "/Team/coleadsponsership.webp",
        socials: {
          linkedin: "https://www.linkedin.com/in/yatharth-garg2905",
          instagram: "https://www.instagram.com/ya1hartthh",
        },
      },
      {
        name: "Shreyanka Chakrabarti",
        role: "Co-lead",
        image: "/Team/coleadsponsor.webp",
        socials: {
          linkedin:
            "https://www.linkedin.com/in/shreyanka-chakrabarti-1bb912353",
          instagram: "https://www.instagram.com/_.shreyaannkkaaa",
        },
      },
    ],
  },
  {
    title: "Canvas",
    color: "pink",
    row1: [
      {
        name: "Divita Kapoor",
        role: "Lead",
        image: "/Team/leadcreatives.webp",
        socials: {
          linkedin: "https://www.linkedin.com/in/divita-kapoor-769327321/",
          instagram: "https://www.instagram.com/_divi22_/",
        },
      },
    ],
    row2: [
      {
        name: "Rishabh Dev Pandey",
        role: "Co-lead",
        image: "/Team/coleadcreatives2.webp",
        socials: {
          linkedin: "https://www.linkedin.com/in/rishabh-dev-pandey-1234b7282/",
          instagram: "https://www.instagram.com/rish_abhdeva/",
        },
      },
      {
        name: "Jasmitha P",
        role: "Co-lead",
        image: "/Team/coleadcreatives.webp",
        socials: {
          linkedin: "https://www.linkedin.com/in/jasmithap1474/",
          instagram: "#",
        },
      },
      {
        name: "Richelle Ranjan",
        role: "Co-lead",
        image: "/Team/coleadcreatives3.webp",
        socials: {
          linkedin: "https://www.linkedin.com/in/richelle-ranjan-b38760356/",
          instagram:
            "https://www.instagram.com/_r.rixhelle?igsh=c3ZmMnlpY2RwN2dx",
        },
      },
    ],
  },
  {
    title: "Orchestrators",
    color: "blue",
    row1: [
      {
        name: "Ayush Joshi",
        role: "Lead",
        image: "/Team/leadevents.webp",
        socials: {
          linkedin: "https://www.linkedin.com/in/ayush-joshi-7337b9317/",
          instagram: "https://www.instagram.com/_joshi_ayush_",
        },
      },
    ],
    row2: [
      {
        name: "Shabdika Mishra",
        role: "Co-lead",
        image: "/Team/coleadevents1.webp",
        socials: {
          linkedin: "https://www.linkedin.com/in/shabdikamishra/",
          instagram: "https://www.instagram.com/_shabdikaa/",
        },
      },
      {
        name: "Svar Kalavadia",
        role: "Co-lead",
        image: "/Team/coleadevents.webp",
        socials: {
          linkedin: "https://www.linkedin.com/in/svarkalavadia/",
          instagram: "https://www.instagram.com/svarkalavadia20/",
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

          <div className="flex flex-col items-center gap-10 w-full">
            {/* Row 1: Leads */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="flex w-full max-w-3xl flex-wrap justify-center gap-6 md:gap-8"
            >
              {domain.row1.map((member) => (
                <motion.div
                  key={member.name}
                  variants={cardReveal}
                  className="w-full sm:w-[calc(50%-16px)] md:w-[38%]"
                >
                  <TeamCard {...member} accentColor={domain.color as any} />
                </motion.div>
              ))}
            </motion.div>

            {/* Visual divider between rows */}
            <div
              className={`w-16 h-px bg-acm-${domain.color}/25`}
              aria-hidden
            />

            {/* Row 2: Co-Leads */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="flex w-full max-w-5xl flex-wrap justify-center gap-6 md:gap-8"
            >
              {domain.row2.map((member, idx) => (
                <motion.div
                  key={member.name}
                  variants={cardReveal}
                  custom={idx * 0.08}
                  className="w-full sm:w-[calc(50%-16px)] md:w-[calc(33%-16px)] lg:w-[calc(25%-16px)]"
                >
                  <TeamCard {...member} accentColor={domain.color as any} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  ),
);
DomainSection.displayName = "DomainSection";

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TeamsPage() {
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
          {/* 01 — Faculty Leadership */}
          <section className="w-full">
            <div className="container mx-auto px-4">
              <SectionHeader
                label="Faculty Leadership"
                index={1}
                accent="blue"
              />
            </div>

            {/* Sponsor — centered, max-width constrained */}
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

            {/* Marquee — full-bleed, no negative margin hacks */}
            <div className="w-full flex flex-col gap-6 overflow-hidden">
              <VelocityMarquee items={FACULTY_ROW_1} baseVelocity={-50} />
              <VelocityMarquee items={FACULTY_ROW_2} baseVelocity={50} />
            </div>
          </section>

          {/* 02 — Student Core (Interactive ID Cards) */}
          <section className="container mx-auto px-4 sm:px-6">
            <SectionHeader label="Student Core" index={2} accent="violet" />

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
              {STUDENT_CORE.map((member, idx) => (
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
              ))}
            </div>
          </section>

          {DOMAINS.map((domain, idx) => (
            <DomainSection key={domain.title} domain={domain} index={idx} />
          ))}
        </div>
      </div>
    </>
  );
}
