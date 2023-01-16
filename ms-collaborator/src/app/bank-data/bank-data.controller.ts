import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BankDataService } from './bank-data.service';
import { CreateBankDataDto } from './dtos/create-bank-data.dto';
import { UpdateBankDataDto } from './dtos/update-bank-data.dto';

@Controller('/coll/api/v1/bank')
export class BankDataController {
  constructor(private readonly bankDataService: BankDataService) {}

  @Get()
  async index() {
    return await this.bankDataService.findAll();
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.bankDataService.findOneOrFail({ id });
  }

  @Get('collaborator/:id')
  async findByCollaborator(@Param('id', new ParseUUIDPipe()) id: string){
    return await this.bankDataService.findByCollaborator(id)
  }

  @Post()
  async store(@Body() body: CreateBankDataDto) {
    return await this.bankDataService.store(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateBankDataDto,
  ) {
    return await this.bankDataService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.bankDataService.destroy(id);
  }
}
