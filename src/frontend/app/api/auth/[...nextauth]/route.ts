// Bibliotecas externas
import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"

// Estrutura própria da lib Next-Auth para controlar a authenticação e sessão dos usuário
const nextAuthOptions: NextAuthOptions = {

    // Configuração do provider de autenticação
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },

            // Autenticação do usuário
            async authorize(credentials, req) {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/user/auth`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password

                    })
                });

                // Verificação da resposta do backend
                const user = await response.json()

                // Retorno do usuário autenticado
                if (response.ok && user.role && user.roleID) {
                    user.role = user.role;
                    user.roleID = user.roleID;
                    return user;
                } else {
                    return null;
                }
            }
        }),
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.roleID = user.roleID;
            }
            return token;
        },
        async session({ session, token }) {
            if(!token.email){
            } else{
                session.user.email = token.email;
                session.user.name = token.name;
                session.user.image = token.picture;
            }
            session.user.role = token.role;
            session.user.roleID = token.roleID;
            return session;
        }
    }
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }