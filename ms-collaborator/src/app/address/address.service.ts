import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { NotFoundException } from '../exceptions/not-found-exception';
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
    options = { relations: ['Collaborator'] };
    try {
      return await this.addressRepository.findOneOrFail(conditions, options);
    } catch {
      throw new NotFoundException();
    }
  }

  async store(data: CreateAddressDto) {
    const address = this.addressRepository.create(data);
    return await this.addressRepository.save(address);
  }

  async update(id: string, data: UpdateAddressDto) {
    try {
      await this.addressRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.addressRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.addressRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.addressRepository.softDelete({ id });
  }
}
