import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { CreateJobsDto } from "./dtos/create-jobs.dto";
import { UpdateJobsDto } from "./dtos/update-jobs.dto";
import { JobsService } from "./jobs.service";

@Controller('/api/v1/jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) { }

    @Get()
    async index() {
        return await this.jobsService.findAll();
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.jobsService.findOneOrFail({ id });
    }

    @Post()
    async store(@Body() body: CreateJobsDto) {
        console.log("🚀 ~ file: jobs.controller.ts ~ line 22 ~ JobsController ~ store ~ body", body)
        return await this.jobsService.store(body);
    }

    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateJobsDto) {
        return await this.jobsService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.jobsService.destroy(id);
    }
} 