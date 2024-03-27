/**
 * Este arquivo contém os testes automatizados para realizar a atualização de um aluno já existentes no banco de dados. Sendo assim, há dois testes:
 * 1° teste: Deve-se atualizar o aluno e retornar o objeto atualizado
 * 2° teste: Deve retornar um erro 500 ao tentar atualizar um aluno com dado nulo
 */


// Importações necessárias para o teste
import {Test} from '@nestjs/testing';
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

  // Teste para o método `updateStudent`, ou seja, a atualização de um aluno com dados válidos
  it('POST /students/:id - Deve-se atualizar o aluno e retornar o objeto atualizado', async () => {
    const studentId = 2; 

    // Obtém os detalhes do aluno antes da atualização
    const {body: studentBeforeUpdate} = await request(app.getHttpServer())
      .get(`/students/${studentId}`)
      .expect(200);

    console.log('Detalhes do aluno antes da atualização:', studentBeforeUpdate);

    // Dados do aluno a serem atualizados
    const updatedStudentDto = {
      name: 'Maria Vitória',
      email: 'teste@gmail.com',
      gender: 'Feminino',
      dateofbirth: '01/01/2000',
      address: 'Rua de Teste',
      maritalstatus: 'Solteiro',
      raceethnicity: 'Pardo',
      city: 'São Paulo',
      state: 'SP',
      phonenumber: '12345',
      landline: '54321',
      rg: '1234',
      cpf: '2222',
      id: 2,
      ongId: 1,
    };

    // Realiza a atualização do aluno
    const response = await request(app.getHttpServer())
      .patch(`/students/${studentId}`)
      .send(updatedStudentDto)
      .expect(200);
      
    console.log('Detalhes do aluno depois da atualização:', response.body);

    // Armazena os detalhes do aluno atualizado
    const updatedStudentData = response.body[0][0]; 

    // Verifica se os detalhes do aluno foram atualizados corretamente
    expect(updatedStudentData).toEqual(expect.objectContaining({
      id: 2,
      name: 'Maria Vitória',
      email: 'teste@gmail.com',
      gender: 'Feminino',
      dateofbirth: '2000-01-01T00:00:00.000Z', 
      address: 'Rua de Teste',
      maritalstatus: 'Solteiro',
      raceethnicity: 'Pardo',
      city: 'São Paulo',
      state: 'SP',
      phonenumber: '12345',
      landline: '54321',
      rg: '1234',
      cpf: '2222',
      ongid: 1,
    }));
  });

  // Teste para o método `updateStudent`, ou seja, a atualização de um aluno, com dados inválidos/nulos
  it('PATCH /students/:id - Deve retornar um erro 500 ao tentar atualizar um aluno com dado nulo', async () => {
    const studentId = 2; 
  
    // Tenta atualizar o aluno com o campo 'email' definido como nulo
    const updatedStudentDto = {
      name: 'Maria Vitória',
      email: null, 
      gender: 'Feminino',
      dateofbirth: '01/01/2000',
      address: 'Rua de Teste',
      maritalstatus: 'Solteiro',
      raceethnicity: 'Pardo',
      city: 'São Paulo',
      state: 'SP',
      phonenumber: '12345',
      landline: '54321',
      rg: '1234',
      cpf: '2222',
      id: 2,
      ongId: 1,
    };

    // Tenta realizar a atualização do aluno
    await request(app.getHttpServer())
      .patch(`/students/${studentId}`)
      .send(updatedStudentDto)
      .expect(500)
  }
  );

  // Após cada teste, fecha a instância do aplicativo
  afterAll(async () => {
    await app.close();
  });
});
