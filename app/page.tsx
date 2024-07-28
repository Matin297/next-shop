import { Suspense } from "react";
import ProductList from "@/components/home/product-list";

export default async function Home() {
  return (
    <>
      <h2 className="mb-4 text-xl font-semibold">Products</h2>
      <Suspense fallback={<p>loading...</p>}>
        <ProductList />
      </Suspense>
    </>
  );
}
