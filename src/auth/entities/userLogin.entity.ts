// Entidade Auxiliar, para armazenar o usuario e a senha (mas n gera tabela no banco de dados
import { ApiProperty } from "@nestjs/swagger"

export class UserLogin {

    @ApiProperty()
    public user: string

    @ApiProperty()
    public password: string
}