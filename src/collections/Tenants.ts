import type { CollectionConfig } from 'payload'
import { isSuperAdmin } from "@/lib/access";

export const Tenants: CollectionConfig = {
    slug: 'tenants',
    access: {
        create: ({ req }) => isSuperAdmin(req.user),
        delete: ({ req }) => isSuperAdmin(req.user),
    },
    admin: {
        useAsTitle: 'subdomain',
    },
    fields: [
        {
            name: "name",
            required: true,
            type: "text",
            label: "Store Name",
            admin: {
                description: "This is the name of the store (e.g. User's Store)"
            }
        },
        {
            name: "subdomain",
            type: "text",
            index: true,
            required: true,
            unique: true,
            access: {
                update: ({ req }) => isSuperAdmin(req.user),
            },
            admin: {
                description: "This is the subdomain for the store (e.g. [subdomain].biblioteka.com)"
            }
        },
        {
            name: "image",
            type: "upload",
            relationTo: "media",
        },
        {
            name: "stripeAccountId",
            type: "text",
            required: true,
            access: {
                update: ({ req }) => isSuperAdmin(req.user),
            },
            admin: {
                // readOnly: true,
                description: "Stripe Account ID associated with your shop."
            }
        },
        {
            name: "stripeDetailSubmitted",
            type: "checkbox",
            access: {
                update: ({ req }) => isSuperAdmin(req.user),
            },
            admin: {
                // readOnly: true,
                description: "You cannot sell products until you have submitted your Stripe account details."
            }
        }
    ],
}
