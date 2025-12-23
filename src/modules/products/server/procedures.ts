import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import type { Where } from "payload";
import { CategoriesGetManyOutput } from "@/modules/categories/types";
import { Category } from "@/payload-types";

export const productsRouter = createTRPCRouter({
    getMany: baseProcedure.input(
        z.object({
            category: z.string().nullable().optional(),
            minPrice: z.string().nullable().optional(),
            maxPrice: z.string().nullable().optional(),
        })
    ).query(async ({ ctx, input }) => {
        const where: Where = {};

        if (input.minPrice) where.price = { greater_than_equal: input.minPrice };

        if (input.maxPrice) where.price = { less_than_equal: input.maxPrice };

        if (input.category) {
            const categoriesData = await ctx.db.find({
                collection: "categories",
                limit: 1,
                depth: 1, // populate one level of subcategories
                pagination: false,
                where: {
                    slug: {
                        equals: input.category,
                    }
                }
            });

            const formattedData = categoriesData.docs.map((doc) => ({
                ...doc,
                subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
                    // due to the fact we only have a depth of 1, dos is the Category
                    ...(doc as Category),
                    subcategories: undefined
                })),
            }));

            const subcategoriesSlugs = [];
            const parentCategory = formattedData[0];

            if (parentCategory) {
                subcategoriesSlugs.push(...parentCategory.subcategories.map(
                    (subcategory: Category) => subcategory.slug)
                );

                where["category.slug"] = { in: [parentCategory.slug, ...subcategoriesSlugs] };
            }
        }

        const data = await ctx.db.find({
            collection: 'products',
            depth: 1, // populate one level of categories and images
            where
        });

        await new Promise(resolve => setTimeout(resolve, 1500));

        return data;
    })
});