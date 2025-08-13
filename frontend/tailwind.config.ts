import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./app/**/*.{ts,tsx}", "./sanity/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        black: "#0d0e12",
        white: "#fff",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config;
