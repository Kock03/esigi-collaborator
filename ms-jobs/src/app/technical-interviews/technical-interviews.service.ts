import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindCondition,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { NotFoundException } from '../exceptions/not-found-exception';
import { CreateTechnicalInterviewsDto } from './dtos/create-technical-interviews.dto';
import { UpdateTechnicalInterviewsDto } from './dtos/update-technical-interviews.dto';
import { TechnicalInterviewsEntity } from './technical-interviews.entity';

@Injectable()
export class TechnicalInterviewsService {
  constructor(
    @InjectRepository(TechnicalInterviewsEntity)
    private readonly technicalInterviewsRepository: Repository<TechnicalInterviewsEntity>,
  ) {}

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };
    return await this.technicalInterviewsRepository.find();
  }

  async findOneOrFail(
    conditions: FindConditions<TechnicalInterviewsEntity>,
    options?: FindOneOptions<TechnicalInterviewsEntity>,
  ) {
    try {
      return await this.technicalInterviewsRepository.findOneOrFail(
        conditions,
        options,
      );
    } catch {
      throw new NotFoundException();
    }
  }

  async store(data: CreateTechnicalInterviewsDto) {
    console.log("🚀 ~ file: technical-interviews.service.ts ~ line 44 ~ TechnicalInterviewsService ~ store ~ data", data)
    const interview = this.technicalInterviewsRepository.create(data);
    return await this.technicalInterviewsRepository.save(interview);
  }

  async update(id: string, data: UpdateTechnicalInterviewsDto) {
    try {
      const interview = await this.technicalInterviewsRepository.findOneOrFail({
        id,
      });
    } catch {
      throw new NotFoundException();
    }
    return await this.technicalInterviewsRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.technicalInterviewsRepository.findOneOrFail({
        id,
      });
    } catch {
      throw new NotFoundException();
    }
    return await this.technicalInterviewsRepository.softDelete({ id });
  }
}
