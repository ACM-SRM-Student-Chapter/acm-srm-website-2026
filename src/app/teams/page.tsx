"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useAnimationFrame,
  useVelocity,
  useMotionValue,
} from "framer-motion";
import TeamCard from "../../components/ui/TeamCard";
import IdCard from "../../components/ui/IdCard"; // <-- Import the new ID Card!

// --- STRUCTURED DATA ---
const facultySponsor = {
  name: "Dr. Suchithra M",
  role: "Sponsor & Convenor",
  image: "/Team/Faculties/Dr-Suchithra-M.webp",
  socials: {
    website: "https://www.srmist.edu.in/faculty/dr-m-suchithra/",
    linkedin: "https://www.linkedin.com/in/suchithra-m-08653265/",
  },
};

const facultiesData = [
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

const facultyRow1 = facultiesData.slice(0, 8);
const facultyRow2 = facultiesData.slice(8, 16);

const studentCore = [
  {
    name: "Amritanshu Aditya",
    role: "Chairperson",
    image: "/Team/chair.webp",
    color: "electric",
    socials: {
      linkedin:
        "https://www.linkedin.com/in/amritanshu-aditya-214821329?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      github: "https://github.com/amrit-gpt",
      instagram:
        "https://www.instagram.com/amritanshuaditya?igsh=MTJpOG5zZjQ3NHh3eg%3D%3D&utm_source=qr",
    },
  },
  {
    name: "Rahul Agarwal",
    role: "Vice Chairperson",
    image: "/Team/vc.webp",
    color: "blue",
    socials: {
      linkedin: "www.linkedin.com/in/rahul-agarwal-1411173a5",
      github: "#",
      instagram: "https://www.instagram.com/agarwal_rahul_07/tagged/",
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
      instagram:
        "https://www.instagram.com/moonlily593?igsh=MXFxZWpreWJlbzAwNQ==",
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
      instagram:
        "https://www.instagram.com/amayjariwala_1109?igsh=aWd5bjNvYnpxYzV5",
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
      instagram: "https://www.instagram.com/rish_abhdeva/?hl=en",
    },
  },
];

const domains = [
  {
    title: "Foundry (Technical)",
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
          linkedin:
            "https://www.linkedin.com/in/rajrupa-das-8b9597324?utm_source=share_via&utm_content=profile&utm_medium=member_android",
          github: "https://github.com/RajrupaDas",
          instagram: "#",
        },
      },
    ],
    row2: [
      {
        name: "MD Ashif Iqbal",
        role: "Lead - Competitive Programming",
        image: "/Team/leadcpo.webp",
        socials: {
          linkedin: "https://www.linkedin.com/in/md-ashif-iqbal/",
          github: "https://github.com/ashif-iqbal",
          instagram: "https://www.instagram.com/_ashif.x_x",
        },
      },
      {
        name: "Shudhanshu Kumar",
        role: "Lead - Full Stack Web Dev + Cloud & DevOps",
        image: "/Team/leadwebdev.webp",
        socials: {
          linkedin: "https://www.linkedin.com/in/shudhanshukumar",
          github: "https://github.com/Shudhanshu9122",
          instagram: "https://www.instagram.com/fit_shudhanshu_",
        },
      },
      {
        name: "Ankush Wadehra",
        role: "Lead - AI/ML & MLOps",
        image: "Team/leadaiml.webp",
        socials: {
          linkedin:
            "https://www.linkedin.com/in/ankush-wadehra-bb64b0258?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          github: "https://github.com/beastgotfried",
          instagram: "#",
        },
      },
      {
        name: "Om Prakash Samal",
        role: "Co-Lead - Full Stack Web Dev + Cloud & DevOps",
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
    title: "Amplifier (PR)",
    color: "violet",
    row1: [
      {
        name: "Srilekha Kramadhati",
        role: "Lead",
        image: "/Team/leadpr.webp",
        socials: {
          linkedin: "https://www.linkedin.com/in/srilekha-kramadhati",
          instagram: "#",
        },
      },
    ],
    row2: [
      {
        name: "Jay Solanki",
        role: "Co-lead",
        image: "/Team/coleadpr1.webp",
        socials: {
          linkedin:
            "https://www.linkedin.com/in/jay-solanki-b7116a329?utm_source=share_via&utm_content=profile&utm_medium=member_android",
          instagram:
            "https://www.instagram.com/jay.solankii_20?igsh=YTByaW54MGU3ZWh3",
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
    title: "Elevators (SPONSORSHIP)",
    color: "green",
    row1: [
      {
        name: "Dhruv Mahajan",
        role: "Lead",
        image: "/Team/leadsponsership.webp",
        socials: {
          linkedin: "https://www.linkedin.com/in/dhruvmahajan22",
          instagram:
            "https://www.instagram.com/dhru.v_22?igsh=MThqNTMzbWZxOGpuMA%3D%3D&utm_source=qr",
        },
      },
    ],
    row2: [
      {
        name: "Yatharth Garg",
        role: "Co-lead",
        image: "/Team/coleadsponsership.webp",
        socials: {
          linkedin:
            "https://www.linkedin.com/in/yatharth-garg2905?utm_source=share_via&utm_content=profile&utm_medium=member_android",
          instagram:
            "https://www.instagram.com/ya1hartthh?igsh=YjhkdWFxY25yN2d2",
        },
      },
      {
        name: "Shreyanka Chakrabarti",
        role: "Co-lead",
        image: "/Team/coleadsponsor.webp",
        socials: {
          linkedin:
            "https://www.linkedin.com/in/shreyanka-chakrabarti-1bb912353?utm_source=share_via&utm_content=profile&utm_medium=member_android",
          instagram:
            "https://www.instagram.com/_.shreyaannkkaaa?igsh=ZmJycDFta3dqcDRv",
        },
      },
    ],
  },
  {
    title: "Canvas (MEDIA & CREATIVES)",
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
          instagram: "https://www.instagram.com/rish_abhdeva/?hl=en",
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
    ],
  },
  {
    title: "Orchestrators (EVENTS)",
    color: "blue",
    row1: [
      {
        name: "Ayush Joshi",
        role: "Lead",
        image: "/Team/leadevents.webp",
        socials: {
          linkedin: "https://www.linkedin.com/in/ayush-joshi-7337b9317/",
          instagram:
            "https://www.instagram.com/_joshi_ayush_?igsh=MXRhdHZwZXBrdmM3aw==",
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

// --- VELOCITY MARQUEE ---
function VelocityMarquee({
  items,
  baseVelocity = 100,
}: {
  items: any[];
  baseVelocity: number;
}) {
  const baseX = useRef(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const xPos = useMotionValue(0);

  useAnimationFrame((t, delta) => {
    let moveBy = baseVelocity * (delta / 1000);
    moveBy += moveBy * (Math.abs(smoothVelocity.get()) / 100);
    baseX.current += moveBy;
    if (baseX.current <= -2400) baseX.current = 0;
    if (baseX.current > 0) baseX.current = -2400;
    xPos.set(baseX.current);
  });

  return (
    <div className="relative flex w-full overflow-hidden whitespace-nowrap py-4 mask-edges">
      <motion.div className="flex gap-6 px-3" style={{ x: xPos }}>
        {[...items, ...items, ...items].map((faculty, idx) => (
          <div key={idx} className="w-[300px] shrink-0">
            <TeamCard {...faculty} accentColor="blue" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// --- MAIN PAGE ---
export default function TeamsPage() {
  return (
    <div className="flex flex-col items-center pb-32 pt-20 overflow-hidden">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .mask-edges {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `,
        }}
      />

      {/* Page Header */}
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl"
        >
          Meet the Minds Behind <br />
          <span className="bg-gradient-to-r from-acm-blue via-acm-violet to-acm-electric bg-clip-text text-transparent">
            ACM SRM
          </span>
        </motion.h1>
      </div>

      <div className="w-full space-y-40">
        {/* FACULTY SECTION (Dynamic Marquee) */}
        <section className="w-full">
          <div className="container mx-auto px-4 text-center mb-12">
            <h2 className="text-4xl font-black uppercase tracking-tight text-foreground">
              Faculty Leadership
            </h2>
            <div className="mt-4 mx-auto h-1.5 w-24 rounded-full bg-acm-blue" />
          </div>

          <div className="container mx-auto px-4 mb-16 flex justify-center">
            <div className="w-full max-w-[360px]">
              <TeamCard {...facultySponsor} accentColor="violet" />
            </div>
          </div>

          <div className="relative flex flex-col gap-6 w-[110vw] -left-[5vw]">
            <VelocityMarquee items={facultyRow1} baseVelocity={-50} />
            <VelocityMarquee items={facultyRow2} baseVelocity={50} />
          </div>
        </section>

        {/* STUDENT CORE COMMITTEE (Interactive ID Cards Layout) */}
        <section className="container mx-auto px-4">
          <div className="mb-24 text-center">
            <h2 className="text-4xl font-black uppercase tracking-tight text-foreground">
              Student Core
            </h2>
            <div className="mt-4 mx-auto h-1.5 w-24 rounded-full bg-gradient-to-r from-acm-electric to-acm-violet" />
            <p className="mt-6 text-foreground/50 text-sm font-medium uppercase tracking-widest">
              (Grab and swing the IDs)
            </p>
          </div>

          {/* 2 Rows, 3 Columns Grid for the ID Cards */}
          <div className="grid grid-cols-1 gap-y-24 sm:grid-cols-2 md:grid-cols-3 justify-items-center max-w-6xl mx-auto">
            {studentCore.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: (idx % 3) * 0.2,
                  type: "spring",
                  bounce: 0.4,
                }}
              >
                <IdCard {...member} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* DOMAINS (Standard Centered Flex Layouts) */}
        {domains.map((domain) => (
          <section key={domain.title} className="container mx-auto px-4">
            <div className="glass-panel rounded-[3rem] p-6 sm:p-12 md:p-16 relative overflow-hidden border border-foreground/5">
              <div className="mb-16 flex flex-col items-center text-center relative z-10">
                <h2 className="text-4xl font-black uppercase text-foreground">
                  {domain.title}
                </h2>
                <div
                  className={`mt-4 h-1.5 w-24 rounded-full bg-acm-${domain.color}`}
                />
              </div>

              {/* Standard layout for Domains */}
              <div className="flex flex-col items-center gap-10 z-10 relative">
                {/* Row 1: Heads/Leads */}
                <div className="flex w-full max-w-3xl flex-wrap justify-center gap-8">
                  {domain.row1.map((member, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="w-full sm:w-[45%] md:w-[40%]"
                    >
                      <TeamCard {...member} accentColor={domain.color as any} />
                    </motion.div>
                  ))}
                </div>

                {/* Row 2: Co-Leads & Tech Leads */}
                <div className="flex w-full max-w-5xl flex-wrap justify-center gap-8">
                  {domain.row2.map((member, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="w-full sm:w-[45%] md:w-[30%]"
                    >
                      <TeamCard {...member} accentColor={domain.color as any} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
