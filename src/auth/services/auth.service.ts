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