// Módulo de aula

import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';

@Module({})
export class ClassModule {
    providers: [ClassService];
    controllers: [ClassController];
}
