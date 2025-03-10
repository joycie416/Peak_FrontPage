import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xl: "1180px",
      lg: "934px",
      md: "650px",
      sm: "375px",
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "hsl(var(--secondary-foreground))",
        },
        gray: {
          "50": "#F5F5F5",
          "70": "#EDEDED",
          "100": "#D3CFDA",
          "200": "#C1C1C1",
          "300": "#9E9E9E",
          "700": "#282828",
          "800": "#1B1B1B",
          "900": "#06040D",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        "peak-50": "#f8f2ff",
        "peak-100": "#efe0ff",
        "peak-200": "#e3caff",
        "peak-300": "#cfa7fa",
        "peak-400": "#b77df4",
        "peak-500": "#a24bff",
        "peak-600": "#841af6",
        "peak-700": "#690fc9",
        "peak-800": "#4d039d",
        "peak-900": "#420c7c",
        "peak-950": "#340b60",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      borderColor: {
        gray: {
          "50": "#F5F5F5",
          "70": "#EDEDED",
          "100": "#D3CFDA",
          "200": "#C1C1C1",
          "300": "#9E9E9E",
          "700": "#282828",
          "800": "#1B1B1B",
          "900": "#06040D",
        },
      },
      boxShadow: {
        custom: "4px 12px 20px #F0ECF8",
      },
      width: {
        "desktop-width": "var(--desktop-width)",
      },
      minWidth: {
        "desktop-width": "var(--desktop-width)",
      },
      maxWidth: {
        "desktop-width": "var(--desktop-width)",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
        chakra: ["var(--font-chakra)"],
        manrope: ["var(--font-manrope)"],
      },
      keyframes: {
        top_fadeout: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
      },
      animation: {
        top_fadeout: "top_fadeout 3s ease-in forwards",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        ":root": {
          "--peak-50": "#f8f2ff",
          "--peak-100": "#efe0ff",
          "--peak-200": "#e3caff",
          "--peak-300": "#cfa7fa",
          "--peak-400": "#b77df4",
          "--peak-500": "#a24bff",
          "--peak-600": "#841af6",
          "--peak-700": "#690fc9",
          "--peak-800": "#4d039d",
          "--peak-900": "#420c7c",
          "--peak-950": "#340b60",
        },
      });
    }),
    require("tailwindcss-animate"),
  ],
} satisfies Config;
