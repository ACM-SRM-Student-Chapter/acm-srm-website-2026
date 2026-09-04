"use client";

import { memo } from "react";
import { motion, Variants } from "framer-motion";
import { Calendar, MapPin, User } from "lucide-react";
import { Playfair_Display, Anton } from "next/font/google";
import Image from "next/image";

const playfair = Playfair_Display({ subsets: ["latin"], style: ["normal", "italic"] });
const anton = Anton({ subsets: ["latin"], weight: "400" });

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

export interface RegularEvent {
  date: string;
  title: string;
  location: string;
  description: string;
  speakers?: string[];
  color: string;
  poster?: string;
}

const cardVariants = (fromLeft: boolean): Variants => ({
  hidden: { opacity: 0, x: fromLeft ? -80 : 80, y: 30 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.7, type: "spring", stiffness: 90, damping: 20 },
  },
});

const ArrowRightCurve = memo(() => (
  <svg
    aria-hidden
    width="120"
    height="150"
    viewBox="0 0 120 150"
    fill="none"
    className="absolute -bottom-24 left-[calc(50%+20px)] hidden md:block opacity-30 z-0 pointer-events-none"
  >
    <path
      d="M10,10 Q110,40 100,130"
      stroke="white" 
      strokeWidth="3"
      strokeDasharray="8 8"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M85,115 L100,135 L115,115"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));
ArrowRightCurve.displayName = "ArrowRightCurve";

const ArrowLeftCurve = memo(() => (
  <svg
    aria-hidden
    width="120"
    height="150"
    viewBox="0 0 120 150"
    fill="none"
    className="absolute -bottom-24 right-[calc(50%+20px)] hidden md:block opacity-30 z-0 pointer-events-none"
  >
    <path
      d="M110,10 Q10,40 20,130"
      stroke="white"
      strokeWidth="3"
      strokeDasharray="8 8"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M5,115 L20,135 L35,115"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));
ArrowLeftCurve.displayName = "ArrowLeftCurve";

const EventCard = memo(
  ({ event, isEven }: { event: RegularEvent; isEven: boolean }) => (
    <div className={`relative flex flex-col md:flex-row items-center w-full`}>
      {isEven ? <ArrowRightCurve /> : <ArrowLeftCurve />}

      <div
        className={`hidden md:block w-1/2 ${isEven ? "order-2" : "order-1"}`}
      />

      <motion.div
        variants={cardVariants(isEven)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className={`w-full md:w-1/2 relative z-10 ${isEven ? "order-1 md:pr-12" : "order-2 md:pl-12"}`}
      >
        <motion.div
          whileHover={{
            y: -8,
            transition: { duration: 0.3, ease: EASE_OUT_EXPO },
          }}
          className="group relative flex flex-col rounded-3xl p-8 bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-white/20 hover:shadow-xl transition-colors duration-300"
        >
          {event.poster && (
            <div className="w-full h-48 md:h-64 mb-8 rounded-2xl overflow-hidden relative shadow-lg">
              <Image
                src={event.poster}
                alt={event.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          )}

          <div
            className={`mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-${event.color} w-fit`}
          >
            <Calendar className="h-4 w-4" aria-hidden />
            <time>{event.date}</time>
          </div>

          <h3
            className={`mb-3 text-4xl uppercase tracking-wide text-white ${anton.className}`}
          >
            {event.title}
          </h3>

          <div className="mb-4 flex items-start gap-2 text-sm font-medium text-white/60">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span>{event.location}</span>
          </div>

          <p
            className={`text-white/80 text-lg leading-relaxed mb-6 italic ${playfair.className}`}
          >
            {event.description}
          </p>

          {event.speakers && (
            <div className="mt-4 border-t border-white/10 pt-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/50 mb-3">
                <User className="h-3 w-3" aria-hidden /> Speakers
              </div>
              <ul className="space-y-2">
                {event.speakers.map((speaker) => (
                  <li
                    key={speaker}
                    className="text-sm font-medium text-white/80 flex items-center gap-2"
                  >
                    <div
                      className={`h-1.5 w-1.5 rounded-full bg-${event.color} shrink-0`}
                      aria-hidden
                    />
                    {speaker}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  ),
);
EventCard.displayName = "EventCard";

export default EventCard;
