import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from 'src/exceptions/not-found-exception';
import {
  Repository,
  FindConditions,
  FindOneOptions,
  FindManyOptions,
} from 'typeorm';
import { CreateLanguagesDto } from './dto/create-languages.dto';
import { UpdateLanguagesDto } from './dto/update-languages.dto';
import { LanguagesEntity } from './languages.entity';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(LanguagesEntity)
    private readonly languagesRepository: Repository<LanguagesEntity>,
  ) { }

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };
    return await this.languagesRepository.find();
  }

  async findOneOrFail(
    conditions: FindConditions<LanguagesEntity>,
    options?: FindOneOptions<LanguagesEntity>,
  ) {
    options = { relations: ['Resume'] };
    try {
      return await this.languagesRepository.findOneOrFail(conditions, options);
    } catch {
      throw new NotFoundException();
    }
  }


  async findByResume(id: string) {
    return await this.languagesRepository.createQueryBuilder('languages')
      .where(`resume_id="${id}"`)
      .getMany();
  }

  async store(createDto: CreateLanguagesDto) {
    const languages = this.languagesRepository.create(createDto);
    return await this.languagesRepository.save(languages);
  }

  async update(id: string, data: UpdateLanguagesDto) {
    try {
      const languages = await this.languagesRepository.findOneOrFail({ id });
    } catch {
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
