"use client";

import MainWrapper from "@/components/MainWrapper";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import { BrowserView } from "react-device-detect";
import { SessionProvider, useSession } from "next-auth/react";
import LoadingCenter from "@/components/Loading";
import InvalidSession from "./_components/InvalidSession";
import PermissionsList from "./_components/PermissionsList";
import Background from "@/components/Background";
import AdminOptionsList from "./_components/AdminOptionsList";
import DarkOverlay from "./_components/DarkOverlay";

// Homepage component
export default function AccountPage() {
  return (
    <>
      <Navbar underlined={null} showAuthButton={true} className="z-40" />
      <Background text="ACCOUNT" animated={false} className="-z-20" />
      <DarkOverlay />

      <BrowserView>
        <CustomCursor />
      </BrowserView>

      <SessionProvider>
        <MainWrapper className="z-40 items-start justify-start p-20 pt-52">
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

  if (status === "unauthenticated" || !session) {
    return <InvalidSession />;
  }

  return (
    <div className="flex flex-col items-start justify-start gap-3">
      <h1 className="text-center text-5xl font-bold text-white">
        Welcome, {session?.user?.name ?? "user"}!
      </h1>
      <p className="text-center text-sm font-light text-white/80">
        {session?.user?.email ?? "user"}.
      </p>
      <PermissionsList user={session.user} />

      {/* Will return empty if not admin */}
      <AdminOptionsList user={session.user} />
    </div>
  );
}
