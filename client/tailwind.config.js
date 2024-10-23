import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#c88441", // buttons
          "primary-content": "#edebe7", // text
          // secondary: "",
          // "secondary-content": "",
          // accent: "",
          // "accent-content": "",
          "base-100": "#ffffff", // background
          // "base-200": "#7a8e7c",
          "base-200": "#0ea5e9",
          // "base-300": "#173a2c",
          // "base-300": "#0c4a6e",
          // "base-300": "#111827",
          "base-300": "#1f2937",

          info: "#237496",
          success: "#289b6f",
          warning: "#fccd5e",
          error: "#f87979",
        },
      },
    ],
  },
  plugins: [daisyui],
};
