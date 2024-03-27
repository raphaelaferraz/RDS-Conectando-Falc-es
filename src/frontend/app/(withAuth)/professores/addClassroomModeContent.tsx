import { useEffect, useState } from "react";
import styled from 'styled-components';
import { Checkbox, Button } from 'antd';
import { getSession } from "next-auth/react";
import Professors from "./page";


const CustomListStudent = styled.div`
  margin-bottom: 1rem !important;
`;

const DivStudent = styled.div`
	border-color: #1F5673;
	border-style: solid; 
	border-width: 1px;
	width: auto;
	max-height: 100vh;
    justify-content: space-between;
	display: flex;
	flex-direction: row;
	padding: 0.5rem 1rem 0.5rem 1rem;
	border-radius: 10px; 
    align-items: center;
`;

const LabelStudentName = styled.p`
  &:hover {
    cursor: pointer;
    color: #1F5673;
  }
`;

const CheckboxPresenca = styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #1F5673; 
    border-color: #1F5673;
  }
`;

const Content = styled.div`
  max-height: 20rem;
  overflow: auto;
  padding-right: 12px;
  margin-top: 20px;
`

const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding-top: 20px; 
`;

const ButtonPrimary = styled(Button)`
  background: #1F5673 !important;
  border-color: #1F5673 !important;
  color: #ffffff !important;

  &:hover, &:focus {
    background: #ffffff !important; 
    border-color: #16455b !important;
    color: #16455b !important;
  }
`;

const HoverButtonDelete = styled(Button)`
  &:hover, &:focus {
    background: #ffffff !important; 
    border-color: #16455b !important;
    color: #16455b !important;
  } 
`;

export default function AddClassroomModeContent({ setAddClassroomMode, selectedProfessorId, data, getWorkshops }: { setAddClassroomMode: any, selectedProfessorId: number | undefined, data: any, getWorkshops: any }) {
    const [classrooms, setClassrooms] = useState<any>();
    const [addClassrooms, setAddClassrooms] = useState<any>([]);
    const [removeClassrooms, setRemoveClassrooms] = useState<any>([]);
    const [inClassrooms, setInClassrooms] = useState<any>([]);


    useEffect(() => {
        const getClassrooms = async () => {
            const ongId = (await getSession())?.user.ongid;

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/classrooms/ong/${ongId}`);
                const classrooms = await response.json();
                setClassrooms(classrooms);
                if (!response.ok) {
                    throw new Error('Erro ao buscar turmas da ONG.');
                }
            }
            catch (error) {
                console.error(error);
            }
        }

        getClassrooms();

        setInClassrooms(data?.find((professor: any) => professor.id === selectedProfessorId).classroom?.map((classroom: any) => classroom.classroomid))
    }, [])

    function handleChange(e: any, id: number) {
        const isChecked = e.target.checked;
        if (isChecked) {
            setAddClassrooms((prev: any) => [...prev, id].filter((id: number) => !inClassrooms.includes(id)));
            setRemoveClassrooms((prev: any) => prev.filter((classroomid: number) => classroomid != id));
        } else {
            setRemoveClassrooms((prev: any) => [...prev, id].filter((id: number) => inClassrooms.includes(id)));
            setAddClassrooms((prev: any) => prev.filter((classroomid: number) => classroomid != id));
        }
    }

    async function addProfessorInClassroom() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/classrooms/add-professor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ professorId: selectedProfessorId, addClassrooms: addClassrooms }),
        });
        console.log(response);
    }

    async function removeProfessorInClassroom() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/classrooms/remove-professor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ professorId: selectedProfessorId, removeClassrooms: removeClassrooms }),
        });
        console.log(response);
    }

    async function save() {
        if (addClassrooms.length) {
            await addProfessorInClassroom();
        }
        if (removeClassrooms.length) {
            await removeProfessorInClassroom();
        }
        if (addClassrooms.length || removeClassrooms.length) {
            getWorkshops();
            setAddClassroomMode(false);
        }
    }


    return (
        <>
            <Content>
                {classrooms?.map((classroom: any, index: number) => {
                    return (
                        <CustomListStudent>
                            <div key={index}>
                                <DivStudent>
                                    <LabelStudentName>{classroom.workshopname} - {classroom.name}</LabelStudentName>
                                    <CheckboxPresenca onChange={(e) => handleChange(e, classroom.id)} defaultChecked={inClassrooms?.includes(classroom.id) ? true : false}></CheckboxPresenca>
                                </DivStudent>
                            </div>
                        </CustomListStudent>
                    );
                })}
            </Content>
            <ActionsContainer>
                <ButtonPrimary onClick={save}>Salvar</ButtonPrimary>
                <HoverButtonDelete onClick={() => setAddClassroomMode(false)}>Cancelar</HoverButtonDelete>
            </ActionsContainer>
        </>
    )
}