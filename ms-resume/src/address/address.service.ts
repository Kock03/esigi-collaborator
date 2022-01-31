import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { AddressEntity } from './address.entity';
import { CreateAddressDto } from './dto/create-address-dto';
import { UpdateAddressDto } from './dto/update-address-dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  async findAll() {
    return await this.addressRepository.find();
  }

  async findOneOrFail(
    conditions: FindConditions<AddressEntity>,
    options?: FindOneOptions<AddressEntity>,
  ) {
    try {
      return await this.addressRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(createDto: CreateAddressDto) {
    const address = this.addressRepository.create(createDto);
    return await this.addressRepository.save(address);
  }

  async update(id: string, updateDto: UpdateAddressDto) {
    const address = await this.addressRepository.findOneOrFail({ id });
    this.addressRepository.merge(address, updateDto);
    return this.addressRepository.save(address);
  }

  async destroy(id: string) {
    await this.addressRepository.findOne({ id });
    return await this.addressRepository.softDelete({ id });
  }
}
