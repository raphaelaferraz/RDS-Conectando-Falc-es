// Módulo de estudante

import { Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { student } from "./student.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentUpdateDTO } from "../student/dto/studentUpdate.dto";
import { WorkshopService } from "../workshop/workshop.service";


@Module({
  imports: [
    TypeOrmModule.forFeature([student])],
  controllers: [StudentController],
  providers: [StudentService, WorkshopService],
})
export class StudentModule {}
