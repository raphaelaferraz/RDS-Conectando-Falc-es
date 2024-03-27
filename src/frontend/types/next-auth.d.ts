// ITEM PADRÃO DO FRAMEWORK

import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  interface JWT {
    email: string
    role: string
    ongid: number
    teacherid?: number
  }
}

declare module 'next-auth' {
  interface User {
    email: string
    name?: string
    image?: string
    role: string
    ongid: number
    teacherid?: number
  }

  interface Session {
    user: {
      email: string
      name: string | null | undefined
      image: string | null | undefined
      role: string
      ongid: number
      teacherid?: number
    }
  }

}