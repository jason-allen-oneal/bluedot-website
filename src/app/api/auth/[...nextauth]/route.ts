import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Create the NextAuth handler
const handler = NextAuth(authOptions);

// Export the handler directly for NextAuth v4 with App Router
export { handler as GET, handler as POST };