import { hasPermissions } from "@/lib/permissions";
import { Permission } from "@/types/types";
import { cn } from "@/utils/cn";
import { type User } from "next-auth";
import Link from "next/link";

interface EventCardProps {
  className?: string;
  user: User | null;
}

export default function EventCard(props: EventCardProps): JSX.Element {
  if (!props.user) {
    return <></>;
  }

  const suggestEventFormUrl = "/events/suggest";
  const canCreateEvents = hasPermissions(props.user, [Permission.CREATE_EVENT]);

  return (
    <Link
      href={canCreateEvents ? "/events/create" : suggestEventFormUrl}
      className={cn(
        "btn relative flex h-[32rem] w-96 cursor-pointer flex-col items-center justify-center rounded-lg border border-emerald-500 bg-primary p-7 duration-300 ease-in-out hover:scale-105 hover:shadow-md hover:shadow-emerald-700/50",
        props.className,
      )}
    >
      <PlusSvg />
      <p className="btn mt-7 text-2xl font-thin uppercase text-white">
        {canCreateEvents ? "Create an event" : "Suggest an event"}
      </p>
    </Link>
  );
}

function PlusSvg(): JSX.Element {
  return (
    <svg
      fill="#10b981"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      width="100px"
      height="100px"
      viewBox="0 0 45.402 45.402"
    >
      <g>
        <path
          d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141
		c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27
		c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435
		c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"
        />
      </g>
    </svg>
  );
}
