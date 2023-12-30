"use client";

import Navbar, { NavbarTabs } from "@/components/Navbar/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import { BrowserView } from "react-device-detect";
import { SessionProvider, useSession } from "next-auth/react";
import LoadingCenter from "@/components/Loading";
import MainWrapper from "@/components/MainWrapper";
import { usePathname } from "next/navigation";

// Homepage component
export default function EventsPage() {
  return (
    <SessionProvider>
      <Main />
    </SessionProvider>
  );
}

function Main(): JSX.Element {
  const { data: _session, status } = useSession();

  // Get the event id
  const path = usePathname();
  const eventId = path.split("/").pop();

  if (status === "loading") {
    return <LoadingCenter />;
  }

  return (
    <>
      <Navbar underlined={NavbarTabs.EVENTS} />

      <BrowserView>
        <CustomCursor />
      </BrowserView>

      <MainWrapper>
        <p className="text-4xl font-thin tracking-wider text-white">
          {eventId}
        </p>
      </MainWrapper>
    </>
  );
}
