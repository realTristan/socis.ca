import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        background: "#1f1f1f",
      },
    },
  },
  plugins: [],
} satisfies Config;
