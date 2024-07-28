import Link from "next/link";
import Image from "next/image";
import { Product } from "@prisma/client";
import { formatPrice } from "@/lib/utils";

export default function ProductCard({
  id,
  name,
  price,
  imageURL,
  description,
}: Product) {
  return (
    <Link href={`/product/${id}`}>
      <article className="card card-compact h-full bg-base-100 shadow-md hover:shadow-xl">
        <figure>
          <Image
            alt="Shoes"
            width={600}
            height={400}
            src={imageURL}
            className="h-80 object-cover"
          />
        </figure>
        <section className="card-body">
          <h3 className="card-title">{name}</h3>
          <p>{description}</p>
          <p>{formatPrice(price)}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </section>
      </article>
    </Link>
  );
}
