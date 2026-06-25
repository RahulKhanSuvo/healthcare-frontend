import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    console.log(request)
}
export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
}