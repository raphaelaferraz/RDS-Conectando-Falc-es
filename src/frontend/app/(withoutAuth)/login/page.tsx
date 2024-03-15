// Degine o ambiente de execução como cliente
'use client'

// Componentes internos do projeto
import Form from '@/components/login/form/formLogin'
import DivImagem from '@/components/login/divImage'
import PassaroLoading from "@/components/ui/loading/passaroLoading"

// Bibliotecas externas
import React, { useEffect, useState } from 'react'
import styled from "styled-components"

// Estilização
const DivGeneral = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
`;

// Esta página "login" é responsável por renderizar o formulário de login
export default function Login() {

    // Armazenamento do estado de carregamento
    const [loading, setLoading] = useState(false)

    // Atualização do estado de carregamento
    useEffect(() => {
        setLoading(true)
    }, []);

    // Renderização condicional do formulário de login
    if (loading) {
        return (
            <DivGeneral>
                <DivImagem />
                <Form />        
            </DivGeneral>
        );
    } else {
        return (
            <PassaroLoading />
        );
    }
}