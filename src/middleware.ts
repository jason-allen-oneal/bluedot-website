import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware() {
    // This function runs after authentication is verified
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Only allow access if user is authenticated
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"]
};
