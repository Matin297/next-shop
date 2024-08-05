"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { signInAction, signOutAction } from "@/actions/auth";
import FormSubmitButton from "@/components/form-submit-button";
import ProfilePicturePlaceholder from "@/assets/profile-pic-placeholder.png";

export default function Profile() {
  const { status, data } = useSession();

  if (status === "unauthenticated")
    return (
      <form action={signInAction}>
        <FormSubmitButton className="btn-outline btn-sm">
          SignIn
        </FormSubmitButton>
      </form>
    );

  if (status === "authenticated" && data.user) {
    return (
      <>
        <form action={signOutAction}>
          <FormSubmitButton className="btn-outline btn-sm w-full">
            SignOut
          </FormSubmitButton>
        </form>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button">
            <Image
              width={35}
              height={35}
              className="rounded-full"
              alt={data.user.name || "Unknown"}
              src={data.user.image || ProfilePicturePlaceholder}
            />
          </div>
          <div
            tabIndex={0}
            className="menu dropdown-content z-[1] gap-4 rounded-box bg-base-100 p-4 shadow"
          >
            <div>Signed in as:</div>
            <div>{data.user?.email}</div>
          </div>
        </div>
      </>
    );
  }

  return null;
}
