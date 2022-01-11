import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { create } from 'domain';
import { BankDataService } from './bank-data.service';
import { CreateBankDataDto } from './dtos/create-bank-data.dto';
import { UpdateBankDataDto } from './dtos/update-bank-data.dto';

@Controller('bank')
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
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.bankDataService.destroy(id);
  }
}
