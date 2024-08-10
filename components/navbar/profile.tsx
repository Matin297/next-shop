import { auth } from "@/auth";
import Image from "next/image";
import { signInAction, signOutAction } from "@/actions/auth";
import FormSubmitButton from "@/components/form-submit-button";
import ProfilePicturePlaceholder from "@/assets/profile-pic-placeholder.png";

export default async function Profile() {
  const session = await auth();

  if (!session || !session.user?.id) {
    return (
      <form action={signInAction}>
        <FormSubmitButton className="btn-outline btn-sm">
          SignIn
        </FormSubmitButton>
      </form>
    );
  }

  const { user } = session;

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
            alt={user.name || "Unknown"}
            src={user.image || ProfilePicturePlaceholder}
          />
        </div>
        <div
          tabIndex={0}
          className="menu dropdown-content z-[1] gap-4 rounded-box bg-base-100 p-4 shadow"
        >
          <div>Signed in as:</div>
          <div>{user?.email}</div>
        </div>
      </div>
    </>
  );
}
