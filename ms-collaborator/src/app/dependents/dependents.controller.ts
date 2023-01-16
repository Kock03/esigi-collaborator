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

@Controller('/coll/api/v1/dependents')
export class DependentsController {
    constructor(private readonly dependentsService: DependentsService) { }

    @Get()
    async index() {
        return await this.dependentsService.findAll();
    }

    @Get('collaborator/:id')
    async findByCollaborator(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.dependentsService.findByCollaborator(id)
    }

    @Post()
    async store(@Body() body: CreatedependentsDto) {
        return await this.dependentsService.store(body);
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.dependentsService.findOneOrFail({ id });
    }

    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateDependentsDto,) {
        return await this.dependentsService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.dependentsService.destroy(id);
    }
}
