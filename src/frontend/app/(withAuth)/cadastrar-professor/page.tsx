// Define o ambiente de execução como cliente
'use client'

// Componentes internos do projeto
import LoadingPassaro from '@/components/ui/loading/passaroLoading';
import FormRegister from '@/components/ui/form/FormRegister';
import InitialStructureForm from '@/components/ui/form/initialStructureForm';

// Bibliotecas externas
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';

// Estilização
const BackButtonCustom = styled.div`
	padding-left: 2rem;
	padding-right: 3rem;
	padding-top: 2rem;
`;

// Esta página "RegisterTeacher" é responsável por renderizar o formulário de cadastro de um novo professor
export default function RegisterTeacher() {

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
          <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => window.location.href = "/"}>
            Voltar
          </Button>
        </BackButtonCustom>
        <InitialStructureForm
          title='Preencha as informações abaixo para cadastrar um(a) novo(a) professor(a)!'
        >
          <FormRegister entity='professor' url='teachers' />
        </InitialStructureForm>
      </>
    );
  } else {
    return (
      <LoadingPassaro />
    )
  }
}