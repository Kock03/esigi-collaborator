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
import { ClientInterviewsService } from './client-interviews.service';
import { CreateClientInterviewsDto } from './dtos/create-client-interviews.dto';
import { UpdateClientInterviewsDto } from './dtos/update-client-interviews.dto';

@Controller('/api/v1/client-interviews')
export class ClientInterviewsController {
  constructor(
    private readonly clientInterviewsService: ClientInterviewsService,
  ) {}

  @Get()
  async index() {
    return await this.clientInterviewsService.findAll();
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.clientInterviewsService.findOneOrFail({ id });
  }

  @Post()
  async store(@Body() body: CreateClientInterviewsDto) {
    return await this.clientInterviewsService.store(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateClientInterviewsDto,
  ) {
    return await this.clientInterviewsService.update(id, body);
  }

  @Delete(':id')
  async detroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.clientInterviewsService.destroy(id);
  }
}
