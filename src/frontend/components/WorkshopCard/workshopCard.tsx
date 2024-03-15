// Biblioteca externas
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BarChartOutlined } from '@ant-design/icons';

// Estilização
const WorkshopCardDiv = styled.div`
    width: 100%;
    box-shadow: 1px 1px 6px 3px rgb(0, 0, 0, 0.1);
    cursor: pointer;
    position: relative;
`;

const ColorDiv = styled.div`
    background-color: ${props => props.color};
    height: 6rem;
`;

const Title = styled.h1`
    font-size: 1.25rem;
    font-weight: 400;
`;

const Schedule = styled.p`
    font-size: 0.85rem;
    font-weight: 400;
    margin-top: 0.2rem;
`;

const Participants = styled.p`
    font-size: 0.85rem;
    font-weight: 400;
    margin-top: 2rem;
`;

const Info = styled.div`
    padding: 1rem;
`;

const IconContainer = styled.div`
    position: absolute;
    bottom: 15px; /* Ajuste conforme necessário */
    right: 20px; /* Ajuste conforme necessário */
    font-size: 50px; /* Ajuste o tamanho conforme desejado */
`;

const StyledLink = styled.a`
    font-size: 0.75rem; /* Tamanho de fonte reduzido */
    text-decoration: none; /* Remove o sublinhado padrão */
    color: inherit; /* Mantém a cor padrão */
    display: flex; /* Para alinhar ícone e texto na mesma linha */
    align-items: center; /* Alinhar ícone e texto verticalmente */
    &:hover {
        text-decoration: underline; /* Adiciona sublinhado ao passar o mouse */
    }
`;

const Icon = styled.span`
    margin-right: 0.5rem; /* Espaço entre o ícone e o texto */
`;

// Tipagem dos argumentos do componente
type workshopProps = {
    name: string,
    color: string,
    studentsQuantity: number,
    weekDay: number,
    time: string,
    workshopId: number,
    classroomId: number,
}

// Este é um componente utilizado para exibir informações sobre uma oficina de uma determinada ONG, incluindo detalhes como data, horário e quantidade de alunos.
export default function WorkshopCard({ name, color, studentsQuantity, weekDay, time, workshopId, classroomId }: workshopProps) {
    // Armazenamento do estado do dia da semana
    const [day, setDay] = useState<string>();

    // Verifica o valor de weekDay e configura o estado day de acordo com o dia correspondente da semana
    useEffect(() => {
        switch (weekDay) {
            case 1:
                setDay('Domingos')
                break;
            case 2:
                setDay('Segundas-feiras')
                break;
            case 3:
                setDay('Terças-feiras')
                break;
            case 4:
                setDay('Quartas-feiras')
                break;
            case 5:
                setDay('Quintas-feiras')
                break;
            case 6:
                setDay('Sextas-feiras')
                break;
            case 7:
                setDay('Sábados')
                break;
        }
    }, [weekDay])

    return (
        <WorkshopCardDiv>
            <a href={`/oficinas/turma?id=${classroomId}`}>
                <ColorDiv color={color}></ColorDiv>
                <Info>
                    <Title>{name}</Title>
                    <Schedule>{day}, {time}.</Schedule>
                    <Participants>{studentsQuantity} alunos</Participants>
                </Info>
            </a>
            <IconContainer>
                <StyledLink href={`/oficinas/dados-da-oficina?id=${workshopId}`}>
                    <Icon>
                        <BarChartOutlined />
                    </Icon>
                    Visualizar dados da oficina
                </StyledLink>
            </IconContainer>
        </WorkshopCardDiv>
    );
}
