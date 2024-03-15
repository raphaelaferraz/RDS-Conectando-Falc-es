// Define o ambiente de execução como cliente
'use client'

// Componentes internos do projeto
import LoadingPassaro from '@/components/ui/loading/passaroLoading';
import WorkshopLeader from '@/userPages/leader/oficinas';
import { useSession } from 'next-auth/react';

// Bibliotecas externas
import { useEffect, useState } from 'react';



// Esta página "workshops" listará todas as oficinas dentro de uma ONG específica, que ja foi selecionada pelo usuário.
export default function Workshops() {

	// Variável que armazena a sessão do usuário
	const { data: session } = useSession();

	// Armazenamento dos estados de carregamento
	const [loading, setLoading] = useState(false);


	// Atualização do estado de carregamento
	useEffect(() => {
		setLoading(true);
	}, []);

	// Renderização condicional da página
	if (loading) {
		if (session?.user.role == 'Teacher') {
			return (
				<h1>Oficina do Professor</h1>
			)
		}
		if (session?.user.role == 'Leader') {
			return (
				<WorkshopLeader />
			)
		}
		if (session?.user.role == 'GF') {
			return (
				<h1>Oficina da GF</h1>
			)
		}
	} else {
		return (
			<LoadingPassaro />
		);
	}
}