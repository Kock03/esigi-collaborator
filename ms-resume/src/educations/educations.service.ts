import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from 'src/exceptions/not-found-exception';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { CreateEducationsDto } from './dto/create-educations.dto';
import { UpdateEducationsingDto } from './dto/update-educations.dto';
import { EducationsEntity } from './educations.entity';

@Injectable()
export class EducationsService {
  constructor(
    @InjectRepository(EducationsEntity)
    private readonly educationsRepository: Repository<EducationsEntity>,
  ) {}

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };
    return await this.educationsRepository.find(options);
  }

  async findOneOrFail(
    conditions: FindConditions<EducationsEntity>,
    options?: FindOneOptions<EducationsEntity>,
  ) {
    options = { relations: ['Resume'] };
    try {
      return await this.educationsRepository.findOneOrFail(conditions, options);
    } catch {
      throw new NotFoundException();
    }
  }

  async store(createDto: CreateEducationsDto) {
    const education = this.educationsRepository.create(createDto);
    return await this.educationsRepository.save(education);
  }

  async update(id: string, data: UpdateEducationsingDto) {
    try {
      const education = await this.educationsRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.educationsRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.educationsRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.educationsRepository.softDelete({ id });
  }
}
