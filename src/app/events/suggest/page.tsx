"use client";

import MainWrapper from "@/components/MainWrapper";
import Navbar from "@/components/Navbar/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import { BrowserView } from "react-device-detect";
import { useState } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import LoadingCenter from "@/components/Loading";
import Link from "next/link";

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

  const [_name, setName] = useState("");
  const [_description, setDescription] = useState("");

  if (status === "loading") {
    return <LoadingCenter />;
  }

  return (
    <>
      <Navbar underlined={null} />

      <BrowserView>
        <CustomCursor />
      </BrowserView>

      <MainWrapper className="p-10 lg:p-20">
        <form className="flex w-full flex-col">
          <h1 className="text-5xl font-thin uppercase text-white md:text-7xl">
            Suggest Event
          </h1>
          <Link
            href="/events"
            className="btn mb-7 mt-5 w-fit text-emerald-500 underline"
          >
            Go back
          </Link>

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

          <button
            className="btn mt-5 rounded-lg border border-emerald-500 bg-primary px-10 py-3 font-thin text-white hover:bg-emerald-900/50"
            type="submit"
          >
            Submit suggestion
          </button>
        </form>
      </MainWrapper>
    </>
  );
}
