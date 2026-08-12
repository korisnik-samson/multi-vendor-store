import type { CollectionConfig } from "payload";
import { isSuperAdmin } from "@/lib/access";
import { Tenant } from "@/payload-types";

export const Products: CollectionConfig = {
    slug: "products",
    access: {
        read: () => true,
        // Create products only if tenant has submitted their Stripe account details.
        // This is to prevent users from creating products before Stripe is set up, but might be a problem here in Serbia as Stripe isn't available yet.
        create: ({ req }) => {
            if (isSuperAdmin(req.user)) return true;
            const tenants = req.user?.tenants?.[0]?.tenant as Tenant

            return Boolean(tenants?.stripeDetailSubmitted)
        }
    },
    admin: {
        useAsTitle: "name",
        description: "You must verify your account before you can create products."
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
        {
            name: "description",
            type: "richText",
        },
        {
            name: "price",
            type: "number",
            required: true,
            admin: {
                description: "Price in RSD"
            }
        },
        {
            name: "category",
            type: "relationship",
            relationTo: "categories",
            hasMany: false,
        },
        {
            name: "tags",
            type: "relationship",
            relationTo: "tags",
            hasMany: true,
        },
        {
            name: "image",
            type: "upload",
            relationTo: "media",
        },
        {
            name: "refundPolicy",
            type: "select",
            options: ["no-refunds", "1-day", "3-day", "7-day", "14-day", "30-day"],
            defaultValue: "7-day"
        },
        {
            name: 'content',
            // TODO: Use richtext when Payload supports saving richtext in a way that can be rendered safely on the frontend.
            type: "richText",
            /*editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                    ...defaultFeatures,
                    UploadFeature({
                        collections: {
                            media: {
                                fields: [{
                                    name: "name",
                                    type: "text",
                                }]
                            }
                        }
                    })
                ]
            }),*/
            admin: {
                description: "Protected content. Only visible to customers after purchase. Add product documentation, downloadable filed, getting started guides, and bonus" +
                    " materials. Supports Markdown formatting."
            }

        },
        {
            name: "isArchived",
            label: "Archive",
            defaultValue: false,
            type: "checkbox",
            admin: {
                description: "Check if you wish to delete or archive this product. Archived products will not be visible to customers, only to you"
            }

        },
        {
            name: "isPrivate",
            label: "Private",
            defaultValue: false,
            type: "checkbox",
            admin: {
                description: "Check if you wish this product not to be visible to the public storefront"
            }
        }
    ],
}
