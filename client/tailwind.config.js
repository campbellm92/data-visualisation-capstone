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
        noosa: {
          primary: "#c88441", // buttons
          "primary-content": "#0f172a", // text
          secondary: "#0ea5e9",
          // "secondary-content": "",
          // accent: "",
          // "accent-content": "",
          "base-100": "#4f46e5",
          "base-200": "#818cf8",
          "base-300": "#eef2ff",
          info: "#237496",
          success: "#289b6f",
          warning: "#fccd5e",
          error: "#f87979",
        },
      },
      {
        gold_coast: {},
      },
      {
        whitsunday: {},
      },
      {
        cairns: {},
      },
      {
        dark: {
          primary: "#c88441", // buttons
          "primary-content": "#edebe7", // text
          secondary: "#0ea5e9",
          // "secondary-content": "",
          // accent: "",
          // "accent-content": "",
          // "base-100": "#ffffff",
          "base-100": "#374151",
          // "base-200": "#374151",
          "base-200": "#1f2937",
          // "base-300": "#1f2937",
          "base-300": "#111827",
          // base 300 change to #111827?

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
