import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
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
