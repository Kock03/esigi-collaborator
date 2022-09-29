import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Headers,
  Post,
  Put,
} from '@nestjs/common';
import { CreateFeedbacksDto } from './dto/create-feedbacks.dto';
import { UpdateFeedbacksDto } from './dto/update-feedbacks.dto';
import { FeedbacksEntity } from './feedbacks.entity';
import { FeedbacksService } from './feedbacks.service';

@Controller('api/v1/feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Get()
  async index() {
    return await this.feedbacksService.findAll();
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.feedbacksService.findOneOrFail({ id });
  }

  @Get('collaborator/:id')
  async findByCollaborator(@Param('id', new ParseUUIDPipe()) id: string, @Headers() headers){
    return await this.feedbacksService.findByCollaborator(id, headers.authorization)
  }

  @Post()
  async store(@Body() body: CreateFeedbacksDto) {
    return await this.feedbacksService.store(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateFeedbacksDto,
  ) {
    return await this.feedbacksService.update(id, body);
  }

  @Delete(':id')
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.feedbacksService.destroy(id);
  }
}
