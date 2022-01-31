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
import { CreateExperiencesDto } from './dto/create-experiences-dto';
import { UpdateExperiencesDto } from './dto/update-experiences-dto';
import { ExperiencesService } from './experiences.service';

@Controller('api/v1/experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Get()
  async index() {
    return this.experiencesService.findAll();
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.experiencesService.findOneOrFail({ id });
  }

  @Post()
  async store(@Body() body: CreateExperiencesDto) {
    return await this.experiencesService.store(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateExperiencesDto,
  ) {
    return await this.experiencesService.update(id, body);
  }

  @Delete(':id')
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.experiencesService.destroy(id);
  }
}
