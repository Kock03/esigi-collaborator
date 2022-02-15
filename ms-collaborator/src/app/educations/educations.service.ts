import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
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
    const educationsWhiteCollaborator = await this.educationsRepository
      .createQueryBuilder('educations')
      .getMany();

    return educationsWhiteCollaborator;
  }

  async findOneOrFail(
    conditions: FindConditions<EducationsEntity>,
    options?: FindOneOptions<EducationsEntity>,
  ) {
    options = { relations: ['Collaborator'] };
    try {
      return await this.educationsRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateEducationsDto) {
    const education = this.educationsRepository.create(data);
    return await this.educationsRepository.save(education);
  }

  async update(id: string, data: UpdateEducationsDto) {
    const education = await this.educationsRepository.findOneOrFail({ id });
    if (!education) {
      throw new HttpException('Not Found', 404);
    }
    return await this.educationsRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    await this.educationsRepository.findOneOrFail({ id });
    return await this.educationsRepository.softDelete({ id });
  }
}
