import { type User } from "next-auth";
import Image from "next/image";

export default function UserInfo({ user }: { user: User }) {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <Image
        src={user.image || "/images/default-pfp.png"}
        alt="..."
        className="rounded-full"
        width={50}
        height={50}
      />

      <div className="flex flex-col items-start justify-start">
        <h1 className="text-white">{user.name}</h1>
        <p className="text-sm font-thin text-white">{user.email}</p>
      </div>
    </div>
  );
}
