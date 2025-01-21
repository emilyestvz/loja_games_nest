import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Bcrypt } from "../bcrypt/bcrypt";
import { UserService } from "../../user/services/user.service";
import { UserLogin } from "../entities/userLogin.entity";

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ) {}

    async validateUser(username: string, password: string): Promise<any>{

        const userSearch = await this.userService.findByUser(username)

        if(!userSearch)
            throw new HttpException('User not found!', HttpStatus.NOT_FOUND)

        const matchPassword = await this.bcrypt.comparePasswords(password, userSearch.password)

        if(userSearch && matchPassword){
            const { password, ...reply } = userSearch
            return reply
        }

        return null // Retorna null se a validação falhar
    }

    async login(userLogin: UserLogin){
        const payload = { sub: userLogin.user }
        const userSearch = await this.userService.findByUser(userLogin.user)

        return{
            id: userSearch.id,
            name: userSearch.name,
            user: userLogin.user,
            password: '',
            photo: userSearch.photo,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        }

    }
}

/* Comentários finais:
- Classe Bcrypt: Serviço do módulo Auth responsável por verificar se o atributo senha do objeto da 
classe UsuarioLogin (senha não criptografada) corresponde ao atributo senha do objeto da classe Usuario (senha criptografada) armazenado no banco de dados.
- O Método validateUser(usuario: string, senha: string) será responsável por validar os Atributos usuario (e-mail) e a senha enviados no Objeto UsuarioLogin. 
Caso os dados dos 2 Atributos sejam validados, o usuário será autenticado.
- O método login(usuarioLogin: UsuarioLogin) será responsável por receber as credenciais do usuário e enviá-las ao Passport para autenticar (fazer login) 
e validar o usuário na aplicação. Este método é essencial para o funcionamento do Passport, pois, sem a autenticação, não será possível gerar o Token JWT nem obter acesso aos endpoints protegidos. 
- Nessas linhas, criaremos o corpo da resposta para a autenticação bem-sucedida, no formato JSON. 
O objeto JSON conterá todos os atributos encontrados na busca do objeto Usuario, 
exceto a senha e o Token, que será gerado pelo método jwtService.sign(payload).

*/