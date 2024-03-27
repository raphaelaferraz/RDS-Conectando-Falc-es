/**
 * Este arquivo contém os testes automatizados para realizar o registro de novas presenças no banco de dados. Sendo assim, há dois testes:
 * 1° teste: Deve-se enviar novas presenças e retornar o objeto criado
 * 2° teste: Deve retornar um erro 500 ao tentar enviar presenças com dados nulos
*/

// Importações necessárias para o teste
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { WorkshopModule } from '../src/workshop/workshop.module';
import * as request from 'supertest';

describe('ClassroomController (/classrooms)', () => {
  let app: INestApplication;

  // Antes de cada teste, cria uma instância do aplicativo
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [WorkshopModule, AppModule],
    })
    .compile();
  
    app = moduleRef.createNestApplication();
    await app.init();
  });

  // Teste para o método `registerClass` e `registerPresence` que cria uma nova aula e novas presenças
  it('POST /classrooms/:id/class - Deve-se enviar novas presenças e retornar o objeto criado', async () => {
    const newPresencesDto = {
        datetime: "2024-03-26",
        presence: [
            { studentid: 1, presence: true },
            { studentid: 2, presence: true },
            { studentid: 3, presence: false },
        ]
    };

    // Realiza a criação da aula/presença
    const response = await request(app.getHttpServer())
      .post('/classrooms/1/class')
      .send(newPresencesDto)
      .expect(201);

      const createdWorkshop = response.body;

    console.log('Oficina criada:', createdWorkshop);

    // Verifica se as presenças foram criadas com sucesso
    expect(createdWorkshop).toEqual({
        newClass: expect.any(Number),
        presenceResult: [
          { studentid: newPresencesDto.presence[0].studentid, presence: newPresencesDto.presence[0].presence },
          { studentid: newPresencesDto.presence[1].studentid, presence: newPresencesDto.presence[1].presence },
          { studentid: newPresencesDto.presence[2].studentid, presence: newPresencesDto.presence[2].presence },
        ]  
    });
  });


  // Teste para o método `registerClass` e `registerPresence` que cria uma nova aula e novas presenças
  it('POST /classrooms/:id/class - Deve retornar um erro 500 ao tentar enviar presenças com dados nulos', async () => {
    const newPresencesDto = {
      datetime: "2024-03-26",
      presence: [
          { studentid: 1, presence: null },
          { studentid: 2, presence: true },
          { studentid: 3, presence: false },
      ]
    };

    // Realiza a criação da aula/presença
    const response = await request(app.getHttpServer())
      .post('/classrooms/1/class')
      .send(newPresencesDto)
      .expect(500);

    console.log('Erro ao enviar lista de presença:', response.body.message);
  });

  // Após cada teste, fecha a instância do aplicativo
  afterAll(async () => {
    await app.close();
  });
})
