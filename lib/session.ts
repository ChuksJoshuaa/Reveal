import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { imageLogo } from "@/utils/image";
import {
  SessionInterface,
  UserInterface,
  UserProfile,
} from "@/utils/interfaces";
import { createUser, getUser } from "./actions";
import { expiryTime } from "@/utils/constants";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],

  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: "grafbase",
          exp: expiryTime,
        },
        secret
      );

      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret) as JWT;
      return decodedToken;
    },
  },

  theme: {
    colorScheme: "light",
    logo: `${imageLogo}`,
  },

  callbacks: {
    async session({ session }) {
      const email = session?.user?.email as UserInterface["email"];

      try {
        const data = (await getUser(email)) as { user: UserProfile };

        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data?.user,
          },
        };

        return newSession;
      } catch (error) {
        console.log("Error occurred when retriving user data " + error);
        return session;
      }
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        //get the user if they exist
        const userExists = (await getUser(
          user?.email as UserInterface["email"]
        )) as {
          user?: UserProfile;
        };

        if (!userExists) {
          await createUser(
            user?.name as UserInterface["name"],
            user?.email as UserInterface["email"],
            user?.image as UserInterface["avatarUrl"]
          );
        }
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
  return session;
};
