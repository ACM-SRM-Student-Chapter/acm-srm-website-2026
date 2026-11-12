export interface Speaker {
  name: string;
  role: string;
  credentials?: string;
}

export interface ExplorationPillar {
  title: string;
  description: string;
  index: string;
}

export interface WhatsInStoreItem {
  iconName: "Clock" | "Target" | "Cpu" | "Users" | "ShieldCheck" | "Award";
  title: string;
  description: string;
  color: string;
  border: string;
  bg: string;
}

export interface ChallengeStep {
  number: string;
  label: string;
  title: string;
  description: string;
  color: string;
}

export interface TechGoshipEvent {
  id: string;
  seriesIndex: string;
  title: string;
  topic: string;
  topicSubtitle?: string;
  speaker: Speaker;
  date: string;
  dateShort: string;
  time: string;
  venue: string;
  description: string;
  poster: string;
  accentColor: "acm-electric" | "acm-violet";
  status: "upcoming" | "past";
  statusBadge: string;
  registrationUrl: string;
  eligibility?: string;
  explorationPillars?: ExplorationPillar[];
  closingCallout?: string;
  tagline?: string;
  seriesDescription?: string;
}

export interface PastEventStat {
  value: string;
  label: string;
}

export interface PastEvent {
  id: string;
  index: string;
  date: string;
  dateShort: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  location: string;
  description: string;
  highlights: string[];
  stats: PastEventStat[];
  speakers?: string[];
  color: "acm-electric" | "acm-violet" | "acm-pink" | "acm-blue";
  hex: string;
  poster?: string;
  registrationUrl?: string;
  badge?: string;
  prize?: string;
  type: "regular" | "flagship" | "promptwars";
}

export type FilterTabId = "upcoming" | "past" | "goships";

export interface FilterTab {
  id: FilterTabId;
  label: string;
  shortLabel: string;
  count: string;
}

export const FILTER_TABS: FilterTab[] = [
  { id: "upcoming", label: "UPCOMING", shortLabel: "UPCOMING", count: "01" },
  { id: "past", label: "PAST", shortLabel: "PAST", count: "04" },
  {
    id: "goships",
    label: "ACM TECH GOSHIPS: UNPLUGGED SERIES",
    shortLabel: "GOSHIPS SERIES",
    count: "02",
  },
];

export const TECH_GOSHIPS_EVENTS: TechGoshipEvent[] = [
  {
    id: "unplugged-02",
    seriesIndex: "02",
    title: "ACM Tech Goships: Unplugged #02",
    topic: "Building Intelligent Agents for the Next Generation of Automation",
    topicSubtitle: "From AI-Powered Systems to Autonomous Workflows",
    speaker: {
      name: "Sudhanshu Kumar",
      role: "Lead, AI-ML Division, Foundry Domain, SRM ACM Student Chapter",
      credentials:
        "Founder & CEO at Accemberg Technologies | ISRO Winter Intern | Former IIIT Kottayam Research Intern",
    },
    date: "13th November 2026, Friday",
    dateShort: "13 NOV 2026",
    time: "5:00 PM – 6:30 PM",
    venue: "TP1-204, SRM IST Chennai (KTR Campus)",
    description:
      "The ACM Student Chapter, SRMIST-KTR is excited to continue ACM Tech Goships: Unplugged, a recurring technical talk series built around real conversations, practical learning, and sharing knowledge within our student community.",
    seriesDescription:
      "The ACM Student Chapter, SRMIST-KTR is excited to continue ACM Tech Goships: Unplugged, a recurring technical talk series built around real conversations, practical learning, and sharing knowledge within our student community.",
    poster: "/events/ACM Tech Goships/2.jpeg",
    accentColor: "acm-electric",
    status: "upcoming",
    statusBadge: "UPCOMING TOMORROW",
    registrationUrl: "https://forms.gle/ffDrV1QEFBQWPFhH8",
    eligibility: "Open to All Students",
    explorationPillars: [
      {
        index: "01",
        title: "Understanding AI Agents & Their Architecture",
        description: "Core components, memory, perception, and execution loops.",
      },
      {
        index: "02",
        title: "Agentic AI: Reasoning, Planning & Decision-Making",
        description: "Multi-step reasoning, reflection, and dynamic task planning.",
      },
      {
        index: "03",
        title: "Tools, APIs & Multi-Agent Collaboration",
        description: "Function calling, external integrations, and agent handoffs.",
      },
      {
        index: "04",
        title: "Building Autonomous Agents for Real-World Automation",
        description: "Production patterns for reliable, end-to-end workflows.",
      },
    ],
    closingCallout:
      "Whether you’re exploring AI, curious about intelligent agents, or interested in understanding how autonomous systems can transform the way we approach automation, this session is an opportunity to learn, ask questions, and exchange ideas. Come for the conversation. Stay for the learning.",
    tagline: "Learn • Share • Build • Together",
  },
  {
    id: "unplugged-01",
    seriesIndex: "01",
    title: "ACM Tech Goships: Unplugged #01",
    topic: "Feature Engineering & Dimensionality Reduction",
    topicSubtitle: "From Raw Data to High-Performance Models",
    speaker: {
      name: "Rajrupa Das",
      role: "Co-Head, Foundry (Technical Domain), ACM Student Chapter, SRMIST",
    },
    date: "11th September 2026",
    dateShort: "11 SEP 2026",
    time: "5:00 PM – 6:30 PM",
    venue: "TP1-204",
    description:
      "From Raw Data to High-Performance Models. Exploring Data Cleaning, Feature Creation, Dimensionality Reduction, and Feature Extraction with a Deep Learning perspective.",
    poster: "/events/ACM Tech Goships/1.png",
    accentColor: "acm-violet",
    status: "past",
    statusBadge: "REGISTRATION CLOSED / COMPLETED",
    registrationUrl: "https://forms.gle/oNQE4vYoKENr5xhq5",
    eligibility: "Open to All Students",
  },
];

