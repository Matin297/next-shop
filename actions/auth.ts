"use server";

import { signIn, signOut } from "@/auth";

export async function signInAction() {
  return signIn("github");
}

export async function signOutAction() {
  return signOut();
}
