"use client";

import MainWrapper from "@/components/MainWrapper";
import Navbar from "@/components/Navbar/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import { BrowserView } from "react-device-detect";
import { useState } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import LoadingCenter from "@/components/Loading";

// Homepage component
export default function EventsPage() {
  return (
    <SessionProvider>
      <Main />
    </SessionProvider>
  );
}

function Main(): JSX.Element {
  const { status } = useSession();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [perks, setPerks] = useState<string[]>([]);

  if (status === "loading") {
    return <LoadingCenter />;
  }

  return (
    <>
      <Navbar underlined={null} />

      <BrowserView>
        <CustomCursor />
      </BrowserView>

      <MainWrapper className="p-10 pt-20 lg:p-20 lg:pt-44">
        <form className="flex w-full flex-col">
          <h1 className="mb-7 text-5xl font-thin uppercase text-white md:text-7xl">
            Create Event
          </h1>

          <label className="mb-2 text-white">Event Name</label>
          <input
            className="rounded-lg border border-emerald-500 bg-primary px-4 py-3 text-base font-thin tracking-wider text-white duration-300 ease-in-out focus:outline-none"
            placeholder="Name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />

          <label className="mb-2 mt-5 text-white">Event Description</label>
          <textarea
            className="rounded-lg border border-emerald-500 bg-primary px-4 py-3 text-base font-thin tracking-wider text-white duration-300 ease-in-out focus:outline-none"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />

          <label className="mb-2 mt-5 text-white">Event Location</label>
          <input
            className="rounded-lg border border-emerald-500 bg-primary px-4 py-3 text-base font-thin tracking-wider text-white duration-300 ease-in-out focus:outline-none"
            placeholder="Location"
            type="text"
            onChange={(e) => setLocation(e.target.value)}
          />

          <label className="mb-2 mt-5 text-white">Event Date</label>
          <input
            className="rounded-lg border border-emerald-500 bg-primary px-4 py-3 text-base font-thin tracking-wider text-white duration-300 ease-in-out focus:outline-none"
            placeholder="Date"
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />

          <label className="mb-2 mt-5 text-white">Perks</label>
          <input
            className="rounded-lg border border-emerald-500 bg-primary px-4 py-3 text-base font-thin tracking-wider text-white duration-300 ease-in-out focus:outline-none"
            placeholder="Perks (Seperate by comma)"
            type="text"
            onChange={(e) => setPerks(e.target.value.split(","))}
          />

          <button
            className="btn mt-5 rounded-lg border border-emerald-500 bg-primary px-10 py-3 font-thin text-white hover:bg-emerald-900/50"
            type="submit"
          >
            Create Event
          </button>
        </form>
      </MainWrapper>
    </>
  );
}
