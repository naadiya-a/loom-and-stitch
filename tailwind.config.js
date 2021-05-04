module.exports = {
  // purge: [],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        yarn: "url('/src/images/yarn.jpg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
