import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        background: "#1c1c1c",
      },
    },
  },
  plugins: [],
} satisfies Config;
