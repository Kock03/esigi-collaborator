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
    private readonly addressesRepository: Repository<AddressesEntity>,
  ) {}

  async findAll() {
    const addressesWhiteCollaborator = await this.addressesRepository
    .createQueryBuilder('addresses')
    .leftJoinAndSelect('addresses.collaborator', 'collaborator')
    .getMany();

    return addressesWhiteCollaborator;
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

  async store(data: CreateAddressesDto) {
    const address = this.addressesRepository.create(data);
    return await this.addressesRepository.save(address);
  }

  async update(id: string, data: UpdateAddressesDto) {
    const address = await this.addressesRepository.findOneOrFail(id);
    this.addressesRepository.merge(address, data);
    return await this.addressesRepository.save(address);
  }

  async destroy(id: string) {
    await this.addressesRepository.findOneOrFail({ id });
    return await this.addressesRepository.softDelete({ id });
  }
}
