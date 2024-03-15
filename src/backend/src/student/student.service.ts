import { Injectable } from "@nestjs/common";
import { student } from "./student.entity";
import { StudentDTO } from "./student.dto";
import { StudentCreateDTO } from "./studentCreate.dto";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

@Injectable()
export class StudentService {

  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  /**
   * Registra um novo estudante com base nos dados fornecidos. Este método aceita um objeto `StudentDTO`
   * que contém todas as informações necessárias para o cadastro de um estudante, incluindo nome, data de nascimento,
   * gênero, documentos pessoais (RG, CPF), estado civil, etnia, endereço, contato (telefone, email) e outras informações
   * relevantes. Um novo `id` é gerado automaticamente para o estudante com base no número de estudantes já registrados.
   * 
   * Após a criação, o estudante é adicionado a um array interno que simula um banco de dados de estudantes. O método
   * então retorna o objeto `student` do estudante recém-registrado, incluindo seu `id` gerado.
   * 
   * 
   * @param {string} name - O nome completo do estudante.
   * @param {string} gender - O gênero do estudante.
   * @param {string} dateofbirth - A data de nascimento do estudante.
   * @param {string} address - O endereço do estudante.
   * @param {string} maritalstatus - O estado civil do estudante.
   * @param {string} raceethnicity - A etnia do estudante.
   * @param {string} city - A cidade onde o estudante reside.
   * @param {string} state - O estado onde o estudante reside.
   * @param {string} phonenumber - O número de telefone do estudante.
   * @param {string} landline - O número de telefone fixo do estudante.
   * @param {string} email - O endereço de email do estudante.
   * @param {string} rg - O número do RG do estudante.
   * @param {string} cpf - O número do CPF do estudante.
   * @param {number} ongInd - O identificador da ONG associada ao estudante. 
   * 
   * @returns {Promise<student>} Uma promessa que resolve para a entidade `student` do estudante
   * recém-registrado, incluindo seu identificador único e todas as informações fornecidas.
  */
  async register(name: string, gender: string, dateofbirth: string, address: string, maritalstatus: string, raceethnicity: string, city: string, state: string, phonenumber: string, landline: string, email: string, rg: string, cpf: string, ongInd: number) {
    const query = `INSERT INTO "student" (
      "name", 
      "gender", 
      "dateofbirth", 
      "address", 
      "maritalstatus", 
      "raceethnicity", 
      "city", 
      "state", 
      "phonenumber", 
      "landline", 
      "email", 
      "rg", 
      "cpf",
      "ongid"
  ) VALUES (
      $1,  
      $2,  
      $3,  
      $4, 
      $5, 
      $6, 
      $7, 
      $8, 
      $9, 
      $10,
      $11,
      $12,
      $13,
      $14
  ) RETURNING *;`
    const result = await this.entityManager.query(query, [name, gender, dateofbirth, address, maritalstatus, raceethnicity, city, state, phonenumber, landline, email, rg, cpf, ongInd]);
    return result;
  }
}
