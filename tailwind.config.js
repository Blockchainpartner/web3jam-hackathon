module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // LAYOUT
        tile: "#F4EFEF",
        glay: "#E0E0E0",
        // TEXTS
        subtxt: "#8A8A8A",
        gtxt: "#686868",
        ablack: "#383838",
        // ACCENTS
        brand1: "#F51B6B",
        brand2: "#E2AB45",
        success: "#18C435",
        danger: "#FC4850",
        // OTHER
        mm: "#F6815B",
        "mm-100": "#ffe8e0",
        wc: "#3b99fc",
      },
      fontFamily: {
        sans: ["Montserrat"],
      },
      borderRadius: {
        DEFAULT: "8px",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled", "hover"],
      borderWidth: ["hover"],
      blur: ["hover", "focus"],
      backgroundImage: ["hover", "focus"],
      transitionProperty: ["hover", "focus"],
    },
  },
  plugins: [],
};
