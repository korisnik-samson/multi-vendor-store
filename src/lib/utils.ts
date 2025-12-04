import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const connectionCredentials = {
    mongodbUri: process.env.NEXT_PUBLIC_DATABASE_URI,
    payloadSecret: process.env.NEXT_PUBLIC_PAYLOAD_SECRET
}