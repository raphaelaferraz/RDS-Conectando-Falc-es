'use client'

// Bibliotecas externas
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import Link from 'next/link';
import { Checkbox, Modal, Avatar, Button, Form, Input, Select } from 'antd';
import InfoModal from './infoModal';
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

const Span = styled.span`
    font-size: 1.5rem;
    font-weight: 300;
    margin-top: 2rem;
    margin-bottom: 2rem;
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
	padding: 0.5rem 1rem 0.5rem 1rem;
	border-radius: 10px; 
    align-items: center;
`;

const LabelProfessor = styled.h1`
	font-size: 1rem;
	font-weight: 400;
    margin-right: 0.5rem;
`;

const LabelClassrrom = styled.p`
    font-size: 0.8rem;
    font-weight: 400;
    margin-left: 0.4rem;
`

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
    margin-left: auto;
`;

const FilterText = styled.span`
    margin-left: 0.5rem;
    font-weight: 100;
    font-weight: 300;
`

export default function Professors() {
    // Armazenamento dos estados de texto de busca, filtro, itens do dropdown, oficinas e categorias	
    const [searchText, setSearchText] = useState<string>();
    const [data, setProfessors] = useState<any>();
    const [filter, setFilter] = useState<number | null>();
    const [items, setDropdownItems] = useState<any>();

	
    // Armazenamento do estado do modal e do modo de edição
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAddProfessorModalVisible, setIsAddProfessorModalVisible] = useState(false);

    // Funções que controlam a visibilidade do modal
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOkAddProfessor = () => {
        setIsAddProfessorModalVisible(false);
    };

    const handleCancelAddProfessor = () => {
        setIsAddProfessorModalVisible(false);
    };

    useEffect(() => {
        let uniqueItems = Array.from(new Set(data?.professors?.map((item: any) => item.workshop)));

        const items = [
            {
                label: (
                    <div onClick={() => setFilter(null)}>
                        Todas
                    </div>
                ),
                key: null
            },
            ...uniqueItems.map((workshop: any) => {
                return {
                    label: (
                        <div onClick={() => setFilter(workshop)}>
                            {workshop}
                        </div>
                    ),
                    key: workshop
                }
            })
        ]

        setDropdownItems(items);
    }, [data])

    // Função assíncrona que busca as oficinas da ONG no backend
    useEffect(() => {
        const getWorkshops = async () => {
            try {
                const response = await fetch('http://localhost:3001/teachers');
                const data = await response.json();
                console.log(data)
                setProfessors(data);
            } catch (error) {
                console.error('Erro ao buscar workshops:', error);
            }
        };
        getWorkshops();
    }, []);

    // Função que envia os dados do formulário
    const submit = () => {
        console.log("Dados do formulário enviados");
    };

    return (
        <>
            <Page>
                <Title>Professores da <Span style={{ fontWeight: 400 }}> {data?.[0]?.ongname}</Span></Title>
                <Divider></Divider>
                <Main>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Search placeholder={'Digite o nome de um professor'} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        <Dropdown menu={{ items }}>
                            <a>
                                <Space>
                                    <Filter>
                                        <FilterOutlined style={{ fontSize: '1rem' }} />
                                        <FilterText>{filter || 'Todas'}</FilterText>
                                    </Filter>
                                </Space>
                            </a>
                        </Dropdown>
                        <CustomButton onClick={() => setIsAddProfessorModalVisible(true)}>Adicionar professor</CustomButton>
                    </div>
                    <DivStudentList>
                    {data?.map((professor: any) =>
                        <DivStudent onClick={showModal}>
                            <LabelProfessor>{professor.name}</LabelProfessor>
                            {/* -<LabelClassrrom>Atua em: {classroom.classroomname} - {classroom.workshopname}</LabelClassrrom> */}
                        </DivStudent>
                    )}
                    </DivStudentList>
                </Main>
            </Page>
            <InfoModal data={data} setProfessors={setProfessors} setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} />
            <Modal okText={'Adicionar'} centered title="Adicionar Professor" open={isAddProfessorModalVisible} onOk={handleOkAddProfessor} onCancel={handleCancelAddProfessor}>
                <Form initialValues={data} onFinish={submit}>
                    <Select
                        style={{ width: '350px', marginLeft: 'auto', marginRight: 'auto', display: 'block', marginTop: '20px', marginBottom: '20px' }}
                        placeholder="Selecione o professor(a)">
                        <Select.Option value='Professor 1'>Professor 1</Select.Option>
                        <Select.Option value='Professor 2'>Professor 2</Select.Option>
                        <Select.Option value='Professor 3'>Professor 3</Select.Option>
                    </Select>
                </Form>
            </Modal>
        </>
    );
}