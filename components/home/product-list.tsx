import { getProducts } from "@/lib/data";
import ProductCard from "@/components/home/product-card";

interface ProductListProps {
  query?: string;
}

export default async function ProductList({ query }: ProductListProps) {
  const products = await getProducts({ query });

  if (products.length === 0) {
    return <p className="text-center">No result...</p>;
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </ul>
  );
}
