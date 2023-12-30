import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { type PropsWithChildren } from "react";
import AuthButton from "./AuthButton";
import { type NavbarProps, NavbarTabs } from "./Navbar";

export default function DefaultNavbar(props: PropsWithChildren<NavbarProps>) {
  return (
    <nav className="fixed z-50 hidden w-screen flex-row items-center justify-between px-12 py-8 pr-20 lg:flex">
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
      </div>
    </nav>
  );
}
