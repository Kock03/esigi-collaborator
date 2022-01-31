import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions, FindOneOptions } from 'typeorm';
import { CreateSkillsDto } from './dto/create-skills-dto';
import { UpdateSkillsDto } from './dto/update-skills-dto';
import { SkillsEntity } from './skills.entity';

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

  async store(createDto: CreateSkillsDto) {
    const skills = this.skillsRepository.create(createDto);
    return await this.skillsRepository.save(skills);
  }

  async update(id: string, updateDto: UpdateSkillsDto) {
    const skills = await this.skillsRepository.findOneOrFail({ id });
    this.skillsRepository.merge(skills, updateDto);
    return this.skillsRepository.save(skills);
  }

  async destroy(id: string) {
    await this.skillsRepository.findOneOrFail({ id });
    return await this.skillsRepository.softDelete({ id });
  }
}
