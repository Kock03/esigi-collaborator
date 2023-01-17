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
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('resume/api/v1/address')
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @Get()
  async index() {
    return this.addressService.findAll();
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.addressService.findOneOrFail({ id });
  }

  @Post()
  async store(@Body() body: CreateAddressDto) {
    return await this.addressService.store(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateAddressDto,
  ) {
    return await this.addressService.update(id, body);
  }

  @Delete(':id')
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.addressService.destroy(id);
  }
}
