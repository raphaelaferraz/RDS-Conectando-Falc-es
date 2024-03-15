// Componente interno do projeto
import FormEdit from '../form/formEdit';

// Bibliotecas externas
import React, { useEffect, useState } from 'react';
import { Checkbox, Modal, Avatar, Space, Button, Form, Input, Select } from 'antd';
import { UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import ButtonPrimaryModal from '../button/buttonPrimaryModal';
import ButtonSecundaryModal from '../button/buttonSecundaryModal';
import moment from 'moment';

// Estilização
const LabelStudentName = styled.p`
  &:hover {
    cursor: pointer;
    color: #1F5673;
  }
`;

const DivStudent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border: 1px solid #1F5673;
  border-radius: 10px; 
`;

const CheckboxPresenca = styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #1F5673; 
    border-color: #1F5673;
  }
`;

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

// Este componente é um modal que exibe as informações de um estudante
export default function StudentModal({ student, functions }: { student: any, functions?: any}) {

  // Armazenamento do estado do modal e do modo de edição
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const dateofbirth = new Date(student.dateofbirth).toLocaleString('pt-BR', { timeZone: 'UTC' }).split(',')[0];

  // Armazenameto do estado do formulário
  const [formData, setFormData] = useState(student);

  // Funções que controlam a visibilidade do modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Função que envia os dados do formulário de atualização do aluno
  const submit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/students/${formData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Algo deu errado na atualização do estudante');
      }
      console.log('Estudante atualizado com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar estudante:', error);
    }
  };

  return (
    <>
      <DivStudent>
        <LabelStudentName onClick={showModal}>{formData.name}</LabelStudentName>
        <CheckboxPresenca onChange={functions}></CheckboxPresenca>
      </DivStudent>
      <Modal style={{ top: '10%' }} width={600} title={editMode ? "Editar Aluno" : "Detalhes do Estudante"} visible={isModalVisible} onOk={handleOk} onCancel={() => { setEditMode(false); handleCancel(); }} footer={null} >

        {!editMode ? (
          <>
            <Space direction="vertical" size="middle" style={{ rowGap: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Avatar size={64} icon={<UserOutlined />} />
              <p>{formData.name}</p>
            </Space>
            <Informations>
              <ContainerInformations>
                <ContentInformations>
                  <LabelInformation>Data de Nascimento:</LabelInformation>
                  <span>{dateofbirth}</span>

                </ContentInformations>

                <ContentInformations>
                  <LabelInformation>RG:</LabelInformation>
                  <span>{formData.rg}</span>
                </ContentInformations>

                <ContentInformations>
                  <LabelInformation>Estado Civil: </LabelInformation>
                  <span>{formData.maritalstatus}</span>
                </ContentInformations>

                <ContentInformations>
                  <LabelInformation>Endereço:</LabelInformation>
                  <span>{formData.address}</span>
                </ContentInformations>

                <ContentInformations>
                  <LabelInformation>Estado:</LabelInformation>
                  <span>{formData.state}</span>
                </ContentInformations>

                <ContentInformations>
                  <LabelInformation>Telefone Fixo:</LabelInformation>
                  <span>{formData.landline}</span>
                </ContentInformations>
              </ContainerInformations>
              <ContainerInformations>

                <ContentInformations>
                  <LabelInformation>Gênero:</LabelInformation>
                  <span>{formData.gender}</span>
                </ContentInformations>

                <ContentInformations>
                  <LabelInformation>CPF:</LabelInformation>
                  <span>{formData.cpf}</span>
                </ContentInformations>

                <ContentInformations>
                  <LabelInformation>Raça/Etnia:</LabelInformation>
                  <span>{formData.raceethnicity}</span>
                </ContentInformations>

                <ContentInformations>
                  <LabelInformation>Cidade:</LabelInformation>
                  <span>{formData.city}</span>
                </ContentInformations>

                <ContentInformations>
                  <LabelInformation>Celular:</LabelInformation>
                  <span>{formData.phonenumber}</span>
                </ContentInformations>

                <ContentInformations>
                  <LabelInformation>Email:</LabelInformation>
                  <span>{formData.email}</span>
                </ContentInformations>
              </ContainerInformations>
            </Informations>
            <ActionsContainer>
              <ButtonPrimaryModal icon={<EditOutlined />} handleClick={() => setEditMode(true)}>Editar</ButtonPrimaryModal>
              <ButtonSecundaryModal icon={<DeleteOutlined />} handleClick={() => alert("teste de remoção")}>Remover</ButtonSecundaryModal>
            </ActionsContainer>
          </>
        ) : (
          <>
            <FormEdit formData={formData} setFormData={setFormData} handleFormSubmit={submit}>
              <Form.Item>
                <ButtonPrimaryModal type="submit">Salvar</ButtonPrimaryModal>
                <ButtonSecundaryModal handleClick={() => setEditMode(false)}>Cancelar</ButtonSecundaryModal>
              </Form.Item>
            </FormEdit>
          </>
        )}
      </Modal>
    </>
  );
}
