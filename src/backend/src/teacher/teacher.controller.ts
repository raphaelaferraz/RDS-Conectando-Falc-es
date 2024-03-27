// Importa o decorador do pacote @nestjs/common, serviço de professor, DTO de professor e entidade de professor
import { Controller, Get, Post, Body, Param, Patch } from "@nestjs/common";
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
   * @param {TeacherCreateDTO} professor Um objeto `TeacherCreateDTO` contendo todas as informações
   * 
   * @returns {Promise<TeacherEntity>} Uma promessa que resolve para a entidade `TeacherEntity` do professor
   * recém-registrado, incluindo seu identificador único e todas as informações fornecidas durante o registro.
  */
  @Post()
  async registerTeacher(@Body() professor: TeacherCreateDTO) {
    return this.teacherRepository.register(professor.name, professor.gender, professor.dateofbirth, professor.address, professor.maritalstatus, professor.raceethnicity, professor.city, professor.state, professor.phonenumber, professor.landline, professor.email, professor.rg, professor.cpf);
  }

  @Get('/ong/:ongId')
  async listAll(@Param('ongId') ongID: number) {
    return this.teacherRepository.listAll(ongID);
  }

    /**
   * Atualiza os dados de um professor existente. Este método recebe os dados de um professor a ser atualizado
   * 
   * @param {string} id - O identificador único do professor a ser atualizado. 
   * @param {Object} professor - O objeto contendo os dados atualizados do professor.
   *  
   * @returns {Promise<student>} Uma promessa que resolve para a entidade `student` do professor.
   */
    @Patch('/:id')
    async updateStudent(@Param('id') id: string, @Body() professor: any) {
      return await this.teacherRepository.updateProfessor(Number(id), professor.name, professor.gender, professor.dateofbirth, professor.address, professor.maritalstatus, professor.raceethnicity, professor.city, professor.state, professor.phonenumber, professor.landline, professor.email, professor.rg, professor.cpf );
    }

  @Get('/:teacherId/workshops')
  async listWorkshops(@Param('teacherId') teacherID: number) {
    return this.teacherRepository.listWorkshops(teacherID);
  }

}
