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
import { CreateIdiomsDto } from './dto/create-idioms-dto';
import { UpdateIdiomsDto } from './dto/update-idioms-dto';
import { IdiomsService } from './languages.service';

@Controller('api/v1/languages')
export class LanguagesController {
  constructor(private readonly idiomsService: IdiomsService) {}

  @Get()
  async index() {
    return this.idiomsService.findAll();
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.idiomsService.findOneOrFail({ id });
  }

  @Post()
  async store(@Body() body: CreateIdiomsDto) {
    return await this.idiomsService.store(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateIdiomsDto,
  ) {
    return await this.idiomsService.update(id, body);
  }

  @Delete(':id')
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.idiomsService.destroy(id);
  }
}
