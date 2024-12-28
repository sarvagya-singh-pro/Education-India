import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret = process.env.NEXTAUTH_SECRET;
import prisma from "../../../../prisma/prisma";
const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(await prisma.user.count());
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (user && (await bcrypt.compare(credentials?.password || "", user.password || ""))) {
          return user;
        } else {
          console.log("error 404 nigga not found");
          return null; // Return null if authentication fails
        }
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/login', // Redirect here on errors
    verifyRequest: '/verify',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Add user ID to the token
        token.email = user.email; // Add email to the token
      }
      return token;
    },

    async session({ session, token }) {
      console.log("Session Callback Triggered");

      // Pass token values to the session
      session.user.id = token.id;
      session.user.profileCompleted = token.profileCompleted;
      session.expires = new Date(token.exp * 1000).toISOString();

      return session;
    },

    async signIn({ account, profile }) {
      console.log("SignIn Callback Triggered");
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@example.com");
      }
      return true; // Allow sign-in by default for other providers
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  jwt: {
    
    secret: process.env.NEXTAUTH_SECRET, // Use the same secret as NextAuth
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});

export { handler as GET, handler as POST };
