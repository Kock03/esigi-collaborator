import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { CreateLanguagesDto } from "./dtos/create-languages.dto";
import { UpdateLanguagesDto } from "./dtos/update-languages.dto";
import { LanguagesService } from "./languages.service";

@Controller('/api/v1/languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) { }

  @Get()
  async index() {
    return await this.languagesService.findAll();
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.languagesService.findOneOrfail({ id });
  }

  @Get('job/:id')
  async findByJob(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.languagesService.findByJob(id)
  }


  @Post()
  async store(@Body() body: CreateLanguagesDto) {
    return await this.languagesService.store(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateLanguagesDto,
  ) {
    return await this.languagesService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.languagesService.destroy(id);
  }
}
