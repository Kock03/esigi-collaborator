import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { NotFoundException } from '../exceptions/not-found-exception';
import { CreateEducationsDto } from './dtos/create-educations.dto';
import { UpdateEducationsDto } from './dtos/update-educations.dto';
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
    options = { relations: ['Collaborator'] };
    try {
      return await this.educationsRepository.findOneOrFail(conditions, options);
    } catch {
      throw new NotFoundException();
    }
  }

  async store(data: CreateEducationsDto) {
    const education = this.educationsRepository.create(data);
    return await this.educationsRepository.save(education);
  }

  async update(id: string, data: UpdateEducationsDto) {
    const education = await this.educationsRepository.findOneOrFail({ id });
    if (!education) {
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
