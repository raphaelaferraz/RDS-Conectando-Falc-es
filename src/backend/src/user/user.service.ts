import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsUser } from "./interfaces/authCredentials-user.interface";
import { AuthCredentialsResponseUser } from "./interfaces/authCredentialsResponse-user.interface";

@Injectable()
export class UserService {
    // Código comentado abaixo será usado para intregação com o banco de dados durante a sprint 3

    // constructor(
    //     @InjectRepository(User)
    //     private usersRepository: Repository<User>,
    // ) { }

    // Simulação de uma entidade "User" no banco de dados 
    private readonly users: User[] = [
        {
            "id": 1,
            "role": "Teacher",
            "roleID": 1,
            "email": "professor@gmail.com",
            "password": "teste"
        },
        {
            "id": 2,
            "role": "Leader",
            "roleID": 2,
            "email": "lider@gmail.com",
            "password": "teste"
        },
        {
            "id": 3,
            "role": "GF",
            "roleID": 3,
            "email": "gf@gmail.com",
            "password": "teste"
        }
    ];

    /**
     * Autentica um usuário com base nas credenciais fornecidas e retorna suas credenciais de autenticação,
     * incluindo o papel (role) e o identificador do papel (roleID). Este método recebe um objeto
     * `AuthCredentialsUser` que contém o e-mail e a senha do usuário. Ele realiza uma busca no conjunto de
     * usuários cadastrados para encontrar um usuário que corresponda às credenciais fornecidas.
     * 
     * Se um usuário correspondente for encontrado, o método retorna um objeto `AuthCredentialsResponseUser`
     * contendo o papel e o identificador do papel do usuário. Caso contrário, a implementação pode variar,
     * possivelmente lançando um erro ou retornando um objeto vazio, dependendo das regras de negócio definidas.
     * 
     * @param {AuthCredentialsUser} authCredentialsUser - O objeto contendo as credenciais do usuário (e-mail e senha).
     * 
     * @returns {AuthCredentialsResponseUser} Um objeto contendo o `role` (papel do usuário) e `roleID` (identificador
     * do papel), que são utilizados para definir as permissões e o acesso do usuário no sistema.
    */
    authCreditialsUser(authCredentialsUser: AuthCredentialsUser): AuthCredentialsResponseUser{
        const { role, roleID } = this.users.find( user => user.email == authCredentialsUser.email && user.password == authCredentialsUser.password)

        return {role, roleID}
    }

}