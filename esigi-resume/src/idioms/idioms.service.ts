import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions, FindOneOptions } from 'typeorm';
import { CreateIdiomsDto } from './dto/create-idioms-dto';
import { UpdateIdiomsDto } from './dto/update-idioms-dto';
import { IdiomsEntity } from './idioms.entity';

@Injectable()
export class IdiomsService {
  constructor(
    @InjectRepository(IdiomsEntity)
    private readonly IdiomsRepository: Repository<IdiomsEntity>,
  ) {}

  async findAll() {
    return await this.IdiomsRepository.find();
  }

  async findOneOrFail(
    conditions: FindConditions<IdiomsEntity>,
    options?: FindOneOptions<IdiomsEntity>,
  ) {
    try {
      return await this.IdiomsRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(createDto: CreateIdiomsDto) {
    const idiom = this.IdiomsRepository.create(createDto);
    return await this.IdiomsRepository.save(idiom);
  }

  async update(id: string, updateDto: UpdateIdiomsDto) {
    const idiom = await this.IdiomsRepository.findOneOrFail({ id });
    this.IdiomsRepository.merge(idiom, updateDto);
    return this.IdiomsRepository.save(idiom);
  }

  async destroy(id: string) {
    await this.IdiomsRepository.findOneOrFail({ id });
    return await this.IdiomsRepository.softDelete({ id });
  }
}
