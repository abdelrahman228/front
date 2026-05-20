/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0F0A1E",
        surface: "#170F2B",
        primary: "#6D28D9",
        border: "#34245F",
        text: "#F3E8FF",
        muted: "#C4B5FD"
      },
      fontFamily: {
        sans: ["Cairo", "system-ui", "sans-serif"]
      }
    },
  },
  plugins: [],
}
