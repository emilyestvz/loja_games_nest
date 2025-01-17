// Model class

import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { NumericTransformer } from "../../util/numericTransformer";

@Entity({name: 'tb_products'})
export class Product {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    name: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    description: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({type:"decimal", precision: 10, scale: 2, transformer: new NumericTransformer(),nullable:false})
    price: number;

    @IsNotEmpty()
    @Column({nullable: false})
    quantity: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

}
