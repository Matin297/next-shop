import { auth } from "@/auth";
import { cache } from "react";
import db from "@/prisma/client";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Cart, Prisma } from "@prisma/client";
import { LOCAL_CART_COOKIE } from "./constants";

import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from "@prisma/client/runtime/library";

type ProductFilterOptionsType = {
  page?: number;
  query?: string;
};

const PRODUCTS_PER_PAGE = 6;

export async function getProducts({
  query = "",
  page = 1,
}: ProductFilterOptionsType) {
  try {
    return db.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      take: PRODUCTS_PER_PAGE,
      skip: (page - 1) * PRODUCTS_PER_PAGE,
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
    const session = await auth();
    const cartId = cookies().get(LOCAL_CART_COOKIE)?.value;

    const product = await db.product.findUnique({
      where: {
        id,
      },
      include: {
        cartItems: {
          where: {
            cart: session?.user?.id
              ? {
                  userId: session.user.id,
                }
              : {
                  id: cartId,
                },
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
type CartWithProducts = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        product: true;
      };
    };
  };
}>;

export async function getCart() {
  try {
    const session = await auth();
    const cartId = cookies().get(LOCAL_CART_COOKIE)?.value;

    let cart: CartWithProducts | null = null;

    if (session?.user?.id)
      // private cart
      cart = await db.cart.findFirst({
        where: { userId: session.user.id },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    else if (cartId) {
      // local cart
      cart = await db.cart.findFirst({
        where: { id: cartId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    }

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
    const session = await auth();

    let cart: Cart;
    if (session && session.user?.id) {
      // private cart
      cart = await db.cart.create({
        data: {
          userId: session.user.id,
        },
      });
    } else {
      // anonymous local cart
      cart = await db.cart.create({
        data: {},
      });
      cookies().set(LOCAL_CART_COOKIE, cart.id);
    }

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
