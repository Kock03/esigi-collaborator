import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { AddressesEntity } from './addresses.entity';
import { CreateAddressesDto } from './dtos/create-addresses.dto';
import { UpdateAddressesDto } from './dtos/update-addresses.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(AddressesEntity)
    private readonly addressesService: Repository<AddressesEntity>,
  ) {}

  async findAll() {
    return await this.addressesService.find();
  }

  async findOneOrFail(
    conditions: FindConditions<AddressesEntity>,
    options?: FindOneOptions<AddressesEntity>,
  ) {
    try {
      return await this.addressesService.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(addressesDto: CreateAddressesDto) {
    const address = this.addressesService.create(addressesDto);
    return await this.addressesService.save(address);
  }

  async update(id: string, addressesDto: UpdateAddressesDto) {
    const address = await this.addressesService.findOneOrFail(id);
    this.addressesService.merge(address, addressesDto);
    return await this.addressesService.save(address);
  }

  async destroy(id: string) {
    const address = await this.addressesService.findOneOrFail({ id });
    return await this.addressesService.softDelete({ id });
  }
}
