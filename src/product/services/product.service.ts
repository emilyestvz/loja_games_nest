import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from '../entities/product.entity';
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) {}

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find({
            relations:{
                category: true
            }
        });
    }

    // Consultar por ID
    async findById(id: number): Promise<Product> {
        let product = await this.productRepository.findOne({
            where: { id },
            relations:{
                category: true
            }
        });
        
        if (!product) {
            throw new Error("Product not found!");
        }
        
        return product;
    }

    // Consultar por nome
    async findByName(name: string): Promise<Product[]> {
        return await this.productRepository.find({
            where: { 
                name: ILike(`%${name}%`)
             },
             relations:{
                category: true
            }
        });
    }

    // Adicionar um novo produto
    async create(product: Product): Promise<Product> {
        return await this.productRepository.save(product);
    }

    // Atualizar um produto existente
    async update(product: Product): Promise<Product> {
       
        await this.findById(product.id);
        
        Object.assign(product);
        return await this.productRepository.save(product); 
    }

    // Remover um produto existente
    async delete(id: number): Promise<DeleteResult> {
        
        await this.findById(id);
        return await this.productRepository.delete(id);
    } 
}

