// next-auth.js
import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials!;
        const dbUser = await db.user.findFirst({
          where: {
            email,
          },
        });

        if (dbUser && dbUser.password == password) {
          return dbUser;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          image: token.picture,
          email: token.email,
        };
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await db.user.findFirst({
          where: {
            email: token.email ?? "",
          },
        });
        if (!dbUser) {
          token.id = user.id;
          return token;
        }

        if (!dbUser.username) {
          await db.user.update({
            where: {
              id: dbUser.id,
            },
            data: {
              username: dbUser.email.split("@")[0],
            },
          });
        }

        return {
          id: dbUser.id,
          name: dbUser.username,
          picture: dbUser.profile_image,
          email: dbUser.email,
        };
      }

      // Handle the case when 'user' is undefined
      return token;
    },
    redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return "/dashboard";
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
