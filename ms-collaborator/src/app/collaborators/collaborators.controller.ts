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
  Query,
  Req,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CollaboratorsService } from './collaborators.service';
import { CreateCollaboratorsDto } from './dtos/create-collaborators.dto';
import { UpdateCollaboratorsDto } from './dtos/update-collaborators.dto';
import { UpdatePermissionDto } from './dtos/update-permission.dto';
import { ICollaborators } from './interfaces/i-collaborators.interfaces';

@Controller('/api/v1/collaborators')
export class CollaboratorsController {
  constructor(private readonly collaboratorsService: CollaboratorsService) { }

  @Get()
  async index() {
    return await this.collaboratorsService.findAll();
  }

  @Post('/list')
  async findCollaboratorsListById(@Body() body: ICollaborators) {
    return await this.collaboratorsService.findCollaboratorsListById(body.idList);
  }

  @Post()
  async store(@Body() body: CreateCollaboratorsDto) {
    return await this.collaboratorsService.store(body);
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.collaboratorsService.findOneOrFail({ id });
  }

  @Get('/short/list/collaborators')
  async shortListCollaborators() {
    return await this.collaboratorsService.shortListCollaborators();
  }

  @Get('/short/list/permission/collaborators')
  async shortListCollaboratorsPermission() {
    return await this.collaboratorsService.shortListCollaborators();
  }
  
  
  @Get('list/inactive')
  async findInactive() {
    return await this.collaboratorsService.findInactive();
  }

  
  @Get('find/name')
  async findByName(@Query() query: any) {
    return this.collaboratorsService.findByName(query);
  }

  @Get('list/active')
  async findActive() {
    return await this.collaboratorsService.findActive();
  }

  @Put('permission/:id')
  async updatePermission(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdatePermissionDto,
  ) {
    return await this.collaboratorsService.updatePermission(id, body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateCollaboratorsDto,
  ) {
    return await this.collaboratorsService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.collaboratorsService.destroy(id);
  }
}
