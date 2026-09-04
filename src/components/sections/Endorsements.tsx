"use client";

import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import { Playfair_Display, Anton } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const anton = Anton({ subsets: ["latin"], weight: "400" });

const testimonials = [
  {
    name: "Dr. Suchithra M",
    role: "Faculty Sponsor",
    quote:
      "The sheer dedication of this student chapter is phenomenal. They cultivate a culture of genuine technological curiosity and rigorous engineering innovation.",
  },
  {
    name: "S Sembon Surakshitha",
    role: "Past Chairperson",
    quote:
      "Leading ACM SRM was a transformative experience. It is a highly collaborative environment where theoretical ideas are rapidly engineered into reality.",
  },
  {
    name: "MD NAYAJ MONDAL",
    role: "Technical Head",
    quote:
      "The technical acceleration I've experienced here is unmatched. From architectural design to deploying open-source projects, ACM is the ultimate catalyst for developers.",
  },
];

export default function Endorsements() {
  return (
    <section className="flex flex-col items-center py-20">
      <div className="mb-16 text-center">
        <h2
          className={`text-5xl md:text-7xl uppercase tracking-widest text-white ${anton.className}`}
        >
          Endorsements
        </h2>
        <p
          className={`mt-6 text-white/60 text-xl ${playfair.className} italic max-w-2xl mx-auto`}
        >
          The impact of our chapter through the eyes of our leadership.
        </p>
      </div>

      <div className="w-full max-w-xs sm:max-w-lg md:max-w-3xl px-4">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards, Autoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          className="w-full"
        >
          {testimonials.map((testimonial, idx) => (
            <SwiperSlide
              key={idx}
              className="flex items-center justify-center rounded-[2.5rem] bg-[#111] border border-white/10 p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="flex gap-1 text-acm-pink">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p
                  className={`text-xl sm:text-2xl text-white/90 leading-relaxed italic ${playfair.className}`}
                >
                  "{testimonial.quote}"
                </p>
                <div>
                  <h3 className={`text-xl font-bold text-white tracking-wide uppercase ${anton.className}`}>
                    {testimonial.name}
                  </h3>
                  <p className="text-acm-electric font-medium">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
