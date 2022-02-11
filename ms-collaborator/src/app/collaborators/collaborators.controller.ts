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
import { CollaboratorsService } from './collaborators.service';
import { CreateCollaboratorsDto } from './dtos/create-collaborators.dto';
import { UpdateCollaboratorsDto } from './dtos/update-collaborators.dto';

@Controller('/api/v1/collaborators')
export class CollaboratorsController {
  constructor(private readonly collaboratorsRepository: CollaboratorsService) {}

  @Get()
  async index() {
    return await this.collaboratorsRepository.findAll();
  }

  @Post()
  async store(@Body() body: CreateCollaboratorsDto) {
    console.log(
      '🚀 ~ file: collaborators.controller.ts ~ line 28 ~ CollaboratorsController ~ store ~ body',
      body,
    );
    return await this.collaboratorsRepository.store(body);
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.collaboratorsRepository.findOneOrFail({ id });
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateCollaboratorsDto,
  ) {
    return await this.collaboratorsRepository.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.collaboratorsRepository.destroy(id);
  }
}
