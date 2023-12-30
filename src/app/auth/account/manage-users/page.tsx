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
import { type Optional, Permission } from "@/types/types";
import InvalidPermissions from "../_components/InvalidPermissions";
import { type User } from "next-auth";
import { useEffect, useState } from "react";
import { updateUserPermissions, updateUsersArray } from "./_utils/permissions";
import UserInfo from "./_components/UserInfo";
import SaveChangesButton from "./_components/SaveChangesButton";
import SearchInput from "./_components/SearchInput";
import PermissionsList from "./_components/PermissionsList";
import EditUserButton from "./_components/EditUserButton";
import { Status } from "../../../../lib/status";
import { stobj } from "@/lib/state";

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

  const users = stobj(useState<User[]>([]));
  const fetchStatus = stobj(useState<Status>(Status.IDLE));
  const search = stobj(useState<string>(""));
  const editingUser = stobj(useState<Optional<User>>());
  const userUpdateStatus = stobj(useState<Status>(Status.IDLE));

  useEffect(() => {
    fetchStatus.set(Status.LOADING);

    if (status !== "authenticated") {
      return;
    }

    fetchUsersApi().then((_users) => {
      users.set(_users);
      fetchStatus.set(Status.SUCCESS);
    });
  }, [status]);

  if (status === "loading" || fetchStatus.value === Status.LOADING) {
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
      <SearchInput search={search} />

      {fetchStatus.value === Status.SUCCESS &&
        users.value.map((_user) => {
          const lowerName = _user.name.toLowerCase();
          const lowerEmail = _user.email.toLowerCase();

          // If the user doesn't match the search query, don't render them
          if (
            !lowerName.includes(search.value) &&
            !lowerEmail.includes(search.value)
          ) {
            return <></>;
          }

          return (
            <div
              key={_user.id}
              className="flex w-full flex-col items-start justify-start gap-2 rounded-md border border-emerald-500 p-3"
            >
              <div className="flex w-full flex-row items-center justify-between">
                <UserInfo user={_user} />
                <EditUserButton
                  user={_user}
                  editingUser={editingUser}
                  userUpdateStatus={userUpdateStatus.value}
                />
              </div>

              {editingUser.value?.id === _user.id && (
                <div className="mt-4 flex w-full flex-row items-center justify-between">
                  <PermissionsList
                    session={session}
                    user={_user}
                    onChange={(e, permission) => {
                      e.target.checked &&
                      !_user.permissions.includes(permission)
                        ? _user.permissions.push(permission)
                        : _user.permissions.splice(
                            _user.permissions.indexOf(permission),
                            1,
                          );

                      editingUser.set(_user);
                    }}
                  />
                  <SaveChangesButton
                    userUpdateStatus={userUpdateStatus.value}
                    onClick={async () => {
                      userUpdateStatus.set(Status.LOADING);

                      if (!editingUser.value) {
                        return userUpdateStatus.set(Status.ERROR);
                      }

                      const adminSecret = session.user.secret;
                      const newPermissions = _user.permissions;
                      const res = await updateUserPermissions(
                        adminSecret,
                        editingUser.value,
                        newPermissions,
                      );

                      if (!res.ok) {
                        return userUpdateStatus.set(Status.ERROR);
                      }

                      users.set(
                        updateUsersArray(
                          users.value,
                          editingUser.value.id,
                          newPermissions,
                        ),
                      );

                      editingUser.set(undefined);
                      userUpdateStatus.set(Status.SUCCESS);
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
