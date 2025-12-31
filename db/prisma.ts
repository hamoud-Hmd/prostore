import 'dotenv/config';
import { PrismaClient } from '../lib/generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set. Please check your .env file.');
}

// Set up WebSocket constructor for Neon
neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;

// Pass the connection string directly 
const adapter = new PrismaNeon({ connectionString });

// Extends the PrismaClient with a custom result transformer
export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString();
        },
      },
      rating: {
        compute(product) {
          return product.rating.toString();
        },
      },
    },
  },
});
