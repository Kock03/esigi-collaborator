import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions, FindOneOptions } from 'typeorm';
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
    const senioritiesWhiteAll = await this.senioritiesRepository
      .createQueryBuilder('seniorities')
      .getMany();

    return senioritiesWhiteAll;
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
    const seniority = await this.senioritiesRepository.findOneOrFail({ id });
    if (!seniority) {
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
