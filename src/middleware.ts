import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookies from "js-cookie"; 

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;

  // Se não houver token, redireciona pro login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Aplica o middleware só nestas rotas
export const config = {
  matcher: ["/dashboard/:path*"], // protege /dashboard e subrotas
};
