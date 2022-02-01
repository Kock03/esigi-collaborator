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
import { CreateSkillsDto } from './dtos/create-skills.dto';
import { UpdateSkillsDto } from './dtos/update-skills.dto';
import { SkillsService } from './skills.service';

@Controller('/api/v1/skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  async index() {
    return await this.skillsService.findAll();
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.skillsService.findOneOrFail({ id });
  }

  @Post()
  async store(@Body() body: CreateSkillsDto) {
    return await this.skillsService.store(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateSkillsDto,
  ) {
    return await this.skillsService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.skillsService.destroy(id);
  }
}
