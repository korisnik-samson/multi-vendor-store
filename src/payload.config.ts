// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

/* Problem in Imports */
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Categories } from "./collections/Categories";
import { Products } from "./collections/Products";
import { connectionCredentials } from "@/lib/utils";

import dotenv from "dotenv"

const filename: string = fileURLToPath(import.meta.url)
const dirname: string = path.dirname(filename)

// Load environment variables from .env file because it's not included in Next.js build and a standalone app.
dotenv.config({
    path: path.resolve(dirname, '../.env')
})

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [Users, Media, Categories, Products],
    // cookiePrefix: 'biblioteka',
    editor: lexicalEditor(),
    secret: process.env.NEXT_PUBLIC_PAYLOAD_SECRET! || connectionCredentials.payloadSecret!,
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: mongooseAdapter({
        url: process.env.NEXT_PUBLIC_DATABASE_URI! || connectionCredentials.mongodbUri!,
    }),
    sharp,
    plugins: [
        payloadCloudPlugin(),
        // storage-adapter-placeholder
    ],
})
