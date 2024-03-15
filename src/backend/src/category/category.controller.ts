// Importa o decorador Controller do pacote @nestjs/common e o serviço de Categoria
import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

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
}
