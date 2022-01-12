import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { DocumentsService } from "./douments.service";
import { CreateDocumentsDto } from "./dtos/create-documents.dto";
import { UpdateDocumentsDto } from "./dtos/update-documents.dto";

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  async index() {
    return await this.documentsService.findAll();
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.documentsService.findOneOrfail({ id });
  }

  @Post()
  async store(@Body() body: CreateDocumentsDto) {
    return await this.documentsService.store(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateDocumentsDto) {
    return await this.documentsService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.documentsService.destroy(id);
  }
}