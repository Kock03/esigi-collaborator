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
import { UpdateFinancialsDto } from 'src/app/financials/dtos/update-financials.dto';
import { CreatePhonesDto } from './dtos/create-phones.dto';
import { UpdatePhonesDto } from './dtos/update-phones.dto';
import { PhonesEntity } from './phones.entity';
import { PhonesService } from './phones.service';

@Controller('/api/v1/phones')
export class PhonesController {
  constructor(private readonly phonesService: PhonesService) {}

  @Get()
  async index() {
    return await this.phonesService.findAll();
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.phonesService.findOneOrfail({ id });
  }

  @Post()
  async store(@Body() body: CreatePhonesDto) {
    return await this.phonesService.store(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdatePhonesDto) {
    return await this.phonesService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.phonesService.destroy(id);
  }
}
