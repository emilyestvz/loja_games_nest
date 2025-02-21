import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "../../product/entities/product.entity"
import { Transform, TransformFnParams } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"

@Entity({name: "tb_users"})
export class User {

    @PrimaryGeneratedColumn() 
    @ApiProperty() 
    id: number

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    @ApiProperty() 
    name: string

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsEmail()
    @IsNotEmpty()
    @Column({length: 255, nullable: false })
    @ApiProperty({example: 'email@email.com'}) 
    user: string

    @Transform(({value}: TransformFnParams) => value?.trim())
    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false }) 
    @ApiProperty() 
    password: string

    @Column({length: 5000 }) 
    @ApiProperty() 
    photo: string

    @ApiProperty() 
    @OneToMany(() => Product, (product) => product.user)
    product: Product[]

}