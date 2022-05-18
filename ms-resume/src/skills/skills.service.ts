import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from 'src/exceptions/not-found-exception';
import {
  Repository,
  FindConditions,
  FindOneOptions,
  FindManyOptions,
} from 'typeorm';
import { CreateSkillsDto } from './dto/create-skills.dto';
import { UpdateSkillsDto } from './dto/update-skills.dto';
import { SkillsEntity } from './skills.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(SkillsEntity)
    private readonly skillsRepository: Repository<SkillsEntity>,
  ) {}

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };
    return await this.skillsRepository.find(options);
  }

  async findOneOrFail(
    conditions: FindConditions<SkillsEntity>,
    options?: FindOneOptions<SkillsEntity>,
  ) {
    options = { relations: ['Resume'] };
    try {
      return await this.skillsRepository.findOneOrFail(conditions, options);
    } catch {
      throw new NotFoundException();
    }
  }

  async store(createDto: CreateSkillsDto) {
    const skills = this.skillsRepository.create(createDto);
    return await this.skillsRepository.save(skills);
  }

  async update(id: string, data: UpdateSkillsDto) {
    try {
      const skills = await this.skillsRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.skillsRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.skillsRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.skillsRepository.softDelete({ id });
  }
}
