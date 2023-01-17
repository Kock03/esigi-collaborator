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
import { CreateClientInterviewsDto } from '../client-interviews/dtos/create-client-interviews.dto';
import { UpdateClientInterviewsDto } from '../client-interviews/dtos/update-client-interviews.dto';
import { CreateTechnicalInterviewsDto } from './dtos/create-technical-interviews.dto';
import { UpdateTechnicalInterviewsDto } from './dtos/update-technical-interviews.dto';
import { TechnicalInterviewsService } from './technical-interviews.service';

@Controller('/jobs/api/v1/technical-interviews')
export class TechnicalInterviewsController {
  constructor(
    private readonly technicalInterviewsService: TechnicalInterviewsService,
  ) {}

  @Get()
  async index() {
    return await this.technicalInterviewsService.findAll();
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.technicalInterviewsService.findOneOrFail({ id });
  }

  @Post()
  async store(@Body() body: CreateTechnicalInterviewsDto) {
    return await this.technicalInterviewsService.store(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateTechnicalInterviewsDto,
  ) {
    return await this.technicalInterviewsService.update(id, body);
  }

  @Delete(':id')
  async detroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.technicalInterviewsService.destroy(id);
  }
}
