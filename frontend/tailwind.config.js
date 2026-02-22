/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lavender: {
          50: "#f8f7ff",
          100: "#f0edff",
          200: "#e0d9ff",
          300: "#cbb8ff",
          400: "#b08cff",
          500: "#9a6bff",
          600: "#8451ff",
        }
      },
      boxShadow: {
        soft: "0 8px 30px rgba(155, 105, 255, 0.15)"
      }
    },
  },
  plugins: [],
}