/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        gray: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        primary: "rgb(var(--color-primary))",
        primaryrgb: "rgb(var(--color-primary-rgb))",
        secondary: "rgb(var(--color-secondary))",
        success: "rgb(var(--color-success))",
        info: "rgb(var(--color-info))",
        warning: "rgb(var(--color-warning))",
        danger: "rgb(var(--color-danger))",

        defaultborder: "rgb(var(--default-border))",
        muted: "rgb(var(--muted))",
        bodybg: "rgb(var(--body-bg))",
        defaultcolor: "rgb(var(--default-text-color))",
        dark: "rgb(var(--dark-rgb))",

        menubg: "rgb(var(--menu-bg))",
        menuborder: "rgb(var(--menu-border-color))",
        menuprime: "rgb(var(--menu-prime-color))",

        headerbg: "rgb(var(--header-bg))",
        headerborder: "rgb(var(--header-border-color))",
        headerprime: "rgb(var(--header-prime-color))",

        bgdark: "rgb(var(--dark-bg))",
        bgdark2: "rgb(var(--dark-bg2))",
      },
    },
  },
  plugins: [],
};
