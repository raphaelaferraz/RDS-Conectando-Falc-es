import { Injectable } from '@nestjs/common';
import { ClassEntity } from './class.entity';
import { ClassDTO } from './class.dto';
import { PresenceEntity } from 'src/presence/presence.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from "typeorm";

@Injectable()
export class ClassService {

    constructor(
		@InjectEntityManager()
		private entityManager: EntityManager,
	) { }

    /**
     * Registra em lote as aulas junto com a presença dos estudantes. Este método recebe um array de objetos `ClassDTO`,
     * onde cada objeto contém os detalhes de uma aula específica, incluindo informações sobre a sala de aula, data e hora,
     * professor responsável, e listas de IDs dos estudantes presentes e ausentes.
     * 
     * Este método cria e armazena entidades de aula (`ClassEntity`) e entidades de presença (`PresenceEntity`) para cada estudante
     * listado como presente ou ausente, associando-os à aula correspondente. As entidades de presença são criadas utilizando o
     * `PresenceService`, que gerencia a lógica de presença de forma mais granular.
     * 
     * @param {ClassDTO[]} dataClass - Um array de objetos `ClassDTO`, representando as aulas a serem registradas e os detalhes
     * de presença dos estudantes.
     * 
     * @returns {Promise<ClassEntity[]>} Uma promessa que resolve para uma lista das entidades de aula (`ClassEntity`)
     * recém-registradas, cada uma contendo detalhes da aula e arrays de entidades de presença representando os estudantes presentes
     * e ausentes.
     */
    

        // for (const classData of dataClass) {
        //     const idClass = this.classes.length + 1;

        //     const newClass: ClassEntity = {
        //         idClass: idClass,
        //         idClassroom: classData.idClassroom,
        //         dateTime: classData.dateTime,
        //         idTeacher: classData.idTeacher,
        //         presence: [],
        //         absent: []
        //     };
    
        //     for (const presenceData of classData.presence) {
        //         const newPresence: PresenceEntity = {
        //             id: this.presenceService.presences.length + 1,
        //             idClass: idClass,
        //             idStudent: presenceData,
        //             presence: true
        //         };
        //         newClass.presence.push(newPresence);
        //     }

        //     for (const presenceData of classData.absent) {
        //         const newPresence: PresenceEntity = {
        //             id: this.presenceService.presences.length + 1,
        //             idClass: idClass,
        //             idStudent: presenceData,
        //             presence: false
        //         };
        //         newClass.absent.push(newPresence);
        //     }
    
        //     this.classes.push(newClass);
        //     newClasses.push(newClass);
        // }
        // return newClasses;

    /**
     * Obtém todas as presenças registradas em todas as aulas.
     * 
     * Este método percorre todas as aulas armazenadas e concatena as listas de presença e ausência de cada aula
     * em uma única lista de entidades de presença.
     * 
     * @returns {Promise<PresenceEntity[]>} Uma promessa que resolve para uma lista das entidades de presença
     * representando todas as presenças registradas.
     */
    // async getAllPresences(): Promise<PresenceEntity[]> {
    //     const allPresences: PresenceEntity[] = [];
        
    //     for (const classItem of this.classes) {
    //         allPresences.push(...classItem.presence);
    //         allPresences.push(...classItem.absent);
    //     }

    //     return allPresences;
    // }
}
