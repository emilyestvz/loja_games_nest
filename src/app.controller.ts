/*A Classe AppController é a Classe Controladora Principal da aplicação Nest. 
Por padrão, ela executa o Helo World criado na Classe AppService, através do endpoint /, o endereço raiz do aplicação (index).*/
import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor() {}

  @ApiExcludeEndpoint()
  @Get()
  async redirect(@Res() reply: any) {
    return reply.redirect('/swagger');
  }
}
