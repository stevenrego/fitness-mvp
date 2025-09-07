// middleware.ts (NextAuth v4)
export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/workouts/:path*",
    "/habits/:path*",
    "/nutrition/:path*",
    "/programs/:path*",
    "/community/:path*",
    "/messages/:path*",
    "/challenges/:path*",
    "/rewards/:path*",
    "/shop/:path*",
    "/notifications/:path*",
  ],
};
