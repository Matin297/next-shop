"use server";

import db from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { getCart, createCart } from "@/lib/data";

export async function incrementQuantity(productId: string) {
  try {
    const cart = (await getCart()) ?? (await createCart());

    const cartItem = cart.items.find((item) => item.productId === productId);

    if (cartItem) {
      await db.cartItem.update({
        where: {
          id: cartItem.id,
        },
        data: {
          quantity: { increment: 1 },
        },
      });
    } else {
      await db.cartItem.create({
        data: {
          productId,
          cartId: cart.id,
        },
      });
    }

    revalidatePath(`/product/${productId}`);

    return {
      message: "",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    }

    return {
      message: "Failed to increment product quantity!",
    };
  }
}

export async function decrementQuantity(productId: string) {
  try {
    const cart = (await getCart()) ?? (await createCart());
    const cartItem = cart.items.find((item) => item.productId === productId);

    if (cartItem) {
      if (cartItem.quantity > 1) {
        await db.cartItem.update({
          where: {
            id: cartItem.id,
          },
          data: {
            quantity: { decrement: 1 },
          },
        });
      } else {
        await db.cartItem.delete({
          where: {
            id: cartItem.id
          }
        })
      }
    } else {
      db.cartItem.create({
        data: {
          productId,
          cartId: cart.id,
        },
      });
    }

    revalidatePath(`/cart`);
    revalidatePath(`/product/${productId}`);

    return {
      message: "",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    }

    return {
      message: "Failed to decrement product quantity!",
    };
  }
}
