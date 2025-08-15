/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))", // for bg-background
        foreground: "hsl(var(--foreground))", // optional, if you want text colors
      },
      borderColor: {
        border: "hsl(var(--border))",
      },
    },
  },
  plugins: [],
}
