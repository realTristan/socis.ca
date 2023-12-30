"use client";

import ErrorMessage from "@/components/ErrorMessage";
import LoadingCenter from "@/components/Loading";
import MainWrapper from "@/components/MainWrapper";
import Navbar from "@/components/Navbar/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import { base64decode, sha256 } from "@/lib/crypto";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrowserView } from "react-device-detect";

enum ResetPasswordStatus {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR,
  VERIFYING_TOKEN,
  INVALID_TOKEN,
}

async function updatePassword(
  token: string,
  email: string,
  password: string,
): Promise<Response> {
  const hashedPassword = await sha256(password);

  const res = await fetch("/api/password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, email, password: hashedPassword }),
  });

  return res;
}

async function isValidResetToken(
  token: string,
  email: string,
): Promise<Response> {
  const res = await fetch("/api/password-reset/token/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, email }),
  });

  return res;
}

export default function ResetPasswordPageWithData() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState(ResetPasswordStatus.VERIFYING_TOKEN);

  const path = usePathname();
  const unparsedData = path.split("/").pop();

  useEffect(() => {
    if (!unparsedData || typeof unparsedData !== "string") {
      setStatus(ResetPasswordStatus.INVALID_TOKEN);
      return;
    }

    const decodedData = base64decode(unparsedData);
    const data = JSON.parse(decodedData);

    isValidResetToken(data.token, data.email).then((res) => {
      if (!res.ok) {
        setStatus(ResetPasswordStatus.INVALID_TOKEN);
      }

      setEmail(data.email);
      setToken(data.token);
      setStatus(ResetPasswordStatus.IDLE);
    });
  }, [unparsedData]);

  if (
    status === ResetPasswordStatus.VERIFYING_TOKEN ||
    status === ResetPasswordStatus.LOADING
  ) {
    return <LoadingCenter />;
  }

  return (
    <>
      <Navbar underlined={null} />

      <BrowserView>
        <CustomCursor />
      </BrowserView>

      <MainWrapper>
        {status === ResetPasswordStatus.INVALID_TOKEN ? (
          <div className="flex w-[30rem] flex-col items-center justify-center gap-3 rounded-lg border border-secondary p-16">
            <h1 className="text-emerald-500">
              The password reset link is invalid.
            </h1>
          </div>
        ) : (
          <div className="flex w-[30rem] flex-col gap-3 rounded-lg border border-secondary p-16">
            <input
              className="rounded-lg border border-emerald-500 bg-primary px-4 py-3 text-base font-thin tracking-wider text-white duration-300 ease-in-out focus:outline-none disabled:opacity-50"
              placeholder="Enter your new password"
              type="password"
              disabled={status === ResetPasswordStatus.SUCCESS}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              disabled={status === ResetPasswordStatus.SUCCESS}
              className="btn mt-2 rounded-lg border border-emerald-500 bg-primary px-10 py-3 text-base font-thin tracking-wider text-white duration-300 ease-in-out hover:bg-emerald-950/50 disabled:opacity-50"
              onClick={async () => {
                setStatus(ResetPasswordStatus.LOADING);

                const res = await updatePassword(token, email, password);
                res.ok
                  ? setStatus(ResetPasswordStatus.SUCCESS)
                  : setStatus(ResetPasswordStatus.ERROR);
              }}
            >
              Reset password
            </button>

            {status === ResetPasswordStatus.SUCCESS && (
              <div className="w-full">
                <h1 className="text-emerald-500">
                  Password successfully reset for{" "}
                  <span className="underline">{email}</span>.
                </h1>
              </div>
            )}

            {status === ResetPasswordStatus.ERROR && (
              <ErrorMessage>
                <p>Something went wrong. Please try again.</p>
              </ErrorMessage>
            )}
          </div>
        )}
      </MainWrapper>
    </>
  );
}
