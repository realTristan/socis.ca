import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { type Event } from "@/types/types";
import { type User } from "next-auth";
import EventEditButton from "./EventEditButton";
import EventDeleteButton from "./EventDeleteButton";

interface EventCardProps {
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  user: User | null;
  event: Event;
}

export default function EventCard(props: EventCardProps): JSX.Element {
  if (!props.event) {
    return <></>;
  }

  return (
    <div
      onMouseLeave={props.onMouseLeave}
      onMouseEnter={props.onMouseEnter}
      className={cn(
        "btn relative flex h-[32rem] w-96 flex-col items-start justify-start rounded-lg border border-emerald-500 bg-primary p-7 duration-300 ease-in-out hover:scale-105 hover:shadow-md hover:shadow-emerald-700/50",
        props.className,
      )}
    >
      <Image
        src={
          props.event.image
            ? props.event.image
            : "/images/event-banner-tmp1.png"
        }
        alt="..."
        width={400}
        height={400}
        priority={false}
      />
      <h1 className="mt-5 text-5xl font-thin uppercase text-white">
        {props.event.name}
      </h1>
      <p className="ml-1 mt-2 font-thin text-white">
        {props.event.description}
      </p>
      <div className="my-2 flex flex-wrap gap-2">
        {props.event.perks.map((perk) => (
          <PerkLabel perk={perk} />
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Link
          href={`/events/${props.event.id}`}
          className="mt-4 h-fit w-fit rounded-lg border border-emerald-500 px-7 py-3 text-sm font-thin text-white hover:bg-emerald-900/50"
        >
          Learn more
        </Link>
        <EventEditButton user={props.user} event={props.event} />
        <EventDeleteButton user={props.user} event={props.event} />
      </div>
      <div className="absolute bottom-4 left-4">
        <p className="ml-1 mt-4 font-thin text-white">{props.event.location}</p>
        <p className="ml-1 font-thin text-white">{props.event.date}</p>
      </div>
    </div>
  );
}

function PerkLabel({ perk }: { perk: string }): JSX.Element {
  return (
    <div className="w-fit rounded-md border border-emerald-500 bg-emerald-950/50 px-2 py-1 text-xs font-thin text-white">
      {perk}
    </div>
  );
}
