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
import { CreateReturnsDto } from './dtos/create-returns.dto';
import { UpdateReturnsDto } from './dtos/update-returns.dto';
import { ReturnsService } from './returns.service';

@Controller('/coll/api/v1/returns')
export class ReturnsController {
  constructor(private readonly returnsService: ReturnsService) {}

  @Get()
  async index() {
    return await this.returnsService.findAll();
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.returnsService.findOneOrFail({ id });
  }

  @Post()
  async store(@Body() body: CreateReturnsDto) {
    return await this.returnsService.store(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateReturnsDto,
  ) {
    return await this.returnsService.update(id, body);
  }

  @Delete(':id')
  async detroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.returnsService.destroy(id);
  }
}
