"use client";

import MainWrapper from "@/components/MainWrapper";
import Navbar from "@/components/Navbar/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import { BrowserView } from "react-device-detect";
import { type FormEvent, useState } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import LoadingCenter, { LoadingRelative } from "@/components/Loading";
import { type User } from "next-auth";
import { hasPermissions } from "@/lib/permissions";
import { Permission } from "@/types/types";
import InvalidPermissions from "./_component/InvalidPermissions";
import InvalidSession from "./_component/InvalidSession";
import SuccessMessage from "@/components/SuccessMessage";
import ErrorMessage from "@/components/ErrorMessage";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Homepage component
export default function EventsPage() {
  return (
    <SessionProvider>
      <Main />
    </SessionProvider>
  );
}

function createEventApi(
  user: User,
  name: string,
  description: string,
  location: string,
  date: string,
  perks: string[],
) {
  return fetch("/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: user.secret,
    },
    body: JSON.stringify({ name, description, location, date, perks }),
  });
}

enum Status {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR,
  EMPTY_FIELDS,
}

function Main(): JSX.Element {
  const { data: session, status } = useSession();

  const [creationStatus, setCreationStatus] = useState(Status.IDLE);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [perks, setPerks] = useState<string[]>([]);

  const router = useRouter();

  if (status === "loading") {
    return <LoadingCenter />;
  }

  if (!session?.user) {
    return <InvalidSession />;
  }

  if (!hasPermissions(session.user, [Permission.CREATE_EVENT])) {
    return <InvalidPermissions />;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setCreationStatus(Status.LOADING);

    if (!name || !description || !location || !date || !perks) {
      setCreationStatus(Status.EMPTY_FIELDS);
      return;
    }

    const res = await createEventApi(
      session?.user!,
      name,
      description,
      location,
      date,
      perks,
    );

    if (res.ok) {
      setCreationStatus(Status.SUCCESS);
      router.push("/events");
      return;
    }
  }

  return (
    <>
      <Navbar underlined={null} />

      <BrowserView>
        <CustomCursor />
      </BrowserView>

      <MainWrapper className="p-10 pt-20 lg:p-20 lg:pt-44">
        <form className="flex w-full flex-col" onSubmit={onSubmit}>
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
            className="btn mt-5 flex flex-col items-center justify-center rounded-lg border border-emerald-500 bg-primary px-10 py-3 text-center font-thin text-white hover:bg-emerald-900/50 disabled:opacity-50"
            type="submit"
            disabled={creationStatus === Status.LOADING}
          >
            {creationStatus === Status.LOADING ? (
              <LoadingRelative className="h-5 w-5" />
            ) : (
              "Create Event"
            )}
          </button>
          <Link
            aria-disabled={creationStatus === Status.LOADING}
            className="btn mt-5 flex flex-col items-center justify-center rounded-lg border border-emerald-500 bg-primary px-10 py-3 text-center font-thin text-white hover:bg-emerald-900/50 aria-disabled:cursor-default aria-disabled:opacity-50"
            href={creationStatus === Status.LOADING ? "#" : "/events"}
          >
            Cancel
          </Link>
        </form>

        {creationStatus === Status.SUCCESS && (
          <SuccessMessage>
            <p>Event created successfully!</p>
          </SuccessMessage>
        )}

        {creationStatus === Status.ERROR && (
          <ErrorMessage>
            <p>There was an error creating your event.</p>
          </ErrorMessage>
        )}

        {creationStatus === Status.EMPTY_FIELDS && (
          <ErrorMessage>
            <p>Make sure all fields are filled in.</p>
          </ErrorMessage>
        )}
      </MainWrapper>
    </>
  );
}
