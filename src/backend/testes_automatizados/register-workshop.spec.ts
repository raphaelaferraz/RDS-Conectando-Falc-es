/**
 * Este arquivo contém os testes automatizados para realizar o registro de uma nova oficina no banco de dados. Sendo assim, há dois testes:
 * 1° teste: Deve-se criar uma nova oficina e retornar o objeto criado
 * 2° teste: Deve retornar um erro 500 ao tentar criar uma nova oficina com dados nulos
*/

// Importações necessárias para o teste
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { WorkshopModule } from '../src/workshop/workshop.module';
import * as request from 'supertest';

describe('WorkshopController (/workshops)', () => {
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

  // Teste para o método `createWorkshop` que cria uma nova oficina com dados válidos
  it('POST /workshops - Deve-se criar uma nova oficina e retornar o objeto criado', async () => {
    // Dados da oficina a serem criados
    const newWorkshopDto = {
      name: 'Oficina de Teste',
      description: 'Oficina de teste para os alunos',
      ongId: 1,
      categoryId: 1,
    };

    // Realiza a criação da oficina
    const response = await request(app.getHttpServer())
      .post('/workshops')
      .send(newWorkshopDto)
      .expect(201);

      const createdWorkshop = response.body[0];

    console.log('Oficina criada:', createdWorkshop);

    // Verifica se a oficina foi criada com sucesso
    expect(createdWorkshop).toEqual({
      id: expect.any(Number),
      name: newWorkshopDto.name,
      ongid: newWorkshopDto.ongId,
      categoryid: newWorkshopDto.categoryId,
      description: newWorkshopDto.description,
    });
  });


  // Teste para o método `createWorkshop` que cria uma nova oficina com dados inválidos
  it('POST /workshops - Deve-se retornar um erro ao tentar criar uma nova oficina com dados inválidos', async () => {
    // Dados da oficina a serem criados
    const newWorkshopDto = {
      name: null,
      description: 'Oficina de teste para os alunos',
      ongId: 1,
      categoryId: 1,
    };

    // Realiza a criação da oficina
    const response = await request(app.getHttpServer())
      .post('/workshops')
      .send(newWorkshopDto)
      .expect(500);

    console.log('Erro ao criar a oficina:', response.body.message);
  });

  // Após cada teste, fecha a instância do aplicativo
  afterAll(async () => {
    await app.close();
  });
})
