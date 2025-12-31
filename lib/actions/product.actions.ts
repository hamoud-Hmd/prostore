"use server";
import { converToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { prisma } from "@/db/prisma";
import { Product } from "@/types";

// Type for Prisma result (rating is string due to Prisma extension)
type PrismaProductResult = Omit<Product, "rating"> & {
  rating: string;
};

// Get latest products from the database
export async function getLatestProduct(): Promise<Product[]> {
  const data = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: LATEST_PRODUCTS_LIMIT,
  });

  const plainData = converToPlainObject(data) as PrismaProductResult[];
  
  // Convert rating from string to number to match Product type
  return plainData.map((product) => ({
    ...product,
    rating: Number(product.rating),
  })) as Product[];
}


// Get product by its slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await prisma.product.findUnique({
    where: {
      slug,
    },
  });

  if (!data) return null;

  const plainData = converToPlainObject(data) as PrismaProductResult;
  
  // Convert rating from string to number to match Product type
  return {
    ...plainData,
    rating: Number(plainData.rating),
  } as Product;
}
