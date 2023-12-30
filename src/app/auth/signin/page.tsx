"use client";

import MainWrapper from "@/components/MainWrapper";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { BrowserView } from "react-device-detect";
import { signIn } from "next-auth/react";
import { LoadingRelative } from "@/components/Loading";

enum SignInStatus {
  IDLE,
  SUCCESS,
  ERROR,
  LOADING,
}

export default function LoginPage(): JSX.Element {
  return (
    <>
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
  const [status, setStatus] = useState(SignInStatus.IDLE);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setStatus(SignInStatus.LOADING);

    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/account",
    });
  }

  return (
    <form
      className="flex w-[30rem] flex-col gap-3 rounded-lg border border-secondary p-16"
      onSubmit={async (e) => await onSubmit(e)}
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
        href="/auth/reset-password"
        className="btn text-sm text-emerald-500 hover:underline"
      >
        Forgot Password?
      </Link>
      <button
        className="btn mt-2 flex flex-col items-center justify-center rounded-lg border border-emerald-500 bg-primary px-10 py-3 text-base font-thin tracking-wider text-white duration-300 ease-in-out hover:bg-emerald-950/50 disabled:opacity-50"
        type="submit"
        disabled={status === SignInStatus.LOADING}
      >
        {status === SignInStatus.LOADING ? (
          <LoadingRelative className="h-5 w-5" />
        ) : (
          <p>Sign in</p>
        )}
      </button>
      <p className="text-center text-sm text-white">
        Don't have an account?{" "}
        <Link
          href="/auth/signup"
          className="btn text-emerald-500 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
