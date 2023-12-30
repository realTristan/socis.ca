import { cn } from "@/utils/cn";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { LoadingRelative } from "./Loading";
import { PropsWithChildren } from "react";

export enum NavbarTabs {
  HOME,
  EVENTS,
  ABOUT,
  MEMBERSHIP,
}

interface NavbarProps {
  className?: string;
  showAuthButton?: boolean;
  underlined: NavbarTabs | null;
}

export default function Navbar(props: PropsWithChildren<NavbarProps>) {
  return (
    <nav className="fixed z-50 flex w-screen flex-row items-center justify-between px-12 py-8 pr-20">
      <Image
        src="/images/logo.png"
        alt="..."
        width={100}
        height={100}
        className="btn duration-300 ease-in-out hover:scale-105"
        priority={true}
      />
      <div className="flex flex-row items-center justify-center gap-16">
        <Link
          href="/"
          className="btn group flex flex-col items-center justify-center gap-2"
        >
          <p className="text-xl font-thin tracking-wider text-white duration-300 ease-in-out group-hover:scale-110">
            HOME
          </p>
          <span
            className={cn(
              "m-1 block h-px bg-emerald-400 duration-300 ease-in-out group-hover:w-3/5",
              props.underlined === NavbarTabs.HOME ? "w-3/5" : "w-0",
            )}
          ></span>
        </Link>
        <Link
          href="/events"
          className="btn group flex flex-col items-center justify-center gap-2"
        >
          <p className="text-xl font-thin tracking-wider text-white duration-300 ease-in-out group-hover:scale-110">
            EVENTS
          </p>
          <span
            className={cn(
              "m-1 block h-px bg-emerald-400 duration-300 ease-in-out group-hover:w-3/5",
              props.underlined === NavbarTabs.EVENTS ? "w-3/5" : "w-0",
            )}
          ></span>
        </Link>
        <Link
          href="/about"
          className="btn group flex flex-col items-center justify-center gap-2"
        >
          <p className="text-xl font-thin tracking-wider text-white duration-300 ease-in-out group-hover:scale-110">
            ABOUT US
          </p>
          <span
            className={cn(
              "m-1 block h-px bg-emerald-400 duration-300 ease-in-out group-hover:w-3/5",
              props.underlined === NavbarTabs.ABOUT ? "w-3/5" : "w-0",
            )}
          ></span>
        </Link>
        <Link
          href="/membership"
          className="btn group flex flex-col items-center justify-center gap-2"
        >
          <p className="text-xl font-thin tracking-wider text-white duration-300 ease-in-out group-hover:scale-110">
            MEMBERSHIP
          </p>
          <span
            className={cn(
              "m-1 block h-px bg-emerald-400 duration-300 ease-in-out group-hover:w-3/5",
              props.underlined === NavbarTabs.MEMBERSHIP ? "w-3/5" : "w-0",
            )}
          ></span>
        </Link>
        <SessionProvider>
          {props.showAuthButton ? (
            <AuthButton />
          ) : (
            <Link
              href="/auth/account"
              className="btn mb-3.5 flex flex-col items-center justify-center gap-2 rounded-lg border border-emerald-500 bg-primary px-5 py-3 hover:bg-emerald-900/50 disabled:opacity-50"
            >
              <p className="text-lg font-thin tracking-wider text-white duration-300 ease-in-out">
                ACCOUNT
              </p>
            </Link>
          )}
        </SessionProvider>
      </div>
    </nav>
  );
}

function AuthButton(): JSX.Element {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <button
        disabled={true}
        className="btn mb-3.5 flex flex-col items-center justify-center gap-2 rounded-lg border border-emerald-500 px-5 py-3 hover:bg-emerald-900/50 disabled:opacity-50"
      >
        <LoadingRelative className="h-5 w-5" />
      </button>
    );
  }

  if (status === "authenticated") {
    return (
      <button
        onClick={async () => {
          await signOut();
          window.location.href = "/auth/signin";
        }}
        className="btn mb-3.5 flex flex-col items-center justify-center gap-2 rounded-lg border border-emerald-500 px-5 py-3 hover:bg-emerald-900/50 disabled:opacity-50"
      >
        <p className="text-lg font-thin tracking-wider text-white duration-300 ease-in-out">
          SIGN OUT
        </p>
      </button>
    );
  }

  return (
    <Link
      href="/auth/signin"
      className="btn mb-3.5 flex flex-col items-center justify-center gap-2 rounded-lg border border-emerald-500 bg-primary px-5 py-3 hover:bg-emerald-900/50"
    >
      <p className="text-lg font-thin tracking-wider text-white duration-300 ease-in-out">
        EXEC LOGIN
      </p>
    </Link>
  );
}
