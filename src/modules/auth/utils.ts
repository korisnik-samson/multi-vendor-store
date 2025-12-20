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
        // sameSite: 'none',
        // domain: ""
        // TODO: Ensure cross-domain cookie sharing
    });
}