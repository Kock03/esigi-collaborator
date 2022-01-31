import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions, FindOneOptions } from 'typeorm';
import { CreateLanguagesDto } from './dto/create-languages-dto';
import { UpdateLanguagesDto } from './dto/update-languages-dto';
import { LanguagesEntity } from './languages.entity';

@Injectable()
export class IdiomsService {
  constructor(
    @InjectRepository(LanguagesEntity)
    private readonly languagesRepository: Repository<LanguagesEntity>,
  ) {}

  async findAll() {
    return await this.languagesRepository.find();
  }

  async findOneOrFail(
    conditions: FindConditions<LanguagesEntity>,
    options?: FindOneOptions<LanguagesEntity>,
  ) {
    try {
      return await this.languagesRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(createDto: CreateLanguagesDto) {
    const languages = this.languagesRepository.create(createDto);
    return await this.languagesRepository.save(languages);
  }

  async update(id: string, updateDto: UpdateLanguagesDto) {
    const languages = await this.languagesRepository.findOneOrFail({ id });
    this.languagesRepository.merge(languages, updateDto);
    return this.languagesRepository.save(languages);
  }

  async destroy(id: string) {
    await this.languagesRepository.findOneOrFail({ id });
    return await this.languagesRepository.softDelete({ id });
  }
}
