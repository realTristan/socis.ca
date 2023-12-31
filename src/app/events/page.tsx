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
import ErrorMessage from "@/components/ErrorMessage";

// Homepage component
export default function EventsPage() {
  return (
    <SessionProvider>
      <Main />
    </SessionProvider>
  );
}

enum Status {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR,
}

function Main(): JSX.Element {
  const [backgroundText, setBackgroundText] = useState("EVENTS");
  const [events, setEvents] = useState<Event[]>([]);
  const [fetchStatus, setFetch] = useState<Status>(Status.IDLE);
  const { data: session, status } = useSession();

  useEffect(() => {
    setFetch(Status.LOADING);

    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setFetch(Status.SUCCESS);
      })
      .catch(() => {
        setFetch(Status.ERROR);
      });
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
        {fetchStatus === Status.LOADING && <LoadingCenter />}
        {fetchStatus === Status.SUCCESS &&
          events.map((event) => (
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

        {fetchStatus === Status.ERROR && (
          <ErrorMessage>
            <p>There was an error fetching the events.</p>
          </ErrorMessage>
        )}

        <CreateEventCard user={session?.user ?? null} />
      </main>
    </>
  );
}
