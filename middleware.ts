import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  if (req.method === "GET") {
    // Rewrite routes that match "/[...puckPath]/edit" to "/puck/[...puckPath]"
    if (req.nextUrl.pathname.endsWith("/editPage")) {
      const pathWithoutEdit = req.nextUrl.pathname.slice(
        0,
        req.nextUrl.pathname.length - 9
      );
      const pathWithEditPrefix = `/puckPage${pathWithoutEdit}`;

      return NextResponse.rewrite(new URL(pathWithEditPrefix, req.url));
    }
    
    if (req.nextUrl.pathname.endsWith("/editLayout")) {
      const pathWithoutEdit = req.nextUrl.pathname.slice(
        0,
        req.nextUrl.pathname.length - 11
      );
      const pathWithEditPrefix = `/puckLayout${pathWithoutEdit}`;

      return NextResponse.rewrite(new URL(pathWithEditPrefix, req.url));
    }

    // Disable "/puck/[...puckPath]"
    if (req.nextUrl.pathname.startsWith("/puck")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

  }

  return res;
}