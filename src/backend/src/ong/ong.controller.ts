// Importa decoradores, entidade de ONG e serviço de workshop
import { Controller, Get, Param } from "@nestjs/common";
import { OngService } from "./ong.service";
import { WorkshopService } from "../workshop/workshop.service";


@Controller('/ongs')
export class OngController {

  constructor(private ongService: OngService, private workshopService: WorkshopService){}

  /**
 * Lista todas as ONGs cadastradas. Este método não recebe parâmetros e retorna um array contendo
 * todos os dados básicos das ONGs cadastradas. É útil para fornecer uma visão geral das ONGs disponíveis
 * na plataforma.
 * 
 * Este endpoint é acessado através de uma solicitação GET para '/ongs'.
 * 
 * @returns {Promise<ong[]>} Uma promessa que resolve para um array de objetos, onde cada objeto
 * contém os dados básicos de uma ONG cadastrada.
 */
  @Get()
  async listAllOngs(){
    const ongs = await this.ongService.findOngs();
    return ongs;
  }

  /**
   * Busca uma ONG específica pelo seu ID. Este método recebe o ID da ONG como parâmetro e retorna um objeto
   * contendo todos os dados da ONG encontrada, juntamente com informações adicionais, como a lista de workshops
   * associados à ONG, a quantidade total de workshops, e a lista de estudantes por workshop.
   * 
   * Este endpoint é acessado através de uma solicitação GET para '/ongs/:id', onde `:id` é o ID da ONG desejada.
   * 
   * @param {number} id - O ID da ONG a ser buscada.
   * 
   * @returns {Promise<{ong: ong, workshops: Workshop[], qtyAllWorkshops: number, studentsWorkshops: StudentWorkshop[]}>}
   * Uma promessa que resolve para um objeto contendo os dados da ONG, a lista de workshops associados, a quantidade total de workshops,
   * e a lista de estudantes por workshop.
  */
  @Get(':id/name')
  async getOngNameById(@Param('id') id: string): Promise<string | null> {
    const ong = await this.ongService.findById(parseInt(id, 10));
    return ong ? ong.name : null;
  }


  /**
   * 
   * Lista todas as oficinas de uma ONG específica. Este método recebe o ID de uma ONG como parâmetro e retorna um array contendo todas as oficinas associadas a essa ONG.
   * 
   * @param {number} id - O ID da ONG cujas oficinas devem ser listadas.
   * 
   * @returns {Promise<Workshop[]>} Uma promessa que resolve para um array de objetos, onde cada objeto contém os dados de uma oficina associada à ONG.
   */
  @Get(':id/workshops')
  async getWorkshopsByOngId(@Param('id') id: string): Promise<any> {
    const workshops = await this.ongService.findWorkshopsByOngId(parseInt(id, 10));
    return workshops;
  }
}