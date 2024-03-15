// Módulo de estudante

import { Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { student } from "./student.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WorkshopService } from "src/workshop/workshop.service";
import { StudentUpdateDTO } from "./studentUpdate.dto";

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentUpdateDTO])],
  controllers: [StudentController],
  providers: [StudentService, WorkshopService],
})
export class StudentModule {}
