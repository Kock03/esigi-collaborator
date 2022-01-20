import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreateEducationsDto } from './dto/create-educations-dto';
import { UpdateEducationsDto } from './dto/update-educations-dto';
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
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(createDto: CreateEducationsDto) {
    const education = this.educationsRepository.create(createDto);
    return await this.educationsRepository.save(education);
  }

  async update(id: string, updateDto: UpdateEducationsDto) {
    const education = await this.educationsRepository.findOneOrFail({ id });
    this.educationsRepository.merge(education, updateDto);
    return this.educationsRepository.save(education);
  }

  async destroy(id: string) {
    await this.educationsRepository.findOneOrFail({ id });
    return await this.educationsRepository.softDelete({ id });
  }
}
