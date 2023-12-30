"use client";

import Navbar, { NavbarTabs } from "@/components/Navbar/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import { BrowserView } from "react-device-detect";
import Background from "@/components/Background";
import SlideIntro from "@/components/SlideIntro";
import EventCard from "./_components/EventCard";
import { type Event } from "@/types/types";
import { useState } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import LoadingCenter from "@/components/Loading";
import CreateEventCard from "./_components/CreateEventCard";

const testEvent = {
  name: "Workshop",
  description:
    "Learn Firebase, Authentication, Google Cloud, and Angular in the upcoming SOCIS Event! Bring your friends - pizza included!",
  location: "The University of Guelph",
  date: "December 25th 2023",
  href: "/",
  id: "98372okrugyfabhjsflu3yfg",
  image: "/images/event-banner-tmp1.png",
  perks: ["Pizza", "Swag", "Networking"],
};

// Homepage component
export default function EventsPage() {
  return (
    <SessionProvider>
      <Main />
    </SessionProvider>
  );
}

function Main(): JSX.Element {
  const [backgroundText, setBackgroundText] = useState("EVENTS");
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoadingCenter />;
  }

  return (
    <>
      <Navbar underlined={NavbarTabs.EVENTS} />
      <Background text={backgroundText} animated={false} className="-z-10" />

      <BrowserView>
        <CustomCursor />
        <SlideIntro />
      </BrowserView>

      <main className="fade-in-delay z-40 flex min-h-screen flex-wrap items-center justify-center gap-12 p-10 lg:p-20">
        <EventCard
          user={session?.user ?? null}
          event={testEvent}
          onMouseEnter={() => {
            setBackgroundText(testEvent.name.toUpperCase());
          }}
          onMouseLeave={() => {
            setBackgroundText("EVENTS");
          }}
        />
        <CreateEventCard user={session?.user ?? null} />
      </main>
    </>
  );
}
