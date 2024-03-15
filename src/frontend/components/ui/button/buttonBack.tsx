// Bibliotecas externas
import styled from 'styled-components';

// Estilização
const BackButton = styled.a`
	background: #1F5673 !important;
	color: white;
	border: none;
	outline: none;
	font-size: 1rem;
	cursor: pointer;
	padding: 0.6rem 1.3rem 0.6rem 1.3rem;
	border-radius: 2rem;
	font-weight: 100;
  width: 200px;
`;

// Este componente é um botão que redireciona o usuário para a página inicial
export default function ButtonBack() {
    return (
        <BackButton href={'/'}>
            Voltar
        </BackButton>
    );
}