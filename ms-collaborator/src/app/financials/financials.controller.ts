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
import { CreateFinancialsDto } from './dtos/create-financials.dto';
import { UpdateFinancialsDto } from './dtos/update-financials.dto';
import { FinancialsService } from './financials.service';

@Controller('/coll/api/v1/financials')
export class FinancialsController {
  constructor(private readonly financialsService: FinancialsService) { }

  @Get()
  async index() {
    return await this.financialsService.findAll();
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.financialsService.findOneOrFail({ id });
  }

  @Get('collaborator/:id')
  async findByCollaborator(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.financialsService.findByCollaborator(id)
  }

  @Post()
  async store(@Body() body: CreateFinancialsDto) {
    return await this.financialsService.store(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateFinancialsDto,
  ) {

    return await this.financialsService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.financialsService.destroy(id);
  }
}
