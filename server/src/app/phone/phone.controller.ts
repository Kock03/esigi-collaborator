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
import { CreatePhoneDto } from './dtos/create-phone.dto';
import { UpdatePhoneDto } from './dtos/update-phone.dto';
import { PhoneEntity } from './phone.entity';
import { PhoneService } from './phone.service';

@Controller('/api/v1/phone')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @Get()
  async index() {
    return await this.phoneService.findAll();

  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.phoneService.findOneOrfail({ id });
  }

  @Post()
  async store(@Body() body: CreatePhoneDto) {
    return await this.phoneService.store(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdatePhoneDto) {
    return await this.phoneService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.phoneService.destroy(id);
  }
}
