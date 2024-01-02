"use client";

import ErrorMessage from "@/components/ErrorMessage";
import { LoadingRelative } from "@/components/Loading";
import MainWrapper from "@/components/MainWrapper";
import SuccessMessage from "@/components/SuccessMessage";
import { base64decode, sha256 } from "@/lib/crypto";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

enum AuthStatus {
  IDLE,
  SUCCESS,
  LOADING,
  ERROR,
  INVALID_TOKEN,
}

async function isValidTokenApi(email: string, token: string) {
  const res = await fetch("/api/auth/token/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, token }),
  });

  return res.ok;
}

async function createUserApi(
  name: string,
  email: string,
  password: string,
  token: string,
) {
  const encryptedPassword = await sha256(password);
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password: encryptedPassword, token }),
  });

  return res.ok;
}

export default function SignUpPage() {
  const [status, setStatus] = useState(AuthStatus.IDLE);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const path = usePathname();

  useEffect(() => {
    if (status !== AuthStatus.IDLE) {
      return;
    }

    // Get the encoded data from the path
    const data = path.split("/").pop();
    if (!data) {
      return setStatus(AuthStatus.INVALID_TOKEN);
    }

    // Base64 decode the data
    const decodedData = base64decode(data);
    const { email: _email, token: _token } = JSON.parse(decodedData);
    setEmail(_email);
    setToken(_token);

    // Check if the provided token was create in the past 10 minutes
    isValidTokenApi(_email, _token).then((res) => {
      if (!res) {
        return setStatus(AuthStatus.INVALID_TOKEN);
      }
    });
  });

  // When the user submits the form, send an api request to create their account
  const [password, setPassword] = useState("");
  const [verificationPassword, setVerificationPassword] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus(AuthStatus.LOADING);

    // If the password is invalid, return an error
    if (password !== verificationPassword) {
      return setStatus(AuthStatus.ERROR);
    }

    // Send an api request to create the user's account
    const res = await createUserApi(name, email, password, token);
    res ? setStatus(AuthStatus.SUCCESS) : setStatus(AuthStatus.ERROR);
  };

  // Check if the token is valid. If not, return an error message to the user
  if (status === AuthStatus.INVALID_TOKEN) {
    return (
      <MainWrapper className="w-full gap-2">
        <h1 className="my-7 text-6xl font-thin uppercase text-white">
          INVALID TOKEN
        </h1>
        <ErrorMessage>
          The token provided is invalid or has expired.
        </ErrorMessage>
        <Link
          className="btn mt-2 rounded-lg border border-emerald-500 bg-primary px-10 py-3 text-base font-thin tracking-wider text-white duration-300 ease-in-out hover:bg-emerald-950/50"
          href="/auth/signup"
        >
          Sign up
        </Link>
      </MainWrapper>
    );
  }

  // Store whether the submission button should be disabled
  const disableSubmitButton =
    !password ||
    password !== verificationPassword ||
    status === AuthStatus.SUCCESS;

  // If the token is valid, return the password form
  return (
    <MainWrapper className="w-full gap-2">
      <form
        className="flex w-[30rem] flex-col gap-3 rounded-lg border border-secondary p-16"
        onSubmit={async (e) => await onSubmit(e)}
      >
        <h1 className="mb-2 text-4xl font-thin tracking-wider text-white">
          SIGN UP
        </h1>
        <input
          className="rounded-lg border border-emerald-500 bg-primary px-4 py-3 text-base font-thin tracking-wider text-white duration-300 ease-in-out focus:outline-none disabled:opacity-50"
          value={email}
          disabled={true}
        />
        <input
          className="rounded-lg border border-emerald-500 bg-primary px-4 py-3 text-base font-thin tracking-wider text-white duration-300 ease-in-out focus:outline-none disabled:opacity-50"
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="rounded-lg border border-emerald-500 bg-primary px-4 py-3 text-base font-thin tracking-wider text-white duration-300 ease-in-out focus:outline-none"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="rounded-lg border border-emerald-500 bg-primary px-4 py-3 text-base font-thin tracking-wider text-white duration-300 ease-in-out focus:outline-none"
          placeholder="Verify Password"
          type="password"
          value={verificationPassword}
          onChange={(e) => setVerificationPassword(e.target.value)}
        />

        {/* The submission button */}
        <button
          disabled={disableSubmitButton}
          className="btn mt-2 flex flex-col items-center justify-center rounded-lg border border-emerald-500 bg-primary px-10 py-3 text-base font-thin tracking-wider text-white duration-300 ease-in-out hover:bg-emerald-950/50 disabled:opacity-50"
        >
          {status === AuthStatus.LOADING ? (
            <LoadingRelative className="h-5 w-5" />
          ) : (
            <p>Sign up</p>
          )}
        </button>
        {/* If the inputted passwords don't match, return an error */}
        {password !== verificationPassword && (
          <ErrorMessage>Passwords do not match.</ErrorMessage>
        )}

        {/* The sign up was a success - they can now sign in */}
        {status === AuthStatus.SUCCESS && (
          <SuccessMessage>
            Your account has been created.{" "}
            <a href="/auth/signin" className="underline hover:text-green-600">
              Sign in
            </a>
          </SuccessMessage>
        )}

        {/* An error has occurred - most likely an internal error */}
        <ErrorMessage>
          {status === AuthStatus.ERROR &&
            "Something went wrong. Please try again."}
        </ErrorMessage>
      </form>
    </MainWrapper>
  );
}
