// Bibliotecas externas
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/utils/authOptions';
import { redirect } from 'next/navigation';
import React from 'react';

// Esta página "RootLayout" é responsável por renderizar o layout padrão do sistema
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  
  // Armazenamento da sessão do usuário
  const session = await getServerSession(nextAuthOptions)

  // Renderização condicional do layout
  if(session){
    redirect('/');
  }

  // Renderização do layout
  const child = React.Children.only(children);

  return (
    <>
      {children}
    </>
  );
}
