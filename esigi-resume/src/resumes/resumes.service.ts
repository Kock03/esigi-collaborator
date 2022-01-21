import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressesEntity } from 'src/addresses/addresses.entity';
import { PhonesEntity } from 'src/phones/phones.entity';
import { Repository, FindConditions, FindOneOptions } from 'typeorm';
import { CreateResumesDto } from './dto/create-resumes-dto';
import { UpdateResumesDto } from './dto/update-resumes-dto';
import { ResumesEntity } from './resumes.entity';

@Injectable()
export class ResumesService {
  constructor(
    @InjectRepository(ResumesEntity)
    private readonly resumesRepository: Repository<ResumesEntity>,
  ) {}

  async findAll() {
    return await this.resumesRepository.find();
  }

  async findOneOrFail(
    conditions: FindConditions<ResumesEntity>,
    options?: FindOneOptions<ResumesEntity>,
  ) {
    try {
      return await this.resumesRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(createDto: CreateResumesDto) {
    const resume = this.resumesRepository.create(createDto);
    return await this.resumesRepository.save(resume);
  }

  async update(id: string, updateDto: UpdateResumesDto) {
    const resume = await this.resumesRepository.findOneOrFail({ id });
    this.resumesRepository.merge(resume, updateDto);
    return this.resumesRepository.save(resume);
  }

  async destroy(id: string) {
    await this.resumesRepository.findOne({ id });
    return await this.resumesRepository.softRemove({ id });
  }
}
