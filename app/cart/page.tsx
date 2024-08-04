import { Suspense } from "react";
import CartItemsTable from "@/components/cart/items-table";

export default function Cart() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Cart</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <CartItemsTable />
      </Suspense>
    </section>
  );
}
