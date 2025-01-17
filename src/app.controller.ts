/*A Classe AppController é a Classe Controladora Principal da aplicação Nest. 
Por padrão, ela executa o Helo World criado na Classe AppService, através do endpoint /, o endereço raiz do aplicação (index).*/
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
