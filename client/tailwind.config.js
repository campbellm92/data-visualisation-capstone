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
        publicTheme: {
          primary: "#c88441", // buttons
          "primary-content": "#edebe7", // text
          secondary: "#0ea5e9",
          "secondary-content": "#f1f5f9",
          // accent: "",
          // "accent-content": "",
          "base-100": "#ffffff",
          "base-200": "#374151",
          "base-300": "#1f2937",
          info: "#237496",
          success: "#289b6f",
          warning: "#fccd5e",
          error: "#f87979",
        },
      },
      {
        noosaTheme: {
          primary: "#7e22ce", // buttons
          "primary-content": "#0f172a", // text
          secondary: "#0ea5e9",
          "secondary-content": "#f1f5f9",

          // accent: "",
          // "accent-content": "",
          "base-100": "#f3e8ff",
          "base-200": "#f3f4f6",
          "base-300": "#f9fafb",
          info: "#237496",
          success: "#289b6f",
          warning: "#fccd5e",
          error: "#f87979",
        },
      },
      {
        goldCoastTheme: {
          primary: "#c88441", // buttons
          "primary-content": "#0f172a", // text
          secondary: "#0ea5e9",
          "secondary-content": "#b45309",
          // accent: "",
          // "accent-content": "",
          "base-100": "#fef3c7",
          "base-200": "#f3f4f6",
          "base-300": "#f9fafb",
          info: "#237496",
          success: "#289b6f",
          warning: "#fccd5e",
          error: "#f87979",
        },
      },
      {
        whitsundayTheme: {
          primary: "#0e7490",
          "primary-content": "#0f172a",
          secondary: "#0ea5e9",
          "secondary-content": "#f1f5f9",
          // accent: "",
          // "accent-content": "",
          "base-100": "#ecfeff",
          "base-200": "#f3f4f6",
          "base-300": "#f9fafb",
          info: "#237496",
          success: "#289b6f",
          warning: "#fccd5e",
          error: "#f87979",
        },
      },
      {
        cairnsTheme: {
          primary: "#15803d",
          "primary-content": "#0f172a",
          secondary: "#0ea5e9",
          "secondary-content": "#f1f5f9",
          // accent: "",
          // "accent-content": "",
          "base-100": "#dcfce7",
          "base-200": "#f3f4f6",
          "base-300": "#f9fafb",
          info: "#237496",
          success: "#289b6f",
          warning: "#fccd5e",
          error: "#f87979",
        },
      },
      {
        darkTheme: {
          primary: "#c88441",
          "primary-content": "#edebe7",
          secondary: "#0ea5e9",
          "secondary-content": "#f1f5f9",
          // accent: "",
          // "accent-content": "",
          // "base-100": "#ffffff",
          "base-100": "#374151",
          // "base-200": "#374151",
          "base-200": "#1f2937",
          // "base-300": "#1f2937",
          "base-300": "#111827",
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
