import Image from "next/image";
import { getProduct } from "@/lib/data";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/utils";

interface ProductDetailsProps {
  params: {
    id: string;
  };
}

export default async function ProductDetails({
  params: { id },
}: ProductDetailsProps) {
  const product = await getProduct(id);

  if (!product) notFound();

  return (
    <div className="card bg-base-100 shadow-xl md:card-side">
      <figure className="basis-3/5">
        <Image
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
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
