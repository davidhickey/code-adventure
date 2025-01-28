import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode:'selector',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryPurple: "#4F46E5",
        lPrimaryGreen: "#283618",
        lSecLightGreen: "#606c38",
        lSecCream: "#fefae0",
        lSecPeach: "#dda15e",
        lSecBurntOrange: "#bc6c25",
        dPrimaryGray: "#e5e5e5",
        dSecWhite: "#ffffff",
        dSecMaize: "#fca311",
        dSecDarkBlue: "#14213d",
        dSecBlack: "#000000",

      },
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif'],
        mono: "var(--font-geist-mono)",
      }
    },
  },
  plugins: [],
} satisfies Config;
