// Bibliotecas externas
import styled from "styled-components";

// Estilização
const Button = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 281px;
  height: 65px;
  background-color: var(--button-blue);
  border-radius: 2rem;
  color: white;
  font-size: 1.2rem;
  border: none;
  outline: none;
  cursor: pointer;
  margin-bottom: 1.5rem;
  margin-top: 30px;
`;

// Este componente é um botão que redireciona o usuário para uma página específica
export default function ButtonNavigation({children, url, className}: {children?: any, url: string, className?: string}){
  return (
    <Button href={url} className={className}>
      {children}
    </Button>
  );
}