// Define o ambiente de execução como cliente
'use client'

// Bibliotecas externas
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

// Esta página "Logout" é responsável por realizar o logout do usuário
export default async function Logout(){

    // Armazenamento da rota
    const router = useRouter()

    // Função de logout
    async function logout(){
        await signOut({
            redirect: false
        });
        router.replace('/login');
    }

    // Atualização do estado de logout
    useEffect(() =>{
        logout();
    }, [])

    return(
        <></>
    );
}