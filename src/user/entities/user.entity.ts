import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "../../product/entities/product.entity"
import { Transform, TransformFnParams } from "class-transformer"


@Entity({name: "tb_users"})
export class User {

    @PrimaryGeneratedColumn() 
    id: number

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    name: string

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsEmail()
    @IsNotEmpty()
    @Column({length: 255, nullable: false })
    user: string

    @Transform(({value}: TransformFnParams) => value?.trim())
    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false }) 
    password: string

    @Column({length: 5000 }) 
    photo: string

    @OneToMany(() => Product, (product) => product.user)
    product: Product[]

}