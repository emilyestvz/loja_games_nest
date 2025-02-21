// Model class

import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { NumericTransformer } from "../../util/numericTransformer";
import { Category } from "../../categories/entities/category.entity";
import { User } from "../../user/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'tb_products'})
export class Product {
    
    @ApiProperty() 
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty() 
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    name: string;

    @ApiProperty() 
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    description: string;

    @ApiProperty() 
    @IsNumber({ maxDecimalPlaces: 2 })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({type:"decimal", precision: 10, scale: 2, transformer: new NumericTransformer(),nullable:false})
    price: number;

    @ApiProperty() 
    @Column()
    photo: string;

    @ApiProperty() 
    @IsNotEmpty()
    @Column({nullable: false})
    quantity: number;

    @ApiProperty() 
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    // Relacionamento com Categoria
    @ApiProperty({ type: () => Category }) 
    @ManyToOne(() => Category, (category) => category.products, {
        onDelete: "CASCADE"
    })
    category: Category;

    // Criação do segundo Relacionamento ManytoOne N:1 com a classe Usuario
    @ApiProperty({ type: () => User }) 
    @ManyToOne(() => User, (user) => user.product, {
      onDelete: "CASCADE" 
    })
    user: User;
}
