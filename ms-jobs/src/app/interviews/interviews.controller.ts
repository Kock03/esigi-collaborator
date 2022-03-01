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
import { CreateInterviewsDto } from './dtos/create-interviews.dto';
import { UpdateInterviewsDto } from './dtos/update-interviews.dto';
import { InterviewsService } from './interviews.service';

@Controller('api/v1/interviews')
export class InterviewsController {
  constructor(private readonly interviewsService: InterviewsService) {}

  @Get()
  async index() {
    return await this.interviewsService.findAll();
  }

  @Get(':id')
  async findInterviewsDetails(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.interviewsService.findOneOrFail({ id });
  }

  @Post()
  async store(@Body() body: CreateInterviewsDto) {
    return await this.interviewsService.store(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateInterviewsDto,
  ) {
    return await this.interviewsService.update(id, body);
  }

  @Delete(':id')
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.interviewsService.destroy(id);
  }
}
