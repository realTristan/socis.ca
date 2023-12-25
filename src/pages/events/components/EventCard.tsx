import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

// Convert to Prisma type
export interface Event {
  name: string;
  description: string;
  id: string;
  date: string;
  location: string;
  image: string;
  href: string;
}

interface EventCardProps {
  className?: string;
  onMouseEnter?: any;
  onMouseLeave?: any;
  event: Event;
}

export default function EventCard(props: EventCardProps): JSX.Element {
  return (
    <div
      onMouseLeave={props.onMouseLeave}
      onMouseEnter={props.onMouseEnter}
      className={cn(
        "btn relative flex h-[30rem] w-96 flex-col items-start justify-start rounded-lg border border-emerald-500 bg-primary p-7 duration-300 ease-in-out hover:scale-105 hover:shadow-md hover:shadow-emerald-700/50",
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
      <Link
        href={props.event.href}
        className="mt-4 rounded-lg border border-emerald-500 px-10 py-3 font-thin text-white hover:bg-emerald-900/50"
      >
        Learn more
      </Link>
      <div className="absolute bottom-4 left-4">
        <p className="ml-1 mt-4 font-thin text-white">{props.event.location}</p>
        <p className="ml-1 font-thin text-white">{props.event.date}</p>
      </div>
    </div>
  );
}
