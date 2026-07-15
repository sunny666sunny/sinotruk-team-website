import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#26807d',
          dark: '#1e6663',
          light: '#309a96',
          50: '#e9f2f2',
          100: '#d3e5e5',
          200: '#a7cbcb',
          300: '#7bb1b1',
          400: '#4f9797',
          500: '#26807d',
          600: '#1e6664',
          700: '#174d4b',
          800: '#0f3332',
          900: '#081a19',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
