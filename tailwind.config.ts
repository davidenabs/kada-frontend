/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import typography from "./theme/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/rizzui/dist/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        oxygen: ['Oxygen', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      backgroundImage: {
        "hero-image": "url('/images/bg.png')"
      },

      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: {},
        primary: {
          default: "#0F6238", //"#367B62", // Base
          100: "#d7e5e0", // 10%
          200: "#bcd3cb", // 20%
          300: "#9bbdb1", // 30%
          400: "#79a796", // 40%
          500: "#58917c", // 50%
          600: "#367b62", // Base
          700: "#2d6752", // 60%
          800: "#245241", // 70%
          900: "#1b3e31", // 80%
          1000: "#122921", // 90%
          1100: "#0b1914", // 100%
        },
        secondary: {
          default: "#F7D150", // Base
          100: "#fdf6dc", // 10%
          200: "#fcf0c5", // 20%
          300: "#fbe8a8", // 30%
          400: "#fae08a", // 40%
          500: "#f8d96d", // 50%
          600: "#f7d150", // Base
          700: "#ceae43", // 60%
          800: "#a58b35", // 70%
          900: "#7c6928", // 80%
          1000: "#52461b", // 90%
          1100: "#312a10", // 100%
        },
        tertiary: {
          default: "#333543", // Base
          100: "#d6d7d9", // 10%
          200: "#bbbcc0", // 20%
          300: "#999aa1", // 30%
          400: "#777882", // 40%
          500: "#555762", // 50%
          600: "#333543", // Base
          700: "#2b2c38", // 60%
          800: "#22232d", // 70%
          900: "#1a1b22", // 80%
          1000: "#111216", // 90%
          1100: "#0a0b0d", // 100%
        }, 
        others: {
          lightGreen: "#F2F9F5",
          lightYellow: "#FCF8E7"
        } ,      
        text: {
         
        }
      },
      boxShadow: {},
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1440px",
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      const newComponents: any = {
        ...typography,
      };
      addComponents(newComponents);
    }),
    require("@tailwindcss/forms")
  ],
};
export default config;
