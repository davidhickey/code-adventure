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
        lPrimaryGreen: "#283618", //text
        lSecDarkGreen: "#151c0c",
        lSecLightGreen: "#606c38",
        lSecCream: "#fefae0", //bg
        lSecPeach: "#dda15e",
        lSecBurntOrange: "#bc6c25", //accent
        dPrimaryGray: "#e5e5e5", //text
        dSecWhite: "#ffffff",
        dSecMaize: "#fca311", //accent
        dSecDarkBlue: "#14213d", //bg
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
