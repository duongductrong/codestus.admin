/* eslint-disable global-require */
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "hsl(var(--background))",
          body: {
            background: "var(--twc-body-background)",
          },
        },
        foreground: "hsl(var(--foreground))",
        secondary: {
          DEFAULT: "hsl(var(--twc-secondary))",
          soft: "hsl(var(--twc-secondary-soft))",
          foreground: "hsl(var(--twc-secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--twc-destructive))",
          soft: "hsl(var(--twc-destructive-soft))",
          foreground: "hsl(var(--twc-destructive-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
          border: "hsl(var(--popover-border))",
        },
        primary: {
          DEFAULT: "hsl(var(--twc-primary))",
          soft: "hsl(var(--twc-primary-soft))",
          foreground: "hsl(var(--twc-primary-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--twc-success))",
          soft: "hsl(var(--twc-success-soft))",
          foreground: "hsl(var(--twc-success-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--twc-muted))",
          foreground: "hsl(var(--twc-muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          darkness: "hsl(var(--accent-darkness))",
          lightness: "hsl(var(--accent-lightness))",
          light: "hsl(var(--accent-light))",
          dark: "hsl(var(--accent-dark))",
        },
        app: {
          background: "var(--app-background)",
          sidebar: {
            background: "var(--app-sidebar-background)",
          },
          header: {
            background: "var(--app-header-background)",
          },
        },

        "icon-btn": {
          foreground: "hsl(var(--icon-btn-foreground))",
          background: "hsl(var(--icon-btn-background))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          border: "hsl(var(--card-border))",
        },
        list: {
          background: "hsl(var(--list))",
          foreground: "hsl(var(--list-foreground))",
        },
      },
      borderRadius: {
        base: "var(--radius-base)",
      },
      spacing: {
        "app-sidebar-dimension": "var(--app-sidebar-dimension)",
        "app-header-dimension": "var(--app-header-dimension)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
