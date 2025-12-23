import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
    slug: "categories",
    admin: {
        useAsTitle: "name",
    },
    /*access: {
        read: ({ req }) => req.user.isAdmin,
        create: ({ req }) => req.user.isAdmin,
        update: ({ req }) => req.user.isAdmin,
        delete: ({ req }) => req.user.isAdmin,
    },*/

    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
        {
            name: "slug",
            type: "text",
            required: true,
            unique: true,
            index: true,
        },
        {
            name: "color",
            type: "text",
        },
        {
            name: "parent",
            type: "relationship",
            relationTo: "categories",
            hasMany: false,
        },
        {
            name: "subcategories",
            type: "join",
            collection: "categories",
            on: "parent",
            hasMany: true,
        }
    ]
}