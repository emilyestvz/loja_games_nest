/*A Classe AppModule é Módulo Principal da aplicação Nest. */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './categories/category.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';

@Module({
  imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRootAsync({
	      useClass: ProdService,
        imports: [ConfigModule],
        
      }),
    ProductModule,
    CategoryModule,
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
