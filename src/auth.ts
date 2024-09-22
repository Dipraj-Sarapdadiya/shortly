import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import { getUserDetailByEmail } from "./service/user-service";

export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        console.log("in next route: ", credentials);

        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        try {
          const userDetail = await getUserDetailByEmail(credentials.email.toString());
          console.log("user details in auth: ", userDetail);

          if (!userDetail) {
            return null;
          }

          const isPasswordCorrect = await bcrypt.compare(credentials.password.toString(), userDetail.password);
          console.log("isPasswordCorrect: ", isPasswordCorrect);
          if (!isPasswordCorrect) {
            return null;
          }

          return {
            id: userDetail._id.toString(),
            email: userDetail.email,
            isVerified: userDetail.isVerified,
            name: `${userDetail.firstName} ${userDetail.lastName}`,
          };
        } catch (error: any) {
          console.error("Error during authentication", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.accessToken = account?.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
        };
      }
      return session;
    },
  },
  session: { strategy: "jwt", maxAge: 60 * 60 * 8 },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
  cookies: {
    sessionToken: {
      name: "sns_token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
    },
  },
};

export default NextAuth(authOptions);
