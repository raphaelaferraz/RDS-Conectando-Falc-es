import { AuthOptions, NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Estrutura própria da lib Next-Auth para controlar a authenticação e sessão dos usuário
export const nextAuthOptions: AuthOptions = {

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
                if (response.ok && user.role && user.ongid) {
                    user.role = user.role;
                    user.ongid = user.ongid;
                    user.email = user.email;
                    if(user.teacherid){
                        user.teacherid = user.teacherid
                    }
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
                token.ongid = user.ongid;
                token.email = user.email
                if(user.teacherid){
                    token.teacherid = user.teacherid
                }

            }
            return token;
        },
        async session({ session, token }) {
            if(token.teacherid){
                session.user.teacherid = token.teacherid
            }
            session.user.email = token.email;
            session.user.role = token.role;
            session.user.ongid = token.ongid;
            return session;
        }
    }
}
