import { type User } from "next-auth";
import { Status } from "../../../../../lib/status";
import { type Optional } from "@/types/types";
import { type StateObject } from "@/lib/state";

interface EditUserButtonProps {
  userUpdateStatus: Status;
  editingUser: StateObject<Optional<User>>;
  user: User;
}
export default function EditUserButton(
  props: EditUserButtonProps,
): JSX.Element {
  const { userUpdateStatus, editingUser, user } = props;
  const isEditingCurrentUser = editingUser.value?.id === user.id;

  return (
    <button
      className="rounded-lg border border-emerald-500 px-4 py-2 text-base font-thin tracking-wider text-white duration-300 ease-in-out hover:bg-emerald-950/50 disabled:opacity-50"
      disabled={userUpdateStatus === Status.LOADING}
      onClick={() => {
        isEditingCurrentUser
          ? editingUser.set(undefined)
          : editingUser.set(user);
      }}
    >
      {isEditingCurrentUser ? "Cancel" : "Edit"}
    </button>
  );
}
