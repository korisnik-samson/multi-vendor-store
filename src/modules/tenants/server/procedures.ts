import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import { DEFAULT_LIMIT } from "@/constants";
import { TRPCError } from "@trpc/server";
import { Media, Tenant } from "@/payload-types";

export const tenantsRouter = createTRPCRouter({
    getOne: baseProcedure.input(
        z.object({
            subdomain: z.string()
        })
    ).query(async ({ ctx, input }) => {

        if (!input.subdomain) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Subdomain is required'
            });
        }

        const tenantsData = await ctx.db.find({
            collection: 'tenants',
            depth: 2,
            where: {
                subdomain: {
                    equals: input.subdomain,
                }
            },
            limit: 1,
            pagination: false
        });

        const tenant = tenantsData.docs[0];

        if (!tenant) throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Tenant not found'
        });

        return tenant as Tenant & { image: Media | null };
    })
});