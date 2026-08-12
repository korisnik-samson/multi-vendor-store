// import 'server-only'

import { cookies as getCookies } from "next/dist/server/request/cookies";
import { AUTH_COOKIE } from "@/modules/auth/constants";

interface Props {
    prefix: string;
    value: string;
}

export const generateAuthCookie = async ({ prefix, value }: Props): Promise<void> => {
    const cookies = await getCookies();

    cookies.set({
        name: `${prefix}-${AUTH_COOKIE}`,
        value: value,
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 14,
        // TODO: Ensure cross-domain cookie sharing
        sameSite: "none",
        domain: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
        secure: process.env.NODE_ENV === "production",
    });
}
