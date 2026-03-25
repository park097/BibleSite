import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0f2a44",
        secondary: "#f5f1eb",
        accent: "#d6c3a3",
        background: "#ffffff",
        footer: "#1a1a1a",
        ink: "#22313f",
        muted: "#6d7076",
        card: "#ffffff",
        parchment: "#f5f1eb"
      },
      boxShadow: {
        soft: "0 16px 40px rgba(15, 42, 68, 0.08)",
        card: "0 20px 50px rgba(15, 42, 68, 0.08)"
      },
      borderRadius: {
        xl: "1rem",
        "4xl": "2rem"
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-pretendard)", "Noto Sans KR", "sans-serif"]
      },
      keyframes: {
        "subtle-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.06)" }
        }
      },
      animation: {
        "subtle-zoom": "subtle-zoom 10s ease-out forwards"
      }
    }
  },
  plugins: []
};

export default config;
