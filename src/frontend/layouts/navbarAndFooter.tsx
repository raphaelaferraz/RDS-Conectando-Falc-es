// Define o ambiente de execução como cliente
'use client'

// Componentes internos do projeto
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";

// Este layout contém dois componentes principais: o cabeçalho (header) e o rodapé (footer).
export default function NavbarAndFooter({ children }: { children?: any }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer/>
        </>
    )
}