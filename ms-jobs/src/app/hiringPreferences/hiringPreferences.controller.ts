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
import { CreateHiringPreferencesDto } from './dtos/create-hiringPreferences.dto';
import { UpdateHiringPreferencesDto } from './dtos/update-hiringPreferences.dto';
import { HiringPreferencesService } from './hiringPreferences.service';

@Controller('/api/v1/hiringPreferences/')
export class HiringPreferencesController {
    constructor(private readonly hiringPreferencesService: HiringPreferencesService) { }

    @Get()
    async index() {
        return await this.hiringPreferencesService.findAll();
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.hiringPreferencesService.findOneOrFail({ id });
    }

    @Post()
    async store(@Body() body: CreateHiringPreferencesDto) {
        return await this.hiringPreferencesService.store(body);
    }

    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateHiringPreferencesDto,
    ) {
        return await this.hiringPreferencesService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.hiringPreferencesService.destroy(id);
    }
}
