// Importa o decorador do pacote @nestjs/common, serviço de professor, DTO de professor e entidade de professor
import { Controller, Get, Post, Body } from "@nestjs/common";
import { TeacherService } from "./teacher.service";
import { TeacherDTO } from "./teacher.dto";
import { teacher } from "./teacher.entity";
import { TeacherCreateDTO } from "./teacherCreate.dto";

@Controller('/teachers')
export class TeacherController {

  constructor(private teacherRepository: TeacherService) {}

  /**
   * Registra um novo professor com os dados fornecidos. Este método aceita um objeto `TeacherDTO`
   * contendo todas as informações necessárias para o cadastro de um professor, como nome, qualificações,
   * áreas de especialização, entre outros. Os dados são recebidos através do corpo da requisição.
   * 
   * Este endpoint é acessado por meio de uma solicitação POST para '/teachers'. O `TeacherRepository`
   * é utilizado para efetuar o registro do professor no sistema. Após o registro, o objeto `TeacherEntity`
   * do professor recém-registrado é retornado, incluindo um identificador único gerado para o professor.
   * 
   * @param {TeacherCreateDTO} dataTeacher Um objeto `TeacherCreateDTO` contendo todas as informações
   * 
   * @returns {Promise<TeacherEntity>} Uma promessa que resolve para a entidade `TeacherEntity` do professor
   * recém-registrado, incluindo seu identificador único e todas as informações fornecidas durante o registro.
  */
  @Post()
  async registerTeacher(@Body() dataTeacher: TeacherCreateDTO) {
    return this.teacherRepository.register(dataTeacher.name, dataTeacher.gender, dataTeacher.dateofbirth, dataTeacher.address, dataTeacher.maritalstatus, dataTeacher.raceethnicity, dataTeacher.city, dataTeacher.state, dataTeacher.phonenumber, dataTeacher.landline, dataTeacher.email, dataTeacher.rg, dataTeacher.cpf);
  }

  @Get()
  async listAll() {
    return this.teacherRepository.listAll();
  }
}
