import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'tb_categories'})
export class Category {
    
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty()
    category: string;

    // Relacionamento com Produtos
    @ApiProperty()
    @OneToMany(() => Product, product => product.category)
    products: Product[];

}