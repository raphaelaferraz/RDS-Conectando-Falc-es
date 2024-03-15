// Define o ambiente de execução como cliente
'use client'

// Componentes internos do projeto
import GoogleSVG from '@/public/svg/google'

// Bibliotecas externas
import styled from "styled-components";

// Estilização
const GoogleButton = styled.button`
    & {
        max-width: 300px;
        display: flex;
        padding: 0.5rem 1.4rem;
        font-size: 0.775rem;
        line-height: 1.25rem;
        font-weight: 700;
        text-align: center;
        text-transform: uppercase;
        vertical-align: middle;
        align-items: center;
        border-radius: 0.5rem;
        border: 1px solid rgba(0, 0, 0, 0.25);
        gap: 0.75rem;
        color: rgb(65, 63, 63);
        background-color: #fff;
        cursor: pointer;
        white-space: nowrap;
        transition: all .2s ease;
    }

    & svg {
        height: 24px;
    }

    &:hover {
        transform: scale(1.05);
    }
`;

// Este componente é um botão que permite o login com a conta do Google
export default function GoogleLogin(props: any) {
    return (
        <GoogleButton>
            <GoogleSVG />
            Continuar com Google
        </GoogleButton>
    )
}