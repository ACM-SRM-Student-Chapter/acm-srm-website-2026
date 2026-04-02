import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFAFA", // Light grey/white primary background
        foreground: "#0A0A0A",
        acm: {
          blue: "#005bb5", // Deep Blue
          electric: "#00E5FF", // Electric Blue
          violet: "#7B61FF", // Violet
          orange: "#FF8A65",
          yellow: "#FFD54F",
          pink: "#FF4081",
          green: "#00E676",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow":
          "conic-gradient(from 180deg at 50% 50%, #005bb5 0deg, #7B61FF 180deg, #00E5FF 360deg)",
      },
    },
  },
  plugins: [],
};
export default config;
