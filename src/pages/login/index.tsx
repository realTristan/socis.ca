import MainWrapper from "@/components/MainWrapper";
import Navbar from "@/components/Navbar";
import PageHead from "@/components/PageHead";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { BrowserView } from "react-device-detect";

export default function LoginPage(): JSX.Element {
  return (
    <>
      <PageHead
        title="SOCIS | Login"
        description="The Society of Computing and Information Systems (SOCIS) is a student organization at the University of Guelph."
      />

      <Navbar underlined={null} />

      <BrowserView>
        <CustomCursor />
      </BrowserView>

      <MainWrapper>
        <Components />
      </MainWrapper>
    </>
  );
}

function Components(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form
      className="border-secondary flex w-[30rem] flex-col gap-3 rounded-lg border p-16"
      onSubmit={onSubmit}
    >
      <h1 className="mb-2 text-4xl font-thin tracking-wider text-white">
        EXEC LOGIN
      </h1>
      <input
        className="rounded-lg border border-emerald-500 bg-primary px-4 py-3 text-base font-thin tracking-wider text-white duration-300 ease-in-out focus:outline-none"
        placeholder="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="rounded-lg border border-emerald-500 bg-primary px-4 py-3 text-base font-thin tracking-wider text-white duration-300 ease-in-out focus:outline-none"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Link
        href="/login/forgot-password"
        className="btn text-sm text-emerald-500 hover:underline"
      >
        Forgot Password?
      </Link>
      <button
        className="btn mt-2 rounded-lg border border-emerald-500 bg-primary px-10 py-3 text-base font-thin tracking-wider text-white duration-300 ease-in-out hover:bg-emerald-950/50"
        type="submit"
      >
        Login
      </button>
      <p className="text-center text-sm text-white">
        Don't have an account?{" "}
        <Link href="/signup" className="btn text-emerald-500 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
