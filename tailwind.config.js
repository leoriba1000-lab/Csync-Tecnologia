/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#05070E",
          panel: "#0A0F1F",
          panel2: "#0D1428",
          line: "#1B2440",
        },
        mist: {
          DEFAULT: "#F5F7FF",
          muted: "#8D96B3",
          faint: "#5A6386",
        },
        sync: {
          blue: "#3B6BFF",
          cyan: "#22D3EE",
          purple: "#8B5CF6",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "sync-gradient": "linear-gradient(115deg, #3B6BFF 0%, #22D3EE 45%, #8B5CF6 100%)",
        "sync-gradient-soft": "linear-gradient(115deg, rgba(59,107,255,0.15) 0%, rgba(34,211,238,0.12) 45%, rgba(139,92,246,0.15) 100%)",
      },
      boxShadow: {
        glow: "0 0 60px -15px rgba(59,107,255,0.35)",
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 40px -24px rgba(0,0,0,0.6)",
      },
      keyframes: {
        pulseSlow: {
          "0%, 100%": { opacity: 0.5, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.06)" },
        },
        drift: {
          "0%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(12px,-10px)" },
          "100%": { transform: "translate(0,0)" },
        },
        fadeUp: {
          from: { opacity: 0, transform: "translateY(24px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "pulse-slow": "pulseSlow 4s ease-in-out infinite",
        "drift-slow": "drift 9s ease-in-out infinite",
        "drift-slower": "drift 14s ease-in-out infinite",
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
}

