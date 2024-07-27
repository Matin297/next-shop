"use server";

import { z, ZodError } from "zod";
import { redirect } from "next/navigation";
import db from "@/prisma/client";

const CreateProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  imageURL: z.string().url(),
  price: z.coerce.number().min(1),
});

export async function createProduct(formData: FormData) {
  const validationResult = CreateProductSchema.parse(
    Object.fromEntries(formData.entries()),
  );

  const { name, description, imageURL, price } = validationResult;

  try {
    await db.product.create({
      data: {
        name,
        description,
        imageURL,
        price,
      },
    });
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      throw new Error(error.issues.join(", "));
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Failed to create the product!");
  }

  redirect("/");
}
