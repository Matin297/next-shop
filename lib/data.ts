import { cache } from "react";
import db from "@/prisma/client";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { LOCAL_CART_COOKIE } from "./constants";
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from "@prisma/client/runtime/library";

type ProductFilterOptionsType = {
  query?: string;
};

export async function getProducts({ query = "" }: ProductFilterOptionsType) {
  try {
    return db.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError ||
      error instanceof PrismaClientKnownRequestError
    ) {
      throw new Error(error.message);
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Failed to fetch the list of products!");
  }
}

export async function getProduct(id: string) {
  try {
    const cartId = cookies().get(LOCAL_CART_COOKIE)?.value;
    const product = await db.product.findUnique({
      where: {
        id,
      },
      include: {
        cartItems: {
          where: {
            cartId,
          },
        },
      },
    });

    if (!product) notFound();

    return product;
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError ||
      error instanceof PrismaClientKnownRequestError
    ) {
      throw new Error(error.message);
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Failed to fetch the product details!");
  }
}

export const getCachedProduct = cache(getProduct);

export type EnhancedCartType = Awaited<ReturnType<typeof getCart>>;

export async function getCart() {
  try {
    const cartId = cookies().get(LOCAL_CART_COOKIE)?.value;

    const cart = cartId
      ? await db.cart.findUnique({
          where: {
            id: cartId,
          },
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        })
      : null;

    if (!cart) return null;

    return {
      ...cart,
      size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
      cost: cart.items.reduce(
        (acc, item) => acc + item.quantity * item.product.price,
        0,
      ),
    };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError ||
      error instanceof PrismaClientUnknownRequestError
    ) {
      throw new Error(error.message);
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Failed to find the cart!");
  }
}

export async function createCart(): Promise<NonNullable<EnhancedCartType>> {
  try {
    const cart = await db.cart.create({
      data: {},
    });
    cookies().set(LOCAL_CART_COOKIE, cart.id);
    return {
      ...cart,
      items: [],
      size: 0,
      cost: 0,
    };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError ||
      error instanceof PrismaClientUnknownRequestError
    ) {
      throw new Error(error.message);
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Failed to create a new cart!");
  }
}
