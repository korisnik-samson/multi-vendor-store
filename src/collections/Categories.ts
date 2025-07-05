import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
    slug: "categories",
    /*access: {
        read: ({ req }) => req.user.isAdmin,
        create: ({ req }) => req.user.isAdmin,
        update: ({ req }) => req.user.isAdmin,
        delete: ({ req }) => req.user.isAdmin,
    },*/
    fields: [{
        name: "name",
        type: "text",
        required: true,
    }]
}