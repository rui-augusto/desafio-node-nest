import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getProjectInfo() {
    return "<h1>Aplicação simples em NestJS com cadastro de usuários, login e atualização do cadastro.</h1><h2>Rui Augusto Drumond Mendonça</h2>";
  }

}