export const PAST_EVENTS: PastEvent[] = [
  {
    id: "prompt-wars-2026",
    index: "01",
    date: "Tuesday, 27 October 2026",
    dateShort: "27 OCT 2026",
    title: "Prompt Wars",
    shortTitle: "PROMPT WARS",
    subtitle: "8-Hour AI Building Challenge",
    location: "TP-2 (Room 712) & GD Naidu Hall, SRMIST",
    description:
      "ACM SRMIST in collaboration with Google for Developers presented Prompt Wars — an intensive 8-hour AI Building Challenge where ideas turned into working solutions through prompt engineering and AI-assisted building.",
    highlights: [
      "In collaboration with Google for Developers & Hack2Skill",
      "₹50,000+ prize pool with automated AI-driven rubric evaluation",
      "600+ participants building around the FairShift UN SDG 8 challenge",
      "13 finalists pitched live before an industry panel at GD Naidu Hall",
    ],
    stats: [
      { value: "₹50K+", label: "Prize Pool" },
      { value: "600+", label: "Participants" },
      { value: "8 Hrs", label: "AI Sprint" },
    ],
    color: "acm-electric",
    hex: "#00E5FF",
    poster: "/events/PromptWar.jpeg",
    registrationUrl: "https://hack2skill.com/event/promptwars-x-acmsrm",
    badge: "CONCLUDED • 27 OCT 2026",
    prize: "Win up to ₹50,000",
    type: "promptwars",
  },
  {
    id: "recruitment-drive-2026",
    index: "02",
    date: "March – April 2026",
    dateShort: "MAR–APR 2026",
    title: "Recruitment Drive 2026",
    shortTitle: "RECRUITMENT",
    subtitle: "Join the Legacy",
    location: "Campus Wide",
    description:
      "A pivotal moment marking the evolution of our chapter as we welcomed a new wave of dynamic talent and diverse expertise, strengthening our foundation for future innovations.",
    highlights: [
      "Join the world's largest educational computing society",
      "Welcomed a new wave of dynamic talent and diverse expertise",
      "Strengthened our foundation for future chapter innovations",
      "Technical, design, and leadership roles across domains",
    ],
    stats: [
      { value: "500+", label: "Applicants" },
      { value: "100+", label: "Roles Open" },
    ],
    color: "acm-pink",
    hex: "#FF4081",
    poster: "/events/recruitement2026.webp",
    badge: "COMPLETED • 2026",
    type: "regular",
  },
  {
    id: "symposium-responsible-ai",
    index: "03",
    date: "18–20 March 2026",
    dateShort: "18–20 MAR 2026",
    title: "Symposium on Responsible AI",
    shortTitle: "FLAGSHIP",
    subtitle: "3-Day AI Exploration",
    location: "Tech Park, SRMIST",
    description:
      "An immersive 3-day exploration into the ethics, development, and future of Artificial Intelligence with leading industry experts and academic pioneers.",
    highlights: [
      "Prof. Mary Anita Rajam V – Head, Dept of CSE, Anna University",
      "Mr. Siva Venkata Satya Narayana – Founder & CEO, Altruisty Innovation",
      "Mr. Murali Kannan – DGM IT, Sun TV Network",
      "Mr. R S L Balaji – CIO, Altruisty Innovation",
    ],
    stats: [
      { value: "3 Days", label: "Duration" },
      { value: "4", label: "Keynote Speakers" },
    ],
    color: "acm-violet",
    hex: "#7B61FF",
    poster: "/events/Symposium_on_Responsible_Al.webp",
    badge: "FLAGSHIP • MAR 2026",
    type: "flagship",
  },
  {
    id: "orientation-2024",
    index: "04",
    date: "15 April, 2024",
    dateShort: "15 APR 2024",
    title: "Orientation",
    shortTitle: "ORIENTATION",
    subtitle: "Chapter Revival",
    location: "IMAC Lab, 14th Floor, Tech Park, SRMIST",
    description:
      "An engaging and inspiring start marking the revival of the chapter, featuring insights from Prof. Venkatesh Raman, President of ACM India.",
    highlights: [
      "Insights on leveraging technology and fostering collaboration",
      "Introduction to chapter resources, events, and initiatives",
      "Laying the groundwork for a year of growth",
      "Special address by Dr. M. Suchithra and S Sembon Surakshitha",
    ],
    stats: [
      { value: "200+", label: "Attendees" },
      { value: "1", label: "Unified Vision" },
    ],
    speakers: [
      "Prof. Venkatesh Raman (President, ACM India)",
      "Dr. M. Suchithra",
      "S Sembon Surakshitha",
    ],
    color: "acm-violet",
    hex: "#7B61FF",
    badge: "COMPLETED • APR 2024",
    type: "regular",
  },
];

