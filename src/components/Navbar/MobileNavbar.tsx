import { cn } from "@/utils/cn";
import { useState } from "react";
import MobileMenuBars from "./MenuBars";
import { type NavbarProps } from "./Navbar";
import Image from "next/image";
import Link from "next/link";
import AuthButton from "./AuthButton";

/**
 * Mobile navbar component
 * @param props Navbar props
 * @returns JSX.Element
 */
export default function MobileNavbar(props: NavbarProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={cn("flex flex-col", props.className)}>
      <Image
        src="/images/logo.png"
        alt="..."
        width={70}
        height={70}
        className="btn absolute left-6 top-6 duration-300 ease-in-out"
        priority={true}
      />

      <MobileMenuBars open={open} setOpen={setOpen} className="z-[70]" />

      {open && (
        <div
          className={cn(
            "fixed left-0 top-0 z-[50] flex h-auto w-screen flex-col border-b border-b-emerald-500 bg-[#1a1a1a] px-4 py-8",
            props.className,
          )}
        >
          <Link
            href="/#"
            className={cn(
              "btn w-full transform cursor-pointer px-5 py-3 text-sm font-normal tracking-widest text-emerald-500 duration-300 ease-in-out hover:translate-x-4",
            )}
          >
            HOME
          </Link>
          <Link
            href="/events"
            className={cn(
              "btn w-full transform cursor-pointer px-5 py-3 text-sm font-normal tracking-widest text-emerald-500 duration-300 ease-in-out hover:translate-x-4",
            )}
          >
            EVENTS
          </Link>
          <Link
            href="/about"
            className={cn(
              "btn w-full transform cursor-pointer px-5 py-3 text-sm font-normal tracking-widest text-emerald-500 duration-300 ease-in-out hover:translate-x-4",
            )}
          >
            ABOUT US
          </Link>
          <Link
            href="/membership"
            className={cn(
              "btn mb-4 w-full transform cursor-pointer px-5 py-3 text-sm font-normal tracking-widest text-emerald-500 duration-300 ease-in-out hover:translate-x-4",
            )}
          >
            MEMBERSHIP
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
      )}
    </div>
  );
}
