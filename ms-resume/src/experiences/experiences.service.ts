import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from 'src/exceptions/not-found-exception';
import {
  Repository,
  FindConditions,
  FindOneOptions,
  FindManyOptions,
} from 'typeorm';
import { CreateExperiencesDto } from './dto/create-experiences.dto';
import { UpdateExperiencesDto } from './dto/update-experiences.dto';
import { ExperiencesEntity } from './experiences.entity';
import { ExperiencesModule } from './experiences.module';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectRepository(ExperiencesEntity)
    private readonly experiencesRepository: Repository<ExperiencesEntity>,
  ) {}

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };
    return await this.experiencesRepository.find();
  }

  async findOneOrFail(
    conditions: FindConditions<ExperiencesEntity>,
    options?: FindOneOptions<ExperiencesEntity>,
  ) {
    options = { relations: ['Resume'] };
    try {
      return await this.experiencesRepository.findOneOrFail(
        conditions,
        options,
      );
    } catch {
      throw new NotFoundException();
    }
  }

  async store(createDto: CreateExperiencesDto) {
    const experience = this.experiencesRepository.create(createDto);
    return await this.experiencesRepository.save(experience);
  }

  async update(id: string, data: UpdateExperiencesDto) {
    try {
      const experience = await this.experiencesRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.experiencesRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.experiencesRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.experiencesRepository.softDelete({ id });
  }
}
