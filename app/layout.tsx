import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MatinShop",
  metadataBase: new URL("http://localhost:3000"),
  description: "Matin has created an awesome online shop for you, yay.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="mx-auto mb-4 min-h-screen max-w-6xl p-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
