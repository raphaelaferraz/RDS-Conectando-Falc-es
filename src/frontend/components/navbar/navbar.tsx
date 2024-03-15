// Define o ambiente de execução como cliente
'use client'

// Componentes internos do projeto
import ConectandoFalBirdSVG from '@/public/svg/conectandoFalBird';
import LogoutFunc from './logout';

// Bibliotecas externas
import styled from 'styled-components';
import { LogoutOutlined } from '@ant-design/icons';

// Estilização
const Nav = styled.nav`
    height: 4rem;
    box-shadow: 0px 4px 4px 0px rgb(0 0 0 / 20%);
    display: flex;
    align-items: center;
`;

const Logo = styled.div`
    height: 20px;
    width: 83px;
    position: relative;
    margin-left: 3rem;
`;

const Logout = styled.div`
    margin-left: auto;
    width: fit-content;
    margin-right: 3rem;
    cursor: pointer;
`;

// Este componente é o cabeçalho do site, onde se encontra o logo e o botão de logout
export default function Navbar() {
    return (
        <Nav>
            <Logo>
                <a href="/"><ConectandoFalBirdSVG /></a>
            </Logo>
            <Logout><LogoutFunc><LogoutOutlined style={{ fontSize: '1.5rem' }} /></LogoutFunc></Logout>
        </Nav>
    )
}