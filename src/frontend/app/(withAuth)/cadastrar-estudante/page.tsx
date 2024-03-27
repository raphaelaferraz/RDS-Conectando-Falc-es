// Define o ambiente de execução como cliente
'use client'

// Componentes internos do projeto
import LoadingPassaro from '@/components/ui/loading/passaroLoading';
import FormStudentRegister from '@/components/ui/form/FormRegister';
import IntialStructureForm from '@/components/ui/form/initialStructureForm';
import ButtonBack from '@/components/ui/button/buttonBack';

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

// Esta página "RegisterStudent" é responsável por renderizar o formulário de cadastro de um novo aluno
export default function RegisterStudent() {
  
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
        <IntialStructureForm
          title='Preencha as informações abaixo para cadastrar um(a) novo(a) aluno(a)!'
        >
          <FormStudentRegister entity='aluno' url='students'/>
        </IntialStructureForm>
      </>
      
    );
  } else {
    return (
      <LoadingPassaro />
    );
  }
}