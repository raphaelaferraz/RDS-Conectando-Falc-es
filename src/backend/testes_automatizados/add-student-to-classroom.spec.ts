/**
 * 
 * Este arquivo contém os testes automatizados para adicionar um aluno à uma turma, ambos já existente no banco de dados. Sendo assim, há dois testes:
 * 1° teste: Deve-se adicionar o aluno à uma turma e retornar uma lista de IDs dos estudantes que estão na turma.
 * 2° teste: Deve retornar um erro ao tentar adicionar um aluno à uma turma, onde algum dos identificadores não possuem no banco de dados.
 * 
 */


// Importações necessárias para o teste
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { StudentModule } from '../src/student/student.module';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';


describe('StudentController (/students)', () => {
    let app: INestApplication;

    // Antes de cada teste, cria uma instância do aplicativo
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [StudentModule, AppModule],
        })
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    // Teste para o método `addStudentToClassroom`, ou seja, a adição de um aluno à uma turma com dados válidos
    it('POST /classrooms/add-student - Deve-se adicionar um aluno a uma turma', async () => {

        const studentId = 4;
        const classroomId = 1;

        // Obtém todos os alunos cadastrados em uma turma antes de adicionar o aluno.
        const { body: studentsListBefore } = await request(app.getHttpServer())
            .get(`/workshops/classroom/${classroomId}/students`)
            .expect(200);

        console.log('IDs dos alunos que participam da turma antes do aluno ser adicionado: ', studentsListBefore.map((student: any) => student.id));

        // Realiza a adição do aluno na turma
        await request(app.getHttpServer())
            .post(`/classrooms/add-student`)
            .send({ studentId, classroomId })
            .expect(201);

        // Obtém todos os alunos cadastrados em uma turma depois de adicionar o aluno.
        const { body: studentsListAfter } = await request(app.getHttpServer())
            .get(`/workshops/classroom/${classroomId}/students`)
            .expect(200);

        console.log('IDs dos alunos que participam da turma depois do aluno ser adicionado: ', studentsListAfter.map((student: any) => student.id));

        // Verifica se o aluno foi adicionado na turma corretamente
        expect(studentsListAfter.map((student: any) => student.id).filter((id: any) => id == studentId)).toEqual(expect.arrayContaining([studentId]));
    });

    // Teste para o método `addStudentToClassroom`, ou seja, a adição de um aluno em uma turma, com IDs inválidos / nulos
    it('POST /classrooms/add-student - Deve retornar um erro 500 ao tentar adicionar um aluno a uma turma com dado nulo', async () => {
        const studentId = null;
        const classroomId = 1;

        // Tenta adicionar um aluno com ID nulo
        await request(app.getHttpServer())
            .post(`/classrooms/add-student`)
            .send({ studentId, classroomId })
            .expect(500);
    });

    // Após cada teste, fecha a instância do aplicativo
    afterAll(async () => {
        await app.close();
    });
});
