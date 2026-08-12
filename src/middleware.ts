import { NextRequest, NextResponse } from 'next/server'

export const config = {
    matcher: [
        /*
        *   Match all paths except for:
        *   1. /api routes
        *   2. /_next (Next.js internals)
        *   3. /_static (inside /public)
        *   4. all root files inside /public (e.g. /favicon.ico)
        */
        "/((?!api/|_next/|_static/|_vercel|media/|[\\w-]+\\.\\w+).*)",
    ]
};

export function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const hostname = req.headers.get('host') || "";
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "";

    if (hostname.endsWith(`.${rootDomain}`)) {
        const tenantSubDomain = hostname.replace(`.${rootDomain}`, "");
        return NextResponse.rewrite(new URL(`/tenants/${tenantSubDomain}${url.pathname}`, req.url));
    }

    return NextResponse.next();
}
