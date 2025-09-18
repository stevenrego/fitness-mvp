import NextAuth from "next-auth";
import { authOptions } from "@/src/lib/auth"; // ✅ path matches your setup

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
