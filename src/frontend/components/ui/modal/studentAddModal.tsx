// Componentes internos do projeto
import styled from 'styled-components';
import ButtonPrimaryModal from '../button/buttonPrimaryModal';
import ButtonSecundaryModal from '../button/buttonSecundaryModal';
import StudentModal from './studentInformationModal';

// Bibliotecas externas
import { Modal } from 'antd';
import { useState, useEffect } from 'react';

// Estilização
const CustomListStudent = styled.div`
  margin-bottom: 1rem !important;
`;

// Este componente é um modal que permite a adição de alunos a uma turma
export function StudentAddModal({ onAddStudent, idOng, isModalVisible, setIsModalVisible, excludedStudentIds, classroomId }: { idOng: any, isModalVisible: boolean, setIsModalVisible: (visible: boolean) => void, excludedStudentIds: any, onAddStudent: any, classroomId: any }) {

  // Armazena os estados dos alunos da turma, dos alunos excluídos e de alunos selecionados
  const [studentsClassroom, setStudentsClassroom] = useState([]);
  const [excludentsStudents, setExcludentsStudents] = useState<number[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<{ id: any }[]>([]);

  // Função assíncrona para buscar as informações dos alunos da turma
  useEffect(() => {
    console.log('excludedStudentIds:', excludedStudentIds);
    async function getStudents() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/workshops/${idOng}/students`);
      const data = await response.json();

      // Atualização do estado de informações da turma
      setStudentsClassroom(data);
      setExcludentsStudents(excludedStudentIds);
    }
    getStudents();
  }, [excludedStudentIds]);

  // Função assíncrona para adicionar o aluno na turma
  const addStudentToClassroom = async (studentId: number, classroomId: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/classrooms/add-student`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ studentId, classroomId }),
    });
    const data = await response.json();
    console.log(data);
  };

  // Função para selecionar um aluno
  const handleSelectStudent = (student: { id: any }) => {
    const isSelected = selectedStudents.some((s) => s.id === student.id);
    if (isSelected) {
      setSelectedStudents(selectedStudents.filter((s) => s.id !== student.id));
    } else {
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  // Função para adicionar alunos selecionados
  const handleAddSelectedStudents = async () => {

    await Promise.all(selectedStudents.map(student =>
      addStudentToClassroom(student.id, classroomId)
    ));

    // Agora que todos os alunos foram adicionados, atualize os estados conforme necessário
    setSelectedStudents([]);
    setIsModalVisible(false);
    setStudentsClassroom(studentsClassroom.filter((student: { id: any }) => !selectedStudents.find(s => s.id === student.id)));
    setExcludentsStudents([...excludentsStudents, ...selectedStudents.map(student => student.id)]);
    window.location.reload();
  };

  // Funções para manipular o modal
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal title="Adicionar Aluno" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[
      <div key={'adicionar aluno'}>
        <ButtonPrimaryModal handleClick={handleAddSelectedStudents}>
          Adicionar aluno
        </ButtonPrimaryModal>

        <ButtonSecundaryModal handleClick={handleCancel}>
          Cancelar
        </ButtonSecundaryModal>
      </div>
    ]}>
      {studentsClassroom.filter((student: { id: never }) => !excludentsStudents.includes(student.id)).map((student: { id: never }) => {
        return (
          <CustomListStudent key={student.id}>
            <div onClick={() => handleSelectStudent(student)}>
              <StudentModal student={student} />
            </div>
          </CustomListStudent>
        );
      })}
    </Modal>
  );
};