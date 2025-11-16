/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // <- must be class
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        darkBg: "#0f172a", // dark background
        darkCard: "#1e293b", // cards
      },
    },
  },
  plugins: [],
};
