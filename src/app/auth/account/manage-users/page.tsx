"use client";

import MainWrapper from "@/components/MainWrapper";
import Navbar from "@/components/Navbar/Navbar";
import CustomCursor from "@/components/dynamic/CustomerCursor";
import { BrowserView } from "react-device-detect";
import { SessionProvider, useSession } from "next-auth/react";
import LoadingCenter from "@/components/Loading";
import Background from "@/components/Background";
import { hasPermissions } from "@/lib/permissions";
import InvalidSession from "../_components/InvalidSession";
import DarkOverlay from "../_components/DarkOverlay";
import { Permission } from "@/types/types";
import InvalidPermissions from "../_components/InvalidPermissions";
import { type User } from "next-auth";
import { useEffect, useState } from "react";
import { updateUserPermissions, updateUsersArray } from "./_utils/permissions";
import UserInfo from "./_components/UserInfo";
import SaveChangesButton from "./_components/SaveChangesButton";
import SearchInput from "./_components/SearchInput";
import PermissionsList from "./_components/PermissionsList";
import EditUserButton from "./_components/EditUserButton";
import { Status } from "./_utils/status";

// Homepage component
export default function ManageUsersPage() {
  return (
    <>
      <Navbar underlined={null} showAuthButton={true} className="z-40" />
      <Background text="ACCOUNT" animated={false} className="-z-20" />
      <DarkOverlay />

      <BrowserView>
        <CustomCursor />
      </BrowserView>

      <SessionProvider>
        <Main />
      </SessionProvider>
    </>
  );
}

async function fetchUsersApi(): Promise<User[]> {
  return await fetch("/api/users").then((res) =>
    res.json().then((data) => data.users),
  );
}

function Main(): JSX.Element {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [fetchStatus, setFetchStatus] = useState<Status>(Status.LOADING);
  const [search, setSearch] = useState<string>("");
  const [editingUser, setEditingUser] = useState<User>();
  const [userUpdateStatus, setUserUpdateStatus] = useState<Status>(Status.IDLE);

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    setFetchStatus(Status.LOADING);

    fetchUsersApi()
      .then((users) => {
        setUsers(users || []);
        setFetchStatus(Status.SUCCESS);
      })
      .catch((_) => setFetchStatus(Status.ERROR));
  }, [status]);

  if (status === "loading" || fetchStatus === Status.LOADING) {
    return <LoadingCenter />;
  }

  if (status === "unauthenticated" || !session) {
    return (
      <MainWrapper>
        <InvalidSession />
      </MainWrapper>
    );
  }

  // If the user doesn't have the ADMIN permission, redirect them to the account page
  if (!hasPermissions(session.user, [Permission.ADMIN])) {
    return (
      <MainWrapper>
        <InvalidPermissions />
      </MainWrapper>
    );
  }

  return (
    <MainWrapper className="z-40 w-full items-start justify-start gap-4 p-20 pt-52">
      <h1 className="text-center text-5xl font-bold text-white">
        Manage users
      </h1>
      <p className="text-center text-sm font-light text-white/80">
        {session?.user?.email ?? "user"}.
      </p>
      <SearchInput setSearch={setSearch} />

      {fetchStatus === Status.SUCCESS &&
        users.map((user) => {
          const lowerName = user.name.toLowerCase();
          const lowerEmail = user.email.toLowerCase();
          const editingCurrentUser = editingUser?.id === user.id;

          // If the user doesn't match the search query, don't render them
          if (!lowerName.includes(search) && !lowerEmail.includes(search)) {
            return <></>;
          }

          return (
            <div
              key={user.id}
              className="flex w-full flex-col items-start justify-start gap-2 rounded-md border border-emerald-500 p-3"
            >
              <div className="flex w-full flex-row items-center justify-between">
                <UserInfo user={user} />
                <EditUserButton
                  user={user}
                  setEditingUser={setEditingUser}
                  editingCurrentUser={editingCurrentUser}
                  userUpdateStatus={userUpdateStatus}
                />
              </div>

              {editingUser?.id === user.id && (
                <div className="mt-4 flex w-full flex-row items-center justify-between">
                  <PermissionsList
                    session={session}
                    user={user}
                    onChange={(e, permission) => {
                      e.target.checked && !user.permissions.includes(permission)
                        ? user.permissions.push(permission)
                        : user.permissions.splice(
                            user.permissions.indexOf(permission),
                            1,
                          );

                      setEditingUser(user);
                    }}
                  />
                  <SaveChangesButton
                    userUpdateStatus={userUpdateStatus}
                    onClick={async () => {
                      setUserUpdateStatus(Status.LOADING);

                      const adminSecret = session.user.secret;
                      const newPermissions = user.permissions;
                      const res = await updateUserPermissions(
                        adminSecret,
                        editingUser,
                        newPermissions,
                      );

                      if (!res.ok) {
                        return setUserUpdateStatus(Status.ERROR);
                      }

                      setUsers(
                        updateUsersArray(users, editingUser.id, newPermissions),
                      );

                      setEditingUser(undefined);
                      setUserUpdateStatus(Status.IDLE);
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
    </MainWrapper>
  );
}
