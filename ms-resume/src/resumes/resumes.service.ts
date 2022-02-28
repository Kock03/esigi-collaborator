import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from 'src/address/address.entity';
import { NotFoundException } from 'src/exceptions/not-found-exception';
import { PhoneEntity } from 'src/phone/phone.entity';
import { Repository, FindConditions, FindOneOptions } from 'typeorm';
import { CreateResumesDto } from './dto/create-resumes-dto';
import { UpdateResumesDto } from './dto/update-resumes-dto';
import { ResumesEntity } from './resumes.entity';

@Injectable()
export class ResumesService {
  constructor(
    @InjectRepository(ResumesEntity)
    private readonly resumesRepository: Repository<ResumesEntity>,
  ) { }

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
      throw new NotFoundException();
    }
  }

  async store(createDto: CreateResumesDto) {
    const resume = this.resumesRepository.create(createDto);
    return await this.resumesRepository.save(resume);
  }

  async update(id: string, data: UpdateResumesDto) {
    try {
      const resume = await this.resumesRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.resumesRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.resumesRepository.findOneOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
    return await this.resumesRepository.softDelete({ id });
  }
}
