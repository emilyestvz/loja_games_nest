/*A Classe AppModule é Módulo Principal da aplicação Nest. */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/entities/product.entity';

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
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
