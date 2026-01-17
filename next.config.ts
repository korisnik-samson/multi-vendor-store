import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev', '192.168.1.4', '192.168.50.153'],
};

export default withPayload(nextConfig);
