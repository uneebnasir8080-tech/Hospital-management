import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req) {
  const token = await getToken({ req });
  const url = req.nextUrl;
  if (token) {
    if (url.pathname === "/auth/login") {
      if(token.role==="admin" || token.role==="doctor"){
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
    if(token.role==="patient"){
      return NextResponse.redirect(new URL("/user/home", req.url));
      }
    }
    return NextResponse.next();
  }

  if (url.pathname === "/auth/login") {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/auth/login", req.url));
}
export const config = {
  //  matcher: [
  //   "/((?!api|_next/static|_next/image|favicon.ico|auth/login|auth/register).*)",
  // ],
matcher: [
  "/((?!api|_next|favicon.ico|auth/login|auth/register|.*\\..*).*)",
],
  

};
