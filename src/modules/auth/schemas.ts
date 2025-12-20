import * as z from "zod";

export const loginSchema = z.object({
    email: z.email(),
    password: z.string() // specifying password length rules will cause migration issues,
})

export const registerSchema = z.object({
    email: z.email(),
    password: z.string(), // specifying password length rules will cause migration issues
    username: z.string()
        .min(3, "Username must be at least 3 characters")
        .max(63, "Username must be less than 63 characters")
        .regex(/^[a-z0-9][a-z0-9-]*[a-z0-z]$/, "Username can only contain lowercase letters, numbers or hyphens whilst starting or ending with a letter or number.")
        .refine((value) => !value.includes('--'),
            "Username cannot contain consecutive hyphens.")
        .transform((value) => value.toLowerCase()),
});
