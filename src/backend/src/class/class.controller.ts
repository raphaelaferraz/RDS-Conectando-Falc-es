// Importa os decoradores do pacote @nestjs/common, serviço de aula e DTO de aula
import { Controller, Post, Get, Body } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassDTO } from './class.dto';
import { PresenceEntity } from 'src/presence/presence.entity'; // Certifique-se de importar a entidade de presença

@Controller('class')
export class ClassController {
    constructor(private readonly classService: ClassService) {}

    /**
     * Registra a presença dos participantes em um workshop específico. Este método recebe um array de objetos
     * `ClassDTO` pelo corpo da requisição, cada um representando os dados da presença de um participante,
     * incluindo o ID do workshop e outras informações relevantes para o registro de presença.
     * 
     * Este endpoint é acessado através de uma solicitação POST para '/class/presence'.
     * 
     * Após receber os dados, este método utiliza o `ClassService` para registrar em lote a presença dos participantes
     * e retorna a lista de presenças recém-registradas.
     * 
     * @param {ClassDTO[]} dataClasses - Um array de objetos `ClassDTO`, onde cada objeto contém os dados necessários
     * para registrar a presença de um participante em um workshop.
     * 
     * @returns {Promise<PresenceEntity[]>} Uma promessa que resolve para uma lista de entidades de presença,
     * representando as presenças recém-registradas. Cada entidade de presença inclui detalhes como o ID do workshop,
     * informações do participante e o status de presença.
    */
    @Post('/presence')
    async registerPresence(@Body() dataClasses: ClassDTO[]) {
        const newPresence = await this.classService.registerBatch(dataClasses);
        return newPresence;
    }

    /**
     * Endpoint para listar todas as presenças registradas.
     * 
     * Este endpoint é acessado através de uma solicitação GET para '/class/presence'.
     * 
     * Retorna uma lista de todas as presenças registradas.
     * 
     * @returns {Promise<PresenceEntity[]>} Uma promessa que resolve para uma lista de entidades de presença,
     * representando todas as presenças registradas.
    */
    @Get('/presence')
    async listPresence(): Promise<PresenceEntity[]> {
        return await this.classService.getAllPresences();
    }
}
