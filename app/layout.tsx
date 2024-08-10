import "./globals.css";
import cn from "classnames";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MatinShop",
  metadataBase: new URL("https://next-shop-two-snowy.vercel.app"),
  description: "Matin has created an awesome online shop for you, yay.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={(cn(inter.className), "flex min-h-screen flex-col gap-4")}
      >
        <SessionProvider>
          <Navbar />
        </SessionProvider>
        <main className="mx-auto w-full max-w-6xl px-2">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
