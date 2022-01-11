import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreatePhonesDto } from './dtos/create-phones.dto';
import { UpdatePhonesDto } from './dtos/update-phones.dto';
import { PhonesEntity } from './phones.entity';

@Injectable()
export class PhonesService {
  constructor(
    @InjectRepository(PhonesEntity)
    private readonly phonesRepository: Repository<PhonesEntity>,
  ) {}

  async findAll() {
    return await this.phonesRepository.find();
  }

  async findOneOrfail(
    conditions: FindConditions<PhonesEntity>,
    options?: FindOneOptions<PhonesEntity>,
  ) {
    try {
      return await this.phonesRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(phonesDto: CreatePhonesDto) {
    const phone = this.phonesRepository.create(phonesDto);
    return await this.phonesRepository.save(phone);
  }

  async update(id: string, phonesDto: UpdatePhonesDto) {
    const phone = await this.phonesRepository.findOneOrFail(id);
    this.phonesRepository.merge(phone, phonesDto);
    return await this.phonesRepository.save(phone);
  }

  async destroy(id: string) {
    const phone = await this.phonesRepository.findOneOrFail({ id });
    return await this.phonesRepository.softDelete({ id });
  }
}
