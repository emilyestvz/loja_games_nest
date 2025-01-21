import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from '../services/user.service';
import { User } from "../entities/user.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { CreateUserDto } from "../dto/user.dto";

@Controller('/users')
export class UserController {
    

    constructor(private readonly userService:UserService){}
    
    // Implementar rotas para cada operação de CRUD
    
    @UseGuards(JwtAuthGuard)
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<User[]>{
        return this.userService.findAll();
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id', ParseIntPipe) id: number): Promise<User>{
        return this.userService.findById(id);
    }

    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() userDto: CreateUserDto): Promise<User>{
        return this.userService.create(userDto);
    }
    
    @UseGuards(JwtAuthGuard)
    @Put('/update')
    @HttpCode(HttpStatus.OK) 
    async update(@Body() user: User): Promise<User>{
        return this.userService.update(user);
    }   

    @Delete('delete/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param("id", ParseIntPipe) id: number){
         return this.userService.delete(id);
    }

}


