"use client";

import MainWrapper from "@/components/MainWrapper";
import Navbar, { NavbarTabs } from "@/components/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import { BrowserView } from "react-device-detect";
import Background from "@/components/Background";
import SlideIntro from "@/components/SlideIntro";
import EventCard from "./_components/EventCard";
import { type Event } from "@/lib/types";
import { useState } from "react";

const testEvent = {
  name: "Workshop",
  description:
    "Learn Firebase, Authentication, Google Cloud, and Angular in the upcoming SOCIS Event! Bring your friends - pizza included!",
  location: "The University of Guelph",
  date: "December 25th 2023",
  href: "/",
  id: "98372okrugyfabhjsflu3yfg",
  image: "/images/event-banner-tmp1.png",
} as Event;

// Homepage component
export default function EventsPage() {
  const [backgroundText, setBackgroundText] = useState("EVENTS");

  return (
    <>
      <Navbar underlined={NavbarTabs.EVENTS} />
      <Background text={backgroundText} animated={false} className="-z-10" />

      <BrowserView>
        <CustomCursor />
        <SlideIntro />
      </BrowserView>

      <MainWrapper className="fade-in-delay z-40">
        <EventCard
          event={testEvent}
          onMouseEnter={() => {
            setBackgroundText(testEvent.name.toUpperCase());
          }}
          onMouseLeave={() => {
            setBackgroundText("EVENTS");
          }}
        />
      </MainWrapper>
    </>
  );
}
