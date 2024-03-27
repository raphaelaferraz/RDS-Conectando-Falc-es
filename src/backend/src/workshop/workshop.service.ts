import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { Injectable } from '@nestjs/common';
import { workshop } from "./workshop.entity";
import { StudentDTO } from "src/student/dto/student.dto";
import { Repository } from 'typeorm';
import { EntityManager } from "typeorm";

@Injectable()
export class WorkshopService {
    constructor(
        private entityManager: EntityManager,
    ) { }

    /**
     * Lista todos os workshops disponíveis com detalhes das suas turmas, incluindo o nome do workshop, a categoria,
     * informações sobre as turmas (horários, professores, quantidade de alunos) e a ONG responsável. Este método
     * não recebe parâmetros e retorna uma lista achatada de todas as turmas de cada workshop, formatada com informações
     * relevantes para facilitar a visualização e o gerenciamento.
     * 
     * @returns {Promise<Array>} Uma promessa que resolve para uma lista contendo as turmas de todos os workshops,
     * com detalhes formatados de cada turma.
    */
    async findOngs() {
        const query = 'SELECT * FROM "public"."ong"';
        const ongs = await this.entityManager.query(query);
        return ongs;
    }

    async listAll() {
        const query = `
        SELECT 
            w.id AS workshopid, 
            w.ongid AS ongid, 
            ong.name AS ongname, 
            w.name AS name, 
            w.description AS description,
            cat.id AS categoryid,
            cat.name AS category,
            cat.color AS color,
            COALESCE(jsonb_agg(
                DISTINCT jsonb_build_object(
                    'classroomid', c.id,
                    'classroomname', c.name,
                    'day', c.day,
                    'startTime', c.startTime,
                    'endTime', c.endTime,
                    'professor', t.name,
                    'students', (
                        SELECT COALESCE(jsonb_agg(
                            DISTINCT jsonb_build_object(
                                'id', s.id,
                                'name', s.name,
                                'dateofbirth', s.dateOfBirth,
                                'gender', s.gender,
                                'rg', s.rg,
                                'cpf', s.cpf,
                                'maritalstatus', s.maritalStatus,
                                'raceethnicity', s.raceEthnicity,
                                'address', s.address,
                                'state', s.state,
                                'city', s.city,
                                'phonenumber', s.phoneNumber,
                                'landline', s.landline,
                                'email', s.email
                            )
                        ), '[]'::jsonb) 
                        FROM student AS s
                        JOIN student_classroom AS sc ON sc.studentid = s.id 
                        WHERE sc.classroomid = c.id
                    )
                )
            ), '[]'::jsonb) AS classroom
        FROM 
            workshop AS w 
        LEFT JOIN 
            ong ON w.ongid = ong.id
        LEFT JOIN 
            category AS cat ON w.categoryid = cat.id 
        LEFT JOIN 
            classroom AS c ON c.workshopid = w.id 
        LEFT JOIN 
            teacher_classroom AS tc ON tc.classroomid = c.id 
        LEFT JOIN 
            teacher AS t ON tc.teacherid = t.id 
        GROUP BY 
            w.id, 
            w.ongid, 
            ong.name, 
            w.name,
            cat.id,
            cat.name,
            cat.color
        ORDER BY 
            w.id ASC;
        `;
        const workshops = await this.entityManager.query(query);
        return workshops;
    }

