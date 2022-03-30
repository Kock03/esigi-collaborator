import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from 'src/address/address.entity';
import { DocumentsBadRequestExcpetion } from 'src/exceptions/documents-bad-request.exception';
import { NotFoundException } from 'src/exceptions/not-found-exception';
import { PhoneEntity } from 'src/phone/phone.entity';
import { DocumentValidator } from '../validators/document.validator';
import {
  Repository,
  FindConditions,
  FindOneOptions,
  FindManyOptions,
  Like,
} from 'typeorm';
import { CreateResumesDto } from './dto/create-resumes.dto';
import { UpdateResumesDto } from './dto/update-resumes.dto';
import { ResumesEntity } from './resumes.entity';

@Injectable()
export class ResumesService {
  constructor(
    @InjectRepository(ResumesEntity)
    private readonly resumesRepository: Repository<ResumesEntity>,
  ) {}

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };
    return await this.resumesRepository.find(options);
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

  
  findByName(query): Promise<ResumesEntity[]> {
    return this.resumesRepository.find({
      where: [
        { firstName: Like(`${query.firstName}%`) },]
    });
  }

  async store(data: CreateResumesDto) {
    if (data.cpf) {
      const invalidCpf = DocumentValidator.isValidCpf(data.cpf);
      if (invalidCpf) {
        throw new DocumentsBadRequestExcpetion();
      }
    }
    if (data.cpf === null) {
      try {
        const resume = this.resumesRepository.create(data);
        return await this.resumesRepository.save(resume);
      } catch (error) {
        throw new HttpException(JSON.stringify(error), 400);
      }
    } else {
      try {
        const resume = this.resumesRepository.create(data);
        return await this.resumesRepository.save(resume);
      } catch (error) {
        throw new HttpException(JSON.stringify(error), 400);
      }
    }
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
