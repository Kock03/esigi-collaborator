import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { AddressEntity } from './address.entity';
import { CreateAddressDto } from './dtos/create-address.dto';
import { UpdateAddressDto } from './dtos/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  async findAll() {
    const addressWhiteCollaborator = await this.addressRepository
    .createQueryBuilder('address')
    .getMany();

    return addressWhiteCollaborator;
  }

  async findOneOrFail(
    conditions: FindConditions<AddressEntity>,
    options?: FindOneOptions<AddressEntity>,
  ) {
    options = { relations: ['Collaborator']};
    try {
      return await this.addressRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateAddressDto) {
    const address = this.addressRepository.create(data);
    return await this.addressRepository.save(address);
  }

  async update(id: string, data: UpdateAddressDto) {
    const address = await this.addressRepository.findOneOrFail(id);
    this.addressRepository.merge(address, data);
    return await this.addressRepository.save(address);
  }

  async destroy(id: string) {
    await this.addressRepository.findOneOrFail({ id });
    return await this.addressRepository.softDelete({ id });
  }
}
