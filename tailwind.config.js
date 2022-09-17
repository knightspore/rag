module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
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
        sans: ["Inconsolata", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