export const WHATS_IN_STORE: WhatsInStoreItem[] = [
  {
    iconName: "Clock",
    title: "8-Hour AI Sprint",
    description:
      "An intensive 8-hour AI building challenge pushing creativity and rapid implementation.",
    color: "text-acm-electric",
    border: "border-acm-electric/20",
    bg: "bg-acm-electric/5",
  },
  {
    iconName: "Target",
    title: "Surprise Problem Statement",
    description:
      "A curated problem statement revealed live on event day to test genuine problem-solving.",
    color: "text-acm-violet",
    border: "border-acm-violet/20",
    bg: "bg-acm-violet/5",
  },
  {
    iconName: "Cpu",
    title: "Hack2Skill AI Evaluation",
    description:
      "Instant, unbiased AI-powered initial evaluation through the Hack2Skill platform.",
    color: "text-acm-pink",
    border: "border-acm-pink/20",
    bg: "bg-acm-pink/5",
  },
  {
    iconName: "Users",
    title: "Showcase to Industry Panel",
    description:
      "Top 10 finalists present and pitch their working solutions live before industry experts.",
    color: "text-acm-blue",
    border: "border-acm-blue/20",
    bg: "bg-acm-blue/5",
  },
  {
    iconName: "ShieldCheck",
    title: "Comprehensive Rubric",
    description:
      "Evaluation based on code quality, security, efficiency, testing, accessibility & problem alignment.",
    color: "text-emerald-400",
    border: "border-emerald-400/20",
    bg: "bg-emerald-400/5",
  },
  {
    iconName: "Award",
    title: "Recognition & ₹50K Prizes",
    description:
      "Win up to ₹50,000 in prizes, exclusive certificates, and spotlight for top performers.",
    color: "text-amber-300",
    border: "border-amber-300/20",
    bg: "bg-amber-300/5",
  },
];

export const CHALLENGE_STEPS: ChallengeStep[] = [
  {
    number: "01",
    label: "Sprint",
    title: "Build & Prompt",
    description:
      "Receive the live problem statement on event day. Utilize AI-assisted building and prompt craft to construct your end-to-end working solution in 8 hours.",
    color: "text-acm-electric",
  },
  {
    number: "02",
    label: "AI Evaluation",
    title: "Hack2Skill Automated Check",
    description:
      "Submit code to Hack2Skill for automated, AI-driven assessment judging code quality, security, efficiency, test coverage, and accessibility.",
    color: "text-acm-violet",
  },
  {
    number: "03",
    label: "Grand Finale",
    title: "Top 10 Offline Showcase",
    description:
      "The top 10 finalists qualify for offline pitch presentations before an esteemed industry panel at TP-2 & GD Naidu Hall for up to ₹50,000!",
    color: "text-amber-300",
  },
];

