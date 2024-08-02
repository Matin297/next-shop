"use client";

import { incrementQuantity, decrementQuantity } from "@/actions";
import { useOptimistic, useState } from "react";

interface AddToCartProps {
  quantity: number;
  productId: string;
}

export default function AddToCart({ productId, quantity = 0 }: AddToCartProps) {
  const [message, setMessage] = useState("");
  const [optimisticQuantity, updateOptimisticQuantity] = useOptimistic<
    number,
    number
  >(quantity, (state, step) => state + step);

  async function handleUpdateQuantity(formData: FormData) {
    const step = Number(formData.get("step"));
    updateOptimisticQuantity(step);
    const { message } =
      step < 0
        ? await decrementQuantity(productId)
        : await incrementQuantity(productId);
    setMessage(message);
  }

  function handleClearMessage() {
    setMessage("");
  }

  const buttons =
    optimisticQuantity === 0 ? (
      <form action={handleUpdateQuantity}>
        <input type="hidden" name="step" value="1" />
        <button type="submit" className="btn btn-outline btn-primary btn-sm">
          Add to Cart
        </button>
      </form>
    ) : (
      <div className="flex items-center gap-2">
        <form action={handleUpdateQuantity}>
          <input type="hidden" name="step" value="-1" />
          <button
            type="submit"
            className="btn btn-circle btn-outline btn-primary btn-sm"
          >
            -
          </button>
        </form>
        <span>{optimisticQuantity}</span>
        <form action={handleUpdateQuantity}>
          <input type="hidden" name="step" value="1" />
          <button
            type="submit"
            className="btn btn-circle btn-outline btn-primary btn-sm"
          >
            +
          </button>
        </form>
      </div>
    );

  return (
    <div className="relative">
      {message && (
        <span
          role="alert"
          className="absolute bottom-full right-0 my-2 w-auto whitespace-nowrap text-sm text-error"
        >
          <button
            onClick={handleClearMessage}
            className="btn btn-circle btn-xs mx-1"
          >
            x
          </button>
          {message}
        </span>
      )}
      {buttons}
    </div>
  );
}
