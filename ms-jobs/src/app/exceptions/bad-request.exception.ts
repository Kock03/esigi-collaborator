import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor() {
    super('Registro inválido', HttpStatus.BAD_REQUEST);
  }
}
