// Define o ambiente de execução como cliente
'use client'

// Componentes internos do projeto
import PassaroLoading from '@/components/ui/loading/passaroLoading';

// Bibliotecas externas
import { useEffect, useState} from 'react';
import { useSession } from 'next-auth/react';

// Páginas da aplicação
import TeacherPage from '../../userPages/teacher/oficinas';
import LeaderPage from '../../userPages/leader/home';

// Esta página "HomeScreen" será a primeira página do fluxo de Líder da ONG, exibindo os principais caminhos e dados.
export default function HomeScreen() {
  
  // Variável que armazena a sessão do usuário
  const { data: session } = useSession();  

  // Armazenamento do estado de carregamento
  const [loading, setLoading] = useState(true);
  
  // Atualização do estado de carregamento
  useEffect(() => {
    setLoading(false);  
  }, [])

  // Renderização condicional da página inicial
  if (!loading) {

    // Define a tela inicial de acordo com o login do usuário como professor
    if(session?.user.role == 'Teacher'){
      return (
        <TeacherPage />
      );
    }

    // Define a tela inicial de acordo com o login do usuário como líder da ONG
    if(session?.user.role == 'Leader'){
      return (
        <LeaderPage />
      );
    }

    // Define a tela inicial de acordo com o login do usuário como Gestor da GF
    if (session?.user.role == 'GF'){
      return (
        <h1>Home da GF</h1>
      );
    }
  } else {
    return (
      <PassaroLoading />
    );
  }
};
