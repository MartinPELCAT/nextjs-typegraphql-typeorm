module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: {
    enabled: process.env.NODE_ENV === "production",
    mode: "all",
    content: ["./pages/**/*.html", "./pages/**/*.tsx"],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
