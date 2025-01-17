import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Module } from "@nestjs/common";
import { CategoryService } from "./services/category.service";
import { CategoryController } from "./controllers/category.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [CategoryService],
    controllers: [CategoryController],
    exports: [TypeOrmModule, CategoryService]
})
export class CategoryModule {}