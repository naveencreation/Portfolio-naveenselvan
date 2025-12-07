/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050508",
        foreground: "#f8fafc",
        card: "#0c0c12",
        "card-foreground": "#f8fafc",
        primary: "#8b5cf6",
        "primary-foreground": "#fafafa",
        secondary: "#151520",
        "secondary-foreground": "#fafafa",
        muted: "#1e1e2e",
        "muted-foreground": "#94a3b8",
        accent: "#06b6d4",
        "accent-foreground": "#fafafa",
        border: "#1e293b",
        ring: "#8b5cf6",
        glow: "#c084fc",
        success: "#10b981",
      },
      borderRadius: {
        DEFAULT: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
