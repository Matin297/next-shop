import Image from "next/image";
import type { Metadata } from "next";
import { formatPrice } from "@/lib/utils";
import { getCachedProduct } from "@/lib/data";
import AddToCart from "@/components/add-to-cart";

interface ProductDetailsProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params: { id },
}: ProductDetailsProps): Promise<Metadata> {
  const product = await getCachedProduct(id);

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      url: "images.unsplash.com",
      images: [product.imageURL],
    },
  };
}

export default async function ProductDetails({
  params: { id },
}: ProductDetailsProps) {
  const product = await getCachedProduct(id);

  return (
    <div className="card bg-base-100 shadow-xl md:card-side">
      <figure className="basis-3/5">
        <Image
          priority
          alt={product.name}
          width={800}
          height={500}
          src={product.imageURL}
          className="h-[500px] w-full object-cover"
        />
      </figure>
      <div className="card-body basis-2/5">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <div className="card-actions items-center justify-end">
          <p>{formatPrice(product.price)}</p>
          <AddToCart
            productId={product.id}
            quantity={product.cartItems[0]?.quantity}
          />
        </div>
      </div>
    </div>
  );
}
