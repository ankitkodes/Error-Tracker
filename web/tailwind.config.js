/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    fontFamily: {
      sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
    },
    colors: {
      customHover: "#081114",
    },
  },
};
export const plugins = [];
