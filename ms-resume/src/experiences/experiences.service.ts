import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions, FindOneOptions } from 'typeorm';
import { CreateExperiencesDto } from './dto/create-experiences-dto';
import { UpdateExperiencesDto } from './dto/update-experiences-dto';
import { ExperiencesEntity } from './experiences.entity';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectRepository(ExperiencesEntity)
    private readonly experiencesRepository: Repository<ExperiencesEntity>,
  ) {}

  async findAll() {
    return await this.experiencesRepository.find();
  }

  async findOneOrFail(
    conditions: FindConditions<ExperiencesEntity>,
    options?: FindOneOptions<ExperiencesEntity>,
  ) {
    try {
      return await this.experiencesRepository.findOneOrFail(
        conditions,
        options,
      );
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(createDto: CreateExperiencesDto) {
    const experience = this.experiencesRepository.create(createDto);
    return await this.experiencesRepository.save(experience);
  }

  async update(id: string, updateDto: UpdateExperiencesDto) {
    const experience = await this.experiencesRepository.findOneOrFail({ id });
    this.experiencesRepository.merge(experience, updateDto);
    return this.experiencesRepository.save(experience);
  }

  async destroy(id: string) {
    await this.experiencesRepository.findOneOrFail({ id });
    return await this.experiencesRepository.softDelete({ id });
  }
}
