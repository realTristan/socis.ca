import { type AppType } from "next/app";
import { api } from "@/utils/api";

import "@/styles/globals.css";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin-ext"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} className={poppins.className} />;
};

export default api.withTRPC(MyApp);
