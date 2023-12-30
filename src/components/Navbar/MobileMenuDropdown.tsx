import { cn } from "@/utils/cn";
import Link from "next/link";
import AuthButton from "./AuthButton";
import { NavbarProps } from "./Navbar";

/**
 * Mobile menu dropdown component
 * @param props Mobile menu dropdown props
 * @returns JSX.Element
 */
export default function MobileMenuDropDown(props: NavbarProps): JSX.Element {
  return (
    <div
      className={cn(
        "fixed left-0 top-0 flex h-auto w-screen flex-col bg-primary px-4 py-8",
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
        href="/trips-and-tickets"
        className={cn(
          "btn w-full transform cursor-pointer px-5 py-3 text-sm font-normal tracking-widest text-emerald-500 duration-300 ease-in-out hover:translate-x-4",
        )}
      >
        EVENTS
      </Link>
      <Link
        href="/about-us"
        className={cn(
          "btn w-full transform cursor-pointer px-5 py-3 text-sm font-normal tracking-widest text-emerald-500 duration-300 ease-in-out hover:translate-x-4",
        )}
      >
        ABOUT US
      </Link>
      <Link
        href="/contact"
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
  );
}
