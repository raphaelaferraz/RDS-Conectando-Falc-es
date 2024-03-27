// Biblioteca externas
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BarChartOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react';

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
`;

const Info = styled.div`
    padding: 1rem;
`;

const IconContainer = styled.div`
    position: initial;
    font-size: 50px; 
`;

const StyledLink = styled.a`
    font-size: 0.75rem; 
    text-decoration: none; 
    color: inherit; 
    display: flex;
    align-items: center; 
    &:hover {
        text-decoration: underline; 
    }
`;

const Icon = styled.span`
    margin-right: 0.5rem; 
`;

const ContainerInfosCard = styled.div`
    display: flex;
    justify-content: space-between;
    height: 100%;
    padding: 1rem;
`;

// Tipagem dos argumentos do componente
type workshopProps = {
    workshopname?: string,
    classroomname?: string,
    color?: string,
    studentsQuantity?: number,
    weekDay?: number,
    time?: string,
    workshopId?: number,
    classroomId?: number,
    showSchedule?: boolean,
    showParticipants?: boolean,
    showClassroomName?: boolean,
    showWorkshopPage?: boolean,
    link?: string,
}

// Valor padrão para os argumentos do componente
WorkshopCard.defaultProps = {
    showSchedule: true,
    showParticipants: true,
    showClassroomName: true,
}

// Este é um componente utilizado para exibir informações sobre uma oficina de uma determinada ONG, incluindo detalhes como data, horário e quantidade de alunos.
export default function WorkshopCard({ workshopname, classroomname, color, studentsQuantity, weekDay, time, workshopId, classroomId, showSchedule, showParticipants, showClassroomName, link, showWorkshopPage }: workshopProps) {
    // Armazenamento do estado do dia da semana
    const [day, setDay] = useState<string>();
    const { data: session } = useSession();

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
            <a href={link}>
                <ColorDiv color={color}></ColorDiv>
                <Info>
                    <Title>
                        {workshopname}
                        {showClassroomName && ` - ${classroomname}`}
                    </Title>
                    {showSchedule && <Schedule>{day}, {time}.</Schedule>}
                </Info>
            </a>
            {session?.user.role === 'Leader' && (
                <IconContainer>
                    <ContainerInfosCard>
                        {showParticipants && <Participants>{studentsQuantity} alunos</Participants>}

                        {showWorkshopPage && (
                            <StyledLink href={`/oficinas/aula/?id=${classroomId}`}>
                                <Icon>
                                    <BarChartOutlined />
                                </Icon>
                                Visualizar oficina
                            </StyledLink>
                        )}
                    </ContainerInfosCard>
                </IconContainer>
            )}
        </WorkshopCardDiv>
    );
}
