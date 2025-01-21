import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { CategoryService } from "../services/category.service";
import { Category } from "../entities/category.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("/categories")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService){}

    // Listagem categorias
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    // Consultar por ID
    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findOne(@Param("id", ParseIntPipe) id: number): Promise<Category> {
        return this.categoryService.findById(id);
    }

    // Consultar por nome
    @Get("/category/:category")
    @HttpCode(HttpStatus.OK)
    findByName(@Param('category') category: string): Promise<Category[]> {
        return this.categoryService.findByCategory(category);
    }

    // Criar um novo produto
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() category: Category): Promise<Category> {
        return this.categoryService.create(category);
    }

    // Atualizar um produto
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() category: Category): Promise<Category> {
        return this.categoryService.update(category);
    }


    // Deletar um produto
    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param("id", ParseIntPipe) id: number){
        return this.categoryService.delete(id);
    }
}