import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { getCart } from "@/lib/data";

export default async function Cart() {
  const cart = await getCart();

  return (
    <Link
      href="/cart"
      className="btn btn-circle btn-outline btn-primary btn-sm"
    >
      <div className="indicator">
        <ShoppingCart size={20} />
        {cart && cart.size > 0 && (
          <span className="badge indicator-item badge-sm">{cart.size}</span>
        )}
      </div>
    </Link>
  );
}
