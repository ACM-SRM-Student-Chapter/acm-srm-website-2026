"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Playfair_Display, Anton } from "next/font/google";
import { Calendar, User, MapPin, CheckCircle } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const anton = Anton({ subsets: ["latin"], weight: "400" });

const techGoshipsEvents = [
  {
    id: "01",
    title: "ACM Tech Goships: Unplugged #01",
    speaker: "Rajrupa Das",
    role: "Co-Head, Foundry (Technical Domain), ACM Student Chapter, SRMIST",
    topic: "Feature Engineering & Dimensionality Reduction",
    date: "11th September 2026",
    time: "5:00 PM – 6:30 PM",
    venue: "TP1-204",
    description: "From Raw Data to High-Performance Models. Exploring Data Cleaning, Feature Creation, Dimensionality Reduction, and Feature Extraction with a Deep Learning perspective.",
    registrationUrl: "https://forms.gle/oNQE4vYoKENr5xhq5",
    poster: "/events/ACM Tech Goships/1.png"
  },
];

export default function TechGoshipsSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If we have multiple events, we can clone them here for infinite marquee.
    // For now, since there's only one, we'll just display it beautifully.
  }, []);

  return (
    <section className="relative z-20 w-full pb-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2
            className={`text-4xl md:text-5xl mb-4 text-[#111315] uppercase tracking-wide ${anton.className}`}
          >
            ACM Tech Goships: <br />
            <span className="text-acm-electric drop-shadow-sm">Unplugged</span>
          </h2>
          <p
            className={`text-lg text-black/60 leading-relaxed italic ${playfair.className}`}
          >
            Real conversations, practical learning, and sharing knowledge within our student community.
          </p>
        </div>

        <div className="flex justify-center">
          {techGoshipsEvents.map((event) => (
            <div
              key={event.id}
              className="group relative flex flex-col md:flex-row w-full max-w-5xl rounded-3xl border border-black/10 bg-white shadow-xl overflow-hidden"
            >
              {/* Poster */}
              <div className="relative w-full md:w-1/2 aspect-[4/5] md:aspect-auto overflow-hidden bg-black">
                <Image
                  src={event.poster}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 w-full md:w-1/2 flex flex-col justify-center bg-white">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-acm-electric/10 px-4 py-1.5 text-sm font-bold text-acm-electric border border-acm-electric/20 w-fit">
                  <CheckCircle className="h-4 w-4" /> Registration Open
                </div>

                <h3 className={`text-3xl md:text-4xl uppercase tracking-wide text-black mb-2 ${anton.className}`}>
                  {event.topic}
                </h3>
                
                <p className="text-black/60 font-medium mb-6">
                  {event.description}
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-black/80 font-medium">
                    <div className="bg-black/5 p-2 rounded-full">
                      <User className="w-5 h-5 text-acm-violet" />
                    </div>
                    <div>
                      <div className="font-bold">{event.speaker}</div>
                      <div className="text-sm text-black/50 leading-snug">{event.role}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-black/80 font-medium">
                    <div className="bg-black/5 p-2 rounded-full">
                      <Calendar className="w-5 h-5 text-acm-pink" />
                    </div>
                    <div>
                      {event.date} • {event.time}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-black/80 font-medium">
                    <div className="bg-black/5 p-2 rounded-full">
                      <MapPin className="w-5 h-5 text-acm-electric" />
                    </div>
                    <div>{event.venue}</div>
                  </div>
                </div>

                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block text-center rounded-xl bg-[#111315] hover:bg-acm-electric hover:text-black hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300 text-white font-bold uppercase tracking-wider py-4 px-8 ${anton.className} text-xl w-full sm:w-auto`}
                >
                  Register Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
