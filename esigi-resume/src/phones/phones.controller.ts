import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePhonesDto } from './dto/create-phones-dto';
import { UpdatePhonesDto } from './dto/update-phones-dto';
import { PhonesService } from './phones.service';

@Controller('phones')
export class PhonesController {
  constructor(private readonly phonesService: PhonesService) {}

  @Get()
  async index() {
    return this.phonesService.findAll();
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.phonesService.findOneOrFail({ id });
  }

  @Post()
  async store(@Body() body: CreatePhonesDto) {
    return await this.phonesService.store(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdatePhonesDto,
  ) {
    return await this.phonesService.update(id, body);
  }

  @Delete(':id')
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.phonesService.destroy(id);
  }
}
