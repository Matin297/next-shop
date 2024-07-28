import Link from "next/link";
import Image from "next/image";
import { Product } from "@prisma/client";
import { formatPrice } from "@/lib/utils";

const WEEK_MSECONDS = 24 * 60 * 60 * 1000;

export default function ProductCard({
  id,
  name,
  price,
  imageURL,
  updatedAt,
  description,
}: Product) {
  const isNew = Date.now() - new Date(updatedAt).getTime() < WEEK_MSECONDS;
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
          <h3 className="card-title">
            {name}
            {isNew && <span className="badge badge-primary badge-sm">New</span>}
          </h3>
          <p>{description}</p>
          <div className="card-actions items-center justify-end">
            <p>{formatPrice(price)}</p>
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </section>
      </article>
    </Link>
  );
}
