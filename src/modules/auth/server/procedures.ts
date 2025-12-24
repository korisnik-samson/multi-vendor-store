import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { headers as getHeaders, cookies as getCookies } from "next/headers";
import { TRPCError } from "@trpc/server";
import { AUTH_COOKIE } from "@/modules/auth/constants";
import { loginSchema, registerSchema } from "@/modules/auth/schemas";
import { generateAuthCookie } from "@/modules/auth/utils";

export const authRouter = createTRPCRouter({
    session: baseProcedure.query(async ({ ctx }) => {
        const headers = await getHeaders();

        return await ctx.db.auth({ headers})
    }),
    logout: baseProcedure.mutation(async () => {
        const cookies = await getCookies();
        cookies.delete(AUTH_COOKIE);
    }),
    register: baseProcedure
        .input(registerSchema)
        .mutation(async ({ ctx, input }) => {
            const existingData = await ctx.db.find({
                collection: 'users',
                limit: 1,
                where: {
                    username: {
                        equals: input.username,
                    }
                }
            });

            const existingUser = existingData.docs[0];

            if (existingUser) throw new TRPCError({
                code: 'CONFLICT', // or BAD_REQUEST
                message: 'Username already taken • Please choose another one'
            });

            const tenant = await ctx.db.create({
                collection: "tenants",
                data: {
                    name: input.username,
                    subdomain: input.username,
                    stripeAccountId: 'test',
                }
            })

            await ctx.db.create({
                collection: 'users',
                data: {
                    email: input.email,
                    username: input.username,
                    password: input.password,
                    tenants: [
                        {
                            tenant: tenant.id,
                        }
                    ]
                }
            });

            const data = await ctx.db.login({
                collection: 'users',
                data: {
                    email: input.email,
                    password: input.password,
                }
            });

            if (!data.token) throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'Failed to login after registration'
            });

            await generateAuthCookie({
                prefix: ctx.db.config.cookiePrefix,
                value: data.token
            });
        }),
    login: baseProcedure
        .input(loginSchema)
        .mutation(async ({ ctx, input }) => {
            const data = await ctx.db.login({
                collection: 'users',
                data: {
                    email: input.email,
                    password: input.password
                }
            });

            if (!data.token) throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'Invalid credentials • Failed to login'
            });

            await generateAuthCookie({
                prefix: ctx.db.config.cookiePrefix,
                value: data.token
            });

            return data;
        })
});