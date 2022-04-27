import { HttpException, HttpStatus } from '@nestjs/common';

export class DocumentsBadRequestExcpetion extends HttpException {
  constructor() {
    super('O documento CPF não é válido', HttpStatus.BAD_REQUEST);
  }
}