    /**
     * Encontra uma turma específica pelo seu ID, retornando detalhes do workshop ao qual pertence a turma, informações
     * sobre a turma (como horários e professor), e uma lista dos alunos com seus respectivos nomes e IDs. Este método
     * aceita o ID da turma como parâmetro.
     * 
     * @param {number} id - O ID da turma a ser encontrada.
     * 
     * @returns {Promise<Object>} Uma promessa que resolve para um objeto contendo informações detalhadas da turma
     * especificada, incluindo detalhes do workshop associado.
    */
    async findById(id: number) {
        const query = `
        SELECT 
            w.id AS workshopid, 
            w.ongid AS ongid, 
            ong.name AS ongname, 
            w.name AS name, 
            w.description AS description,
            cat.id AS categoryid,
            cat.name AS category,
            cat.color AS color,
            jsonb_agg(
                DISTINCT jsonb_build_object(
                    'classroomid', c.id,
                    'classroomname', c.name,
                    'day', c.day,
                    'starttime', c.startTime,
                    'endtime', c.endTime,
                    'professor', t.name,
                    'students', (
                        SELECT COALESCE(jsonb_agg(
                            jsonb_build_object(
                                'id', s.id,
                                'name', s.name,
                                'dateofbirth', s.dateOfBirth,
                                'gender', s.gender,
                                'rg', s.rg,
                                'cpf', s.cpf,
                                'maritalstatus', s.maritalStatus,
                                'raceethnicity', s.raceEthnicity,
                                'address', s.address,
                                'state', s.state,
                                'city', s.city,
                                'phonenumber', s.phoneNumber,
                                'landline', s.landline,
                                'email', s.email
                            )), '[]'::jsonb) 
                        FROM student AS s
                        LEFT JOIN student_classroom AS sc ON sc.studentid = s.id
                        WHERE sc.classroomid = c.id
                    )
                )
            ) FILTER (WHERE c.id IS NOT NULL) AS classroom -- Garante que só agregue se houver uma turma
        FROM 
            workshop AS w 
        LEFT JOIN 
            ong ON w.ongid = ong.id
        LEFT JOIN 
            category AS cat ON w.categoryid = cat.id 
        LEFT JOIN 
            classroom AS c ON c.workshopid = w.id 
        LEFT JOIN 
            teacher_classroom AS tc ON tc.classroomid = c.id 
        LEFT JOIN 
            teacher AS t ON t.id = tc.teacherid 
        WHERE
            c.id = $1
        GROUP BY 
            w.id, 
            w.ongid, 
            ong.name, 
            w.name,
            c.id, 
            c.name, 
            c.day,
            c.startTime,
            c.endTime,
            t.name,
            cat.id,
            cat.name,
            cat.color
        ORDER BY 
            w.id ASC;

        `;
        const workshops = await this.entityManager.query(query, [id]);
        return workshops;
    }

    /**
     * Lista todos os workshops associados a uma ONG específica, baseando-se no ID da ONG fornecido como parâmetro.
     * Retorna uma lista de workshops, incluindo informações como o nome do workshop, a categoria, e os detalhes das turmas.
     * 
     * @param {number} idOng - O ID da ONG cujos workshops serão listados.
     * 
     * @returns {Promise<Workshop[]>} Uma promessa que resolve para uma lista de entidades `Workshop`,
     * representando os workshops associados à ONG especificada.
    */
    async listByIdOng(idOng: number) {
        const query = 'SELECT * FROM "public"."workshop" WHERE "ongid" = $1';
        const workshops = await this.entityManager.query(query, [idOng]);
        return workshops;
    }

    /**
     * Lista todos os alunos agrupados por turma de acordo com o ID da class fornecido. Este método calcula a quantidade
     * total de alunos em cada turma associada ao workshop e retorna uma lista contendo o nome de cada turma junto com
     * a quantidade total de alunos inscritos nelas.
     * 
     * @param {number} idClass - O ID da class para o qual os alunos serão listados por turma.
     * 
     * @returns {Promise<Array>} Uma promessa que resolve para uma lista contendo as turmas e a quantidade de alunos
     * inscritos em cada uma, associadas ao workshop especificado.
    */
    async listStudentsByClassroom(idClass: number) {
        // Consulta SQL que junta as tabelas 'student' e 'classroom', filtrando pelo id da turma.
        const query = `
    SELECT s.* FROM student s
        INNER JOIN student_classroom sc ON s.id = sc.studentid
        WHERE sc.classroomid = $1;
    `;

        const students = await this.entityManager.query(query, [idClass]);

        if (students.length === 0) {
            throw new Error(`Nenhuma turma encontrada com o ID ${idClass}`);
        }

        return students;
    }

