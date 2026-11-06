import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4f3ff",
          100: "#e9e7ff",
          500: "#6658e8",
          600: "#5546d7",
          700: "#4435b8"
        },
        ink: "#17182b"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(27, 27, 65, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
