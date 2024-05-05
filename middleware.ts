import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  if (req.method === "GET") {
    const pathname = req.nextUrl.pathname;
    if (pathname.endsWith("/editPage")) {
      const params = req.nextUrl.searchParams.toString();
      console.log(params);
      const pathWithoutEdit = pathname.slice(
        0,
        pathname.length - "/editPage".length
      );
      const pathWithEditPrefix = `/pageEditor${pathWithoutEdit}?${params}`;

      return NextResponse.rewrite(new URL(pathWithEditPrefix, req.url));
    } else if (pathname.endsWith("/editTemplate")) {
      const pathWithoutEdit = pathname.slice(
        0,
        pathname.length - "/editTemplate".length
      );
      const pathWithEditPrefix = `/templateEditor${pathWithoutEdit}`;

      return NextResponse.rewrite(new URL(pathWithEditPrefix, req.url));
    }

    // Disable "/puck/[...puckPath]"
    if (
      pathname.startsWith("/pageEditor") ||
      pathname.startsWith("/templateEditor")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return res;
}
