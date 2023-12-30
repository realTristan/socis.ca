"use client";

import ErrorMessage from "@/components/ErrorMessage";
import { LoadingRelative } from "@/components/Loading";
import MainWrapper from "@/components/MainWrapper";
import Navbar from "@/components/Navbar/Navbar";
import SuccessMessage from "@/components/SuccessMessage";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import { base64encode } from "@/lib/crypto";
import { useState } from "react";
import { BrowserView } from "react-device-detect";

enum SignUpStatus {
  IDLE,
  SUCCESS,
  ERROR,
  USER_EXISTS,
  LOADING,
}

function userAlreadyExistsApi(email: string) {
  const encodedEmail = base64encode(email);
  return fetch(`/api/users/email/${encodedEmail}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
}

function sendEmailApi(email: string) {
  return fetch("/api/auth/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
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
  // States for email and password
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(SignUpStatus.IDLE);

  // onSubmit function
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus(SignUpStatus.LOADING);

    // Check if the user already exists
    const userResponse = await userAlreadyExistsApi(email);
    if (userResponse.ok) {
      // If the user already exists, return an error
      return setStatus(SignUpStatus.USER_EXISTS);
    }

    // Send an api request to send a verification email to the provided mail address
    const emailResponse = await sendEmailApi(email);
    emailResponse.ok // If the response is ok, set the status to success, else to error
      ? setStatus(SignUpStatus.SUCCESS)
      : setStatus(SignUpStatus.ERROR);
  };

  return (
    <MainWrapper className="w-full gap-2">
      <form
        className="flex w-[30rem] flex-col gap-3 rounded-lg border border-secondary p-16"
        onSubmit={onSubmit}
      >
        <h1 className="mb-2 text-4xl font-thin tracking-wider text-white">
          SIGN UP
        </h1>
        <input
          className="rounded-lg border border-emerald-500 bg-primary px-4 py-3 text-base font-thin tracking-wider text-white duration-300 ease-in-out focus:outline-none"
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="btn mt-2 flex flex-col items-center justify-center rounded-lg border border-emerald-500 bg-primary px-10 py-3 text-base font-thin tracking-wider text-white duration-300 ease-in-out hover:bg-emerald-950/50 disabled:opacity-50"
          type="submit"
          disabled={status === SignUpStatus.LOADING}
        >
          {status === SignUpStatus.LOADING ? (
            <LoadingRelative className="h-5 w-5" />
          ) : (
            <p>Sign up</p>
          )}
        </button>
        {/* The sign up was a success - they must check their email for verification */}
        {status === SignUpStatus.SUCCESS && (
          <SuccessMessage>
            An email has been sent to {email}. Check your inbox for a link to
            create your account.
          </SuccessMessage>
        )}

        {/* An error has occurred - most likely an internal error */}
        {status === SignUpStatus.ERROR && (
          <ErrorMessage>An error has occurred. Please try again.</ErrorMessage>
        )}

        {/* The user already exists - they must sign in to continue */}
        {status === SignUpStatus.USER_EXISTS && (
          <ErrorMessage>
            An user with this email already exists.{" "}
            <a href="/auth/signin" className="underline">
              Sign in
            </a>
          </ErrorMessage>
        )}
      </form>
    </MainWrapper>
  );
}
