import { Suspense } from "react";
import Cart from "./cart";
import Link from "next/link";
import Search from "./search";
import Image from "next/image";
import LogoImage from "@/assets/logo.png";

export default function Navbar() {
  return (
    <header className="border-b bg-base-100">
      <nav className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            <Image src={LogoImage} className="h-10 w-10" alt="Matin Shop" />
            Matin Shop
          </Link>
        </div>
        <div className="flex-none gap-2">
          <Search />
          <Suspense fallback={<span>...</span>}>
            <Cart />
          </Suspense>
        </div>
      </nav>
    </header>
  );
}
