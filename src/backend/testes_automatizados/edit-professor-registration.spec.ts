/**
 * 
 * Este arquivo contém os testes automatizados para realizar a atualização de um professor já existentes no banco de dados. Sendo assim, há dois testes:
 * 1° teste: Deve-se atualizar o professor e retornar o objeto atualizado
 * 2° teste: Deve retornar um erro ao tentar atualizar um professor com dado nulo
 * 
 */


// Importações necessárias para o teste
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TeacherModule } from '../src/teacher/teacher.module';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';


describe('StudentController (/students)', () => {
	let app: INestApplication;

	// Antes de cada teste, cria uma instância do aplicativo
	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [TeacherModule, AppModule],
		})
			.compile();

		app = moduleRef.createNestApplication();
		await app.init();
	});

	// Teste para o método `updateProfessor`, ou seja, a atualização de um professor com dados válidos
	it('POST /teachers/:id - Deve-se atualizar o professor e retornar o objeto atualizado', async () => {
		const professorId = 1;

		// Obtém os detalhes do professor antes da atualização
		const { body: professorBeforeUpdate } = await request(app.getHttpServer())
			.get(`/students/${professorId}`)
			.expect(200);

		console.log('Detalhes do professor antes da atualização:', professorBeforeUpdate);

		// Dados do professor a serem atualizados
		const updatedProfessorDto = {
			name: "Joselito Junior Motta de Carvalho",
			dateofbirth: "1990-01-01T00:00:00.000Z",
			gender: "M",
			rg: "123456789",
			cpf: "12983127398",
			maritalstatus: "Solteiro",
			raceethnicity: "Branco",
			address: "Rua A, 123",
			state: "São Paulo",
			city: "São Paulo",
			landline: "11222233334",
			phonenumber: "11999998888",
			email: "joselito.junior@gmail.com"
		};

		// Realiza a atualização do professor
		const response = await request(app.getHttpServer())
			.patch(`/teachers/${professorId}`)
			.send(updatedProfessorDto)
			.expect(200);

		console.log('Detalhes do professor depois da atualização:', response.body);

		// Armazena os detalhes do professor atualizado
		const updatedProfessorData = response.body[0][0];

		// Verifica se os detalhes do professor foram atualizados corretamente
		expect(updatedProfessorData).toEqual(expect.objectContaining({
			id: professorId,
			name: "Joselito Junior Motta de Carvalho",
			dateofbirth: "1990-01-01T00:00:00.000Z",
			gender: "M",
			rg: "123456789",
			cpf: "12983127398",
			maritalstatus: "Solteiro",
			raceethnicity: "Branco",
			address: "Rua A, 123",
			state: "São Paulo",
			city: "São Paulo",
			landline: "11222233334",
			phonenumber: "11999998888",
			email: "joselito.junior@gmail.com"
		}));
	});

	// Teste para o método`updateProfessor`, ou seja, a atualização de um professor, com dados inválidos / nulos
	it('PATCH /teachers/:id - Deve retornar um erro 500 ao tentar atualizar um professor com dado nulo', async () => {
		const professorId = 2;

		// Tenta atualizar o professor com o campo 'email' definido como nulo
		const updatedProfessorDto = {
			name: "Joselito Junior Motta de Carvalho",
			dateofbirth: "1990-01-01T00:00:00.000Z",
			gender: "M",
			rg: "123456789",
			cpf: "12983127398",
			maritalstatus: "Solteiro",
			raceethnicity: "Branco",
			address: "Rua A, 123",
			state: "São Paulo",
			city: "São Paulo",
			landline: "11222233334",
			phonenumber: "11999998888",
			email: null
		};

		// Tenta realizar a atualização do professor
		await request(app.getHttpServer())
			.patch(`/teachers/${professorId}`)
			.send(updatedProfessorDto)
			.expect(500)
	});

	// Após cada teste, fecha a instância do aplicativo
	afterAll(async () => {
		await app.close();
	});
});
