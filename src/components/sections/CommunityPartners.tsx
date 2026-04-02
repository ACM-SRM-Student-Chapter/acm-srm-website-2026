"use client";

import { motion } from "framer-motion";
import { Globe, Linkedin, Instagram, Youtube } from "lucide-react";
import CurvedLoop from "@/components/ui/CurvedLoop";

const partnersData = [
  {
    name: "Next Techy Pixel",
    description:
      "A premier tech content creator hub focusing on AI, development tutorials, and project showcases.",
    logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=200&auto=format&fit=crop",
    socials: { linkedin: "#", youtube: "#", website: "#", instagram: "#" },
  },
  {
    name: "Elite Coders",
    description:
      "A state-wide developer community organizing large-scale open source programs like Winter of Code.",
    logo: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=200&auto=format&fit=crop",
    socials: { linkedin: "#", youtube: "#", website: "#", instagram: "#" },
  },
  {
    name: "DevFest Chennai",
    description:
      "The largest local tech conference bringing together thousands of developers and industry leaders.",
    logo: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=200&auto=format&fit=crop",
    socials: { linkedin: "#", youtube: "#", website: "#", instagram: "#" },
  },
];

export default function CommunityPartners() {
  return (
    <section className="relative z-20 w-full py-32 overflow-hidden bg-background">
      {/* Interactive Background Text Loop */}
      <div className="absolute inset-0 z-0 flex items-center">
        <CurvedLoop
          marqueeText="COMMUNITY ✦ PARTNERS ✦ COLLABORATORS ✦"
          speed={1.5}
          curveAmount={300}
          interactive={true}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold tracking-tight md:text-6xl"
          >
            Backed by the <br />
            <span className="bg-gradient-to-r from-acm-blue via-acm-violet to-acm-pink bg-clip-text text-transparent">
              Best in Tech
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-foreground/60"
          >
            We collaborate with industry leaders, content creators, and
            open-source platforms to bring unparalleled opportunities to our
            chapter members.
          </motion.p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {partnersData.map((partner, idx) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group glass-panel flex flex-col items-center justify-between rounded-[2rem] p-8 text-center transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
            >
              {/* Partner Logo */}
              <div className="mb-6 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-foreground/5 shadow-md transition-transform duration-500 group-hover:scale-110">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Content */}
              <h3 className="mb-3 text-2xl font-bold text-foreground">
                {partner.name}
              </h3>
              <p className="mb-8 text-sm leading-relaxed text-foreground/60">
                {partner.description}
              </p>

              {/* Social Links Bottom Bar */}
              <div className="mt-auto flex w-full items-center justify-center gap-4 border-t border-foreground/10 pt-6">
                {partner.socials.website && (
                  <a
                    href={partner.socials.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground/40 transition-colors hover:text-acm-blue"
                  >
                    <Globe className="h-5 w-5" />
                  </a>
                )}
                {partner.socials.youtube && (
                  <a
                    href={partner.socials.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground/40 transition-colors hover:text-[#FF0000]"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                )}
                {partner.socials.linkedin && (
                  <a
                    href={partner.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground/40 transition-colors hover:text-[#0A66C2]"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {partner.socials.instagram && (
                  <a
                    href={partner.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground/40 transition-colors hover:text-[#E1306C]"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
