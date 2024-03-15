// Importa decoradores e entidade de sala de aula
import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm";
import { EntityManager } from "typeorm";

@Injectable()
export class ClassroomService {
    constructor(
        @InjectEntityManager()
        private entityManager: EntityManager,
      ) {}
}
