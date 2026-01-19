import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import { headers as getHeaders } from "next/headers";
import type { Sort, Where } from "payload";
import { Category, Media, Tenant } from "@/payload-types";
import { sortValues } from "@/modules/products/search-params";
import { DEFAULT_LIMIT } from "@/constants";

export const productsRouter = createTRPCRouter({
    getOne: baseProcedure.input(
       z.object({
            id: z.string()
       })
    ).query(async ({ ctx, input }) => {
        const headers = await getHeaders();
        const session = await ctx.db.auth({ headers });

        const product = await ctx.db.findByID({
            collection: 'products',
            id: input.id,
            depth: 2, // Loads the product.image, product.tenant, and product.tenant.image relations
        });

        let isPurchased = false;

        if (session.user) {
            const ordersData = await ctx.db.find({
                collection: "orders",
                pagination: false,
                limit: 1,
                where: {
                    and: [
                        { product: { equals: input.id } },
                        { user: { equals: session.user.id } }
                    ]
                }
            });

            isPurchased = !!ordersData.docs[0];
        }

        const reviews = await ctx.db.find({
            collection: "reviews",
            pagination: false,
            where: {
                product: { equals: input.id }
            }
        });

        const reviewRating = reviews.docs.length > 0 ? reviews.docs.reduce(
            (acc, review) => acc + review.rating, 0) / reviews.totalDocs : 0

        const ratingDistribution: Record<number, number> = {
            5: 0,
            4: 0,
            3: 0,
            2: 0,
            1: 0,
        };

        if (reviews.totalDocs > 0) {
            reviews.docs.forEach((review) => {
                const rating = review.rating;

                if (rating >= 1 && rating <= 5) ratingDistribution[rating] = (ratingDistribution[rating] || 0) + 1;
            });

            Object.keys(ratingDistribution).forEach((key) => {
                const rating = Number(key);
                const count = ratingDistribution[rating] || 0;
                ratingDistribution[rating] = Math.round(count / reviews.totalDocs) * 100;
            })
        }

        return {
            ...product,
            isPurchased,
            image: product.image as Media | null,
            tenant: product.tenant as Tenant & { image: Media | null },
            reviewRating,
            reviewCount: reviews.totalDocs,
            ratingDistribution,
        }
    }),
    getMany: baseProcedure.input(
        z.object({
            cursor: z.number().default(1).optional(),
            limit: z.number().default(DEFAULT_LIMIT),
            category: z.string().nullable().optional(),
            minPrice: z.string().nullable().optional(),
            maxPrice: z.string().nullable().optional(),
            tags: z.array(z.string()).nullable().optional(),
            sort: z.enum(sortValues).nullable().optional(),
            tenantSlug: z.string().nullable().optional(),
        })
    ).query(async ({ ctx, input }) => {
        const where: Where = { price: {} };

        let sort: Sort = "-createdAt"

        if (input.sort === "curated") sort = "-createdAt"
        if (input.sort === "hot_and_new") sort = "name"
        if (input.sort === "trending") sort = "+createdAt"

        if (input.minPrice && input.maxPrice)
            where.price = {
                ...where.price,
                greater_than_equal: input.minPrice,
                less_than_equal: input.maxPrice
            };

        else if (input.minPrice)
            where.price = {
                greater_than_equal: input.minPrice
            }

        else if (input.maxPrice)
            where.price = {
                less_than_equal: input.maxPrice
            }

        if (input.tenantSlug) where["tenant.subdomain"] = { equals: input.tenantSlug } // TODO: or tenant.slug

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

        if (input.tags && input.tags?.length > 0) where["tags.name"] = { in: input.tags };

        // await new Promise(resolve => setTimeout(resolve, 1500));

        const data = await ctx.db.find({
            collection: 'products',
            depth: 2, // populate one level of categories and images and tenants and tenant images
            where,
            sort,
            page: input.cursor,
            limit: input.limit
        });

        const dataWithSummarisedReviews = await Promise.all(data.docs.map(async (doc) => {
            const reviewsData = await ctx.db.find({
                collection: "reviews",
                pagination: false,
                where: {
                    product: { equals: doc.id }
                }
            });

            return {
                ...doc,
                reviewCount: reviewsData.totalDocs,
                reviewRating: reviewsData.totalDocs === 0 ? 0 : reviewsData.docs.reduce(
                    (acc, review) => acc + review.rating, 0) / reviewsData.totalDocs
            };
        }))

        return {
            ...data,
            docs: dataWithSummarisedReviews.map((doc) => ({
                ...doc,
                image: doc.image as Media | null,
                tenant: doc.tenant as Tenant & { image: Media | null }
            }))
        }
    })
});