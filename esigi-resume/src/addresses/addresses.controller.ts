import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressesDto } from './dto/create-addresses-dto';
import { UpdateAddressesDto } from './dto/update-addresses-dto';

@Controller('api/v1/addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get()
  async index() {
    return this.addressesService.findAll();
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.addressesService.findOneOrFail({ id });
  }

  @Post()
  async store(@Body() body: CreateAddressesDto) {
    return await this.addressesService.store(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateAddressesDto,
  ) {
    return await this.addressesService.update(id, body);
  }

  @Delete(':id')
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.addressesService.destroy(id);
  }
}
