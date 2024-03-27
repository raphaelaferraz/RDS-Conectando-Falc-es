// Importações de componentes e bibliotecas externas
'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Button, Row, Col, List, Statistic, Card } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { useRouter } from 'next/router';

// Importação do componente de loading da outra página
import LoadingPassaro from '@/components/ui/loading/passaroLoading';
import Workshops from '../page';


// Definição de estilos usando styled-components
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

const Main = styled.main`
	margin-top: 2rem;
`;

const Divider = styled.div`
	display: flex;
	width: 100%;
	height: 0px;
	margin-top: 2rem;
	border-bottom: 0.07rem solid rgb(0, 0, 0, 0.4);
`;

const LargeStatistic = styled(Statistic)`
	.ant-statistic-title {
		font-size: 1.5rem !important;
		color: #1890ff;
	}

	.ant-statistic-content-value {
		font-size: 2rem !important;
		text-align: center;
	}

	.ant-statistic-content-value-int {
		font-size: 2rem !important;
		text-align: center !important;
	}
`;


// Componente principal da página para detalhes de oficina
export default function WorkshopDetailsPage() {
	const [id, setId] = useState<string>('');

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		setId(urlParams.get('id') ?? '');
	}, [])

	// Estado para armazenar os dados da oficina e o estado de carregamento
	const chartRef = useRef<HTMLCanvasElement>(null);
	const myChart = useRef<Chart | null>(null);
	const [workshopData, setWorkshopData] = useState<any>({ boys: 0, girls: 0, outros: 0, totalStudents: 0 });
	const [loading, setLoading] = useState(true);
	const [presenceWorkshop, setPresenceWorkshop] = useState({
		classes: [],
		attendance: {},
		overallWorkshopAverage: "0.00%"
	});
	const [nameWorkshop, setNameWorkshop] = useState('');
	const [classrooms, setClassrooms] = useState<any[]>([]);

	useEffect(() => {
		const fetchDataClassroom = async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/workshops/classroom/${id}`);
				const classrooms = await response.json();
				console.log(classrooms[0].classroom[0].classroomname);
				setClassrooms(classrooms);
				if (!response.ok) {
					throw new Error('Erro ao buscar dados da oficina');
				}
			}
			catch (error) {
				console.error(error);
				setLoading(false);
			}
		}
		fetchDataClassroom();
	}, [id]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/workshops/classroom/${id}`);
				if (!response.ok) {
					throw new Error('Erro ao buscar dados da oficina');
				}
				const workshop = await response.json();
				const { classroom } = workshop[0];

				let boysCount = 0;
				let girlsCount = 0;
				let outrosCount = 0;
				let totalStudentsCount = 0;
				console.log(workshop)
				setNameWorkshop(workshop[0].name)

				classroom.forEach((classroomData: any) => {
					classroomData.students.forEach((student: any) => {
						if (student.gender === 'M') {
							boysCount++;
						} else if (student.gender === 'F') {
							girlsCount++;
						} else {
							outrosCount++;
						}
					});
					totalStudentsCount += classroomData.students.length;
				});

				setWorkshopData({
					boys: boysCount,
					girls: girlsCount,
					outros: outrosCount,
					totalStudents: totalStudentsCount
				});
				setLoading(false);
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		};
		fetchData();
	}, [id]);

	useEffect(() => {
		const fetchDataGraph = async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/workshops/${id}/presences`);
				if (!response.ok) {
					throw new Error('Erro ao buscar dados da oficina');
				}
				const data = await response.json();
				console.log(data)

				const classes = data.workshopPresence.map((item: any) => item.classroom_name);
				const attendance = data.workshopPresence.reduce((acc: any, item: any) => {
					acc[item.classroom_name] = [parseFloat(item.average_presence.replace('%', '')) / 100];
					return acc;
				}, {});

				setPresenceWorkshop({
					classes: classes,
					attendance: attendance,
					overallWorkshopAverage: data.overallWorkshopAverage
				});

				setLoading(false);
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		};
		fetchDataGraph();
	}, [id]);

	useEffect(() => {
		if (chartRef.current) {
			const ctx = chartRef.current.getContext('2d');
			if (ctx) {
				if (myChart.current) {
					myChart.current.destroy();
				}
				console.log(presenceWorkshop)

				myChart.current = new Chart(ctx, {
					type: 'line',
					data: {
						labels: ['Janeiro', 'Fevereiro', 'Março'],
						datasets: presenceWorkshop.classes.map((className: any) => ({
							label: className,
							data: presenceWorkshop.attendance[className as keyof typeof presenceWorkshop.attendance], // Dados de presença por turma
							borderColor: '#' + (Math.random().toString(16) + '000000').substring(2, 8),
							fill: false,
						})),
					},
					options: {
						responsive: true,
						maintainAspectRatio: false,
					},
				});
			}
		}

		return () => {
			if (myChart.current) {
				myChart.current.destroy();
			}
		};
	}, [presenceWorkshop]);


	// Retorno do JSX da página
	return (
		<>
			{loading}
			<Page>
			<Button type="text" icon={<ArrowLeftOutlined />} style={{ padding: '0px' }} onClick={() => window.location.href = "/oficinas"}>
				Voltar
			 </Button>
			 	<Title>Detalhes da Oficina de {nameWorkshop}</Title>
				<Divider />
				<Main>
					<>
						<Row gutter={[16, 16]}>
							<Col span={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
								<Row gutter={[16, 16]} justify="center">
									<Col span={24}>
										<Row gutter={[16, 16]} justify="center">
											<Col span={12}>
												<LargeStatistic title="Meninos" value={workshopData.boys} />
											</Col>
											<Col span={12}>
												<LargeStatistic title="Meninas" value={workshopData.girls} />
											</Col>
										</Row>
									</Col>
									<Col span={12}>
										<LargeStatistic title="Total de Alunos" value={workshopData.totalStudents} className="total-alunos" />
									</Col>
									<Col span={12}>
										<LargeStatistic title="Outros" value={workshopData.outros} />
									</Col>
								</Row>
							</Col>
							<Col span={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '4rem' }}>
								<canvas ref={chartRef} />
							</Col>
						</Row>
						<Row justify="center">
							<Col span={24}>
								<Divider />
								<Card title="Lista de Turmas" bordered={false}>
									<List
										size="large"
										bordered
										dataSource={classrooms}
										renderItem={(item) => (
											<List.Item>
												{item.classroom[0].classroomname}
											</List.Item>
										)}
									/>
								</Card>
							</Col>
						</Row>

					</>
				</Main>
			</Page>
		</>
	);
}