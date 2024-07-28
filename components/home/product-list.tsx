import { getProducts } from "@/lib/data";
import ProductCard from "@/components/home/product-card";

export default async function ProductList() {
  const products = await getProducts();

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </ul>
  );
}
