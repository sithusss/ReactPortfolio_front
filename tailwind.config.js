/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1E2A32",       // primary text, deep slate-navy
        paper: "#FAF6EF",     // warm ivory background
        brass: "#A67C52",     // muted brass accent (links, CTAs)
        "brass-dark": "#8B6742",
        sage: "#5B6F5B",      // muted sage, secondary accent / tags
        stone: "#DCD3C4",     // hairline borders, dividers
        "stone-light": "#EDE7DB",
        charcoal: "#2A2620",  // dark section background
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["\"Work Sans\"", "sans-serif"],
        mono: ["\"IBM Plex Mono\"", "monospace"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};
