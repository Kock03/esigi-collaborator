import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreatePhoneDto } from './dtos/create-phone.dto';
import { UpdatePhoneDto } from './dtos/update-phone.dto';
import { PhoneEntity } from './phone.entity';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(PhoneEntity)
    private readonly phoneRepository: Repository<PhoneEntity>,
  ) {}

  async findAll() {
    const phoneWhiteCollaborator = await this.phoneRepository
      .createQueryBuilder('phone')
      .getMany();

    return phoneWhiteCollaborator;
  }

  async findOneOrfail(
    conditions: FindConditions<PhoneEntity>,
    options?: FindOneOptions<PhoneEntity>,
  ) {
    options = { relations: ['Collaborator'] };
    try {
      return await this.phoneRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(phonesDto: CreatePhoneDto) {
    const phone = this.phoneRepository.create(phonesDto);
    return await this.phoneRepository.save(phone);
  }

  async update(id: string, data: UpdatePhoneDto) {
    const phone = await this.phoneRepository.findOneOrFail({ id });
    if (!phone) {
      throw new HttpException('Not Found', 404);
    }
    return await this.phoneRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    await this.phoneRepository.findOneOrFail({ id });
    return await this.phoneRepository.softDelete({ id });
  }
}
