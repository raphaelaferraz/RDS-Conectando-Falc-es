'use client'

import styled from 'styled-components';
import { Modal, Avatar, Button, Form, Input, Select, Dropdown, Space } from 'antd';
import { UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';

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

export default function InfoModal({ data, setProfessors, setIsModalVisible, isModalVisible }: { data: any, setProfessors: any, setIsModalVisible: any, isModalVisible: any }) {
    const [editMode, setEditMode] = useState(false);

    // Função que envia os dados do formulário
    const submit = () => {
        console.log("Dados do formulário enviados");
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Modal centered style={{ top: '0' }} width={600} title={editMode ? "Editar Professor" : "Detalhes do Professor"} open={isModalVisible} onOk={handleOk} onCancel={() => { setEditMode(false); handleCancel(); }} footer={null} >
            {!editMode ?
                <>
                    <Space direction="vertical" size="middle" style={{ rowGap: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Avatar size={64} icon={<UserOutlined />} />
                        <p>{'professor'}</p>
                    </Space>
                    <Informations>
                        <ContainerInformations>
                            <ContentInformations>
                                <LabelInformation>Data de Nascimento:</LabelInformation>
                                <span>{'01/09/2003'}</span>
                            </ContentInformations>

                            <ContentInformations>
                                <LabelInformation>RG:</LabelInformation>
                                <span>{'8320432493'}</span>
                            </ContentInformations>

                            <ContentInformations>
                                <LabelInformation>Estado Civil: </LabelInformation>
                                <span>{'Casado'}</span>
                            </ContentInformations>

                            <ContentInformations>
                                <LabelInformation>Endereço:</LabelInformation>
                                <span>{'Rua M.M.D.C, 80'}</span>
                            </ContentInformations>

                            <ContentInformations>
                                <LabelInformation>Estado:</LabelInformation>
                                <span>{'São Paulo'}</span>
                            </ContentInformations>

                            <ContentInformations>
                                <LabelInformation>Telefone Fixo:</LabelInformation>
                                <span>{'3431-2384'}</span>
                            </ContentInformations>
                        </ContainerInformations>
                        <ContainerInformations>

                            <ContentInformations>
                                <LabelInformation>Gênero:</LabelInformation>
                                <span>{'Feminino'}</span>
                            </ContentInformations>

                            <ContentInformations>
                                <LabelInformation>CPF:</LabelInformation>
                                <span>{'127.241.657.39'}</span>
                            </ContentInformations>

                            <ContentInformations>
                                <LabelInformation>Raça/Etnia:</LabelInformation>
                                <span>{'Branca'}</span>
                            </ContentInformations>

                            <ContentInformations>
                                <LabelInformation>Cidade:</LabelInformation>
                                <span>{'São Paulo'}</span>
                            </ContentInformations>

                            <ContentInformations>
                                <LabelInformation>Celular:</LabelInformation>
                                <span>{'(11) 99236-6719'}</span>
                            </ContentInformations>

                            <ContentInformations>
                                <LabelInformation>Email:</LabelInformation>
                                <span>{'professor241@gmail.com'}</span>
                            </ContentInformations>
                        </ContainerInformations>
                    </Informations>
                    <ActionsContainer>
                        <ButtonPrimary icon={<EditOutlined />} onClick={() => setEditMode(true)}>Editar</ButtonPrimary>
                        <HoverButtonDelete icon={<DeleteOutlined />} onClick={() => alert("teste de remoção")}>Remover</HoverButtonDelete>
                    </ActionsContainer>
                </>
                :
                <Form onFinish={submit}>
                    <Form.Item
                        label="Nome Completo"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira o nome do professor!'
                            }
                        ]}
                    >
                        <Input
                            value={data}
                            onChange={(e) => setProfessors({ ...data, name: e.target.value })}
                            placeholder="Nome do Professor:" />
                    </Form.Item>
                    <Form.Item
                        label="Data de Aniversário:"
                        name="dateOfBirth"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira a data de aniversário do professor!'
                            }
                        ]}>
                        <Input
                            value={data}
                            onChange={(e) => setProfessors({ ...data, dateOfBirth: e.target.value })}
                            placeholder="DD/MM/AAAA" />
                    </Form.Item>
                    <Form.Item
                        label="Gênero:"
                        name="gender"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira o gênero do professor!'
                            }
                        ]}
                    >
                        <Select
                            value={data.gender}
                            onChange={(value) => setProfessors({ ...data, gender: value })}
                            placeholder="Selecione o gênero do(a) professor(a)">
                            <Select.Option value="M">Feminino</Select.Option>
                            <Select.Option value="F">Masculino</Select.Option>
                            <Select.Option value="O">Outro</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="RG:"
                        name="rg"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira o RG do professor!'
                            }
                        ]}
                    >
                        <Input
                            value={data.rg}
                            onChange={(e) => setProfessors({ ...data, rg: e.target.value })}
                            placeholder="RG do Professor:" />
                    </Form.Item>

                    <Form.Item
                        label="CPF:"
                        name="cpf"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira o CPF do professor!'
                            }
                        ]}
                    >
                        <Input
                            value={data.cpf}
                            onChange={(e) => setProfessors({ ...data, cpf: e.target.value })}
                            placeholder="CPF do Professor:" />
                    </Form.Item>

                    <Form.Item
                        label="Estado Civil:"
                        name="maritalStatus"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira o estado civil do(a) professor(a)!'
                            }
                        ]}
                    >
                        <Select
                            value={data.maritalStatus}
                            onChange={(value) => setProfessors({ ...data, maritalStatus: value })}
                            placeholder="Selecione o estado civil do(a) professor(a)">
                            <Select.Option value="solteiro">Solteiro(a)</Select.Option>
                            <Select.Option value="casado">Casado(a)</Select.Option>
                            <Select.Option value="divorciado">Divorciado(a)</Select.Option>
                            <Select.Option value="viúvo">Viúvo(a)</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Raça/Etnia:"
                        name="raceEthnicity"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira a raça/etnia do(a) professor(a)!'
                            }
                        ]}
                    >
                        <Select
                            value={data.raceEthnicity}
                            onChange={(value) => setProfessors({ ...data, raceEthnicity: value })}
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
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira o endereço do(a) professor(a)!'
                            }
                        ]}
                    >
                        <Input
                            value={data.address}
                            onChange={(e) => setProfessors({ ...data, address: e.target.value })}
                            placeholder="Endereço do(a) professor(a):" />
                    </Form.Item>

                    <Form.Item
                        label="Estado:"
                        name="state"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira o estado do(a) professor(a)!'
                            }
                        ]}
                    >
                        <Select
                            value={data.state}
                            onChange={(value) => setProfessors({ ...data, state: value })}
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
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira a cidade do(a) professor(a)!'
                            }
                        ]}
                    >
                        <Input
                            value={data.city}
                            onChange={(e) => setProfessors({ ...data, city: e.target.value })}
                            placeholder="Cidade do(a) professor(a):" />
                    </Form.Item>

                    <Form.Item
                        label="Telefone Fixo:"
                        name="landlinePhone"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira o telefone do(a) professor(a)!'
                            }
                        ]}
                    >
                        <Input
                            value={data.landlinePhone}
                            onChange={(e) => setProfessors({ ...data, landlinePhone: e.target.value })}
                            placeholder="Telefone do(a) professor(a):" />
                    </Form.Item>

                    <Form.Item
                        label="Celular:"
                        name="phoneNumber"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira o celular do(a) professor(a)!'
                            }
                        ]}
                    >
                        <Input
                            value={data.phoneNumber}
                            onChange={(e) => setProfessors({ ...data, phoneNumber: e.target.value })}
                            placeholder="Celular do(a) professor(a):" />
                    </Form.Item>

                    <Form.Item
                        label="Email:"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira o email do(a) professor(a)!'
                            }
                        ]}
                    >
                        <Input
                            value={data.email}
                            onChange={(e) => setProfessors({ ...data, email: e.target.value })}
                            placeholder="Email do(a) professor(a):" />
                    </Form.Item>
                    <Form.Item>
                        <ButtonPrimary>Salvar</ButtonPrimary>
                        <HoverButtonDelete onClick={() => setEditMode(false)}>Cancelar</HoverButtonDelete>
                    </Form.Item>
                </Form>
            }
        </Modal>
    )
}