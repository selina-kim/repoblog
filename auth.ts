import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      const allowedEmail = process.env.ALLOWED_USER_EMAIL;
      const allowedGithubUsername = process.env.ALLOWED_GITHUB_USERNAME;

      const isAllowed =
        (allowedEmail && user.email === allowedEmail) ||
        (allowedGithubUsername && profile?.login === allowedGithubUsername);

      if (!isAllowed) {
        return false;
      }

      return true;
    },
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const isPublicRoute =
        nextUrl.pathname === "/" || nextUrl.pathname === "/login";

      if (isPublicRoute) {
        return true;
      }

      if (!isLoggedIn) {
        return Response.redirect(new URL("/login", nextUrl));
      }

      return true;
    },
  },
});
