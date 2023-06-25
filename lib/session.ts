import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { imageLogo } from "@/utils/image";
import { SessionInterface } from "@/utils/interfaces";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],

  // jwt: {
  //   encode: ({ secret, token }) => {},
  //   decode: async ({ secret, token }) => {},
  // },

  theme: {
    colorScheme: "light",
    logo: `${imageLogo}`,
  },

  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        //get the user if they exist
        //if they don't exist, create them
        return true;
      } catch (error: any) {
        console.log(error);
        return false;
      }
    },
  },
};

export const getCurrentUser = async () => {
  const session = (await getServerSession(authOptions)) as SessionInterface;
  console.log(session);

  return session;
};
