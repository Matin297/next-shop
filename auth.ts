import NextAuth from "next-auth";
import db from "@/prisma/client";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  adapter: PrismaAdapter(db),
});
