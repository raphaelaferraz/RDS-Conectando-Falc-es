import { Injectable } from "@nestjs/common";
import { category } from "./category.entity";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";

@Injectable()
export class CategoryService{
    constructor(
        @InjectEntityManager()
        private entityManager: EntityManager,
    ) {}

    /**
     * Recupera todas as categorias disponíveis. Este método simula a obtenção de dados de categorias
     * de um banco de dados, retornando uma lista estática de categorias definidas internamente.
     * Não recebe parâmetros e é projetado para ser usado internamente ou por controladores que necessitam
     * acessar a lista de categorias.
     * 
     * @returns {Promise<Category[]>} Uma promessa que resolve para uma lista estática de entidades de categorias.
     * Cada entidade de categoria inclui um `id`, um `name` representando o nome da categoria, e uma `color` associada à categoria para fins de apresentação.
     */
    async getCategories() {
        const query = 'SELECT * FROM "public"."category"';
        const categories = await this.entityManager.query(query);
        return categories;
    }

    /**
     * Cria uma nova categoria. Este método recebe um nome e uma cor para a nova categoria e a adiciona
     * 
     * @param {string} name - O nome da nova categoria
     * @param {string} color - A cor associada à nova categoria
     * 
     * @returns {Promise<Category>} Uma promessa que resolve para a entidade `Category` da nova categoria
     * 
     */
    async createCategory(name: string, color: string) {
        const query = `INSERT INTO "public"."category" (name, color) VALUES ($1, $2) RETURNING *`;
        const result = await this.entityManager.query(query, [name, color]);
        return result[0];
    }
}