import type { Config } from "tailwindcss";
// import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1f1f1f",
        secondary: "#393939",
      },
    },
  },
  plugins: [],
} satisfies Config;
