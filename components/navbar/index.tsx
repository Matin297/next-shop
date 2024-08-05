import Cart from "./cart";
import Link from "next/link";
import Image from "next/image";
import Profile from "./profile";
import { Suspense } from "react";
import LogoImage from "@/assets/logo.png";

export default function Navbar() {
  return (
    <header className="border-b bg-base-100">
      <nav className="navbar m-auto max-w-7xl gap-2">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            <Image src={LogoImage} className="h-10 w-10" alt="Matin Shop" />
            Matin Shop
          </Link>
        </div>
        <div className="flex-none gap-4">
          <Profile />
          <Suspense fallback={<span>...</span>}>
            <Cart />
          </Suspense>
        </div>
      </nav>
    </header>
  );
}
