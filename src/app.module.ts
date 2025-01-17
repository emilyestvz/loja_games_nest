/*A Classe AppModule é Módulo Principal da aplicação Nest. */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/entities/product.entity';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_game_ecommerce',
      entities: [Product],
      synchronize: true, // Sincroniza as tabelas com os modelos de dados
    }),
    ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
