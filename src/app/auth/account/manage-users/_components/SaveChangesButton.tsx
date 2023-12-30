import { LoadingRelative } from "@/components/Loading";
import { Status } from "../../../../../lib/status";

interface SaveChangesButtonProps {
  onClick: () => Promise<void>;
  userUpdateStatus: Status;
}
export default function SaveChangesButton(
  props: SaveChangesButtonProps,
): JSX.Element {
  const { onClick, userUpdateStatus } = props;

  return (
    <button
      className="rounded-lg border border-emerald-500 px-4 py-2 text-base font-thin tracking-wider text-white duration-300 ease-in-out hover:bg-emerald-950/50"
      disabled={userUpdateStatus === Status.LOADING}
      onClick={async () => await onClick()}
    >
      {userUpdateStatus === Status.LOADING ? (
        <LoadingRelative className="h-5 w-5" />
      ) : (
        <p>Save changes</p>
      )}
    </button>
  );
}
