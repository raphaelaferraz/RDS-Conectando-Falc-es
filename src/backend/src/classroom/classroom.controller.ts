import { Body, Controller, Post } from '@nestjs/common';
import { WorkshopService } from '../workshop/workshop.service';

@Controller('classrooms')
export class ClassroomController {
  constructor(private readonly workshopService: WorkshopService) {}

  @Post('/add-student')
  async addStudentToClassroom(@Body() body: { studentId: number; classroomId: number }) {
    await this.workshopService.addStudentToClassroom(body.studentId, body.classroomId);
    return { message: 'Aluno adicionado à turma com sucesso.' };
  }
}
