// Define o ambiente de execução como cliente
'use client'

// Componentes internos do projeto
import WorkshopCard from '@/components/cards/workshopCard';
import ButtonBack from '@/components/ui/button/buttonBack';
import ButtonNavigation from '@/components/ui/button/buttonNavigation';
import { useRouter } from 'next/router';

// Bibliotecas externas
import styled from 'styled-components';
import { FilterOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd'
import { useEffect, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';

// Estilização
const Page = styled.div`
	padding-left: 3rem;
	padding-right: 3rem;
	padding-top: 2rem;
	padding-bottom: 2rem;
	min-height: calc(100vh - 4rem);
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

const Divider = styled.div`
	width: 100%;
	height: 0px;
	border-bottom: 0.07rem solid rgb(0, 0, 0, 0.4);
`;

const Search = styled.input`
	width: 23rem;
	padding-left: 1rem;
	padding-right: 1rem;
	height: calc(2.75rem / 1.5);
	border-radius: 2rem;
	font-weight: 100;
	font-weight: 300;
	border: 0.07rem solid rgb(0, 0, 0, 1);
	outline: none;
`;

const Main = styled.main`
	margin-top: 2rem;
`;

const Filter = styled.div`
	margin-left: 1rem;
	cursor: pointer;
	opacity: 40%;

	&:hover {
		opacity: 100%;
	}
`;

const CustomButtonNavigate = styled(ButtonNavigation)`
	width: 10rem;
	font-size: 1rem;
	height: 2.5rem;
`;

const FilterText = styled.span`
	margin-left: 0.5rem;
	font-weight: 100;
	font-weight: 300;
`

const CardsDiv = styled.div`
	margin-top: 2rem;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 1.5rem;

	@media (max-width: 1024px) {
			grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 768px) {
			grid-template-columns: repeat(1, 1fr);
	}
`;

const Alert = styled.p`
	margin-top: 2rem;
	font-size: 18px;
	font-weight: 300;
`;

export default function Classrooms() {
	// Armazenamento dos estados de texto de busca, filtro, itens do dropdown, oficinas e categorias	
	const [searchText, setSearchText] = useState<string>();
	const [filter, setFilter] = useState<number | null>(0);
	const [items, setDropdownItems] = useState<any>();
	const [workshops, setWorkshops] = useState<string>('');
	const [classrooms, setClassrooms] = useState<any[]>([]);
	const [categories, setCategories] = useState<any>();
	const [id, setId] = useState<string>('');

	// Captura do id da URL
	function getTurmaIdFromURL(): any {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get('id') || '';
	}

	// Função assíncrona que busca as informações da oficina no backend
	useEffect(() => {
		const id = getTurmaIdFromURL();
		const getWorkshops = async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/workshops/${id}`);
				const data = await response.json();
				console.log(id)
				console.log(data[0].name);
				setWorkshops(data[0]?.name);
			} catch (error) {
				console.error('Erro ao buscar workshops:', error);
			}
		};
		getWorkshops();
	}, [id]);

	// Função assíncrona que busca as turmas de uma oficinas da ONG no backend
	useEffect(() => {
		const id = getTurmaIdFromURL();
		const getClassroom = async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/workshops/${id}/classrooms`);
				const data = await response.json();
				console.log(data);
				setClassrooms(data);
			} catch (error) {
				console.error('Erro ao buscar workshops:', error);
			}
		};
		getClassroom();
	}, [id]);

	// Função que busca as categorias das oficinas no backend
	useEffect(() => {
		const getCategories = async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/categories`);
				setCategories(await response.json());
			} catch (error) {
				console.error('Erro ao buscar categorias:', error);
			}
		};
		getCategories();
	}, []);

	// Atualização do estado de itens do dropdown com base nas categorias
	useEffect(() => {
		let uniqueCategories = Array.from(new Set(categories?.map((item: any) => item.id)));

		const items = [
			{
				label: (
					<div onClick={() => setFilter(null)}>
						Todas
					</div>
				),
				key: null
			},
			...uniqueCategories.map((idCategory: any) => {
				return {
					label: (
						<div onClick={() => setFilter(idCategory)}>
							{categories.find((category: any) => { return idCategory == category.id })?.name}
						</div>
					),
					key: idCategory
				}
			})
		]

		setDropdownItems(items);

	}, [categories])

	if (categories && classrooms) {
		return (
			<Page>
				<Button type="text" icon={<ArrowLeftOutlined />} style={{ padding: '0px' }} onClick={() => window.location.href = "/"}>
					Voltar
				</Button>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<Title>Turmas da Oficina {workshops} </Title>
					<CustomButtonNavigate url="/cadastrar-turma">Cadastrar Turma</CustomButtonNavigate>
				</div>
				<Divider></Divider>
				<Main>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<Search placeholder={'Digite o nome de uma oficina'} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
					</div>
					{Array.isArray(classrooms) && classrooms.length > 0 ? (
						<CardsDiv>
							{classrooms.map((classroom: any) => {
								const studentsQuantity = classroom?.studentcount;
								return <WorkshopCard
									key={classroom.classroomid}
									workshopname={classroom.workshopname}
									classroomname={classroom.classroomname}
									color={classroom?.categorycolor || '#FFFFFF'}
									weekDay={classroom.classroomday}
									studentsQuantity={studentsQuantity}
									time={classroom.classroomstarttime}
									workshopId={classroom.workshopid}
									classroomId={classroom?.classroomid}
									showSchedule={true}
									showParticipants={true}
									showClassroomName={true}
									showWorkshopPage={false}
									link={`oficinas/aula/?id=${classroom?.classroomid}`}
								/>
							})}
						</CardsDiv>
					) : (
						<Alert>Nenhuma turma para essa oficina</Alert>
					)}
				</Main>
			</Page>
		);
	}
}