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
import { DependentsService } from './dependents.service';
import { CreatedependentsDto } from './dtos/create-dependents.dto';
import { UpdateDependentsDto } from './dtos/update-dependents.dto';

@Controller('/api/v1/dependents')
export class DependentsController {
    constructor(private readonly dependentsRepository: DependentsService) { }

    @Get()
    async index() {
        return await this.dependentsRepository.findAll();
    }

    @Post()
    async store(@Body() body: CreatedependentsDto) {
        console.log("🚀 ~ file: dependents.controller.ts ~ line 28 ~ dependentsController ~ store ~ body", body)
        return await this.dependentsRepository.store(body);
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.dependentsRepository.findOneOrFail({ id });
    }

    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateDependentsDto,) {
        return await this.dependentsRepository.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.dependentsRepository.destroy(id);
    }
}
