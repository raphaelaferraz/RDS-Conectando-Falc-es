// Define o ambiente de execução como cliente
'use client'

// Bibliotecas externas
import React from 'react';
import { Form, Button } from 'antd';
import styled from 'styled-components';

// Estilização
const CustomButton = styled(Button)`
  background: #1F5673 !important;
  color: #F0EDED !important;
  border-radius: 100px !important;
  width: 12rem !important;
  height: 2.5rem !important;
  
  &:hover {
    background-color: #FFFFFF !important;
    border: 1px solid #1F5673 !important;
    color: #3C4043 !important;
  }
`;

const Format = styled(Form.Item)`
.ant-form-item-control-input-content {
  display: flex;
  justify-content: center; 
  align-items: center; 
}
`;

// Este componente é um botão customizado para formulários a partir do componente Button do Ant Design
export default function ButtonForm({ value }: { value: string }) {
  return (
    <Format>
      <CustomButton htmlType='submit'>
        {value}
      </CustomButton>
    </Format>
  );
}