    /**
     * Lista o professor de uma turma específica de acordo com o ID da class fornecido. Este método retorna o nome do
     * professor associado à turma especificada.
     * 
     * @param {number} idClass - O ID da class para o qual o professor será listado.
     * 
     * @returns {Promise<string>} Uma promessa que resolve para o nome do professor associado à turma especificada.
     * 
     **/
    // async getTeacherByClassroom(idClass: number) {
    //   let teacher: string = '';
    //   this.workshops.forEach(workshop => {
    //     workshop.classroom.forEach(classroom => {
    //       if (classroom.idClass === idClass) {
    //         teacher = classroom.professor;
    //       }
    //     });
    //   });

    //   if (teacher === '') {
    //     throw new Error(`Nenhuma turma encontrada com o ID ${idClass}`);
    //   }  
    //   return {
    //     name: teacher
    //   };
    // }

    /**
     * Atualiza o aluno com os seus novos dados. Este método recebe os dados de um aluno
     * através do corpo da requisição e utiliza o `StudentService` para registrar o aluno no sistema.
     * Os dados do aluno são fornecidos como um objeto `StudentDTO`, que inclui todas as informações
     * necessárias para o cadastro de um novo aluno.
     * 
     * Este endpoint é acessado através de uma solicitação POST para '/students', e o corpo da requisição
     * deve conter os dados do aluno conforme definido pelo `StudentDTO`.
     * 
     * @param {number} id - O ID do aluno a ser atualizado.
     * @param {string} name - O nome do aluno.
     * @param {string} gender - O gênero do aluno.
     * @param {string} dateofbirth - A data de nascimento do aluno.
     * @param {string} address - O endereço do aluno.
     * @param {string} maritalstatus - O estado civil do aluno.
     * @param {string} raceethnicity - A etnia do aluno.
     * @param {string} city - A cidade do aluno.
     * @param {string} state - O estado do aluno.
     * @param {string} phonenumber - O número de telefone do aluno.
     * @param {string} landline - O número de telefone fixo do aluno.
     * @param {string} email - O email do aluno.
     * @param {string} rg - O RG do aluno.
     * @param {string} cpf - O CPF do aluno.
     * 
     * @returns {Promise<student>} Uma promessa que resolve para a entidade `student` do aluno
     * recém-registrado. Esta entidade inclui todos os dados do aluno, incluindo um identificador único gerado
     * pelo sistema.
    */
    async updateStudent(id: number, name: string, gender: string, dateofbirth: string, address: string, maritalstatus: string, raceethnicity: string, city: string, state: string, phonenumber: string, landline: string, email: string, rg: string, cpf: string) {
    const query = `
      UPDATE "student"
      SET 
          "name" = $2,
          "gender" = $3,
          "dateofbirth" = $4,
          "address" = $5, 
          "maritalstatus" = $6,
          "raceethnicity" = $7,
          "city" = $8,
          "state" = $9,
          "phonenumber" = $10,
          "landline" = $11, 
          "email" = $12,
          "rg" = $13,
          "cpf" = $14 
      WHERE "id" = $1
      RETURNING *;
    `;
        const updatedStudent = await this.entityManager.query(query, [id, name, gender, dateofbirth, address, maritalstatus, raceethnicity, city, state, phonenumber, landline, email, rg, cpf]);
        return updatedStudent;
    }

    async listAllStudentsByOngId(idOng: number) {
        const query = 'SELECT * FROM "public"."student" WHERE "ongid" = $1';
        const students = await this.entityManager.query(query, [idOng]);
        return students;
    }

    async getStudentsCountByWorkshop(idOng: number) {
        const query = `
        SELECT
            w.id AS workshopid,
            w.name AS workshopname,
            COALESCE(SUM(workshop_students.total_students), 0) AS total_students
        FROM workshop AS w
        LEFT JOIN (
            SELECT
                c.workshopid,
                COUNT(DISTINCT s.id) AS total_students
            FROM classroom AS c
            JOIN student_classroom AS sc ON c.id = sc.classroomid
            JOIN student AS s ON sc.studentid = s.id
            GROUP BY c.workshopid
        ) AS workshop_students ON w.id = workshop_students.workshopid
        WHERE w.ongid = $1
        GROUP BY w.id, w.name;
        `;
        const result = await this.entityManager.query(query, [idOng]);
        return result;
    }
    /**
     * Adiciona um aluno a uma turma especificada pelos seus IDs.
     * 
     * @param {number} studentId - O ID do aluno a ser adicionado.
     * @param {number} classroomId - O ID da turma à qual o aluno será adicionado.
     * @returns {Promise<void>} Uma promessa que se resolve quando o aluno é adicionado à turma.
     */
    async addStudentToClassroom(studentId: number, classroomId: number): Promise<void> {
        const query = `
      INSERT INTO "student_classroom" ("studentid", "classroomid")
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING;
    `;
        await this.entityManager.query(query, [studentId, classroomId]);
    }

