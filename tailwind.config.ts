import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#00afb0",
          secondary: "#b80000",
          accent: "#21d300",
          neutral: "#1b1923",
          "base-100": "#fff7ff",
          info: "#0093ff",
          success: "#008b19",
          warning: "#da5400",
          error: "#f90022",
          body: {
            "background-color": "#fff7ff",
          },
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
