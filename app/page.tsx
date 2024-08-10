import { Suspense } from "react";
import Search from "@/components/home/search";
import ProductList from "@/components/home/product-list";

interface HomePageProps {
  searchParams: {
    q?: string;
    p?: string;
  };
}

export default async function Home(props: HomePageProps) {
  const query = props.searchParams.q;
  const page = Number(props.searchParams.p || "1");

  return (
    <section className="space-y-4">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <h2 className="text-xl font-semibold">Products</h2>
        <Search />
      </div>
      <Suspense fallback={<p>loading...</p>}>
        <ProductList page={page} query={query} />
      </Suspense>
    </section>
  );
}
