import type { CollectionConfig } from 'payload'
import { isSuperAdmin } from "@/lib/access";

export const Media: CollectionConfig = {
    slug: 'media',
    access: {
        read: () => true,
        delete: ({ req }) => isSuperAdmin(req.user),
    },
    admin: {
        // commented out to allow uploads for post purchase content
        // hidden: ({ user }) => !isSuperAdmin(user)
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
        },
    ],
    upload: true,
}
