import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from 'src/exceptions/not-found-exception';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { AddressEntity } from './address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) { }

  async findAll() {
    return await this.addressRepository.find();
  }

  async findOneOrFail(
    conditions: FindConditions<AddressEntity>,
    options?: FindOneOptions<AddressEntity>,
  ) {
    try {
      return await this.addressRepository.findOneOrFail(conditions, options);
    } catch {
      throw new NotFoundException();
    }
  }

  async store(createDto: CreateAddressDto) {
    const address = this.addressRepository.create(createDto);
    return await this.addressRepository.save(address);
  }

  async update(id: string, data: UpdateAddressDto) {
    try {
      const address = await this.addressRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.addressRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.addressRepository.findOne({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.addressRepository.softDelete({ id });
  }
}
