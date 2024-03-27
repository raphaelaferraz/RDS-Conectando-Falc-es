// Componentes internos do projeto
import NavbarAndFooter from '@/layouts/navbarAndFooter';

// Bibliotecas externas
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/utils/authOptions';
import { redirect } from 'next/navigation';
import React from 'react';

// Metadados da página
export const metadata = {
  title: "Conectando Falcões",
	description: "Sistema para auxilio de gestão de ONGs, oficinas e estudantes."
};

// Esta página "RootLayout" é responsável por renderizar o layout padrão do sistema
export default async function RootLayout({ children }: { children: React.ReactNode }) {

  // Armazenamento da sessão do usuário
  const session = await getServerSession(nextAuthOptions);

  // Renderização condicional do layout
  if(!session){
    redirect('/login');
  }

  return (
    <>
      <NavbarAndFooter>
        {children}
      </NavbarAndFooter>
    </>
  );
}