"use client";

import MainWrapper from "@/components/MainWrapper";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import { BrowserView } from "react-device-detect";
import Background from "@/components/Background";
import SlideIntro from "@/components/SlideIntro";
import { SessionProvider, useSession } from "next-auth/react";
import LoadingCenter from "@/components/Loading";

// Homepage component
export default function AccountPage() {
  return (
    <>
      <Navbar underlined={null} />
      <Background text="ABOUT" className="-z-10" />

      <BrowserView>
        <CustomCursor />
        <SlideIntro />
      </BrowserView>

      <SessionProvider>
        <MainWrapper className="z-40">
          <Main />
        </MainWrapper>
      </SessionProvider>
    </>
  );
}

function Main(): JSX.Element {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoadingCenter />;
  }

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-center text-3xl font-bold text-white lg:text-5xl">
        Account
      </h1>

      <div className="flex flex-col gap-3">
        <p className="text-center text-sm font-light text-white lg:text-base">
          Welcome, {session?.user?.name ?? "user"}!
        </p>

        <p className="text-center text-sm font-light text-white lg:text-base">
          You are currently logged {session ? "in" : "out"}.
        </p>
      </div>
    </div>
  );
}
