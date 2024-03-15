// Importa o decorador do pacote @nestjs/common e a entidade de presença
import { Injectable } from '@nestjs/common';
import { PresenceEntity } from './presence.entity';

@Injectable()
export class PresenceService {

    public presences: PresenceEntity[] = []
}



