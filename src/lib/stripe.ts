import Stripe from 'stripe';
import dotenv from "dotenv"
import { fileURLToPath } from "url";
import path from "path";

/*
const filename: string = fileURLToPath(import.meta.url)
const dirname: string = path.dirname(filename)

dotenv.config({
    path: path.resolve(dirname, '../.env')
})
*/

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-08-27.basil',
    typescript: true
});