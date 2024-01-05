import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import authConfig from "./auth.config"
import prisma from "@/lib/db"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    
    async jwt({ token }) {
      console.log(token)
      return token
    },
    async session({ session, token}) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }

      return session
    }
  },
  ...authConfig,
})