import { Suspense } from "react";
import Search from "@/components/home/search";
import ProductList from "@/components/home/product-list";

interface HomePageProps {
  searchParams: {
    q?: string;
  };
}

export default async function Home(props: HomePageProps) {
  const query = props.searchParams.q;

  return (
    <section className="space-y-4">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <h2 className="text-xl font-semibold">Products</h2>
        <Search />
      </div>
      <Suspense fallback={<p>loading...</p>}>
        <ProductList query={query} />
      </Suspense>
    </section>
  );
}
