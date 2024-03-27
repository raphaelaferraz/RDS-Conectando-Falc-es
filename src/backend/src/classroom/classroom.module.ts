// Módulo de turma

import { Module } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { classroom } from './classroom.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassroomController } from './classroom.controller';
import { WorkshopService } from '../workshop/workshop.service';

@Module({
  imports: [TypeOrmModule.forFeature([classroom])],
  providers: [ClassroomService, WorkshopService],
  controllers: [ClassroomController],
})
export class ClassroomModule {}
