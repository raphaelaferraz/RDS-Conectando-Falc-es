// Módulo de ONG

import { Module } from "@nestjs/common";
import { OngController } from "./ong.controller";
import { OngService } from "./ong.service";
import { WorkshopService } from "../workshop/workshop.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ong } from "./ong.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ong])],
  controllers: [OngController],
  providers: [OngService, WorkshopService]
})

export class OngModule {}