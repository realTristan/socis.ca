import ErrorMessage from "@/components/ErrorMessage";
import LoadingCenter from "@/components/Loading";
import MainWrapper from "@/components/MainWrapper";
import Navbar from "@/components/Navbar";
import PageHead from "@/components/PageHead";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import { useRouter } from "next/router";
import { useState } from "react";
import { BrowserView } from "react-device-detect";

enum RESET_PASSWORD_STATUS {
  IDLE,
  LOADING,
  ERROR,
  CODE_SENT,
  INVALID_CODE,
  SUCCESS,
}

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

async function updatePassword(
  code: string,
  email: string,
  password: string,
): Promise<Response> {
  const res = await fetch("/api/password/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, email, password }),
  });

  return res;
}

export default function ForgotPasswordPage(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState(RESET_PASSWORD_STATUS.IDLE);

  const router = useRouter();

  return (
    <>
      <PageHead
        title="SOCIS | Events"
        description="The Society of Computing and Information Science (SOCIS) is a student organization at the University of Guelph."
      />

      <Navbar underlined={null} />

      <BrowserView>
        <CustomCursor />
      </BrowserView>

      <MainWrapper>
        <div className="flex w-[30rem] flex-col gap-3 rounded-lg border border-secondary p-16">
          {status !== RESET_PASSWORD_STATUS.LOADING && (
            <>
              <input
                className="rounded-lg border border-emerald-500 bg-primary px-4 py-3 text-base font-thin tracking-wider text-white duration-300 ease-in-out focus:outline-none disabled:opacity-50"
                placeholder="Enter your email address"
                type="email"
                value={email}
                disabled={status === RESET_PASSWORD_STATUS.CODE_SENT}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="rounded-lg border border-emerald-500 bg-primary px-4 py-3 text-base font-thin tracking-wider text-white duration-300 ease-in-out focus:outline-none disabled:opacity-50"
                placeholder="New password"
                type="password"
                value={password}
                disabled={status === RESET_PASSWORD_STATUS.CODE_SENT}
                onChange={(e) => setPassword(e.target.value)}
              />

              {status === RESET_PASSWORD_STATUS.CODE_SENT && (
                <input
                  className="rounded-lg border border-emerald-500 bg-primary px-4 py-3 text-base font-thin tracking-wider text-white duration-300 ease-in-out focus:outline-none"
                  placeholder="Password reset code"
                  type="text"
                  onChange={(e) => setCode(e.target.value)}
                />
              )}

              <button
                className="btn mt-2 rounded-lg border border-emerald-500 bg-primary px-10 py-3 text-base font-thin tracking-wider text-white duration-300 ease-in-out hover:bg-emerald-950/50"
                onClick={async () => {
                  const prevStatus = status;
                  setStatus(RESET_PASSWORD_STATUS.LOADING);

                  if (prevStatus === RESET_PASSWORD_STATUS.IDLE) {
                    const res = await sendEmail(email);
                    res.ok
                      ? setStatus(RESET_PASSWORD_STATUS.CODE_SENT)
                      : setStatus(RESET_PASSWORD_STATUS.ERROR);
                  }

                  if (prevStatus === RESET_PASSWORD_STATUS.CODE_SENT) {
                    const res = await updatePassword(code, email, password);
                    res.ok
                      ? router.push("/login")
                      : setStatus(RESET_PASSWORD_STATUS.ERROR);
                  }
                }}
              >
                Reset password
              </button>
            </>
          )}

          {status === RESET_PASSWORD_STATUS.ERROR && (
            <ErrorMessage>
              <p>Something went wrong. Please try again.</p>
            </ErrorMessage>
          )}

          {status === RESET_PASSWORD_STATUS.INVALID_CODE && (
            <ErrorMessage>
              <p>Invalid code. Please try again.</p>
            </ErrorMessage>
          )}

          {status === RESET_PASSWORD_STATUS.SUCCESS && (
            <ErrorMessage>
              <p>Password reset successfully.</p>
            </ErrorMessage>
          )}

          {status === RESET_PASSWORD_STATUS.LOADING && <LoadingCenter />}
        </div>
      </MainWrapper>
    </>
  );
}
