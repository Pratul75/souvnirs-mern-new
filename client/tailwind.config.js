module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#48068E",

          secondary: "#8afcac",

          accent: "#8dbc2f",

          neutral: "#2d2c35",

          "base-100": "#363239",

          info: "#71b6d1",

          success: "#16b67e",

          warning: "#f3c268",

          error: "#e92563",
        },
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Work Sans'", "sans-serif"],
      },
      colors: {
        themeColor: "#4680FF",
        cardDark: "#3B558A",
        cardDarker: "#1E252F",
        cardLight: "#FFFFFF",
        carsLighter: "#F8F9FA",
        shopPrimaryColor: "#48068E",
      },
    },
  },

  darkMode: "class",
  plugins: [require("daisyui")],
};
