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
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #F0EDED;
`;

const LogoDiv = styled.div`
    display: flex;
    align-items: end;
    width: 100px;
    height: auto;
    position: relative;
`;

const LogoDivCustom = styled.div`
    margin-bottom: -0.5rem;
`;

const ContainerRight = styled.div`
    display: flex;
    align-items: inherit;
    gap: 3rem;
`;

const GeneralContainer = styled.div`
    display: flex;
    width: 100%;
    height: 5rem;
    align-items: center;
    justify-content: space-around;
    gap: 45rem;
`;



// Este componente mostra os responsáveis pela criação do projeto: Conectando Falcões, Gerando Falcões e Inteli (Instituto de Tecnologia e Liderança).
export default function Footer() {
    return (
        <FooterDiv>
            <GeneralContainer>
                <LogoDiv>
                    <a href="/"><ConectandoFalSVG width={100} /></a>
                </LogoDiv>

                <ContainerRight>
                    <LogoDivCustom>
                        <a href="https://gerandofalcoes.com/" target='_blank'><GerandoFalSVG /></a>
                    </LogoDivCustom>
                    <LogoDiv>
                        <a href="https://inteli.edu.br/" target='_blank'><InteliSVG /></a>
                    </LogoDiv>
                </ContainerRight>
            </GeneralContainer>
        </FooterDiv>
    );
}