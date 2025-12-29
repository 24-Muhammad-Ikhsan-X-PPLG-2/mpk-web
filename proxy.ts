import { NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/proxy";

export async function proxy(req: NextRequest) {
  return await updateSession(req);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/signin",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
