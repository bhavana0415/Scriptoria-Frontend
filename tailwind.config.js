/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enables class-based dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this according to your project structure
  ],
  theme: {
    extend: {
      fontFamily: {
        customFont: ["Brush Script MT", "Brush Script Std", "sans-serif"],
      },
      colors: {
        "custom-hover": "var(--customColorTwo)",
      },
      screens: {
        custom: "1080px", // Example of another custom media query
      },
    },
  },
  variants: {
    extend: {
      transform: ["hover", "focus"],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          "scrollbar-width": "none" /* For Firefox */,
        },
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none" /* For Chrome, Safari, and Opera */,
        },
      });
    },
  ],
};
