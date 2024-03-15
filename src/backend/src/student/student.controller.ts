// Importe de decoradores, entidade de estudante e DTO de estudante
import { Controller, Post, Body, Put, Patch, Param, Delete } from "@nestjs/common";
import { StudentService } from "./student.service";
import { StudentDTO } from "./student.dto";
import { student } from "./student.entity";
import { WorkshopService } from "src/workshop/workshop.service";
import { StudentUpdateDTO } from "./studentUpdate.dto";
import { StudentCreateDTO } from "./studentCreate.dto";

@Controller('/students')
export class StudentController {

  constructor(private workshopService: WorkshopService, private studentService: StudentService){}

  /**
   * Registra um novo aluno com os dados fornecidos. Este método recebe os dados de um aluno
   * através do corpo da requisição e utiliza o `StudentService` para registrar o aluno no sistema.
   * Os dados do aluno são fornecidos como um objeto `StudentDTO`, que inclui todas as informações
   * necessárias para o cadastro de um novo aluno.
   * 
   * Este endpoint é acessado através de uma solicitação POST para '/students', e o corpo da requisição
   * deve conter os dados do aluno conforme definido pelo `StudentDTO`.
   * 
   * @param {StudentDTO} dataStudent - O objeto contendo os dados do novo aluno a ser registrado.
   * 
   * @returns {Promise<student>} Uma promessa que resolve para a entidade `student` do aluno
   * recém-registrado. Esta entidade inclui todos os dados do aluno, incluindo um identificador único gerado
   * pelo sistema.
  */
  @Post()
  async registerStudent(@Body() dataStudent: StudentCreateDTO) {
    return await this.studentService.register(dataStudent.name, dataStudent.gender, dataStudent.dateofbirth, dataStudent.address, dataStudent.maritalstatus, dataStudent.raceethnicity, dataStudent.city, dataStudent.state, dataStudent.phonenumber, dataStudent.landline, dataStudent.email, dataStudent.rg, dataStudent.cpf, 1);
  }
  
  /**
   * Atualiza os dados de um aluno existente. Este método recebe os dados de um aluno a ser atualizado
   * 
   * @param {string} id - O identificador único do aluno a ser atualizado. 
   * @param {Object} updateStudent - O objeto contendo os dados atualizados do aluno.
   *  
   * @returns {Promise<student>} Uma promessa que resolve para a entidade `student` do aluno
   */
  @Patch('/:id')
  async updateStudent(@Param('id') id: string, @Body() updateStudent: StudentUpdateDTO) {
    return await this.workshopService.updateStudent(Number(id), updateStudent.name, updateStudent.gender, updateStudent.dateofbirth, updateStudent.address, updateStudent.maritalstatus, updateStudent.raceethnicity, updateStudent.city, updateStudent.state, updateStudent.phonenumber, updateStudent.landline, updateStudent.email, updateStudent.rg, updateStudent.cpf );
  }
  
}

