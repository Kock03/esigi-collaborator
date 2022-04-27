import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindManyOptions, FindOneOptions } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { NotFoundException } from '../exceptions/not-found-exception';
import { CreateLanguagesDto } from './dtos/create-languages.dto';
import { UpdateLanguagesDto } from './dtos/update-languages.dto';
import { LanguagesEntity } from './languages.entity';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(LanguagesEntity)
    private readonly languagesRepository: Repository<LanguagesEntity>,
  ) {}

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };
    return await this.languagesRepository.find(options);
  }

  async findOneOrfail(
    conditions: FindConditions<LanguagesEntity>,
    options?: FindOneOptions<LanguagesEntity>,
  ) {
    options = { relations: ['Collaborator'] };
    try {
      return await this.languagesRepository.findOneOrFail(conditions, options);
    } catch {
      throw new NotFoundException();
    }
  }

  async store(data: CreateLanguagesDto) {
    const language = this.languagesRepository.create(data);
    return await this.languagesRepository.save(language);
  }

  async update(id: string, data: UpdateLanguagesDto) {
    const language = await this.languagesRepository.findOneOrFail({ id });
    if (!language) {
      throw new NotFoundException();
    }
    return await this.languagesRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.languagesRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.languagesRepository.softDelete({ id });
  }
}
