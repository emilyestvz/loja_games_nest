import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

/*LocalAuthGuard foi criada como uma Herança da Classe AuthGuard, que pertence ao Passport Strategy local.

Essa Classe será utilizada na Classe AuthController, no Método login, para redirecionar as Requisições de Login 
para a Estratégia Local do Passport, ou seja, a autenticação do usuário, via Banco de dados. */