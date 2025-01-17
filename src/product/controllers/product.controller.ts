import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProductService } from "../services/product.service";
import { Product } from "../entities/product.entity";

@Controller("/products")
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    // Consultar por ID
    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findOne(@Param("id", ParseIntPipe) id: number): Promise<Product> {
        return this.productService.findById(id);
    }

    // Consultar por nome
    @Get("/name/:name")
    @HttpCode(HttpStatus.OK)
    findByName(@Param('name') name: string): Promise<Product[]> {
        return this.productService.findByName(name);
    }

    // Criar um novo produto
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() product: Product): Promise<Product> {
        return this.productService.create(product);
    }

    // Atualizar um produto
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() product: Product): Promise<Product> {
        return this.productService.update(product);
    }


    // Deletar um produto
    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param("id", ParseIntPipe) id: number){
        return this.productService.delete(id);
    }

    // Listar todos os produtos cujo o preço seja maior que um valor informado na URL, ordenados em ordem crescente.
    @Get("/price/:value")
    @HttpCode(HttpStatus.OK)
    findAbovePrice(@Param('value') value: number): Promise<Product[]> {
        return this.productService.findAbovePrice(value);
    }

    // Listar todos os Produtos cujo preço seja menor que um valor informado na URL, ordenados em ordem decrescente.
    @Get("/price/desc/:value")
    @HttpCode(HttpStatus.OK)
    findBelowPrice(@Param('value') value: number): Promise<Product[]> {
        return this.productService.findBelowPrice(value);
    }


}