import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { SkillsEntity } from './skills.entity';
import { CreateSkillsDto } from './dtos/create-skills.dto';
import { UpdateSkillsDto } from './dtos/update-skills.dto';
import { NotFoundException } from '../exceptions/not-found-exception';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(SkillsEntity)
    private readonly skillsRepository: Repository<SkillsEntity>,
  ) { }

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };
    return await this.skillsRepository.find(options);
  }

  async findByCollaborator(id: string) {
    return await this.skillsRepository.query(`select * from skills where collaborator_id="${id}"`)
  }

  async findOneOrFail(
    conditions: FindConditions<SkillsEntity>,
    options?: FindOneOptions<SkillsEntity>,
  ) {
    options = { relations: ['Collaborator'] };
    try {
      return await this.skillsRepository.findOneOrFail(conditions, options);
    } catch {
      throw new NotFoundException();
    }
  }

  async store(data: CreateSkillsDto) {
    const skill = this.skillsRepository.create(data);
    return await this.skillsRepository.save(skill);
  }

  async update(id: string, data: UpdateSkillsDto) {
    const skill = await this.skillsRepository.findOneOrFail({ id });
    if (!skill) {
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
