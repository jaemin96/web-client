import shared from "@wc/tailwind-config";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [shared],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",

    // "../../packages/ui/src/**/*.{js,jsx,ts,tsx}"
  ],
};
