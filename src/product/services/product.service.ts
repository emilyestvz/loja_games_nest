import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from '../entities/product.entity';
import { DeleteResult, ILike, LessThan, MoreThan, Repository } from "typeorm";

@Injectable()
export class ProductService {
    filter(arg0: (product: any) => boolean): Promise<Product[]> {
        throw new Error('Method not implemented.');
    }

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) {}

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find({
            relations:{
                category: true,
                user: true
            }
        });
    }

    // Consultar por ID
    async findById(id: number): Promise<Product> {
        let product = await this.productRepository.findOne({
            where: { id },
            relations:{
                category: true,
                user: true
            }
        });
        
        if (!product) {
            throw new Error('Product not found!');
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
                category: true,
                user: true
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

    // Filtragem por preço maior 
    //Obs.: MoreThan(value) retorna produtos cujo preço seja maior que value.
    async findAbovePrice(value: number): Promise<Product[]>{
        return this.productRepository.find({   // retorna todos os registros correspondentes à condição
            where: { 
                price: MoreThan(value)
            },
            relations:{
                category: true,
                user: true
            },
            order: {
                price: 'ASC'  // ordena os resultados em ordem crescente
            }
        });
    }

    // Filtragem por preço Menor
    //Obs.: LessThan(value) retorna produtos cujo preço seja menor que value.
    async findBelowPrice(value: number): Promise<Product[]>{
        return this.productRepository.find({
            where: {
                price: LessThan(value)
            },
            relations:{
                category: true,
                user: true
            },
            order: {
                price: 'DESC'
            }
        });
    }
}

