/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {},
      backgroundImage: {
        // logsbg: `url("./src/assets/LogSvg/LogBg.png")`,
      },
      screens: {
        xs: "320px",
      },
      colors: {
        theme: {
          purple1000: "#1c1650",
          purple900: "#2d2689",
          purple800: "#3225ae",
          purple700: "#3e2ad8",
          purple600: "#4836f5",
          purple: "#5A57FF",
          purple400: "#757dff",
          purple300: "#9caaff",
          purple200: "#c2cdff",
          purple100: "#dde4ff",
          purple50: "#ecf0ff",
          ppk: "fdd4f9",
        },
      },
    },
  },
  plugins: [],
};
