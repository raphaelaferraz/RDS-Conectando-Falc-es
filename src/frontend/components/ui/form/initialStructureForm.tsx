// Define o ambiente de execução como cliente
'use client'

// Bibliotecas externas
import React from 'react';
import styled from 'styled-components';

// Estilização
const Title = styled.h1`
  font-size: 1.5rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  margin: 32px 0 16px 48px;
`;

const Line = styled.hr`
  border: 0;
  height: 0.5px;
  background: #333;
  margin: 0 48px 2rem 48px;
`;

const Spacing = styled.div`
  margin: 0 7rem;
`;

// Este é um componente para representar a estrutura inicial de um formulário
export default function InitialStructureForm({title, children} : {title: string, children: React.ReactNode}) {
  return (
    <>
      <Title>{title}</Title>
      <Line />
      <Spacing>
        {children}
      </Spacing>
    </>
  );
}