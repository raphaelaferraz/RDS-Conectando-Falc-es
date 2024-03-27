// Importa o decorador Controller do pacote @nestjs/common e o serviço de Categoria
import { Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { category } from './category.entity';
import { Body } from '@nestjs/common';
import { categoryDto } from './createCategory.dto';

@Controller('/categories')
export class CategoryController {
    constructor(private categoryRepository: CategoryService) { }

    /**
     * Lista todas as categorias disponíveis. Este método não recebe parâmetros e retorna
     * uma lista de categorias obtidas do repositório de categorias. O método manipula a obtenção
     * e possivelmente a transformação dos dados de categorias para o formato desejado antes de retornar.
     * 
     * Este endpoint é acessado através de uma solicitação GET para o caminho '/categories'.
     * 
     * @returns {Promise<Category[]>} Uma promessa que resolve para uma lista de categorias.
     */
    @Get()
    async getCategories() {
        const categories = await this.categoryRepository.getCategories();
        return categories;
    }

    /**
     * Cria uma nova categoria. Este método recebe um objeto de categoria e o adiciona ao repositório de categorias.
     * 
     * Este endpoint é acessado através de uma solicitação POST para o caminho '/categories'.
     * 
     * @param {category} category - O objeto de categoria a ser adicionado
     * 
     * @returns {Promise<Category>} Uma promessa que resolve para a entidade `Category` da nova categoria
     */
    @Post()
    async createCategory(@Body() category: categoryDto) {
        return await this.categoryRepository.createCategory(category.name, category.color);
    }
}
