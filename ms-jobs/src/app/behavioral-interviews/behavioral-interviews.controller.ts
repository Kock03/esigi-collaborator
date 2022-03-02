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
import { stringify } from 'querystring';
import { BehavioralInterviewsEntity } from './behavioral-interviews.entity';
import { BehavioralInterviewsService } from './behavioral-interviews.service';
import { CreateBehaviorInterviewsDto } from './dtos/create-behavioral-interviews.dto';
import { UpdateBehaviorInterviewsDto } from './dtos/update-behavioral-interviews.dto';

@Controller('/api/v1/behaviroal-interviews')
export class BehavioralInterviewsController {
  constructor(
    private readonly behavioralInterviewsService: BehavioralInterviewsService,
  ) {}

  @Get()
  async index() {
    return await this.behavioralInterviewsService.findAll();
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.behavioralInterviewsService.findOneOrFail({ id });
  }

  @Post()
  async store(@Body() body: CreateBehaviorInterviewsDto) {
    return await this.behavioralInterviewsService.store(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateBehaviorInterviewsDto,
  ) {
    return await this.behavioralInterviewsService.update(id, body);
  }

  @Delete(':id')
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.behavioralInterviewsService.destroy(id);
  }
}
