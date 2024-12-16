import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  console.log("Middleware running for:", pathname);

  if (pathname.startsWith("/api")) {
    const apiKey = request.headers.get("x-api-key");
    // console.log("Received API Key:", apiKey);

    const validApiKey = process.env.API_KEY;
    // console.log("Valid API Key:", validApiKey);

    if (!apiKey || apiKey !== validApiKey) {
      // console.log("Unauthorized request");
      return NextResponse.json({ message : "For API KEY Contact - nexbytes24x7@gmail.com" }, { status: 401 });
    }
  }

  console.log("Request Authorized");
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
