import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateKnowledgesDto } from './dtos/create-knowledges.dto';
import { UpdateKnowledgesDto } from './dtos/update-knowledges.dto';
import { KnowledgesService } from './knowledges.service';

@Controller('/api/v1/knowledges')
export class KnowledgesController {
    constructor(private readonly KnowledgesService: KnowledgesService){ }

    @Get()
    async index(){
        return await this.KnowledgesService.findAll();
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string){
        return await this.KnowledgesService.findOneOrfail({id});
    }

    @Post()
    async store(@Body() body: CreateKnowledgesDto){
        console.log("🚀 ~ file: jobs.controller.ts ~ line 22 ~ KnowledgesController ~ store ~ body", body)
        return await this.KnowledgesService.store(body);
    }

    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateKnowledgesDto){
        return await this.KnowledgesService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string){
        return await this.KnowledgesService.destroy(id);
    }
}

