/*A Classe main é a Classe principal da aplicação Nest, ou seja, ela é responsável por iniciar a aplicação Nest.*/
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.TZ = '-03:00';
  
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
