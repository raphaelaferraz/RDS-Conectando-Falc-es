// Define o ambiente de execução como cliente
'use client'

// Componentes internos do projeto
import LoadingPassaro from '@/components/ui/loading/passaroLoading';
import FormRegisterClassroom from '@/components/ui/form/FormRegisterClassroom';
import IntialStructureForm from '@/components/ui/form/initialStructureForm';
import ButtonBack from '@/components/ui/button/buttonBack';

// Bibliotecas externas
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';

// Estilização 
const BackButtonCustom = styled.div`
  display: flex;
  margin: 1rem 3rem;
  width: 80px;
`;

// Esta página "RegisterClassroom" é responsável por renderizar o formulário de cadastro de uma nova turma
export default function RegisterClassroom() {

  // Armazenamento do estado de carregamento
  const [loading, setLoading] = useState(false);

  // Atualização do estado de carregamento 
  useEffect(() => {
    setLoading(true);
  }, [])

  // Renderização condicional do formulário de cadastro
  if (loading) {
    return (
      <>
        <BackButtonCustom>
          <Button type="text" icon={<ArrowLeftOutlined />} style={{ padding: '0px' }} onClick={() => window.location.href = "/"}>
            Voltar
          </Button>
        </BackButtonCustom>
        <IntialStructureForm
          title='Preencha as informações abaixo para cadastrar uma nova turma!'
        >
          <FormRegisterClassroom entity='turma' url='classrooms' />
        </IntialStructureForm>
      </>
    );
  } else {
    return (
      <LoadingPassaro />
    );
  }
}