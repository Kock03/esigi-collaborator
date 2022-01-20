import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions, FindOneOptions } from 'typeorm';
import { CreatePhonesDto } from './dto/create-phones-dto';
import { UpdatePhonesDto } from './dto/update-phones-dto';
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

  async findOneOrFail(
    conditions: FindConditions<PhonesEntity>,
    options?: FindOneOptions<PhonesEntity>,
  ) {
    try {
      return await this.phonesRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(createDto: CreatePhonesDto) {
    const phone = this.phonesRepository.create(createDto);
    return await this.phonesRepository.save(phone);
  }

  async update(id: string, updateDto: UpdatePhonesDto) {
    const phone = await this.phonesRepository.findOneOrFail({ id });
    this.phonesRepository.merge(phone, updateDto);
    return await this.phonesRepository.save(phone);
  }

  async destroy(id: string) {
    await this.phonesRepository.findOneOrFail({ id });
    return await this.phonesRepository.softDelete({ id });
  }
}
