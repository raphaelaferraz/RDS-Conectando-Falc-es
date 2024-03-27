// Importa decorador e entidade de ONG
import { Injectable } from "@nestjs/common";
import { ong } from "./ong.entity";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EntityManager } from "typeorm";

@Injectable()
export class OngService {

  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) { }

  /**
   * Lista todas as ONGs cadastradas. Este método não recebe parâmetros e retorna uma lista estática
   * de ONGs definidas internamente. Ideal para fornecer uma visão geral de todas as ONGs disponíveis
   * na aplicação.
   * 
   * @returns {Promise<OngEntity[]>} Uma promessa que resolve para um array de entidades `OngEntity`,
   * representando todas as ONGs cadastradas. Cada entidade `OngEntity` contém detalhes como id, nome,
   * endereço, email e CNPJ da ONG.
  */
  async findOngs() {
    const query = 'SELECT * FROM "public"."ong"';
    const ongs = await this.entityManager.query(query);
    return ongs;
  }

  /**
   * Busca uma ONG específica pelo seu ID. Este método recebe o ID de uma ONG como parâmetro e retorna
   * a ONG correspondente se encontrada.
   * 
   * @param {number} id - O ID da ONG a ser buscada.
   * 
   * @returns {Promise<OngEntity | undefined>} Uma promessa que resolve para a entidade `OngEntity`
   * correspondente ao ID fornecido. Se nenhuma ONG for encontrada com o ID especificado, a promessa
   * resolve para `undefined`.
  */
  async findById(id: number) {
    const query = 'SELECT * FROM "public"."ong" WHERE id = $1';
    const ong = await this.entityManager.query(query, [id]);
    return ong[0];
  }

  /**
   * 
   * Lista todas as oficinas de uma ONG específica. Este método recebe o ID de uma ONG como parâmetro
    * e retorna uma lista de oficinas associadas a essa ONG.
   * 
   * @param {number} id - O ID da ONG cujas oficinas devem ser listadas.
   * 
   * @returns {Promise<OngEntity | undefined>} Uma promessa que resolve para um array de entidades
   */
  async findWorkshopsByOngId(id: number) {
    const query = `
    SELECT 
        w.id, 
        w.name, 
        w.description, 
        w.ongid, 
        w.categoryid, 
        c.name AS categoryname, 
        c.color AS categorycolor,
        o.name AS ongname
    FROM 
        "public"."workshop" w
    JOIN 
        "public"."category" c ON w.categoryid = c.id
    JOIN 
        "public"."ong" o ON w.ongid = o.id
    WHERE 
        w.ongid = $1
    `;
    const workshops = await this.entityManager.query(query, [id]);
    return workshops;
  }
}