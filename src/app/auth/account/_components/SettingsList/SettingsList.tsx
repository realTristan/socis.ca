import { type User } from "next-auth";
import ChangeNameField from "./ChangeNameField";

interface SettingsListProps {
  user: User;
}
export default function SettingsList(props: SettingsListProps): JSX.Element {
  const { user } = props;

  return (
    <div className="my-4 flex flex-col items-start justify-start gap-3">
      <ChangeNameField user={user} />
    </div>
  );
}
