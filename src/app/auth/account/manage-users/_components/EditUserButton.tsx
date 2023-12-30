import { type User } from "next-auth";
import { type Dispatch, type SetStateAction } from "react";
import { Status } from "../page";

interface EditUserButtonProps {
  userUpdateStatus: Status;
  editingCurrentUser: boolean | undefined;
  setEditingUser: Dispatch<SetStateAction<User | undefined>>;
  user: User;
}
export default function EditUserButton(
  props: EditUserButtonProps,
): JSX.Element {
  const { userUpdateStatus, editingCurrentUser, setEditingUser, user } = props;

  return (
    <button
      className="rounded-lg border border-emerald-500 px-4 py-2 text-base font-thin tracking-wider text-white duration-300 ease-in-out hover:bg-emerald-950/50 disabled:opacity-50"
      disabled={userUpdateStatus === Status.LOADING}
      onClick={() => {
        editingCurrentUser ? setEditingUser(undefined) : setEditingUser(user);
      }}
    >
      {editingCurrentUser ? "Cancel" : "Edit"}
    </button>
  );
}
