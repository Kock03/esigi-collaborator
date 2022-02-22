import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from 'src/exceptions/not-found-exception';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreateSchoolingDto } from './dto/create-schooling-dto';
import { UpdateSchoolingDto } from './dto/update-schooling-dto';
import { EducationsEntity } from './educations.entity';

@Injectable()
export class EducationsService {
  constructor(
    @InjectRepository(EducationsEntity)
    private readonly educationsRepository: Repository<EducationsEntity>,
  ) {}

  async findAll() {
    return await this.educationsRepository.find();
  }

  async findOneOrFail(
    conditions: FindConditions<EducationsEntity>,
    options?: FindOneOptions<EducationsEntity>,
  ) {
    try {
      return await this.educationsRepository.findOneOrFail(conditions, options);
    } catch {
      throw new NotFoundException();
    }
  }

  async store(createDto: CreateSchoolingDto) {
    const education = this.educationsRepository.create(createDto);
    return await this.educationsRepository.save(education);
  }

  async update(id: string, data: UpdateSchoolingDto) {
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
