import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { SkillsEntity } from './skills.entity';
import { CreateSkillsDto } from './dtos/create-skills.dto';
import { UpdateSkillsDto } from './dtos/update-skills.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(SkillsEntity)
    private readonly skillsRepository: Repository<SkillsEntity>,
  ) {}

  async findAll() {
    return await this.skillsRepository.find();
  }

  async findOneOrFail(
    conditions: FindConditions<SkillsEntity>,
    options?: FindOneOptions<SkillsEntity>,
  ) {
    try {
      return await this.skillsRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(skillsDto: CreateSkillsDto) {
    const skill = this.skillsRepository.create(skillsDto);
    return await this.skillsRepository.save(skill);
  }

  async update(id: string, skillsDto: UpdateSkillsDto) {
    const skill = await this.skillsRepository.findOneOrFail(id);
    this.skillsRepository.merge(skill, skillsDto);
    return await this.skillsRepository.save(skill);
  }

  async destroy(id: string) {
    const skill = await this.skillsRepository.findOneOrFail({ id });
    return await this.skillsRepository.softDelete({ id });
  }
}
