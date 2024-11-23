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
          primary: "#925e2a", // Button background color
          "primary-content": "#ffffff",
          secondary: "#086189",
          "secondary-content": "#0f172a",
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
          primary: "#ab274f",
          "primary-content": "#0f172a",
          secondary: "#0ea5e9",
          "secondary-content": "#f1f5f9",
          "base-200": "#f3f4f6",
          "base-300": "#f9fafb",
          info: "#237496",
          success: "#289b6f",
          warning: "#fccd5e",
          error: "#f87979",
        },
      },
      {
        noosaDarkTheme: {
          primary: "#CD2B61",
          "primary-content": "#edebe7",
          secondary: "#0ea5e9",
          "secondary-content": "#f1f5f9",
          "base-200": "#1f2937",
          "base-300": "#111827",
          info: "#237496",
          success: "#289b6f",
          warning: "#fccd5e",
          error: "#f87979",
        },
      },
      {
        goldCoastTheme: {
          primary: "#c88441",
          "primary-content": "#0f172a",
          secondary: "#0ea5e9",
          "secondary-content": "#f1f5f9",
          "base-200": "#f3f4f6",
          "base-300": "#f9fafb",
          info: "#237496",
          success: "#289b6f",
          warning: "#fccd5e",
          error: "#f87979",
        },
      },
      {
        goldCoastDarkTheme: {
          primary: "#f59e0b",
          "primary-content": "#edebe7",
          secondary: "#0ea5e9",
          "secondary-content": "#f1f5f9",
          "base-200": "#1f2937",
          "base-300": "#111827",
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
          "base-200": "#f3f4f6",
          "base-300": "#f9fafb",
          info: "#237496",
          success: "#289b6f",
          warning: "#fccd5e",
          error: "#f87979",
        },
      },
      {
        whitsundayDarkTheme: {
          primary: "#06b6d4",
          "primary-content": "#edebe7",
          secondary: "#0ea5e9",
          "secondary-content": "#f1f5f9",
          "base-200": "#1f2937",
          "base-300": "#111827",
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
          "base-200": "#f3f4f6",
          "base-300": "#f9fafb",
          info: "#237496",
          success: "#289b6f",
          warning: "#fccd5e",
          error: "#f87979",
        },
      },
      {
        cairnsDarkTheme: {
          primary: "#16a34a",
          "primary-content": "#edebe7",
          secondary: "#0ea5e9",
          "secondary-content": "#f1f5f9",
          "base-200": "#1f2937",
          "base-300": "#111827",
          info: "#237496",
          success: "#289b6f",
          warning: "#fccd5e",
          error: "#f87979",
        },
      },
      {
        darkTheme: {
          primary: "#925e2a",
          "primary-content": "#edebe7",
          secondary: "#0ea5e9",
          "secondary-content": "#f1f5f9",
          "base-200": "#1f2937",
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
