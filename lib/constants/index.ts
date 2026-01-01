export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Prostore";
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || "A modern e-commerce platform";
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
export const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE';
export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;
export const signInDefaultValues = {
    email: 'hamoud@example.com',
    password: '123456',
};