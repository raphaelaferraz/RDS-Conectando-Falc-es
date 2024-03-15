// Bibliotecas externas
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

// Este componente é responsável por realizar o logout do usuário
export default async function LogoutFunc({ children }: { children: React.ReactNode }) {
    
    // Armazenamento do roteador
    const router = useRouter();

    // Função de logout
    async function logout() {
        await signOut({
            redirect: false
        });

        // Redirecionamento para a página de login
        router.replace('/login');
    }

    return (
        <a onClick={logout}>{children}</a>
    );
}