import Image from "next/image";
import { getCart } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import AddToCart from "@/components/add-to-cart";

export default async function CartItemsTable() {
  const cart = await getCart();

  if (!cart || cart.items.length === 0) {
    return <p className="text-center">Your cart is empty!</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map((item) => (
            <tr key={item.id}>
              <td>
                <Image
                  width={200}
                  height={200}
                  alt={item.product.name}
                  src={item.product.imageURL}
                  className="h-auto w-48 rounded-md object-cover"
                />
              </td>
              <td>{item.product.name}</td>
              <td>{formatPrice(item.product.price)}</td>
              <td>{item.quantity}</td>
              <td>{formatPrice(item.quantity * item.product.price)}</td>
              <td>
                <AddToCart
                  productId={item.productId}
                  quantity={item.quantity}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}></td>
            <td>Total</td>
            <td>{cart.size}</td>
            <td>{formatPrice(cart.cost)}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
