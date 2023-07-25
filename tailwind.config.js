/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      mytheme: {
        "primary": "#DEB708",
        "secondary": "#F5E8AD",
        "accent": "#C0A116",
        "neutral": "#584700",
        "base-100": "#E4F1E9",
      },
    }],
  },
}

