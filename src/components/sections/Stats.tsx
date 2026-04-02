"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring } from "framer-motion";

// The individual animated number component
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Spring physics for the counting animation
  const springValue = useSpring(0, {
    damping: 50,
    stiffness: 100,
    duration: 2000,
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, springValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}

const statsData = [
  { id: 1, label: "Projects", value: 80, suffix: "+" },
  { id: 2, label: "Hackathons Won", value: 10, suffix: "+" },
  { id: 3, label: "Members", value: 300, suffix: "+" },
  { id: 4, label: "Industry Collabs", value: 6, suffix: "+" },
];

export default function Stats() {
  return (
    <section className="relative z-20 w-full py-12">
      <div className="container mx-auto px-4">
        <div className="glass-panel grid grid-cols-2 gap-8 rounded-3xl p-8 shadow-xl md:grid-cols-4 md:p-12">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex flex-col items-center justify-center text-center"
            >
              <h3 className="bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="mt-2 text-sm font-medium tracking-wide text-foreground/60 uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
