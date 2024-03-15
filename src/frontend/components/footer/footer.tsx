// Define o ambiente de execução como cliente
'use client'

// Componentes internos do projeto
import ConectandoFalSVG from '@/public/svg/logo/conectandoFal';
import GerandoFalSVG from '@/public/svg/logo/gerandoFal';
import InteliSVG from '@/public/svg/logo/inteli';

// Bibliotecas externas
import styled from 'styled-components';

// Estilização
const FooterDiv = styled.footer`
    height: 6rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--gray);
`;

const LogoDiv = styled.div`
    display: flex;
    align-items: end;
    width: 100px;
    height: auto;
    position: relative;
`;

const DivCopyright = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 10px;
    justify-content: center;
    padding-bottom: 20px;
    background-color: var(--gray-dark);

    h3{
        font-size: 0.8rem;
        padding-top: 5px;
        
    }
`;


// Este componente mostra os responsáveis pela criação do projeto: Conectando Falcões, Gerando Falcões e Inteli (Instituto de Tecnologia e Liderança).
export default function Footer() {
    return (
        <FooterDiv>
            <div style={{ display: 'flex', width: '100%', height: '5rem', alignItems: 'center', justifyContent: 'space-around' }}>
                <LogoDiv>
                    <a href="https://gerandofalcoes.com/" target='_blank'><GerandoFalSVG /></a>
                </LogoDiv>
                <LogoDiv>
                    <a href="/"><ConectandoFalSVG width={100} /></a>
                </LogoDiv>
                <LogoDiv>
                    <a href="https://inteli.edu.br/" target='_blank'><InteliSVG /></a>
                </LogoDiv>
            </div>
            <DivCopyright>
                <h3>© 2024 all rights reserved</h3>
            </DivCopyright>
        </FooterDiv>
    );
}