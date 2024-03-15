// Define o ambiente de execução como cliente
'use client'

// Componentes internos do projeto
import PassaroLoading from "@/components/ui/loading/passaroLoading"
import ButtonBack from '@/components/ui/button/buttonBack';
import StudentModal from '@/components/ui/modal/studentInformationModal';
import { StudentAddModal } from '@/components/ui/modal/studentAddModal';

// Bibliotecas externas
import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { Checkbox } from 'antd';
import { useRouter } from 'next/router';
import moment from 'moment';
import { get } from "http";

// Estilização
const Page = styled.div`
	padding-left: 3rem;
	padding-right: 3rem;
	padding-top: 2rem;
	padding-bottom: 2rem;
	min-height: calc(100vh - 4rem);
`;

const BackButton = styled.button`
	background-color: var(--button-blue);
	color: white;
	border: none;
	outline: none;
	font-size: 1rem;
	cursor: pointer;
	width: calc(16.3125rem / 1.5);
	height: calc(2.75rem / 1.5);
	border-radius: 2rem;
	font-weight: 100;
`;

const Title = styled.h1`
	font-size: 1.5rem;
	font-weight: 300;
	margin-bottom: 2rem;
	margin-top: 2rem;
`;

const Divider = styled.div`
	width: 100%;
	margin-top: 2rem;
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
`;

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

const Informations = styled.ul`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: fit-content;
  gap: 0.5rem;
`;

const Information = styled.li`
	display: flex;
	gap: 0.3rem;
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

const MainTitle = styled(Title)`
	font-weight: 400;
	width: 100%;
	text-align: center;
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

const SpacerDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

// Esta página "Workshop" é responsável por renderizar a página de uma oficina
export default function Workshop() {

	// Armazenamento do estado de carregamento, presenças, modal visível, alunos da turma e professor da turma
	const [loading, setLoading] = useState(false);
	const [presences, setPresences] = useState<any>([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [studentsClassroom, setStudentsClassroom] = useState<Array<any>>([]);;
	const [teacherClassroom, setTeacherClassroom] = useState([]);
	const [workshopName, setWorkshopName] = useState([]);
	const [classroomName, setClassroomName] = useState([]);
	const [excludedStudentIds, setExcludedStudentIds] = useState<number[]>([]);
	const [idOng, setIdOng] = useState<number>(0);
	const [idClass, setIdClass] = useState<number | null>(null);
	const [durationDescription, setDurationDescription] = useState('');
	const [description, setDescription] = useState('');

	// Função para capturar o id da URL
	function getTurmaIdFromURL(): any {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get('id') || '';
	}

	// Função para formatar a descrição da duração da aula
	function formatClassTime(day: any, startTime: any, endTime: any) {
		const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
		const formattedStartTime = moment(startTime, 'HH:mm:ss').format('HH:mm');
		const formattedEndTime = moment(endTime, 'HH:mm:ss').format('HH:mm');

		return `${daysOfWeek[day]} das ${formattedStartTime} às ${formattedEndTime}`;
	}

	// Função para capturar o id da URL
	useEffect(() => {
		const turmaId = getTurmaIdFromURL();
		const numericTurmaId = Number(turmaId);

		if (numericTurmaId > 0) {
			setIdClass(numericTurmaId);
		} else {
			console.log("ID da turma não é válido ou não está presente na URL.");
		}
	}, []);

	// Função assíncrona para buscar as informações dos alunos da turma
	useEffect(() => {
		(async () => {
			await fetchStudents();
		})();
	}, [idClass]);

	// Função para buscar os alunos da turma
	async function fetchStudents() {
		if (idClass) {
			const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/workshops/classroom/${idClass}/students`);
			const data = await response.json();

			// Atualização do estado de informações da turma
			setStudentsClassroom(data);
			// Coletar IDs dos alunos para exclusão
			const studentIds = data.map((student: any) => student.id);
			setExcludedStudentIds(studentIds);

			console.log(data.length);
		}
	}

	// Função assíncrona para buscar as informações da turma
	useEffect(() => {
		let idClass = getTurmaIdFromURL();
		async function getClassroom() {
			const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/workshops/classroom/${idClass}`);
			const data = await response.json();
			console.log(data)

			// Atualização do estado de informações da turma
			setWorkshopName(data[0].name);
			setClassroomName(data[0].classroom[0].classroomname);
			setTeacherClassroom(data[0].classroom[0].professor);
			setIdOng(data[0].ongid);
			setDescription(data[0].description);

			// Novo: Formatar e atualizar o estado com a descrição da duração
			const formattedDuration = formatClassTime(data[0].classroom[0].day, data[0].classroom[0].starttime, data[0].classroom[0].endtime);
			setDurationDescription(formattedDuration);
		}

		getClassroom();
	}, []);

	// Atualização do estado de carregamento
	useEffect(() => {
		setLoading(true)
	}, [])

	// Função para alternar a presença de um aluno	
	function togglePresence(id: number) {
		if (presences.includes(id)) {
			setPresences((prev: any) => prev.filter((idInPresence: number) => idInPresence !== id));
		} else {
			setPresences((prev: any) => [...prev, id]);
		}
	}

	// função para atualizar a tela após adicionar um aluno
	function handleAddStudent() {
		fetchStudents();
	}

	// Função para registrar as presenças
	function register() {
		const body = {
			classId: '1',
			professorId: '1',
			presences: presences,
		}
		console.log(body);
	}

	// Renderização condicional da página
	if (loading) {
		return (
			<Page>
				<ButtonBack />
				<SpacerDiv>
					<div>
						<Title>{workshopName} - {classroomName}</Title>
						<Informations>
							<Information>
								<InformationLabel>Professor:</InformationLabel>
								<InformationValue>{teacherClassroom}</InformationValue>
							</Information>
							<Information>
								<InformationLabel>Duração:</InformationLabel>
								<InformationValue>{durationDescription}</InformationValue>
							</Information>
							<Information>
								<InformationLabel>Descrição:</InformationLabel>
								<InformationValue>{description}</InformationValue>
							</Information>
						</Informations>
					</div>
					<Informations>
						<Information>
							<InformationLabel>Total de alunos:</InformationLabel>
							<InformationValue>{studentsClassroom.length}</InformationValue>
						</Information>
					</Informations>
				</SpacerDiv>
				<Divider></Divider>
				<Main>
					<MainTitle>Lista de Alunos</MainTitle>
					<SpacerDiv>
						{/* <Informations>
							<Information>
								<InformationLabel>Data e horário:</InformationLabel>
								<InformationValue>{moment('02/02/2024').format('DD/MM/YYYY')} às {moment('13:00').format('HH:mm')}</InformationValue>
							</Information>
						</Informations> */}
						<Informations>
							<Information>
								<InformationLabel>Nome dos alunos</InformationLabel>
							</Information>
						</Informations>
						<>
							<CustomButton onClick={() => setModalVisible(true)}>Adicionar aluno</CustomButton>
							<StudentAddModal classroomId={idClass} onAddStudent={handleAddStudent} idOng={idOng} excludedStudentIds={excludedStudentIds} isModalVisible={modalVisible} setIsModalVisible={setModalVisible} />
						</>
					</SpacerDiv>
					<DivStudentList>
						{studentsClassroom.map((student: any, index: number) => (
							<StudentModal key={index} student={student} functions={() => togglePresence(student.id)} />
						))}
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