import type { CollectionConfig } from 'payload'

export const Tenants: CollectionConfig = {
    slug: 'tenants',
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
            admin: {
                readOnly: true,
                description: "Your Stripe Account ID"
            }
        },
        {
            name: "stripeDetailSubmitted",
            type: "checkbox",
            // required: true,
            admin: {
                readOnly: true,
                description: "You cannot sell products until you have submitted your Stripe account details."
            }
        }
    ],
}
