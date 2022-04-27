import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateSenioritiesDto } from './dtos/create-seniorities.dto';
import { UpdateSenioritiesDto } from './dtos/update-seniorities.dto';
import { SenioritiesService } from './seniorities.service';


@Controller('/api/v1/seniorities')
export class SenioritiesController {
    constructor(private readonly senioritiesService: SenioritiesService){ }

    @Get()
    async index(){
        return await this.senioritiesService.findAll();
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string){
        return await this.senioritiesService.findOneOrfail({id});
    }

    @Post()
    async store(@Body() body: CreateSenioritiesDto){
        return await this.senioritiesService.store(body);
    }

    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateSenioritiesDto){
        return await this.senioritiesService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string){
        return await this.senioritiesService.destroy(id);
    }
}

