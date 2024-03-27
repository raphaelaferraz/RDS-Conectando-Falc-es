import { Body, Controller, Post, Param, Get } from '@nestjs/common';
import { WorkshopService } from '../workshop/workshop.service';
import { ClassroomService } from './classroom.service';
import { ClassDTO } from '../class/class.dto';
import { ClassroomDTO } from './classroom.dto';
import { flatMap } from 'lodash';

@Controller('/classrooms')
export class ClassroomController {
	constructor(private readonly workshopService: WorkshopService, private readonly classroomService: ClassroomService) {}

  /**
   * Registra uma nova turma com os dados fornecidos. Este método recebe os dados de uma turma
   * através do corpo da requisição e utiliza o `ClassroomService` para registrar a turma no sistema.
   * Os dados da turma são fornecidos como um objeto `ClassroomDTO`, que inclui todas as informações
   * necessárias para o cadastro de uma nova turma.
   * 
   * Este endpoint é acessado através de uma solicitação POST para '/classrooms', e o corpo da requisição
   * deve conter os dados da turma conforme definido pelo `ClassroomDTO`.
   * 
   * @param {ClassroomDTO} dataClassroom - O objeto contendo os dados da novfa turma a ser registrada.
   * 
   * @returns {Promise<classroom>} Uma promessa que resolve para a entidade `classroom` da turma
   * recém-registrada. Esta entidade inclui todos os dados da turma, incluindo um identificador único gerado
   * pelo sistema.
  */
    @Post()
    async registerClassroom(@Body() dataClassroom: ClassroomDTO) {
      return await this.classroomService.register(dataClassroom.idWorkshop, dataClassroom.name, dataClassroom.day, dataClassroom.startTime, dataClassroom.endTime );
    }

	@Post('/add-student')
	async addStudentToClassroom(@Body() body: { studentId: number; classroomId: number }) {
		await this.workshopService.addStudentToClassroom(body.studentId, body.classroomId);
		return { message: 'Aluno adicionado à turma com sucesso.' };
	}

	@Get('/ong/:id')
	async getClassroomsByOngId(@Param('id') id: string) {
		const classrooms = await this.classroomService.getClassroomsByOngId(Number(id));
		return classrooms;
	}

	@Post('/add-professor')
	async addProfessorToClassroom(@Body() body: { professorId: number, addClassrooms: number[] }) {
		await this.classroomService.addProfessorToClassroom(body.professorId, body.addClassrooms);
		return { message: 'Professor adicionado às turmas com sucesso.' };
	}

	@Post('/remove-professor')
	async removeProfessorToClassroom(@Body() body: { professorId: number, removeClassrooms: number[] }) {
		await this.classroomService.removeProfessorToClassroom(body.professorId, body.removeClassrooms);
		return { message: 'Professor removido das turmas com sucesso.' };
	}

	@Post('/:id/class')
	async registerClass(@Param ('id') classroomid: number, @Body() dataClass: ClassDTO){
		// Registrando aula
		const dataPresence = dataClass.presence;
		const newClass = await this.classroomService.registerClass(dataClass.datetime, classroomid);
		const classId = newClass[0].id;

		// Registrando presença
		const presenceResult = await this.registerPresence(classId, dataPresence);

		const flattenedPresenceResult = flatMap(presenceResult);

		// Retornando resposta final
		return {newClass: classId, presenceResult: flattenedPresenceResult };
	}

	async registerPresence(classId: number, presence: { studentid: number, presence: boolean }[]) {
		const results = [];
	
		for (const data of presence) {
			// Chamada para registrar a presença para um aluno específico
			const result = await this.classroomService.registerPresence(classId, data.studentid, data.presence);
			results.push(result);
		}
	
		return results;
	}
}
