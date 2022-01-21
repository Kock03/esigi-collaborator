import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { AddressesEntity } from './addresses.entity';
import { CreateAddressesDto } from './dto/create-addresses-dto';
import { UpdateAddressesDto } from './dto/update-addresses-dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(AddressesEntity)
    private readonly addressesRepository: Repository<AddressesEntity>,
  ) {}

  async findAll() {
    return await this.addressesRepository.find();
  }

  async findOneOrFail(
    conditions: FindConditions<AddressesEntity>,
    options?: FindOneOptions<AddressesEntity>,
  ) {
    try {
      return await this.addressesRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(createDto: CreateAddressesDto) {
    const address = this.addressesRepository.create(createDto);
    return await this.addressesRepository.save(address);
  }

  async update(id: string, updateDto: UpdateAddressesDto) {
    const address = await this.addressesRepository.findOneOrFail({ id });
    this.addressesRepository.merge(address, updateDto);
    return this.addressesRepository.save(address);
  }

  async destroy(id: string) {
    await this.addressesRepository.findOne({ id });
    return await this.addressesRepository.softRemove({ id });
  }
}
