import db from "@/prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function getProducts() {
  try {
    return db.product.findMany();
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
    return db.product.findUnique({
      where: {
        id,
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

    throw new Error("Failed to fetch the product details!");
  }
}
