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
import { CreateResumesDto } from './dto/create-resumes.dto';
import { UpdateResumesDto } from './dto/update-resumes.dto';
import { ResumesService } from './resumes.service';

@Controller('/api/v1/resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) { }

  @Get()
  async index() {
    return this.resumesService.findAll();
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.resumesService.findOneOrFail({ id });
  }

  @Post()
  async store(@Body() body: CreateResumesDto) {
    return await this.resumesService.store(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateResumesDto,
  ) {
    return await this.resumesService.update(id, body);
  }

  @Delete(':id')
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.resumesService.destroy(id);
  }
}
