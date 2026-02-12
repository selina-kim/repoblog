import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      authorization: {
        params: {
          scope: "read:user user:email public_repo",
        },
      },
      async profile(profile) {
        return {
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        token.username = profile.login;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.username) {
        session.user.username = token.username as string;
      }
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
    async signIn({ profile }) {
      const allowedGithubUsername = process.env.OWNER_GITHUB_USERNAME;

      const isAllowed =
        allowedGithubUsername && profile?.login === allowedGithubUsername;

      if (!isAllowed) {
        return false;
      }

      return true;
    },
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const isPublicRoute =
        nextUrl.pathname === "/" ||
        nextUrl.pathname === "/signin" ||
        nextUrl.pathname.startsWith("/post") ||
        nextUrl.pathname.startsWith("/images") ||
        nextUrl.pathname.startsWith("/api/images");

      if (isPublicRoute) {
        return true;
      }

      if (!isLoggedIn) {
        return Response.redirect(new URL("/signin", nextUrl));
      }

      return true;
    },
  },
});
