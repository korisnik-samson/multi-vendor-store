import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const connectionCredentials = {
    mongodbUri: process.env.NEXT_PUBLIC_DATABASE_URI,
    payloadSecret: process.env.NEXT_PUBLIC_PAYLOAD_SECRET
}

export const formatAsCurrency = (value: string) => {
    const numericValue = value.replace( /[^0-9.]/g, "");
    const parts = numericValue.split(".");

    const formattedValue = parts[0] + (parts.length > 1 ? "." + parts[1]?.slice(0, 2) : "");
    if (!formattedValue) return "";

    const numberValue = parseFloat(formattedValue);
    if (isNaN(numberValue)) return "";

    return new Intl.NumberFormat("sr-RS", {
        style: "currency",
        currency: "RSD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2

    }).format(numberValue);
}