// Importa decoradores e entidade de sala de aula
import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm";
import { EntityManager } from "typeorm";

@Injectable()
export class ClassroomService {
	constructor(
		@InjectEntityManager()
		private entityManager: EntityManager,
	) { }


	/**
	 * Este método recebe o ID de uma ONG como parâmetro e retorna todas as turmas correspondentes encontradas.
	 * 
	 * @param {number} id - O ID da ONG.
	 * 
	 * @returns {Promise<Array>} Uma promessa que resolve para uma lista de turmas correspondentes ao ID fornecido. 
	 * Se nenhuma turma for encontrada com o ID especificado, a promessa resolve para uma lista vazia.
	*/
	async getClassroomsByOngId(ongId: number) {
		const query = `
			SELECT c.*, w.name AS workshopname
			FROM classroom c
			INNER JOIN workshop w ON c.workshopid = w.id
			INNER JOIN ong o ON w.ongid = o.id
			WHERE o.id = $1;
		`;
		const classrooms = await this.entityManager.query(query, [ongId]);
		return classrooms;
	}

	/**
	 * Adiciona um professor a uma turma especificada pelos seus IDs.
	 * 
	 * @param {number} professorId - O ID do professor a ser adicionado.
	 * @param {number} addClassrooms - Uma lista de IDs das turmas às quais o professor será adicionado.
	 * @returns {Promise<void>} Uma promessa que se resolve quando o professor é adicionado às turmas.
	*/
	async addProfessorToClassroom(professorId: number, addClassrooms: number[]): Promise<void> {
		const values = addClassrooms.map(classroomId => `(${professorId}, ${classroomId})`).join(', ');
	
		const query = `
			INSERT INTO "teacher_classroom" ("teacherid", "classroomid")
			VALUES ${values}
			ON CONFLICT DO NOTHING;
		`;
	
		await this.entityManager.query(query);
	}
	

	/**
	 * Remove um professor das turmas especificadas pelos IDs.
	 * 
	 * @param {number} professorId - O ID do professor a ser adicionado.
	 * @param {number} removeClassrooms - Uma lista de IDs das turmas às quais o professor será removido.
	 * @returns {Promise<void>} Uma promessa que se resolve quando o professor é removido das turmas.
	*/
	async removeProfessorToClassroom(professorId: number, removeClassrooms: number[]): Promise<void> {
		const classroomIds = removeClassrooms.join(',');
		
		const query = `
			DELETE FROM teacher_classroom
			WHERE teacherid = $1
			AND classroomid IN (${classroomIds});
		`;
	
		await this.entityManager.query(query, [professorId]);
	}
	
  /**
   * Registra uma nova turma com base nos dados fornecidos. Este método aceita um objeto `ClassroomDTO`
   * que contém todas as informações necessárias para o cadastro de uma turma. Um novo `id` é gerado automaticamente para a turma com base no número de turmas já registrados.
   * 
   * Após a criação, a turma é adicionado a um array interno que simula um banco de dados de estudantes. O método
   * então retorna o objeto `classroom` do estudante recém-registrado, incluindo seu `id` gerado.
   * 
   * @param {number} workshopid - O id da oficina atrelada a essa turma.
   * @param {string} name - O nome completo da turma.
   * @param {number} day - O dia que essa turma se encontrará.
   * @param {string} starttime - O horário de início da turma.
   * @param {string} endtime - O horário de fim da turma.
   * 
   * @returns {Promise<student>} Uma promessa que resolve para a entidade `student` do estudante
   * recém-registrado, incluindo seu identificador único e todas as informações fornecidas.
  */
  async register(workshopid: number, name: string, day: number, starttime: string, endtime: string) {
    const query = `INSERT INTO "classroom" (
      "workshopid",
      "name", 
      "day", 
      "starttime", 
      "endtime" 
  ) VALUES (
      $1,  
      $2,  
      $3,  
      $4, 
      $5
  ) RETURNING *;`
  console.log([workshopid, name, day, starttime, endtime]);
  
    const result = await this.entityManager.query(query, [workshopid, name, day, starttime, endtime]);
    return result;
  }

	async registerClass(date, classroomid) {
		const query = `
			INSERT INTO "class" ("datetime", "classroomid") VALUES ($1, $2) RETURNING id;
		`;

		const result = await this.entityManager.query(query, [date, classroomid]);
		return result;
	}

	async registerPresence(classid, studentid, presence) {
		const query = `
			INSERT INTO "presence" ("classid", "studentid", "presence") VALUES ($1, $2, $3)
			RETURNING studentid, presence;
		`;
		const result = await this.entityManager.query(query, [classid, studentid, presence]);
		return result;
	}
}
