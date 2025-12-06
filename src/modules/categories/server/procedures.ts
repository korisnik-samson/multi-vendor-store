import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { CategoriesGetManyOutput } from "@/modules/categories/types";

export const categoriesRouter = createTRPCRouter({
    getMany: baseProcedure.query(async ({ ctx }) => {
        const data = await ctx.db.find({
            collection: 'categories',
            depth: 1, // populate one level of subcategories
            where: {
                parent: {
                    exists: false, // Fetch only top-level categories
                },
            },
            sort: "name"
        });

        // formatted data
        return data.docs.map((doc: any) => ({
            ...doc,
            subcategories: (doc.subcategories?.docs ?? []).map((doc: CategoriesGetManyOutput[1]) => ({
                // due to the fact we only have a depth of 1, dos is the Category
                ...(doc as CategoriesGetManyOutput[1]),
                subcategories: undefined
            })),
        }));
    })
});