/**
 * 
 * Este arquivo contém os testes automatizados para realizar a criação de uma nova categoria no sistema.
 * Sendo assim, há dois testes:
 * 1° teste: Deve criar uma nova categoria e retornar o objeto criado.
 * 2° teste: Deve retornar um erro ao tentar criar uma categoria com informações faltando.
 * 
 */

// Importações necessárias para o teste
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

// Descreve o conjunto de testes para o CategoryController
describe('CategoryController (/categories)', () => {
  let app: INestApplication;

  // Antes de cada teste, cria uma instância do aplicativo
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  
    app = moduleRef.createNestApplication();
    await app.init();
  });

  // Teste para verificar a criação de uma nova categoria
  it('Deve criar uma nova categoria', async () => { 
    const newCategory = {
      name: 'Nova Categoria',
      color: '#FF0000'
    };

    // Realiza uma solicitação POST para criar uma nova categoria
    const response = await request(app.getHttpServer())
      .post('/categories')
      .send(newCategory)
      .expect(201);

    console.log('Detalhes da categoria depois da atualização:', response.body);
  
    // Verifica se a resposta contém os dados da categoria criada
    expect(response.body).toEqual(expect.objectContaining(newCategory));
  });

// Teste para verificar a criação de uma nova categoria com informações faltando
it('Deve falhar ao criar uma nova categoria devido a informações faltando', async () => {
  const incompleteCategory = {
    // A propriedade 'name' está faltando
    name: null,
    color: '#FF0000'
  };

  // Realiza uma solicitação POST para criar uma nova categoria com informações faltando
  const response = await request(app.getHttpServer())
    .post('/categories')
    .send(incompleteCategory)
    .expect(500); // Espera-se um erro devido a informações faltando
    
    console.log('Detalhes da categoria depois da atualização:', response.body);

  // Verifica se a resposta contém uma mensagem de erro adequada
  expect(response.body.message).toBe('Internal server error');
});

  // Após cada teste, fecha a instância do aplicativo
  afterAll(async () => {
    await app.close();
  });
});