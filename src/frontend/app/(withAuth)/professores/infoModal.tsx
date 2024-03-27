'use client'

import styled from 'styled-components';
import { Modal, Avatar, Button, Form, Input, Select, Dropdown, Space } from 'antd';
import { UserOutlined, EditOutlined, DeleteOutlined, TeamOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import AddClassroomModeContent from './addClassroomModeContent';
import moment from 'moment';



const Informations = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  padding: 1rem;
  margin-top: 1rem;
`;

const ContainerInformations = styled.div`
  padding: 0.2rem;
`;

const LabelInformation = styled.p`
  font-weight: 600;
  display: inline;
`;

const ContentInformations = styled.div`
  display: flex;
  justify-content: center;
  width: fit-content;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding-top: 20px; 
`;

const ButtonPrimary = styled(Button)`
  background: #1F5673 !important;
  border-color: #1F5673 !important;
  color: #ffffff !important;

  &:hover, &:focus {
    background: #ffffff !important; 
    border-color: #16455b !important;
    color: #16455b !important;
  }
`;

const HoverButtonDelete = styled(Button)`
  &:hover, &:focus {
    background: #ffffff !important; 
    border-color: #16455b !important;
    color: #16455b !important;
  } 
`;

export default function InfoModal({ data, setProfessors, setIsModalVisible, isModalVisible, selectedProfessorId, getWorkshops }: { data: any, setProfessors: any, setIsModalVisible: any, isModalVisible: any, selectedProfessorId: number | undefined, getWorkshops: any }) {
    const [editMode, setEditMode] = useState(false);
    const [addClassroomMode, setAddClassroomMode] = useState(false);
    const [professorData, setProfessorData] = useState<any>();

    // Função que envia os dados do formulário
    const saveInfo = (professor: any) => {
        async function editInfo() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/teachers/${professorData.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(professor),
            });
            console.log(response);

            if (response.ok) {
                const index = data.findIndex((professor: any) => professor.id === professorData.id);

                setProfessors((prev: any) => {
                    const newList = [...prev];
                    newList[index] = { ...newList[index], ...professor };
                    return newList
                });

                setEditMode(false);
                setProfessorData(professor);
            }
        }

        editInfo();
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditMode(false);
        setAddClassroomMode(false);
    };

    useEffect(() => {
        if (data) {
            setProfessorData(data.find((professor: any) => professor.id === selectedProfessorId));
        }
    }, [data, selectedProfessorId])

    return (
        <Modal centered style={{ top: '0' }} width={600} title={editMode ? "Editar Professor" : addClassroomMode ? "Turmas do professor" : "Detalhes do Professor"} open={isModalVisible} onOk={handleOk} onCancel={() => { setEditMode(false); handleCancel(); }} footer={null} >
            {!editMode ?
                addClassroomMode ?
                    <>
                        <AddClassroomModeContent getWorkshops={getWorkshops} data={data} selectedProfessorId={selectedProfessorId} setAddClassroomMode={setAddClassroomMode} />
                    </>
                    :
                    <>
                        <Space direction="vertical" size="middle" style={{ rowGap: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Avatar size={64} icon={<UserOutlined />} />
                            <p>{professorData?.name}</p>
                        </Space>
                        <Informations>
                            <ContainerInformations>
                                <ContentInformations>
                                    <LabelInformation>Data de Nascimento:</LabelInformation>
                                    <span>{moment(professorData?.dateofbirth).format('DD/MM/YYYY')}</span>
                                </ContentInformations>

                                <ContentInformations>
                                    <LabelInformation>RG:</LabelInformation>
                                    <span>{professorData?.rg}</span>
                                </ContentInformations>

                                <ContentInformations>
                                    <LabelInformation>Estado Civil: </LabelInformation>
                                    <span>{professorData?.maritalstatus}</span>
                                </ContentInformations>

                                <ContentInformations>
                                    <LabelInformation>Endereço:</LabelInformation>
                                    <span>{professorData?.address}</span>
                                </ContentInformations>

                                <ContentInformations>
                                    <LabelInformation>Estado:</LabelInformation>
                                    <span>{professorData?.state}</span>
                                </ContentInformations>

                                <ContentInformations>
                                    <LabelInformation>Telefone Fixo:</LabelInformation>
                                    <span>{professorData?.landline}</span>
                                </ContentInformations>
                            </ContainerInformations>
                            <ContainerInformations>

                                <ContentInformations>
                                    <LabelInformation>Gênero:</LabelInformation>
                                    <span>{professorData?.gender === 'F' ? 'Feminino' : 'Masculino'}</span>
                                </ContentInformations>

                                <ContentInformations>
                                    <LabelInformation>CPF:</LabelInformation>
                                    <span>{professorData?.cpf}</span>
                                </ContentInformations>

                                <ContentInformations>
                                    <LabelInformation>Raça/Etnia:</LabelInformation>
                                    <span>{professorData?.raceethnicity}</span>
                                </ContentInformations>

                                <ContentInformations>
                                    <LabelInformation>Cidade:</LabelInformation>
                                    <span>{professorData?.city}</span>
                                </ContentInformations>

                                <ContentInformations>
                                    <LabelInformation>Celular:</LabelInformation>
                                    <span>{professorData?.phonenumber}</span>
                                </ContentInformations>

                                <ContentInformations>
                                    <LabelInformation>Email:</LabelInformation>
                                    <span>{professorData?.email}</span>
                                </ContentInformations>
                            </ContainerInformations>
                        </Informations>
                        <ActionsContainer>
                            <ButtonPrimary icon={<EditOutlined />} onClick={() => setEditMode(true)}>Editar</ButtonPrimary>
                            <ButtonPrimary icon={<TeamOutlined />} onClick={() => setAddClassroomMode(true)}>Turmas</ButtonPrimary>
                            {/* <HoverButtonDelete icon={<DeleteOutlined />} onClick={() => alert("teste de remoção")}>Remover</HoverButtonDelete> */}
                        </ActionsContainer>
                    </>
                :
                <Form onFinish={saveInfo} layout="vertical">
                    <Form.Item
                        label="Nome Completo"
                        name="name"
                        initialValue={professorData?.name}
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira o nome do professor!'
                            }
                        ]}
                    >
                        <Input
                            // onChange={(e) => setProfessors({ ...data, name: e.target.value })}
                            placeholder="Nome do Professor:"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Data de Aniversário:"
                        name="dateofbirth"
                        initialValue={professorData?.dateofbirth}
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira a data de aniversário do professor!'
                            }
                        ]}>
                        <Input
                            // onChange={(e) => setProfessors({ ...data, dateOfBirth: e.target.value })}
                            placeholder="DD/MM/AAAA" />
                    </Form.Item>
                    <Form.Item
                        label="Gênero:"
                        name="gender"
                        initialValue={professorData?.gender}
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira o gênero do professor!'
                            }
                        ]}
                    >
                        <Select
                            // onChange={(value) => setProfessors({ ...data, gender: value })}
                            placeholder="Selecione o gênero do(a) professor(a)">
                            <Select.Option value="M">Feminino</Select.Option>
                            <Select.Option value="F">Masculino</Select.Option>
                            <Select.Option value="O">Outro</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="RG:"
                        name="rg"
                        initialValue={professorData?.rg}
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira o RG do professor!'
                            }
                        ]}
                    >
                        <Input
                            // onChange={(e) => setProfessors({ ...data, rg: e.target.value })}
                            placeholder="RG do Professor:" />
                    </Form.Item>

                    <Form.Item
                        label="CPF:"
                        name="cpf"
                        initialValue={professorData?.cpf}
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira o CPF do professor!'
                            }
                        ]}
                    >
                        <Input
                            // onChange={(e) => setProfessors({ ...data, cpf: e.target.value })}
                            placeholder="CPF do Professor:" />
                    </Form.Item>

                    <Form.Item
                        label="Estado Civil:"
                        name="maritalstatus"
                        initialValue={professorData?.maritalstatus}
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira o estado civil do(a) professor(a)!'
                            }
                        ]}
                    >
                        <Select
                            // onChange={(value) => setProfessors({ ...data, maritalStatus: value })}
                            placeholder="Selecione o estado civil do(a) professor(a)">
                            <Select.Option value="solteiro">Solteiro(a)</Select.Option>
                            <Select.Option value="casado">Casado(a)</Select.Option>
                            <Select.Option value="divorciado">Divorciado(a)</Select.Option>
                            <Select.Option value="viúvo">Viúvo(a)</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Raça/Etnia:"
                        name="raceethnicity"
                        initialValue={professorData?.raceethnicity}
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira a raça/etnia do(a) professor(a)!'
                            }
                        ]}
                    >
                        <Select
                            // onChange={(value) => setProfessors({ ...data, raceEthnicity: value })}
                            placeholder="Selecione a raça/etnia do(a) professor(a)">
                            <Select.Option value='branco'>Branco(a)</Select.Option>
                            <Select.Option value='preto'>Preto(a)</Select.Option>
                            <Select.Option value='pardo'>Pardo(a)</Select.Option>
                            <Select.Option value='amarelo'>Amarelo(a)</Select.Option>
                            <Select.Option value='indigena'>Indígena</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Endereço:"
                        name="address"
                        initialValue={professorData?.address}
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira o endereço do(a) professor(a)!'
                            }
                        ]}
                    >
                        <Input
                            // onChange={(e) => setProfessors({ ...data, address: e.target.value })}
                            placeholder="Endereço do(a) professor(a):" />
                    </Form.Item>

                    <Form.Item
                        label="Estado:"
                        name="state"
                        initialValue={professorData?.state}
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira o estado do(a) professor(a)!'
                            }
                        ]}
                    >
                        <Select
                            // onChange={(value) => setProfessors({ ...data, state: value })}
                            placeholder="Selecione o estado do(a) professor(a)">
                            <Select.Option value='Acre'>Acre</Select.Option>
                            <Select.Option value='Alagoas'>Alagoas</Select.Option>
                            <Select.Option value='Amapá'>Amapá</Select.Option>
                            <Select.Option value='Amazonas'>Amazonas</Select.Option>
                            <Select.Option value='Bahia'>Bahia</Select.Option>
                            <Select.Option value='Ceará'>Ceará</Select.Option>
                            <Select.Option value='Distrito Federal'>Distrito Federal</Select.Option>
                            <Select.Option value='Espírito Santo'>Espírito Santo</Select.Option>
                            <Select.Option value='Goiás'>Goiás</Select.Option>
                            <Select.Option value='Maranhão'>Maranhão</Select.Option>
                            <Select.Option value='Mato Grosso'>Mato Grosso</Select.Option>
                            <Select.Option value='Mato Grosso do Sul'>Mato Grosso do Sul</Select.Option>
                            <Select.Option value='Minas Gerais'>Minas Gerais</Select.Option>
                            <Select.Option value='Pará'>Pará</Select.Option>
                            <Select.Option value='Paraíba'>Paraíba</Select.Option>
                            <Select.Option value='Paraná'>Paraná</Select.Option>
                            <Select.Option value='Pernambuco'>Pernambuco</Select.Option>
                            <Select.Option value='Piauí'>Piauí</Select.Option>
                            <Select.Option value='Rio de Janeiro'>Rio de Janeiro</Select.Option>
                            <Select.Option value='Rio Grande do Norte'>Rio Grande do Norte</Select.Option>
                            <Select.Option value='Rio Grande do Sul'>Rio Grande do Sul</Select.Option>
                            <Select.Option value='Rondônia'>Rondônia</Select.Option>
                            <Select.Option value='Roraima'>Roraima</Select.Option>
                            <Select.Option value='Santa Catarina'>Santa Catarina</Select.Option>
                            <Select.Option value='São Paulo'>São Paulo</Select.Option>
                            <Select.Option value='Sergipe'>Sergipe</Select.Option>
                            <Select.Option value='Tocantins'>Tocantins</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Cidade:"
                        name="city"
                        initialValue={professorData?.city}
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira a cidade do(a) professor(a)!'
                            }
                        ]}
                    >
                        <Input
                            // onChange={(e) => setProfessors({ ...data, city: e.target.value })}
                            placeholder="Cidade do(a) professor(a):" />
                    </Form.Item>

                    <Form.Item
                        label="Telefone Fixo:"
                        name="landline"
                        initialValue={professorData?.landline}
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira o telefone do(a) professor(a)!'
                            }
                        ]}
                    >
                        <Input
                            // onChange={(e) => setProfessors({ ...data, landlinePhone: e.target.value })}
                            placeholder="Telefone do(a) professor(a):" />
                    </Form.Item>

                    <Form.Item
                        label="Celular:"
                        name="phonenumber"
                        initialValue={professorData?.phonenumber}
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira o celular do(a) professor(a)!'
                            }
                        ]}
                    >
                        <Input
                            // onChange={(e) => setProfessors({ ...data, phoneNumber: e.target.value })}
                            placeholder="Celular do(a) professor(a):" />
                    </Form.Item>

                    <Form.Item
                        label="Email:"
                        name="email"
                        initialValue={professorData?.email}
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira o email do(a) professor(a)!'
                            }
                        ]}
                    >
                        <Input
                            // onChange={(e) => setProfessors({ ...data, email: e.target.value })}
                            placeholder="Email do(a) professor(a):" />
                    </Form.Item>
                    <Form.Item>
                        <ActionsContainer>
                            <ButtonPrimary type="primary" htmlType="submit">Salvar</ButtonPrimary>
                            <HoverButtonDelete onClick={() => setEditMode(false)}>Cancelar</HoverButtonDelete>
                        </ActionsContainer>
                    </Form.Item>
                </Form>
            }
        </Modal >
    )
}