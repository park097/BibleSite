import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#C8A96A",
        secondary: "#EFE7DD",
        parchment: "#F4EFEA",
        card: "#EFE7DD",
        ink: "#3E3A39",
        muted: "#7A6F66",
        footer: "#2B2B2B"
      },
      boxShadow: {
        soft: "none",
        card: "none"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      fontFamily: {
        serif: ["var(--font-pretendard)", "sans-serif"],
        sans: ["var(--font-pretendard)", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
