// Importa o decorador Injectable de @nestjs/common, DTO de autenticação de usuário e serviço de usuário
import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthCredentialsUserDto } from "./dto/authCredentials-user.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    /**
     * Autentica um usuário com base nas credenciais fornecidas. Este método recebe um objeto `AuthCredentialsUserDto`
     * pelo corpo da requisição, que contém as informações necessárias para a autenticação do usuário, como nome de usuário
     * e senha. Os dados são passados para o `UserService` para realizar a autenticação.
     * 
     * Este endpoint é acessado através de uma solicitação POST para '/user/auth'. Se as credenciais forem válidas,
     * o método retorna os dados relevantes do usuário autenticado, que podem incluir tokens de acesso, informações do perfil
     * do usuário, ou qualquer outro dado definido pelo `UserService` como parte do processo de autenticação.
     * 
     * @param {AuthCredentialsUserDto} authCredentialsUSerDto - O objeto contendo as credenciais do usuário a serem autenticadas.
     * 
     * @returns {Promise<any>} Uma promessa que resolve para os dados do usuário autenticado ou informações relacionadas
     * à sessão de autenticação. O tipo de retorno exato depende da implementação específica do `UserService`.
    */
    @Post('auth')
    async authCreditialsUser(@Body() authCredentialsUSerDto: AuthCredentialsUserDto) {
        return this.userService.authCreditialsUser(authCredentialsUSerDto)
    }
}
