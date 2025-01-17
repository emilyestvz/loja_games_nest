import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Category } from "../entities/category.entity";

@Injectable()
export class CategoryService {
    constructor(
            @InjectRepository(Category)
            private categoryRepository: Repository<Category>
        ) {}
    
        async findAll(): Promise<Category[]> {
            return await this.categoryRepository.find({
                relations: {
                    products: true
                }
            });
        }
    
        // Consultar por ID
        async findById(id: number): Promise<Category> {
            let category = await this.categoryRepository.findOne({
                where: { 
                    id 
                },
                relations: {
                    products: true
                }
            });
            
            if (!category) {
                throw new Error("Category not found!");
            }
            
            return category;
        }
    
        // Consultar por nome
        async findByCategory(category: string): Promise<Category[]> {
            return await this.categoryRepository.find({
                where: { 
                    category: ILike(`%${category}%`)
                 },
                 relations: {
                    products: true
                }
            });
        }
    
        // Adicionar um novo produto
        async create(category: Category): Promise<Category> {
            return await this.categoryRepository.save(category);
        }
    
        // Atualizar um produto existente
        async update(category: Category): Promise<Category> {
           
            await this.findById(category.id);
            
            Object.assign(category);
            return await this.categoryRepository.save(category); 
        }
    
        // Remover um produto existente
        async delete(id: number): Promise<DeleteResult> {
            
            await this.findById(id);
            return await this.categoryRepository.delete(id);
        } 
}