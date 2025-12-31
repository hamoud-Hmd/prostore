"use server";
import { converToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { prisma } from "@/db/prisma";

// Get latest products from the database
export async function getLatestProduct() {
  const data = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: LATEST_PRODUCTS_LIMIT,
  });

  return converToPlainObject(data);
}


// Get product by its slug
export async function getProductBySlug(slug: string) {
  const data = await prisma.product.findUnique({
    where: {
      slug,
    },
  });

  return converToPlainObject(data);
}
