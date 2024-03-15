// ITEM PADRÃO DO FRAMEWORK

import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  interface JWT {
    role: string
    roleID: number
  }
}

declare module 'next-auth' {
    interface User {
        email?: string
        name?: string
        image?: string
        role: string
        roleID: number
    }

    interface Session {
        user: {
            email?: string
            name: string | null | undefined
            image: string | null | undefined
            role: string
            roleID: number
        }
    }

}