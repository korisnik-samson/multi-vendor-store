import Stripe from 'stripe';
import dotenv from "dotenv"
import { fileURLToPath } from "url";
import path from "path";

const filename: string = fileURLToPath(import.meta.url)
const dirname: string = path.dirname(filename)

dotenv.config({
    path: path.resolve(dirname, '../../.env')
})

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;

export const stripe = new Stripe(STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-08-27.basil',
    typescript: true
});