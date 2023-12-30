"use client";

import MainWrapper from "@/components/MainWrapper";
import Navbar from "@/components/Navbar/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import { BrowserView } from "react-device-detect";
import { SessionProvider, useSession } from "next-auth/react";
import LoadingCenter from "@/components/Loading";
import Background from "@/components/Background";
import { hasPermissions } from "@/lib/permissions";
import InvalidSession from "../_components/InvalidSession";
import DarkOverlay from "../_components/DarkOverlay";
import { Permission } from "@/lib/types";
import InvalidPermissions from "../_components/InvalidPermissions";

// Homepage component
export default function ManageUsersPage() {
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

  // If the user doesn't have the ADMIN permission, redirect them to the account page
  if (!hasPermissions(session.user, [Permission.ADMIN])) {
    return <InvalidPermissions />;
  }

  return (
    <div className="flex flex-col items-start justify-start gap-3">
      <h1 className="text-center text-5xl font-bold text-white">
        Manage users
      </h1>
      <p className="text-center text-sm font-light text-white/80">
        {session?.user?.email ?? "user"}.
      </p>
    </div>
  );
}
