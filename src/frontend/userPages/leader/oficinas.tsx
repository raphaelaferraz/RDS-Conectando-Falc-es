// Componentes internos do projeto
import WorkshopCard from '@/components/WorkshopCard/workshopCard';
import ButtonBack from '@/components/ui/button/buttonBack';

// Bibliotecas externas
import styled from 'styled-components';
import { FilterOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd'
import { useEffect, useState } from 'react';

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

export default function WorkshopLeader() {
	// Armazenamento dos estados de texto de busca, filtro, itens do dropdown, oficinas e categorias	
	const [searchText, setSearchText] = useState<string>();
	const [filter, setFilter] = useState<number | null>(0);
	const [items, setDropdownItems] = useState<any>();
	const [workshops, setWorkshops] = useState<any>();
	const [studentsQuantity, setStudentsQuantity] = useState<any>();
	const [categories, setCategories] = useState<any>();

	// Função assíncrona que busca as oficinas da ONG no backend
	useEffect(() => {
		const getWorkshops = async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/workshops`);
				setWorkshops(await response.json());
			} catch (error) {
				console.error('Erro ao buscar workshops:', error);
			}
		};
		getWorkshops();
	}, []);

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

	if (categories && workshops) {
		return (
			<Page>
				<ButtonBack />
				<Title>Oficinas da <Span style={{ fontWeight: 400 }}>{workshops?.[0].ongname}</Span></Title>
				<Divider></Divider>
				<Main>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<Search placeholder={'Digite o nome de uma oficina'} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
						<Dropdown menu={{ items }}>
							<a>
								<Space>
									<Filter>
										<FilterOutlined style={{ fontSize: '1rem' }} />
										<FilterText>{categories?.find((category: any) => category.id == filter)?.name || 'Todas'}</FilterText>
									</Filter>
								</Space>
							</a>
						</Dropdown>
					</div>
					<CardsDiv>
						{workshops?.
							filter((workshop: any) => (workshop.name.toLowerCase().startsWith(searchText?.toLowerCase().trim()) || !searchText) && (workshop?.categoryid == filter || !filter))
							.map((workshop: any) => {
								const studentsQuantity = workshop?.classroom[0]?.students.length;
								return <WorkshopCard name={workshop.name} color={workshop?.color || '#FFFFFF'} weekDay={workshop.classroom[0].day} studentsQuantity={studentsQuantity} time={workshop.classroom[0].startTime} workshopId={workshop.workshopid} classroomId={workshop?.classroom[0]?.classroomid} />
							})}
					</CardsDiv>
				</Main>
			</Page>
		);
	}
}