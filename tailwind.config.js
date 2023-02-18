module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      "sm": "740px",
      "md": "960px",
      "lg": "1280px",
      "xl": "1920px",
      "2xl": "2560px",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-ibmplex)", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"),require("@tailwindcss/line-clamp")],
};
