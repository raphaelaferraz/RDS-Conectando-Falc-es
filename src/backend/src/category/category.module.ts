// Módulo de categorias

import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { category } from './category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([category])],
    providers: [CategoryService],
    exports: [CategoryService],
    controllers: [CategoryController]
})
export class CategoryModule {}
