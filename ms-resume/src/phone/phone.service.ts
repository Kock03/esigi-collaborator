import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions, FindOneOptions } from 'typeorm';
import { CreatePhoneDto } from './dto/create-phone-dto';
import { UpdatePhoneDto } from './dto/update-phone-dto';
import { PhoneEntity } from './phone.entity';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(PhoneEntity)
    private readonly phoneRepository: Repository<PhoneEntity>,
  ) {}

  async findAll() {
    return await this.phoneRepository.find();
  }

  async findOneOrFail(
    conditions: FindConditions<PhoneEntity>,
    options?: FindOneOptions<PhoneEntity>,
  ) {
    try {
      return await this.phoneRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(createDto: CreatePhoneDto) {
    const phone = this.phoneRepository.create(createDto);
    return await this.phoneRepository.save(phone);
  }

  async update(id: string, updateDto: UpdatePhoneDto) {
    const phone = await this.phoneRepository.findOneOrFail({ id });
    this.phoneRepository.merge(phone, updateDto);
    return await this.phoneRepository.save(phone);
  }

  async destroy(id: string) {
    await this.phoneRepository.findOne({ id });
    return await this.phoneRepository.softDelete({ id });
  }
}
