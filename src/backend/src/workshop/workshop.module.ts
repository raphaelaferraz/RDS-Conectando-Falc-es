// Módulo de oficina

import { Module } from "@nestjs/common";
import { WorkshopService } from "./workshop.service";
import { WorkshopController } from './workshop.controller';
import { workshop } from "./workshop.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([workshop])],
  providers: [WorkshopService],
  exports: [WorkshopService],
  controllers: [WorkshopController]
})

export class WorkshopModule { }
