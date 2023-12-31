import Link from "next/link";

export default function InvalidPermissions(): JSX.Element {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-center text-3xl font-bold text-white lg:text-5xl">
        Invalid Permissions
      </h1>

      <div className="flex flex-col gap-5">
        <p className="text-center text-sm font-light text-white lg:text-base">
          You do not have access to this page. Try signing in with a different
          account.
        </p>
        <Link
          href="/auth/signin"
          className="rounded-lg border border-emerald-500 px-10 py-3 text-center font-thin text-white hover:bg-emerald-900/50"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
