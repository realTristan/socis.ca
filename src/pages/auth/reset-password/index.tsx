import ErrorMessage from "@/components/ErrorMessage";
import LoadingCenter from "@/components/Loading";
import MainWrapper from "@/components/MainWrapper";
import Navbar from "@/components/Navbar";
import PageHead from "@/components/PageHead";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import { Status } from "@/lib/types";
import { useState } from "react";
import { BrowserView } from "react-device-detect";

async function sendEmail(email: string): Promise<Response> {
  const res = await fetch("/api/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return res;
}

export default function ResetPasswordPage(): JSX.Element {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(Status.IDLE);

  if (status === Status.LOADING) {
    return <LoadingCenter />;
  }

  return (
    <>
      <PageHead
        title="SOCIS | Password Reset"
        description="The Society of Computing and Information Science (SOCIS) is a student organization at the University of Guelph."
      />

      <Navbar underlined={null} />

      <BrowserView>
        <CustomCursor />
      </BrowserView>

      <MainWrapper>
        <div className="flex w-[30rem] flex-col gap-3 rounded-lg border border-secondary p-16">
          <input
            disabled={status === Status.SUCCESS}
            className="rounded-lg border border-emerald-500 bg-primary px-4 py-3 text-base font-thin tracking-wider text-white duration-300 ease-in-out focus:outline-none disabled:opacity-50"
            placeholder="Enter your email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            disabled={status === Status.SUCCESS}
            className="btn mt-2 rounded-lg border border-emerald-500 bg-primary px-10 py-3 text-base font-thin tracking-wider text-white duration-300 ease-in-out hover:bg-emerald-950/50 disabled:opacity-50"
            onClick={async () => {
              setStatus(Status.LOADING);

              const res = await sendEmail(email);
              res.ok ? setStatus(Status.SUCCESS) : setStatus(Status.ERROR);
            }}
          >
            Reset password
          </button>

          {status === Status.SUCCESS && (
            <div className="w-full">
              <h1 className="text-emerald-500">
                Email sent to <span className="underline">{email}</span>. Please
                check your inbox for the password reset link.
              </h1>
            </div>
          )}

          {status === Status.ERROR && (
            <ErrorMessage>
              <p>Something went wrong. Please try again.</p>
            </ErrorMessage>
          )}
        </div>
      </MainWrapper>
    </>
  );
}
