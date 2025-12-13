import type { Config } from "tailwindcss";
import preset from "../../packages/design-system/tailwind.preset";

const config: Config = {
  presets: [preset],
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/weaw-design/src/**/*.{ts,tsx}",
  ],
};

export default config;
