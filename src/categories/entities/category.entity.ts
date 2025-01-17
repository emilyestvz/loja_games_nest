import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";

@Entity({name: 'tb_categories'})
export class Category {
    
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    category: string;

    // Relacionamento com Produtos
    @OneToMany(() => Product, product => product.category)
    products: Product[];

}