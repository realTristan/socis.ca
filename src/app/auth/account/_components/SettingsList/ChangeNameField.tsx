import ErrorMessage from "@/components/ErrorMessage";
import { LoadingRelative } from "@/components/Loading";
import SuccessMessage from "@/components/SuccessMessage";
import { type User } from "next-auth";
import { useState } from "react";

enum ChangeNameStatus {
  IDLE,
  LOADING,
  ERROR,
  SUCCESS,
}

interface ChangeNameFieldProps {
  user: User;
}
export default function ChangeNameField(
  props: ChangeNameFieldProps,
): JSX.Element {
  const { user } = props;

  const [name, setName] = useState(user.name);
  const [status, setStatus] = useState(ChangeNameStatus.IDLE);

  function changeNameApi(name: string) {
    return fetch("/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.secret,
      },
      body: JSON.stringify({
        userId: user.id,
        data: {
          name,
        },
      }),
    });
  }

  return (
    <div className="flex flex-col items-start justify-start gap-3">
      <form
        className="flex flex-col items-start justify-start gap-3"
        onSubmit={async (e) => {
          e.preventDefault();

          setStatus(ChangeNameStatus.LOADING);

          const res = await changeNameApi(name);
          if (res.ok) {
            setStatus(ChangeNameStatus.SUCCESS);
            return window.location.reload();
          }

          setStatus(ChangeNameStatus.ERROR);
        }}
      >
        <div className="flex flex-row items-end justify-center gap-2">
          <div className="flex flex-col gap-2">
            <label className="text-white">Change Username</label>
            <input
              maxLength={50}
              minLength={1}
              type="text"
              name="name"
              className="rounded-lg border border-emerald-500 bg-transparent px-4 py-2 text-base font-thin tracking-wider text-white duration-300 ease-in-out focus:outline-none"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="h-fit rounded-lg border border-emerald-500 px-4 py-2 text-base font-thin tracking-wider text-white duration-300 ease-in-out hover:bg-emerald-950/50"
          >
            {status === ChangeNameStatus.LOADING ? (
              <LoadingRelative className="h-6 w-6" />
            ) : (
              "Save"
            )}
          </button>
        </div>

        {status === ChangeNameStatus.SUCCESS && (
          <SuccessMessage>
            <p>Successfully changed username to {name}</p>
          </SuccessMessage>
        )}

        {status === ChangeNameStatus.ERROR && (
          <ErrorMessage>
            <p>Failed to change username</p>
          </ErrorMessage>
        )}
      </form>
    </div>
  );
}
