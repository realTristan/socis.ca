import ErrorMessage from "@/components/ErrorMessage";
import LoadingCenter from "@/components/Loading";
import MainWrapper from "@/components/MainWrapper";
import Navbar from "@/components/Navbar";
import PageHead from "@/components/PageHead";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import { base64decode } from "@/lib/crypto";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BrowserView } from "react-device-detect";

enum ResetPasswordStatus {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR,
  VERIFYING_CODE,
  INVALID_CODE,
}

async function updatePassword(
  code: string,
  email: string,
  password: string,
): Promise<Response> {
  const res = await fetch("/api/password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, email, password }),
  });

  return res;
}

async function isValidResetCode(
  code: string,
  email: string,
): Promise<Response> {
  const res = await fetch("/api/password-reset/verify-code", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, email }),
  });

  return res;
}

export default function ResetPasswordPageWithData() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState(ResetPasswordStatus.VERIFYING_CODE);

  const router = useRouter();
  const { data: unparsedData } = router.query;

  useEffect(() => {
    if (!unparsedData || typeof unparsedData !== "string") {
      setStatus(ResetPasswordStatus.INVALID_CODE);
      return;
    }

    const decodedData = base64decode(unparsedData);
    const data = JSON.parse(decodedData);

    isValidResetCode(data.code, data.email).then((res) => {
      if (!res.ok) {
        setStatus(ResetPasswordStatus.INVALID_CODE);
      }

      setEmail(data.email);
      setCode(data.code);
      setStatus(ResetPasswordStatus.IDLE);
    });
  }, [unparsedData]);

  if (
    status === ResetPasswordStatus.VERIFYING_CODE ||
    status === ResetPasswordStatus.LOADING
  ) {
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
        {status === ResetPasswordStatus.INVALID_CODE ? (
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

                const res = await updatePassword(code, email, password);
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
