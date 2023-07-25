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
        "primary": "#78D99D",
        "secondary": "#CAE3D3",
        "accent": "#4D9368",
        "neutral": "#003F00",
        "base-100": "#E4F1E9",
      },
    }, "acid"],
  },
}

