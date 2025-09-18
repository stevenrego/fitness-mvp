export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/workouts",
    "/workouts/:path*",
    "/habits",
    "/habits/:path*",
    "/nutrition",
    "/nutrition/:path*",
    "/programs",
    "/programs/:path*",
    "/community",
    "/community/:path*",
    "/messages",
    "/messages/:path*",
    "/challenges",
    "/challenges/:path*",
    "/rewards",
    "/rewards/:path*",
    "/shop",
    "/shop/:path*",
    "/notifications",
    "/notifications/:path*",
  ],
};
