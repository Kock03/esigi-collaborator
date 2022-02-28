import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateInterviewsDto } from './dtos/create-interviews.dto';
import { InterviewsService } from './interviews.service';

@Controller('api/v1/interviews')
export class InterviewsController {
  constructor(private readonly interviewsService: InterviewsService) {}

  @Get()
  async index() {
    return await this.interviewsService.findAll();
  }

  @Get('/list-interviews')
  async findListInterviews() {
    return await this.interviewsService.findListInterviews();
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.interviewsService.findOnerOrFail({ id });
  }

  // @Get('list/:id')
  // async findInterviewsDetails(@Param('id', new ParseUUIDPipe()) id: string) {
  //   return await this.interviewsService.findInterviewsDetails({ id });
  // }

  @Post()
  async store(@Body() body: CreateInterviewsDto) {
    return await this.interviewsService.store(body);
  }
}
