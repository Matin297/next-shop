"use client";

import { useOptimistic, useState } from "react";
import { incrementQuantity, decrementQuantity } from "@/actions";

interface AddToCartProps {
  quantity: number;
  productId: string;
}

export default function AddToCart({ productId, quantity = 0 }: AddToCartProps) {
  const [message, setMessage] = useState("");
  const [optimisticState, updateOptimisticState] = useOptimistic<
    { quantity: number; isPending?: boolean },
    number
  >({ quantity }, (state, step) => ({
    isPending: true,
    quantity: state.quantity + step,
  }));

  async function handleUpdateQuantity(formData: FormData) {
    const step = Number(formData.get("step"));
    updateOptimisticState(step);
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
    optimisticState.quantity === 0 ? (
      <form action={handleUpdateQuantity}>
        <input type="hidden" name="step" value="1" />
        <button
          type="submit"
          disabled={optimisticState.isPending}
          className="btn btn-outline btn-primary btn-sm"
        >
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
        <span>{optimisticState.quantity}</span>
        {optimisticState.isPending && (
          <span className="loading loading-spinner loading-xs text-primary"></span>
        )}
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
