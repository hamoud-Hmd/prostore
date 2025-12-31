'use server';
import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { converToPlainObject } from '../utils';
import { LATEST_PRODUCTS_LIMIT } from '../constants';


if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set. Please check your .env file.');
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Get latest products from the database
export async function getLatestProduct() {
    const data = await prisma.product.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        take: LATEST_PRODUCTS_LIMIT,
    });


    return converToPlainObject(data);

    
}

