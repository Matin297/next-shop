"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import db from "@/prisma/client";

const CreateProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  imageURL: z.string().url(),
  price: z.coerce.number().min(1),
});

type ActionStateType = {
  message?: string;
  errors?: {
    name?: string[];
    price?: string[];
    imageURL?: string[];
    description?: string[];
  };
};

export async function createProduct(
  _: ActionStateType,
  formData: FormData,
): Promise<ActionStateType> {
  try {
    const validationResult = CreateProductSchema.safeParse(
      Object.fromEntries(formData.entries()),
    );

    if (!validationResult.success) {
      return {
        message: "Validation Error!",
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    const { name, description, imageURL, price } = validationResult.data;

    await db.product.create({
      data: {
        name,
        description,
        imageURL,
        price,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    }

    return {
      message: "Failed to create the product!",
    };
  }

  redirect("/");
}
