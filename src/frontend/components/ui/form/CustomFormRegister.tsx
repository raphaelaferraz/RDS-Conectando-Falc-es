// Define o ambiente de execução como cliente
'use client'

// Bibliotecas externas
import styled from 'styled-components';
import { Form } from 'antd';
import { FormLayout } from 'antd/lib/form/Form';
import React from 'react';

// Estilização
const CustomForm = styled(Form)`
  label {
    font-size: 1.12rem !important;
  }

  input:hover, input:focus, div:hover, div:focus {
    border-color: #1F5673 !important;
  }
`;

// Este componente é um formulário customizado a partir do componente Form do Ant Design
export default function CustomFormRegister({name, onFinish, layout, children }: {name: string, onFinish: any, layout: string, children: React.ReactNode}) {
  return (
    <CustomForm
      name={name}
      onFinish={onFinish}
      layout={layout as FormLayout}
    >
      {children}
    </CustomForm>
  );
}