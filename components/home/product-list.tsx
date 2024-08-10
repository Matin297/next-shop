import { getProducts } from "@/lib/data";
import Pagination from "@/components/pagination";
import { getTotalProductPages } from "@/lib/data";
import ProductCard from "@/components/home/product-card";

interface ProductListProps {
  page: number;
  query?: string;
}

export default async function ProductList({ query, page }: ProductListProps) {
  const [total, products] = await Promise.all([
    getTotalProductPages(),
    getProducts({ query, page }),
  ]);

  if (products.length === 0) {
    return <p className="text-center">No result...</p>;
  }

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </ul>
      {total > 1 && <Pagination total={total} current={page} pathname="/" />}
    </>
  );
}