    /**
     * Lista todas as presenças de um aluno em uma turma específica, de acordo com a oficina.
     */
    async listAllClassroomsPresenceByWorkshop(idWorkshop: number) {
        // Consulta ajustada para obter todas as turmas de uma oficina baseada no classroomId fornecido.
        const query = `
    WITH workshop_details AS (
      SELECT w.id AS workshop_id, w.name AS workshop_name
      FROM classroom c
      JOIN workshop w ON c.workshopid = w.id
      WHERE w.id = $1
      LIMIT 1
    )
    SELECT 
        wd.workshop_id, 
        wd.workshop_name, 
        c.id AS classroom_id, 
        c.name AS classroom_name, 
        cl.datetime::date,
        AVG(p.presence::int) * 100 AS average_presence
    FROM presence p
    JOIN class cl ON p.classid = cl.id
    JOIN classroom c ON cl.classroomid = c.id
    JOIN workshop_details wd ON c.workshopid = wd.workshop_id
    GROUP BY wd.workshop_id, wd.workshop_name, c.id, c.name, cl.datetime::date 
    ORDER BY c.id, cl.datetime::date; `;
        const presences = await this.entityManager.query(query, [idWorkshop]);

        // Calcular a média das médias de presença das turmas da oficina.
        let totalAverage = 0;
        if (presences.length > 0) {
            totalAverage = presences.reduce((acc, curr) => acc + parseFloat(curr.average_presence), 0) / presences.length;
        }

        // Formatar a média de presença como porcentagem.
        const formattedTotalAverage = `${totalAverage.toFixed(2)}%`;

        return {
            workshopPresence: presences.map(presence => ({
                ...presence,
                average_presence: `${parseFloat(presence.average_presence).toFixed(2)}%`
            })),
            overallWorkshopAverage: formattedTotalAverage
        };
    }

    /**
     * Lista todas as turmas de uma oficina específica, de acordo com o ID da oficina.
     */
    async listAllClassroomsByWorkshop(idWorkshop: number) {
        const query = `
        SELECT 
            c.id AS classroomid, 
            c.name AS classroomname, 
            c.day AS classroomday,
            c.starttime AS classroomstarttime,
            c.endtime AS classroomendtime,
            w.id AS workshopid, 
            w.name AS workshopname, 
            cat.id AS categoryid, 
            cat.name AS categoryname, 
            cat.color AS categorycolor,
            COUNT(sc.studentid) AS studentcount
        FROM 
            classroom c
        JOIN 
            workshop w ON c.workshopid = w.id
        JOIN 
            category cat ON w.categoryid = cat.id
        LEFT JOIN 
            student_classroom sc ON c.id = sc.classroomid
        WHERE 
            w.id = $1
        GROUP BY 
            c.id, w.id, cat.id;
`;
        const classrooms = await this.entityManager.query(query, [idWorkshop]);
        return classrooms;
    }

  async createWorkshop(name: string, ongId: number, categoryId: number, description: string) {
    const query = `
    INSERT INTO "workshop" ("name", "ongid", "categoryid", "description")
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
    const newWorkshop = await this.entityManager.query(query, [name, ongId, categoryId, description]);
    return newWorkshop;
  }

  async listWorkshopById(id: number) {
    const query = 'SELECT * FROM "public"."workshop" WHERE "id" = $1';
    const workshop = await this.entityManager.query(query, [id]);
    return workshop;
  }
}