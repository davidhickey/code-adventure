import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryPurple: "#4F46E5"
      },
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif'],
        mono: "var(--font-geist-mono)",
      }
    },
  },
  plugins: [],
} satisfies Config;
