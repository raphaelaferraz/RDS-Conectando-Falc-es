// Define o ambiente de execução como cliente
'use client'

// Componentes internos do projeto
import PassaroLoading from '@/components/ui/loading/passaroLoading';

// Bibliotecas
import styled from 'styled-components';
import moment from 'moment';
import { Checkbox } from 'antd'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import 'dotenv/config';

// Estilização
const Page = styled.div`
  padding-left: 3rem;
  padding-right: 3rem;
  padding-bottom: 2rem;
  min-height: calc(100vh - 4rem);
	display: flex;
	flex-direction: column;
`;

const Title = styled.h1`
	font-size: 1.5rem;
	font-weight: 300;
	margin-top: 2rem;
	margin-bottom: 2rem;
`;

const Span = styled(Title)`
  font-weight: 600;
	display: inline;
`;

const MainTitle = styled(Title)`
	font-weight: 400;
	width: 100%;
	text-align: center;
`;

const Divider = styled.div`
	width: 100%;
	height: 0px;
	border-bottom: 0.07rem solid rgb(0, 0, 0, 0.4);
`;

const Main = styled.main`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
`;

const Informations = styled.ul`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: fit-content;
`;

const Information = styled.li`
	display: flex;
	gap: 0.3rem;
	justify-content: flex-end;
`;

const InformationLabel = styled.span`
	font-size: 1rem;
	font-weight: 600;
`;

const InformationValue = styled.span`
	font-size: 1rem;
	font-weight: 300;
`;

const DivStudentList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-top: 2rem;
	flex-grow: 1;
`;

const DivStudent = styled.div`
	border-color: #1F5673;
	border-style: solid; 
	border-width: 1px;
	width: auto;
	max-height: 100vh;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 0.5rem 1rem 0.5rem 1rem;
	border-radius: 10px; 
	align-items: center;
`;

const LabelStudentName = styled.h1`
  flex-grow: 1;
	font-size: 1rem;
	font-weight: 400;
`;

const CheckboxPresenca = styled(Checkbox)`
	.ant-checkbox-checked .ant-checkbox-inner {
		background-color: #1F5673; 
		border-color: #1F5673;
		margin-left: auto;
	}
`;

const SpacerDiv = styled.div`
	display: flex;
	justify-content: space-between;
`;

const CustomButton = styled.button`
	background-color: var(--button-blue);
	color: white;
	border: none;
	outline: none;
	font-size: 1rem;
	cursor: pointer;
	padding: 0.6rem 1.3rem 0.6rem 1.3rem;
	border-radius: 2rem;
	font-weight: 100;
`;

const RegisterButton = styled(CustomButton)`
	margin-left: auto;
	margin-right: auto;
	margin-top: 2rem;
	display: block;
`;


// Esta página "workshops" listará todas as oficinas dentro de uma ONG específica, que ja foi selecionada pelo usuário.
export default function Workshops() {

	// Armazenamento dos estados de carregamento, data e presenças
	const [loading, setLoading] = useState(false);
	const [presences, setPresences] = useState<any>([]);
	const [data, setData] = useState<any>([]);

	// Função que busca os dados das oficinas
	const getData = async () => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/workshops/1`);
			setData((await response.json())[0]);
		} catch (error) {
			console.error('Erro ao buscar workshops:', error);
		}
	};

	// Atualização do estado de data
	useEffect(() => {
		if (data) {
			console.log(data);
		}
	}, [data])

	// Atualização do estado de carregamento
	useEffect(() => {
		setLoading(true); 
		getData();
	}, [])

	// Função que atualiza o estado de presenças
	function togglePresence(id: number) {
		if (presences.includes(id)) {
			setPresences((prev: any) => prev.filter((idInPresence: number) => idInPresence !== id));
		} else {
			setPresences((prev: any) => [...prev, id]);
		}
	}

	// Função que registra as presenças
	function register() {
		const body = {
			classId: data.idClass,
			professorId: 1,
			presences: presences,
			absents: data.student.map((student: any) => student.id).filter((el: any) => !presences.includes(el)),
		}

		console.log(body);
	}

	// Renderização condicional da página
	if (loading) {
		return (
			<Page>
				<SpacerDiv>
					<Title>Bem vindo, <Span style={{ fontWeight: 400 }}>{data.professor}</Span>!</Title>
					<Informations>
						<Information>
							<InformationLabel>ONG:</InformationLabel>
							<InformationValue>{data.nameOng}</InformationValue>
						</Information>
						<Information>
							<InformationLabel>Oficina:</InformationLabel>
							<InformationValue>{data.workshopName}</InformationValue>
						</Information>
					</Informations>
				</SpacerDiv>
				<Divider></Divider>
				<Main>
					<MainTitle>Lista de Alunos</MainTitle>
					<SpacerDiv>
						<Informations>
							<Information>
								<InformationLabel>Data e horário:</InformationLabel>
								<InformationValue>{moment().format('DD/MM/YYYY')} às {data.startTime}</InformationValue>
							</Information>
						</Informations>
						<Link href={'/add-student'}><CustomButton>Adicionar aluno</CustomButton></Link>
					</SpacerDiv>
					<DivStudentList>
						{data?.student?.map((student: any, index: number) => {
							return (
								<DivStudent key={index}>
									<LabelStudentName>{student.name}</LabelStudentName>
									<CheckboxPresenca onChange={() => togglePresence(student.id)} ></CheckboxPresenca>
								</DivStudent>
							)
						})}
					</DivStudentList>
					<RegisterButton onClick={register}>Registrar presenças</RegisterButton>
				</Main>
			</Page>
		);
	} else {
		return (
			<PassaroLoading />
		);
	}
}