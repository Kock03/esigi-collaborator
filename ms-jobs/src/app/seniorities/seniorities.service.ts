import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  FindConditions,
  FindOneOptions,
  FindManyOptions,
} from 'typeorm';
import { NotFoundException } from '../exceptions/not-found-exception';
import { CreateSenioritiesDto } from './dtos/create-seniorities.dto';
import { UpdateSenioritiesDto } from './dtos/update-seniorities.dto';
import { SenioritiesEntity } from './seniorities.entity';

@Injectable()
export class SenioritiesService {
  constructor(
    @InjectRepository(SenioritiesEntity)
    private readonly senioritiesRepository: Repository<SenioritiesEntity>,
  ) {}

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };
    return await this.senioritiesRepository.find(options);
  }

  async findOneOrfail(
    conditions: FindConditions<SenioritiesEntity>,
    options?: FindOneOptions<SenioritiesEntity>,
  ) {
    options = { relations: ['Job'] };
    try {
      return await this.senioritiesRepository.findOneOrFail(
        conditions,
        options,
      );
    } catch {
      throw new NotFoundException();
    }
  }

  async store(data: CreateSenioritiesDto) {
    const seniority = this.senioritiesRepository.create(data);
    return await this.senioritiesRepository.save(seniority);
  }

  async update(id: string, data: UpdateSenioritiesDto) {
    try {
      const seniority = await this.senioritiesRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.senioritiesRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.senioritiesRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.senioritiesRepository.softDelete({ id });
  }
}
