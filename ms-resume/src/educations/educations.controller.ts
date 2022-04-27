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
import { CreateSchoolingDto } from './dto/create-schooling.dto';
import { UpdateSchoolingDto } from './dto/update-schooling.dto';
import { EducationsService } from './educations.service';

@Controller('api/v1/educations')
export class EducationsController {
  constructor(private readonly educationsService: EducationsService) { }

  @Get()
  async index() {
    return await this.educationsService.findAll();
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.educationsService.findOneOrFail({ id });
  }

  @Post()
  async store(@Body() body: CreateSchoolingDto) {
    return await this.educationsService.store(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateSchoolingDto,
  ) {
    return await this.educationsService.update(id, body);
  }

  @Delete(':id')
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.educationsService.destroy(id);
  }
}
