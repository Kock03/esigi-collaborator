import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictException extends HttpException {
  constructor() {
    super(
      'Registro já existe. Provavelmente algum campo que você preencheu já está cadastrado CPF',
      HttpStatus.CONFLICT,
    );
  }
}
