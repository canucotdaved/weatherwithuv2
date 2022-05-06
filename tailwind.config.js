module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        main: "url('/src/assets/img/mainbg.jpg')",
      },
      colors: {
        fog: "rgba(255,255,255,0.5)",
      },
      fontFamily: {
        pops: ["Poppins", "sans-serif"],
      },
      transitionProperty: {
        width: "width",
      },
    },
  },
  plugins: [],
};
