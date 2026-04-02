import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Primary: Royal Blue ────────────────────────────────
        primary: {
          DEFAULT: "#1e3a8a",
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        // ── Accent: Teal ───────────────────────────────────────
        accent: {
          DEFAULT: "#0d9488",
          50:  "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        // ── Amber: Secondary ────────────────────────────────────
        secondary: {
          DEFAULT: "#d97706",
          50:  "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        // ── Surface neutrals ───────────────────────────────────
        dark: "#0f172a",
        surface: {
          DEFAULT: "#f8fafc",
          dark:    "#0f172a",
          card:    "#ffffff",
          "card-dark": "#1e293b",
        },
      },
      fontFamily: {
        sans:    ["Inter", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["4.5rem", { lineHeight: "1.1", fontWeight: "800" }],
        "display-xl":  ["3.75rem", { lineHeight: "1.1", fontWeight: "800" }],
        "display-lg":  ["3rem",   { lineHeight: "1.15", fontWeight: "700" }],
        "display-md":  ["2.25rem",{ lineHeight: "1.2",  fontWeight: "700" }],
      },
      borderRadius: {
        card:  "20px",
        pill:  "9999px",
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
      },
      boxShadow: {
        card:     "0 4px 24px -4px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
        elevated: "0 12px 40px -8px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.06)",
        glow:     "0 0 40px rgba(30,58,138,0.25)",
        "glow-accent": "0 0 40px rgba(13,148,136,0.3)",
        "inner-sm": "inset 0 1px 2px rgba(0,0,0,0.06)",
      },
      backgroundImage: {
        "gradient-brand":   "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #0d9488 100%)",
        "gradient-hero":    "linear-gradient(135deg, #eff6ff 0%, #f0fdfa 100%)",
        "gradient-dark":    "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        "gradient-card":    "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
        "gradient-amber":   "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
        "mesh-light":       "radial-gradient(at 40% 20%, hsla(220,90%,96%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(172,90%,96%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(220,80%,97%,1) 0px, transparent 50%)",
        "mesh-dark":        "radial-gradient(at 40% 20%, hsla(220,40%,12%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(172,40%,10%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(220,50%,8%,1) 0px, transparent 50%)",
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%":   { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(30,58,138,0.3)" },
          "50%":      { boxShadow: "0 0 40px rgba(30,58,138,0.6)" },
        },
        "slide-in-left": {
          "0%":   { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "fade-up":       "fade-up 0.6s ease forwards",
        "fade-up-slow":  "fade-up 0.9s ease forwards",
        "fade-in":       "fade-in 0.5s ease forwards",
        "scale-in":      "scale-in 0.4s ease forwards",
        float:           "float 3s ease-in-out infinite",
        shimmer:         "shimmer 2s linear infinite",
        "pulse-glow":    "pulse-glow 2s ease-in-out infinite",
        "slide-in-left": "slide-in-left 0.5s ease forwards",
        "bounce-soft":   "bounce-soft 2s ease-in-out infinite",
        "bounce-slow":   "bounce-soft 3s ease-in-out infinite",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
    },
  },
  plugins: [],
};

export default config;
