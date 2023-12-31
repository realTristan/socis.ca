"use client";

import Navbar, { NavbarTabs } from "@/components/Navbar/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import { BrowserView } from "react-device-detect";
import Background from "@/components/Background";
import SlideIntro from "@/components/SlideIntro";
import EventCard from "./_components/EventCard";
import { useEffect, useState } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import LoadingCenter from "@/components/Loading";
import CreateEventCard from "./_components/CreateEventCard";
import { type Event } from "@/types/types";

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
  const [events, setEvents] = useState<Event[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session?.user) {
      return;
    }

    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data.events));
  }, [session]);

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
        {events.map((event) => (
          <EventCard
            key={event.id}
            user={session?.user ?? null}
            event={event}
            onMouseEnter={() => {
              setBackgroundText(event.name.toUpperCase());
            }}
            onMouseLeave={() => {
              setBackgroundText("EVENTS");
            }}
          />
        ))}

        <CreateEventCard user={session?.user ?? null} />
      </main>
    </>
  );
}
