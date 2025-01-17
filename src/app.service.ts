/*A Classe AppService é a Classe de Serviço Principal da aplicação Nest. Por padrão, ela vem com um Helo World criado.*/
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
