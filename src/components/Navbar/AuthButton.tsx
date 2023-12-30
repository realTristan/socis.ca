import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { LoadingRelative } from "../Loading";

export default function AuthButton(): JSX.Element {
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
      className="btn mb-3.5 flex flex-col items-center justify-center gap-2 rounded-lg border border-emerald-500 px-5 py-3 hover:bg-emerald-900/50"
    >
      <p className="text-lg font-thin tracking-wider text-white duration-300 ease-in-out">
        EXEC LOGIN
      </p>
    </Link>
  );
}
