import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { IResumes } from 'src/interfaces/iresume.interface';
import { CreateResumesDto } from './dto/create-resumes.dto';
import { UpdateResumesDto } from './dto/update-resumes.dto';
import { ResumesService } from './resumes.service';
import * as fs from 'fs';


@Controller('/coll/api/v1/resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) { }

  @Get()
  async index() {
    return this.resumesService.findAll();
  }

  @Post('/list')
  async findResumesListById(@Body() body: IResumes) {
    return await this.resumesService.findResumesListById(body.idList);
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.resumesService.findOneOrFail({ id });
  }

  @Get('generate-pdf/:id')
  async generatePDF(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.resumesService.createPdf(id);
  }

  @Get('download/:pdfpath')
  async seeUploadedFile(@Param('pdfpath') pdf: string, @Res() res) {
    var path = "pdf/" + pdf
    console.log(pdf)
    if (fs.existsSync(path)) {
      console.log(fs.existsSync(path))
      return await res.download(path)
    }
  }

  @Get('find')
  async findByName(@Query('name') name: any) {
    return this.resumesService.findByName(name);
  }

  @Post('find')
  async find(@Body() body: any) {
    return await this.resumesService.findByName(body.name);
  }

  @Post()
  async store(@Body() body: CreateResumesDto) {
    return await this.resumesService.store(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateResumesDto,
  ) {
    return await this.resumesService.update(id, body);
  }

  @Delete(':id')
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.resumesService.destroy(id);
  }
}
