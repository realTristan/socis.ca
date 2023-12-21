import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed z-50 flex w-screen flex-row items-center justify-between px-12 py-8 pr-20">
      <Image
        src="/images/logo.png"
        alt="..."
        width={100}
        height={100}
        className="btn duration-300 ease-in-out hover:scale-105"
      />
      <div className="flex flex-row items-center justify-center gap-24">
        <div className="btn group flex flex-col items-center justify-center gap-2">
          <Link
            href="/"
            className="text-2xl font-thin tracking-wider text-white duration-300 ease-in-out group-hover:scale-110"
          >
            EVENTS
          </Link>
          <span className="m-1 block h-px w-0 bg-white duration-300 ease-in-out group-hover:w-4/5"></span>
        </div>
        <div className="btn group flex flex-col items-center justify-center gap-2">
          <Link
            href="/"
            className="text-2xl font-thin tracking-wider text-white duration-300 ease-in-out group-hover:scale-110"
          >
            ABOUT
          </Link>
          <span className="m-1 block h-px w-0 bg-white duration-300 ease-in-out group-hover:w-4/5"></span>
        </div>
        <div className="btn group flex flex-col items-center justify-center gap-2">
          <Link
            href="/"
            className="text-2xl font-thin tracking-wider text-white duration-300 ease-in-out group-hover:scale-110"
          >
            MEET THE TEAM
          </Link>
          <span className="m-1 block h-px w-0 bg-white duration-300 ease-in-out group-hover:w-4/5"></span>
        </div>
      </div>
    </nav>
  );
}
