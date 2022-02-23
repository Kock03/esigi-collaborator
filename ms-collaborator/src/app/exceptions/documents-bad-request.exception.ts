import { HttpException, HttpStatus } from '@nestjs/common';

export class DocumentsBadRequestExcpetion extends HttpException {
  constructor() {
    super('O documento (cpf/cnpj) não é válido', HttpStatus.BAD_REQUEST);
  }
}
