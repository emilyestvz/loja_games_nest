import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { LocalAuthGuard } from "../guard/local-auth.guard";
import { UserLogin } from "../entities/userLogin.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('User')
@Controller('/users')
export class AuthController {
    
    constructor(private authService: AuthService){}

    // Endpoint para autentificar o usuário no login
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    login(@Body() user: UserLogin): Promise<any>{
        return this.authService.login(user);
    }
}